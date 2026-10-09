import { test, expect } from '@playwright/test'

function isNoJs(testInfo: { project: { name: string } }) {
  return testInfo.project.name.includes('no-js')
}

async function load(page: import('@playwright/test').Page, testInfo: { project: { name: string } }, path = '/') {
  await page.goto(path)
  await page.waitForLoadState('domcontentloaded')
  if (!isNoJs(testInfo)) {
    await page.waitForLoadState('networkidle')
    await page.waitForSelector('html.motion-ready', { timeout: 5000 }).catch(() => {})
    await page.waitForTimeout(300)
  }
}

test.describe('Começar um projeto goes to #contato', () => {
  test('header CTA href is /#contato on home and case pages', async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await load(page, testInfo)
    await expect(page.locator('.header__cta')).toHaveAttribute('href', '/#contato')

    await load(page, testInfo, '/trabalhos/caldo-cafe')
    await expect(page.locator('.header__cta')).toHaveAttribute('href', '/#contato')
  })

  test('hero link stays #contato', async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await load(page, testInfo)
    await expect(page.locator('.hero__contact-link')).toHaveAttribute('href', '#contato')
  })

  test('header CTA on home scrolls to Contato', async ({ page }, testInfo) => {
    if (isNoJs(testInfo)) {
      test.skip()
    }
    await page.setViewportSize({ width: 1280, height: 800 })
    await load(page, testInfo)
    await page.locator('.header__cta').click()
    await expect(page.locator('#contato')).toBeInViewport()
  })

  test('overlay CTA closes the menu and scrolls to Contato', async ({ page }, testInfo) => {
    if (isNoJs(testInfo)) {
      test.skip()
    }
    await page.setViewportSize({ width: 768, height: 1024 })
    await load(page, testInfo)
    await page.locator('.header__menu').click()
    await expect(page.locator('.overlay')).toBeVisible()
    await expect(page.locator('.overlay__cta')).toHaveAttribute('href', '/#contato')
    await page.locator('.overlay__cta').click()
    await expect(page.locator('.overlay')).toHaveCount(0)
    await expect(page.locator('#contato')).toBeInViewport()
  })

  test('header CTA on a case page goes to /#contato', async ({ page }, testInfo) => {
    if (isNoJs(testInfo)) {
      test.skip()
    }
    await page.setViewportSize({ width: 1280, height: 800 })
    await load(page, testInfo, '/trabalhos/caldo-cafe')
    await page.locator('.header__cta').click()
    await expect(page).toHaveURL(/\/#contato/)
    await expect(page.locator('#contato')).toBeInViewport()
  })
})
