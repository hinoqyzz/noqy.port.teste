import { test, expect } from '@playwright/test'

test.describe('Menu focus restore', () => {
  test.beforeEach(({}, testInfo) => {
    if (testInfo.project.name.includes('no-js')) {
      test.skip()
    }
  })

  for (const vp of [
    { width: 375, height: 812 },
    { width: 768, height: 1024 },
    { width: 1024, height: 768 },
  ]) {
    test.describe(`${vp.width}px`, () => {
      test.use({ viewport: vp })

      test('Escape at top returns focus to the header Menu button', async ({ page }) => {
        await page.goto('/')
        await page.waitForLoadState('networkidle')
        await page.waitForSelector('html.motion-ready', { timeout: 5000 }).catch(() => {})

        const headerMenu = page.locator('.header__menu')
        await headerMenu.click()
        await expect(page.locator('.overlay')).toBeVisible()

        await page.keyboard.press('Escape')
        await expect(page.locator('.overlay')).toHaveCount(0)
        await expect(headerMenu).toBeFocused()
      })

      test('Fechar at top returns focus to the header Menu button', async ({ page }) => {
        await page.goto('/')
        await page.waitForLoadState('networkidle')
        await page.waitForSelector('html.motion-ready', { timeout: 5000 }).catch(() => {})

        const headerMenu = page.locator('.header__menu')
        await headerMenu.click()
        await expect(page.locator('.overlay')).toBeVisible()

        await page.locator('.menu-float').click()
        await expect(page.locator('.overlay')).toHaveCount(0)
        await expect(headerMenu).toBeFocused()
      })

      test('Escape after scroll returns focus to the float button', async ({ page }) => {
        await page.goto('/')
        await page.waitForLoadState('networkidle')
        await page.waitForSelector('html.motion-ready', { timeout: 5000 }).catch(() => {})

        await page.evaluate(() => window.scrollTo(0, window.innerHeight + 240))
        await page.waitForTimeout(1100)

        const floatBtn = page.locator('.menu-float')
        await expect(floatBtn).toBeVisible()
        await floatBtn.click()
        await expect(page.locator('.overlay')).toBeVisible()

        await page.keyboard.press('Escape')
        await expect(page.locator('.overlay')).toHaveCount(0)
        await expect(floatBtn).toBeFocused()
      })

      test('header control focus moves to the float, then back', async ({ page }) => {
        await page.goto('/')
        await page.waitForLoadState('networkidle')
        await page.waitForSelector('html.motion-ready', { timeout: 5000 }).catch(() => {})
        await page.locator('.veil.is-active').waitFor({ state: 'hidden', timeout: 8000 }).catch(() => {})

        const headerMenu = page.locator('.header__menu')
        const headerCta = page.locator('.header__cta')
        const floatBtn = page.locator('.menu-float')
        const useCta = await headerCta.evaluate((el) => {
          const style = getComputedStyle(el)
          return style.display !== 'none' && el.getClientRects().length > 0
        })
        const opener = useCta ? headerCta : headerMenu
        await opener.focus()
        await expect(opener).toBeFocused()

        await page.evaluate(() => window.scrollTo(0, window.innerHeight + 240))
        await page.waitForTimeout(1200)
        await expect(floatBtn).toBeFocused()

        await page.evaluate(() => window.scrollTo(0, 0))
        await page.waitForTimeout(400)
        await expect(opener).toBeFocused()
      })

      test('Fechar after scroll returns focus to the float button', async ({ page }) => {
        await page.goto('/')
        await page.waitForLoadState('networkidle')
        await page.waitForSelector('html.motion-ready', { timeout: 5000 }).catch(() => {})

        await page.evaluate(() => window.scrollTo(0, window.innerHeight + 240))
        await page.waitForTimeout(1100)

        const floatBtn = page.locator('.menu-float')
        await floatBtn.click()
        await expect(page.locator('.overlay')).toBeVisible()
        await floatBtn.click()
        await expect(page.locator('.overlay')).toHaveCount(0)
        await expect(floatBtn).toBeFocused()
      })
    })
  }

  test('header CTA focus moves to the float, then back at 1440', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.waitForSelector('html.motion-ready', { timeout: 5000 }).catch(() => {})
    await page.locator('.veil.is-active').waitFor({ state: 'hidden', timeout: 8000 }).catch(() => {})

    const headerCta = page.locator('.header__cta')
    const floatBtn = page.locator('.menu-float')
    await expect(headerCta).toBeVisible()
    await headerCta.focus()
    await expect(headerCta).toBeFocused()

    await page.evaluate(() => window.scrollTo(0, window.innerHeight + 240))
    await page.waitForTimeout(1200)
    await expect(floatBtn).toBeFocused()

    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(400)
    await expect(headerCta).toBeFocused()
  })
})
