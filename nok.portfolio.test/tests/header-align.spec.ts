import { test, expect } from '@playwright/test'
import sharp from 'sharp'

const SCREENSHOT_DIR = '/opt/cursor/artifacts/screenshots'

const VIEWPORTS = [
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 820, height: 1180 },
  { width: 1024, height: 768 },
  { width: 1280, height: 800 },
  { width: 1440, height: 900 },
]

function isNoJs(testInfo: { project: { name: string } }) {
  return testInfo.project.name.includes('no-js')
}

async function loadHome(page: import('@playwright/test').Page, testInfo: { project: { name: string } }) {
  await page.goto('/')
  await page.waitForLoadState('domcontentloaded')
  if (!isNoJs(testInfo)) {
    await page.waitForLoadState('networkidle')
    await page.waitForSelector('html.motion-ready', { timeout: 5000 }).catch(() => {})
    await page.waitForTimeout(400)
  }
}

async function lastHeaderControl(page: import('@playwright/test').Page) {
  const candidates = [
    page.locator('.header__cta'),
    page.locator('.header__menu'),
    page.locator('.menu-float.is-visible'),
  ]
  let rightmost: { x: number; width: number } | null = null
  for (const locator of candidates) {
    if ((await locator.count()) === 0) continue
    const box = await locator.boundingBox()
    if (!box || box.width < 2) continue
    if (!rightmost || box.x + box.width > rightmost.x + rightmost.width) {
      rightmost = box
    }
  }
  return rightmost
}

test.describe('Header shares the hero shell', () => {
  for (const vp of VIEWPORTS) {
    test.describe(`${vp.width}x${vp.height}`, () => {
      test.use({ viewport: vp })

      test('logo aligns with hero text and last control aligns with the photo', async ({
        page,
      }, testInfo) => {
        await loadHome(page, testInfo)

        const logo = await page.locator('.header__logo').boundingBox()
        const value = await page.locator('.hero__value').boundingBox()
        const photo = await page.locator('.hero__portrait').boundingBox()
        const control = await lastHeaderControl(page)

        expect(logo, 'logo').not.toBeNull()
        expect(value, 'hero text').not.toBeNull()
        expect(photo, 'photo').not.toBeNull()
        expect(control, 'last header control').not.toBeNull()

        const leftDelta = Math.abs(logo!.x - value!.x)
        const controlRight = control!.x + control!.width
        const photoRight = photo!.x + photo!.width

        expect(leftDelta, `logo x ${logo!.x} vs text x ${value!.x}`).toBeLessThanOrEqual(1)
        expect(
          Math.abs(controlRight - photoRight),
          `control right ${controlRight} vs photo right ${photoRight}`,
        ).toBeLessThanOrEqual(1)

        const project = testInfo.project.name
        if (project === 'desktop-no-preference' || project === 'no-js') {
          const suffix = isNoJs(testInfo) ? 'nojs' : 'js'
          await page.screenshot({
            path: `${SCREENSHOT_DIR}/header-hero-${vp.width}x${vp.height}-${suffix}.png`,
            fullPage: false,
          })
        }
      })
    })
  }
})

test.describe('No-JS header and tagline', () => {
  test.beforeEach(({}, testInfo) => {
    if (!testInfo.project.name.includes('no-js')) {
      test.skip()
    }
  })

  for (const vp of [
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1024, height: 768 },
  ]) {
    test(`${vp.width}: Menu is a footer-nav link`, async ({ page }, testInfo) => {
      await page.setViewportSize(vp)
      await loadHome(page, testInfo)

      const menu = page.locator('.header__menu')
      await expect(menu).toBeVisible()
      await expect(menu).toHaveRole('link')
      await expect(menu).toHaveAttribute('href', '#footer-nav')

      const nav = page.locator('#footer-nav')
      await expect(nav).toHaveCount(1)
      await menu.click()
      await expect(nav).toBeInViewport()
    })
  }

  test('hero tagline uses spec gray without JS', async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await loadHome(page, testInfo)

    const box = await page.locator('.hero__value').boundingBox()
    expect(box).not.toBeNull()
    const buffer = await page.screenshot({
      clip: {
        x: Math.floor(box!.x),
        y: Math.floor(box!.y + 4),
        width: Math.min(220, Math.floor(box!.width)),
        height: Math.min(28, Math.floor(box!.height - 8)),
      },
    })
    const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
    let r = 0
    let g = 0
    let b = 0
    let n = 0
    for (let i = 0; i < data.length; i += info.channels) {
      if (data[i] + data[i + 1] + data[i + 2] < 40) continue
      r += data[i]
      g += data[i + 1]
      b += data[i + 2]
      n++
    }
    expect(n).toBeGreaterThan(20)
    const avgR = r / n
    const avgG = g / n
    const avgB = b / n
    // --text-secondary is #A3A9B2, not white
    expect(avgR).toBeGreaterThan(130)
    expect(avgR).toBeLessThan(200)
    expect(avgG).toBeGreaterThan(130)
    expect(avgG).toBeLessThan(200)
    expect(avgB).toBeGreaterThan(140)
    expect(Math.abs(avgR - avgG)).toBeLessThan(20)
  })
})
