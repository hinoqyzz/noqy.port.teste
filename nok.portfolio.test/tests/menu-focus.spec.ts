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
})
