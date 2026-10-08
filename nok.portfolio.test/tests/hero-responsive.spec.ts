import { test, expect } from '@playwright/test'

const SCREENSHOT_DIR = '/opt/cursor/artifacts/screenshots'

function skipNoJs(testInfo: { project: { name: string } }) {
  if (testInfo.project.name.includes('no-js')) {
    test.skip()
  }
}

const HANDS_LINE = 0.88

test.describe('Hero Responsive Layout - RED-06', () => {
  test.describe('Tablet Portrait (768x1024)', () => {
    test.use({ viewport: { width: 768, height: 1024 } })

    test('vertical order is phrase, status, link, then photo', async ({ page }, testInfo) => {
      skipNoJs(testInfo)
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const valueBox = await page.locator('.hero__value').boundingBox()
      const statusBox = await page.locator('.hero__status').boundingBox()
      const linkBox = await page.locator('.hero__contact-link').boundingBox()
      const photoBox = await page.locator('.hero__portrait').boundingBox()

      expect(valueBox).not.toBeNull()
      expect(statusBox).not.toBeNull()
      expect(linkBox).not.toBeNull()
      expect(photoBox).not.toBeNull()

      expect(valueBox!.y).toBeLessThan(statusBox!.y)
      expect(statusBox!.y).toBeLessThan(linkBox!.y)
      expect(linkBox!.y + linkBox!.height).toBeLessThan(photoBox!.y)
    })

    test('link and marquee stay inside the first viewport', async ({ page }, testInfo) => {
      skipNoJs(testInfo)
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const linkBox = await page.locator('.hero__contact-link').boundingBox()
      const marqueeBox = await page.locator('.hero__marquee').boundingBox()

      expect(linkBox).not.toBeNull()
      expect(marqueeBox).not.toBeNull()
      expect(linkBox!.y + linkBox!.height).toBeLessThanOrEqual(1024)
      expect(marqueeBox!.y + marqueeBox!.height).toBeLessThanOrEqual(1024 + 8)
      expect(marqueeBox!.height).toBeLessThanOrEqual(1024 * 0.18 + 12)
    })

    test('marquee sits below the hands line of the photo', async ({ page }, testInfo) => {
      skipNoJs(testInfo)
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const photoBox = await page.locator('.hero__portrait').boundingBox()
      const marqueeBox = await page.locator('.hero__marquee').boundingBox()
      expect(photoBox).not.toBeNull()
      expect(marqueeBox).not.toBeNull()

      const handsLine = photoBox!.y + photoBox!.height * HANDS_LINE
      expect(marqueeBox!.y).toBeGreaterThanOrEqual(handsLine - 2)
    })

    test('status to marquee gap is at least 32px', async ({ page }, testInfo) => {
      skipNoJs(testInfo)
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const statusBox = await page.locator('.hero__status').boundingBox()
      const marqueeBox = await page.locator('.hero__marquee').boundingBox()
      expect(statusBox).not.toBeNull()
      expect(marqueeBox).not.toBeNull()
      expect(marqueeBox!.y - (statusBox!.y + statusBox!.height)).toBeGreaterThanOrEqual(32)

      await page.screenshot({
        path: `${SCREENSHOT_DIR}/hero-768x1024-${testInfo.project.name}.png`,
        fullPage: false,
      })
    })
  })

  test.describe('Tablet Portrait (820x1180)', () => {
    test.use({ viewport: { width: 820, height: 1180 } })

    test('vertical order and first-viewport fit', async ({ page }, testInfo) => {
      skipNoJs(testInfo)
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const valueBox = await page.locator('.hero__value').boundingBox()
      const statusBox = await page.locator('.hero__status').boundingBox()
      const linkBox = await page.locator('.hero__contact-link').boundingBox()
      const photoBox = await page.locator('.hero__portrait').boundingBox()
      const marqueeBox = await page.locator('.hero__marquee').boundingBox()

      expect(valueBox!.y).toBeLessThan(statusBox!.y)
      expect(statusBox!.y).toBeLessThan(linkBox!.y)
      expect(linkBox!.y + linkBox!.height).toBeLessThan(photoBox!.y)
      expect(linkBox!.y + linkBox!.height).toBeLessThanOrEqual(1180)
      expect(marqueeBox!.y + marqueeBox!.height).toBeLessThanOrEqual(1180 + 8)
      expect(marqueeBox!.y).toBeGreaterThanOrEqual(photoBox!.y + photoBox!.height * HANDS_LINE - 2)

      await page.screenshot({
        path: `${SCREENSHOT_DIR}/hero-820x1180-${testInfo.project.name}.png`,
        fullPage: false,
      })
    })
  })

  test.describe('Tablet Landscape (1024x768)', () => {
    test.use({ viewport: { width: 1024, height: 768 } })

    test('marquee clears hands and keeps 32px below status', async ({ page }, testInfo) => {
      skipNoJs(testInfo)
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const statusBox = await page.locator('.hero__status').boundingBox()
      const photoBox = await page.locator('.hero__portrait').boundingBox()
      const marqueeBox = await page.locator('.hero__marquee').boundingBox()

      expect(statusBox).not.toBeNull()
      expect(photoBox).not.toBeNull()
      expect(marqueeBox).not.toBeNull()
      expect(marqueeBox!.y - (statusBox!.y + statusBox!.height)).toBeGreaterThanOrEqual(32)
      expect(marqueeBox!.y).toBeGreaterThanOrEqual(photoBox!.y + photoBox!.height * HANDS_LINE - 2)

      const headerCta = page.locator('.header__cta')
      await expect(headerCta).not.toBeVisible()

      await page.screenshot({
        path: `${SCREENSHOT_DIR}/hero-1024x768-${testInfo.project.name}.png`,
        fullPage: false,
      })
    })
  })

  test.describe('Small Desktop (1280x800)', () => {
    test.use({ viewport: { width: 1280, height: 800 } })

    test('desktop layout with marquee below hands', async ({ page }, testInfo) => {
      skipNoJs(testInfo)
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const statusBox = await page.locator('.hero__status').boundingBox()
      const photoBox = await page.locator('.hero__portrait').boundingBox()
      const marqueeBox = await page.locator('.hero__marquee').boundingBox()
      const contactLink = page.locator('.hero__contact-link')

      expect(marqueeBox!.y - (statusBox!.y + statusBox!.height)).toBeGreaterThanOrEqual(32)
      expect(marqueeBox!.y).toBeGreaterThanOrEqual(photoBox!.y + photoBox!.height * HANDS_LINE - 2)
      await expect(contactLink).not.toBeVisible()

      await page.screenshot({
        path: `${SCREENSHOT_DIR}/hero-1280x800-${testInfo.project.name}.png`,
        fullPage: false,
      })
    })
  })

  test.describe('Desktop (1440x900)', () => {
    test.use({ viewport: { width: 1440, height: 900 } })

    test('desktop layout with marquee below hands', async ({ page }, testInfo) => {
      skipNoJs(testInfo)
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const statusBox = await page.locator('.hero__status').boundingBox()
      const photoBox = await page.locator('.hero__portrait').boundingBox()
      const marqueeBox = await page.locator('.hero__marquee').boundingBox()

      expect(marqueeBox!.y - (statusBox!.y + statusBox!.height)).toBeGreaterThanOrEqual(32)
      expect(marqueeBox!.y).toBeGreaterThanOrEqual(photoBox!.y + photoBox!.height * HANDS_LINE - 2)

      await page.screenshot({
        path: `${SCREENSHOT_DIR}/hero-1440x900-${testInfo.project.name}.png`,
        fullPage: false,
      })
    })
  })
})
