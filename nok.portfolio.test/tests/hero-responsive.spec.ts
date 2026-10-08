import { test, expect } from '@playwright/test'

const SCREENSHOT_DIR = '/opt/cursor/artifacts/screenshots'

function skipNoJs(testInfo: { project: { name: string } }) {
  if (testInfo.project.name.includes('no-js')) {
    test.skip()
  }
}

async function loadHome(page: import('@playwright/test').Page) {
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await page.waitForSelector('html.motion-ready', { timeout: 5000 }).catch(() => {})
  await page.waitForTimeout(700)
}

async function photoToNameGap(page: import('@playwright/test').Page) {
  return page.evaluate(() => {
    const photo = document.querySelector('.hero__portrait')
    const name = document.querySelector('.hero__name')
    if (!photo || !name || !name.firstChild) return null
    const photoBottom = photo.getBoundingClientRect().bottom
    const range = document.createRange()
    range.setStart(name.firstChild, 0)
    range.setEnd(name.firstChild, 1)
    const nTop = range.getBoundingClientRect().top
    return nTop - photoBottom
  })
}

const VIEWPORTS = [
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 820, height: 1180 },
  { width: 1024, height: 768 },
  { width: 1280, height: 800 },
  { width: 1440, height: 900 },
]

test.describe('Hero geometry — RED-06 §12', () => {
  for (const vp of VIEWPORTS) {
    test.describe(`${vp.width}x${vp.height}`, () => {
      test.use({ viewport: vp })

      test(`photo to n gap is 24–32px`, async ({ page }, testInfo) => {
        skipNoJs(testInfo)
        await loadHome(page)

        const gap = await photoToNameGap(page)
        expect(gap, `gap at ${vp.width}`).not.toBeNull()
        expect(gap!).toBeGreaterThanOrEqual(24)
        expect(gap!).toBeLessThanOrEqual(32)

        await page.screenshot({
          path: `${SCREENSHOT_DIR}/hero-${vp.width}x${vp.height}-${testInfo.project.name}.png`,
          fullPage: false,
        })
      })

      test(`hero fits in 100svh and marquee stays below the photo`, async ({ page }, testInfo) => {
        skipNoJs(testInfo)
        await loadHome(page)

        const metrics = await page.evaluate(() => {
          const hero = document.querySelector('.hero') as HTMLElement
          const photo = document.querySelector('.hero__portrait') as HTMLElement
          const marquee = document.querySelector('.hero__marquee') as HTMLElement
          const name = document.querySelector('.hero__name') as HTMLElement
          const heroBox = hero.getBoundingClientRect()
          const photoBox = photo.getBoundingClientRect()
          const marqueeBox = marquee.getBoundingClientRect()
          return {
            heroHeight: heroBox.height,
            photoBottom: photoBox.bottom,
            marqueeTop: marqueeBox.top,
            marqueeBottom: marqueeBox.bottom,
            marqueeHeight: marqueeBox.height,
            nameTop: name.getBoundingClientRect().top,
          }
        })

        expect(metrics.heroHeight).toBeLessThanOrEqual(vp.height + 1)
        expect(metrics.marqueeTop).toBeGreaterThanOrEqual(metrics.photoBottom + 20)
        expect(metrics.marqueeBottom).toBeLessThanOrEqual(vp.height + 2)
        expect(metrics.marqueeHeight).toBeLessThanOrEqual(vp.height * 0.18 + 4)
      })
    })
  }

  test.describe('Tablet portrait stack and right align', () => {
    for (const vp of [
      { width: 768, height: 1024 },
      { width: 820, height: 1180 },
    ]) {
      test(`${vp.width}: copy then photo, photo in columns 2–8 right-aligned`, async ({
        page,
      }, testInfo) => {
        skipNoJs(testInfo)
        await page.setViewportSize(vp)
        await loadHome(page)

        const valueBox = await page.locator('.hero__value').boundingBox()
        const statusBox = await page.locator('.hero__status').boundingBox()
        const linkBox = await page.locator('.hero__contact-link').boundingBox()
        const photoBox = await page.locator('.hero__portrait').boundingBox()
        const wrapBox = await page.locator('.hero__portrait-wrap').boundingBox()
        const gridBox = await page.locator('.hero__grid').boundingBox()

        expect(valueBox!.y).toBeLessThan(statusBox!.y)
        expect(statusBox!.y).toBeLessThan(linkBox!.y)
        expect(linkBox!.y + linkBox!.height).toBeLessThan(photoBox!.y)

        expect(wrapBox!.x).toBeGreaterThan(gridBox!.x + 16)
        expect(Math.abs(photoBox!.x + photoBox!.width - (gridBox!.x + gridBox!.width))).toBeLessThanOrEqual(10)
      })
    }
  })

  test.describe('900–1199 status clearance', () => {
    test.use({ viewport: { width: 1024, height: 768 } })

    test('Disponível stays ≥32px above the n and header is Menu only', async ({
      page,
    }, testInfo) => {
      skipNoJs(testInfo)
      await loadHome(page)

      const statusBottom = await page.locator('.hero__status').evaluate((el) => {
        return el.getBoundingClientRect().bottom
      })
      const nTop = await page.evaluate(() => {
        const name = document.querySelector('.hero__name')
        if (!name?.firstChild) return 0
        const range = document.createRange()
        range.setStart(name.firstChild, 0)
        range.setEnd(name.firstChild, 1)
        return range.getBoundingClientRect().top
      })

      expect(nTop - statusBottom).toBeGreaterThanOrEqual(32)
      await expect(page.locator('.header__cta')).not.toBeVisible()
      await expect(page.locator('.header__menu')).toBeVisible()
    })
  })
})
