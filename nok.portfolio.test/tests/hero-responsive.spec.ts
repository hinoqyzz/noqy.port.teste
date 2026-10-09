import { test, expect } from '@playwright/test'
import { measurePhotoToNInkGap } from './hero-ink'

const SCREENSHOT_DIR = '/opt/cursor/artifacts/screenshots'

function isNoJs(testInfo: { project: { name: string } }) {
  return testInfo.project.name.includes('no-js')
}

async function loadHome(page: import('@playwright/test').Page, testInfo: { project: { name: string } }) {
  await page.goto('/')
  await page.waitForLoadState('domcontentloaded')
  if (!isNoJs(testInfo)) {
    await page.waitForLoadState('networkidle')
    await page.waitForSelector('html.motion-ready', { timeout: 5000 }).catch(() => {})
    await page.waitForTimeout(500)
  }
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

      test(`photo to n ink gap is 24–32px`, async ({ page }, testInfo) => {
        await loadHome(page, testInfo)
        const gap = await measurePhotoToNInkGap(page)
        expect(gap, `ink gap at ${vp.width}`).not.toBeNull()
        expect(gap!).toBeGreaterThanOrEqual(24)
        expect(gap!).toBeLessThanOrEqual(32)

        const project = testInfo.project.name
        if (project === 'desktop-no-preference' || project === 'no-js') {
          const suffix = isNoJs(testInfo) ? 'nojs' : 'js'
          await page.screenshot({
            path: `${SCREENSHOT_DIR}/hero-${vp.width}x${vp.height}-${suffix}.png`,
            fullPage: false,
          })
        }
      })

      test(`hero fits in 100svh, photo stays in the grid, marquee below photo`, async ({
        page,
      }, testInfo) => {
        await loadHome(page, testInfo)

        const hero = await page.locator('.hero').boundingBox()
        const photo = await page.locator('.hero__portrait').boundingBox()
        const grid = await page.locator('.hero__grid').boundingBox()
        const header = await page.locator('.header').boundingBox()
        const marquee = await page.locator('.hero__marquee').boundingBox()
        const logo = page.locator('.header__logo')

        expect(hero).not.toBeNull()
        expect(photo).not.toBeNull()
        expect(grid).not.toBeNull()
        expect(marquee).not.toBeNull()

        expect(hero!.height).toBeLessThanOrEqual(vp.height + 1)
        expect(marquee!.y).toBeGreaterThanOrEqual(photo!.y + photo!.height + 8)
        expect(marquee!.y + marquee!.height).toBeLessThanOrEqual(vp.height + 2)
        expect(marquee!.height).toBeLessThanOrEqual(vp.height * 0.18 + 4)

        expect(photo!.x + photo!.width).toBeLessThanOrEqual(grid!.x + grid!.width + 1)
        expect(photo!.x).toBeGreaterThanOrEqual(grid!.x - 1)

        if (header) {
          expect(photo!.y).toBeGreaterThanOrEqual(header.y + header.height - 1)
        }

        await expect(logo).toBeVisible()
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
        await page.setViewportSize(vp)
        await loadHome(page, testInfo)

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

  test.describe('Mobile extras', () => {
    test.use({ viewport: { width: 390, height: 844 } })

    test('about vert is hidden and process line stays out of the hero', async ({
      page,
    }, testInfo) => {
      await loadHome(page, testInfo)
      const vert = page.locator('.about__vert')
      await expect(vert).toHaveCount(1)
      await expect(vert).toBeHidden()

      const heroBox = await page.locator('.hero').boundingBox()
      expect(heroBox).not.toBeNull()
      const track = page.locator('.process__track')
      if ((await track.count()) > 0) {
        const trackBox = await track.boundingBox()
        if (trackBox) {
          expect(trackBox.y).toBeGreaterThan(heroBox!.y + heroBox!.height - 2)
        }
      }
    })
  })

  test.describe('900–1199 status clearance', () => {
    test.use({ viewport: { width: 1024, height: 768 } })

    test('Disponível stays ≥32px above the n ink and header is Menu only', async ({
      page,
    }, testInfo) => {
      await loadHome(page, testInfo)

      const statusBox = await page.locator('.hero__status').boundingBox()
      const photoBox = await page.locator('.hero__portrait').boundingBox()
      const inkGap = await measurePhotoToNInkGap(page)
      expect(statusBox).not.toBeNull()
      expect(photoBox).not.toBeNull()
      expect(inkGap).not.toBeNull()

      const nInkTop = photoBox!.y + photoBox!.height + inkGap!
      expect(nInkTop - (statusBox!.y + statusBox!.height)).toBeGreaterThanOrEqual(32)
      await expect(page.locator('.header__cta')).toBeHidden()
      if (!isNoJs(testInfo)) {
        await expect(page.locator('.header__menu')).toBeVisible()
      }
    })
  })
})
