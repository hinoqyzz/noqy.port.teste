import { test, expect } from '@playwright/test'

const SCREENSHOT_DIR = '/opt/cursor/artifacts/screenshots'

test.describe('No-JS Static Content Verification', () => {
  test('home page has visible content without JavaScript', async ({
    page,
  }, testInfo) => {
    if (!testInfo.project.name.includes('no-js')) {
      test.skip()
      return
    }

    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')

    const heroValue = page.locator('.hero__value')
    await expect(heroValue).toBeVisible()

    const heroStatus = page.locator('.hero__status')
    await expect(heroStatus).toBeVisible()

    const heroPortrait = page.locator('.hero__portrait img')
    await expect(heroPortrait).toBeVisible()

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/no-js-hero-${testInfo.project.name}.png`,
      fullPage: false,
    })
  })

  test('services section is visible without JavaScript', async ({
    page,
  }, testInfo) => {
    if (!testInfo.project.name.includes('no-js')) {
      test.skip()
      return
    }

    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')

    const services = page.locator('#servicos')
    await expect(services).toBeVisible()

    const serviceItems = page.locator('.service')
    await expect(serviceItems).toHaveCount(4)

    for (let i = 0; i < 4; i++) {
      const service = serviceItems.nth(i)
      await expect(service).toBeVisible()
    }
  })

  test('work index is visible without JavaScript', async ({ page }, testInfo) => {
    if (!testInfo.project.name.includes('no-js')) {
      test.skip()
      return
    }

    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')

    const workIndex = page.locator('#trabalhos')
    await expect(workIndex).toBeVisible()

    const projectRows = page.locator('.work-index__row')
    await expect(projectRows).toHaveCount(4)
  })

  test('process section is visible without JavaScript', async ({
    page,
  }, testInfo) => {
    if (!testInfo.project.name.includes('no-js')) {
      test.skip()
      return
    }

    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')

    const process = page.locator('#processo')
    await expect(process).toBeVisible()

    const steps = page.locator('.process__step')
    await expect(steps).toHaveCount(5)
  })

  test('contact section is visible without JavaScript', async ({
    page,
  }, testInfo) => {
    if (!testInfo.project.name.includes('no-js')) {
      test.skip()
      return
    }

    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')

    const contact = page.locator('#contato')
    await expect(contact).toBeVisible()

    const ctaTitle = page.locator('.cta__title')
    await expect(ctaTitle).toBeVisible()
  })

  test('footer is visible without JavaScript', async ({ page }, testInfo) => {
    if (!testInfo.project.name.includes('no-js')) {
      test.skip()
      return
    }

    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')

    const footer = page.locator('.footer')
    await expect(footer).toBeVisible()
  })

  test('case study page has visible content without JavaScript', async ({
    page,
  }, testInfo) => {
    if (!testInfo.project.name.includes('no-js')) {
      test.skip()
      return
    }

    await page.goto('/trabalhos/caldo-cafe/')
    await page.waitForLoadState('domcontentloaded')

    const title = page.locator('.case-study__title')
    await expect(title).toBeVisible()
    await expect(title).toContainText('Caldo Café')

    const cover = page.locator('.case-study__cover img')
    await expect(cover).toBeVisible()

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/no-js-case-study-${testInfo.project.name}.png`,
      fullPage: false,
    })
  })

  test('all case study routes have static HTML', async ({ page }, testInfo) => {
    if (!testInfo.project.name.includes('no-js')) {
      test.skip()
      return
    }

    const cases = [
      { slug: 'caldo-cafe', name: 'Caldo Café' },
      { slug: 'serra-bikes', name: 'Serra Bikes' },
      { slug: 'atlas-arquitetura', name: 'Atlas Arquitetura' },
      { slug: 'pulso', name: 'Pulso' },
    ]

    for (const c of cases) {
      await page.goto(`/trabalhos/${c.slug}/`)
      await page.waitForLoadState('domcontentloaded')

      const title = page.locator('.case-study__title')
      await expect(title).toContainText(c.name)
    }
  })

  test('no blank page without JavaScript', async ({ page }, testInfo) => {
    if (!testInfo.project.name.includes('no-js')) {
      test.skip()
      return
    }

    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')

    const root = page.locator('#root')
    const innerHTML = await root.innerHTML()

    expect(innerHTML.length).toBeGreaterThan(1000)

    const visibleText = await page.evaluate(() => {
      return document.body.innerText.trim()
    })

    expect(visibleText.length).toBeGreaterThan(100)
    expect(visibleText).toContain('noqyzz')
  })

  test('hero portrait is visible (not hidden by clip-path)', async ({
    page,
  }, testInfo) => {
    if (!testInfo.project.name.includes('no-js')) {
      test.skip()
      return
    }

    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')

    const heroPortrait = page.locator('.hero__portrait')
    await expect(heroPortrait).toBeVisible()

    const clipPath = await heroPortrait.evaluate((el) => {
      return window.getComputedStyle(el).clipPath
    })

    expect(clipPath === 'none' || clipPath.includes('inset(0')).toBe(true)
  })

  test('header is visible without JavaScript', async ({ page }, testInfo) => {
    if (!testInfo.project.name.includes('no-js')) {
      test.skip()
      return
    }

    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')

    const header = page.locator('.header')
    await expect(header).toBeVisible()

    const opacity = await header.evaluate((el) => {
      return window.getComputedStyle(el).opacity
    })
    expect(opacity).toBe('1')
  })

  test('full page screenshot without JavaScript', async ({ page }, testInfo) => {
    if (!testInfo.project.name.includes('no-js')) {
      test.skip()
      return
    }

    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/no-js-fullpage-${testInfo.project.name}.png`,
      fullPage: true,
    })
  })
})
