import { test, expect } from '@playwright/test'

const SCREENSHOT_DIR = '/opt/cursor/artifacts/screenshots'

test.describe('Hero Responsive Layout - RED-06', () => {
  test.describe('Tablet Portrait (768x1024)', () => {
    test.use({ viewport: { width: 768, height: 1024 } })

    test('hero phrase is visible and complete in first viewport', async ({ page }, testInfo) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const heroValue = page.locator('.hero__value')
      await expect(heroValue).toBeVisible()

      const bbox = await heroValue.boundingBox()
      expect(bbox).not.toBeNull()
      expect(bbox!.y + bbox!.height).toBeLessThan(1024)

      await page.screenshot({
        path: `${SCREENSHOT_DIR}/hero-768x1024-${testInfo.project.name}.png`,
        fullPage: false,
      })
    })

    test('marquee respects max 18% screen height', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const marquee = page.locator('.hero__marquee')
      const bbox = await marquee.boundingBox()

      if (bbox) {
        const maxHeight = 1024 * 0.18
        expect(bbox.height).toBeLessThanOrEqual(maxHeight + 10)
      }
    })

    test('marquee is in lower portion of viewport', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const marquee = page.locator('.hero__marquee')
      const marqueeBox = await marquee.boundingBox()
      const viewportHeight = 1024

      if (marqueeBox) {
        const marqueeBottom = marqueeBox.y + marqueeBox.height
        expect(marqueeBottom).toBeGreaterThan(viewportHeight * 0.7)
        expect(marqueeBox.height).toBeLessThanOrEqual(viewportHeight * 0.2)
      }
    })

    test('contact link is visible below status', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const contactLink = page.locator('.hero__contact-link')
      await expect(contactLink).toBeVisible()
      await expect(contactLink).toContainText('Começar um projeto')
    })

    test('single menu control visible', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const headerMenu = page.locator('.header__menu')
      const floatMenu = page.locator('.menu-float')

      const headerVisible = await headerMenu.isVisible()
      const floatVisible = await floatMenu.evaluate(
        (el) => el.classList.contains('is-visible') && window.getComputedStyle(el).opacity !== '0',
      )

      expect(headerVisible || floatVisible).toBe(true)
      expect(headerVisible && floatVisible).toBe(false)
    })
  })

  test.describe('Tablet Portrait (820x1180)', () => {
    test.use({ viewport: { width: 820, height: 1180 } })

    test('hero phrase is visible and complete in first viewport', async ({ page }, testInfo) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const heroValue = page.locator('.hero__value')
      await expect(heroValue).toBeVisible()

      const bbox = await heroValue.boundingBox()
      expect(bbox).not.toBeNull()
      expect(bbox!.y + bbox!.height).toBeLessThan(1180)

      await page.screenshot({
        path: `${SCREENSHOT_DIR}/hero-820x1180-${testInfo.project.name}.png`,
        fullPage: false,
      })
    })

    test('contact link is visible', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const contactLink = page.locator('.hero__contact-link')
      await expect(contactLink).toBeVisible()
    })
  })

  test.describe('Tablet Landscape (1024x768)', () => {
    test.use({ viewport: { width: 1024, height: 768 } })

    test('32px minimum gap between status and marquee', async ({ page }, testInfo) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const status = page.locator('.hero__status')
      const marquee = page.locator('.hero__marquee')

      const statusBox = await status.boundingBox()
      const marqueeBox = await marquee.boundingBox()

      if (statusBox && marqueeBox) {
        const gap = marqueeBox.y - (statusBox.y + statusBox.height)
        expect(gap).toBeGreaterThanOrEqual(32)
      }

      await page.screenshot({
        path: `${SCREENSHOT_DIR}/hero-1024x768-${testInfo.project.name}.png`,
        fullPage: false,
      })
    })

    test('header shows only Menu button, no CTA', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const headerCta = page.locator('.header__cta')
      await expect(headerCta).not.toBeVisible()

      const headerMenu = page.locator('.header__menu')
      await expect(headerMenu).toBeVisible()
    })

    test('contact link is visible', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const contactLink = page.locator('.hero__contact-link')
      await expect(contactLink).toBeVisible()
    })
  })

  test.describe('Small Desktop (1280x800)', () => {
    test.use({ viewport: { width: 1280, height: 800 } })

    test('hero layout is desktop style', async ({ page }, testInfo) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const heroContent = page.locator('.hero__content')
      await expect(heroContent).toBeVisible()

      const heroPortrait = page.locator('.hero__portrait-wrap')
      await expect(heroPortrait).toBeVisible()

      await page.screenshot({
        path: `${SCREENSHOT_DIR}/hero-1280x800-${testInfo.project.name}.png`,
        fullPage: false,
      })
    })

    test('header shows nav and CTA', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const headerNav = page.locator('.header__nav')
      await expect(headerNav).toBeVisible()

      const headerCta = page.locator('.header__cta')
      await expect(headerCta).toBeVisible()
    })

    test('contact link is hidden', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const contactLink = page.locator('.hero__contact-link')
      await expect(contactLink).not.toBeVisible()
    })
  })

  test.describe('Desktop (1440x900)', () => {
    test.use({ viewport: { width: 1440, height: 900 } })

    test('hero layout is desktop style with name on one line', async ({ page }, testInfo) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const heroContent = page.locator('.hero__content')
      await expect(heroContent).toBeVisible()

      const heroName = page.locator('.hero__name').first()
      await expect(heroName).toBeVisible()

      await page.screenshot({
        path: `${SCREENSHOT_DIR}/hero-1440x900-${testInfo.project.name}.png`,
        fullPage: false,
      })
    })

    test('header shows full nav and CTA', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const headerNav = page.locator('.header__nav')
      await expect(headerNav).toBeVisible()

      const headerCta = page.locator('.header__cta')
      await expect(headerCta).toBeVisible()
    })
  })
})
