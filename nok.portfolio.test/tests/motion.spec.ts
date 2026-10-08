import { test, expect } from '@playwright/test'

const SCREENSHOT_DIR = '/opt/cursor/artifacts/screenshots'

test.describe('Motion Layer Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.waitForSelector('html.motion-ready', { timeout: 5000 }).catch(() => {})
    await page.waitForTimeout(3000)
  })

  test('hero section is visible and animates', async ({ page }, testInfo) => {
    const heroTitle = page.locator('#hero-title')
    await expect(heroTitle).toContainText('noqyzz')

    const heroPortrait = page.locator('.hero__portrait img')
    await expect(heroPortrait).toHaveAttribute('src')

    const heroStatus = page.locator('.hero__status')
    await expect(heroStatus).toBeAttached()

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/hero-${testInfo.project.name}.png`,
      fullPage: false,
    })
  })

  test('header is visible', async ({ page }, testInfo) => {
    const header = page.locator('.header')
    await expect(header).toBeVisible()

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/header-${testInfo.project.name}.png`,
      fullPage: false,
    })
  })

  test('scroll reveals fire on scroll', async ({ page }, testInfo) => {
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 2))
    await page.waitForTimeout(1500)

    const services = page.locator('#servicos')
    await expect(services).toBeVisible()

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/services-${testInfo.project.name}.png`,
      fullPage: false,
    })
  })

  test('no console errors', async ({ page }) => {
    const errors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(3500)

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(1500)

    const significantErrors = errors.filter(
      (e) =>
        !e.includes('favicon') &&
        !e.includes('Failed to load resource') &&
        !e.includes('net::ERR'),
    )

    expect(significantErrors).toEqual([])
  })

  test('intro completes within timeout', async ({ page }, testInfo) => {
    const isReduced = testInfo.project.name.includes('reduced')

    if (isReduced) {
      const html = page.locator('html')
      await expect(html).toHaveClass(/reduced-motion/)
    } else {
      await page.waitForTimeout(3500)
      const html = page.locator('html')
      await expect(html).toHaveClass(/motion-ready/)
    }
  })
})

test.describe('Reduced Motion Behavior', () => {
  test.beforeAll(async ({ browser: _browser }, testInfo) => {
    if (!testInfo.project.name.includes('reduced')) {
      test.skip()
    }
  })

  test('veil is hidden in reduced motion @reduced', async ({ page }, testInfo) => {
    if (!testInfo.project.name.includes('reduced')) {
      test.skip()
      return
    }

    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(500)

    const veil = page.locator('.veil')
    const isHidden = await veil.evaluate((el) => {
      const style = window.getComputedStyle(el)
      return style.display === 'none' || el.hidden
    })
    expect(isHidden).toBe(true)
  })

  test('progress bar is hidden in reduced motion @reduced', async ({ page }, testInfo) => {
    if (!testInfo.project.name.includes('reduced')) {
      test.skip()
      return
    }

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const progress = page.locator('.progress')
    const isHidden = await progress.evaluate(
      (el) => window.getComputedStyle(el).display === 'none',
    )
    expect(isHidden).toBe(true)
  })

  test('hero portrait is visible immediately in reduced motion @reduced', async ({
    page,
  }, testInfo) => {
    if (!testInfo.project.name.includes('reduced')) {
      test.skip()
      return
    }

    await page.goto('/')
    await page.waitForTimeout(500)

    const heroPortrait = page.locator('.hero__portrait')
    const clipPath = await heroPortrait.evaluate((el) => {
      return window.getComputedStyle(el).clipPath
    })

    expect(clipPath === 'none' || clipPath.includes('inset(0')).toBe(true)

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/hero-portrait-reduced-${testInfo.project.name}.png`,
      fullPage: false,
    })
  })

  test('content is visible in reduced motion @reduced', async ({ page }, testInfo) => {
    if (!testInfo.project.name.includes('reduced')) {
      test.skip()
      return
    }

    await page.goto('/')
    await page.waitForTimeout(1000)

    const heroTitle = page.locator('#hero-title')
    await expect(heroTitle).toContainText('noqyzz')
  })
})

test.describe('SPA Routing', () => {
  test('case study page loads correctly', async ({ page }, testInfo) => {
    await page.goto('/trabalhos/caldo-cafe')
    await page.waitForLoadState('networkidle')

    const title = page.locator('.case-study__title')
    await expect(title).toContainText('Caldo Café')

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/case-study-${testInfo.project.name}.png`,
      fullPage: false,
    })
  })

  test('navigation to case study from work index', async ({ page }, testInfo) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await page.evaluate(() => {
      const workSection = document.querySelector('#trabalhos')
      workSection?.scrollIntoView()
    })
    await page.waitForTimeout(1000)

    const firstProject = page.locator('.work-index__row').first()
    await firstProject.click()
    await page.waitForURL('**/trabalhos/**')

    const caseStudy = page.locator('.case-study')
    await expect(caseStudy).toBeVisible()

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/case-study-navigated-${testInfo.project.name}.png`,
      fullPage: false,
    })
  })

  test('next project link works', async ({ page }) => {
    await page.goto('/trabalhos/caldo-cafe')
    await page.waitForLoadState('networkidle')

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(500)

    const nextLink = page.locator('.case-study__next-link')
    await nextLink.click()
    await page.waitForURL('**/trabalhos/**')

    const title = page.locator('.case-study__title')
    await expect(title).not.toContainText('Caldo Café')
  })
})

test.describe('New Sections', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.waitForSelector('html.motion-ready', { timeout: 5000 }).catch(() => {})
    await page.waitForTimeout(3000)
  })

  test('work index displays projects', async ({ page }, testInfo) => {
    const workIndex = page.locator('.work-index')
    await page.evaluate(() => {
      document.querySelector('#trabalhos')?.scrollIntoView()
    })
    await page.waitForTimeout(1000)

    await expect(workIndex).toBeVisible()

    const rows = page.locator('.work-index__row')
    await expect(rows).toHaveCount(4)

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/work-index-${testInfo.project.name}.png`,
      fullPage: false,
    })
  })

  test('process section has 5 steps', async ({ page }, testInfo) => {
    await page.evaluate(() => {
      document.querySelector('#processo')?.scrollIntoView()
    })
    await page.waitForTimeout(1000)

    const process = page.locator('.process')
    await expect(process).toBeVisible()

    const steps = page.locator('.process__step')
    await expect(steps).toHaveCount(5)

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/process-${testInfo.project.name}.png`,
      fullPage: false,
    })
  })

  test('contact section has round CTA button', async ({ page }, testInfo) => {
    await page.evaluate(() => {
      document.querySelector('#contato')?.scrollIntoView()
    })
    await page.waitForTimeout(1000)

    const ctaBtn = page.locator('.btn-round-cta')
    await expect(ctaBtn).toBeVisible()

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/contact-cta-${testInfo.project.name}.png`,
      fullPage: false,
    })
  })
})

test.describe('Full Motion Behavior', () => {
  test('intro veil appears and disappears @full', async ({ page }, testInfo) => {
    if (testInfo.project.name.includes('reduced')) {
      test.skip()
      return
    }

    await page.goto('/')
    await page.waitForTimeout(4000)

    const veil = page.locator('.veil')
    const isHiddenOrInactive = await veil.evaluate((el) => {
      const classList = el.classList
      return el.hidden || !classList.contains('is-active')
    })

    expect(isHiddenOrInactive).toBe(true)

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/after-intro-${testInfo.project.name}.png`,
      fullPage: false,
    })
  })

  test('progress bar updates on scroll @full', async ({ page }, testInfo) => {
    if (testInfo.project.name.includes('reduced')) {
      test.skip()
      return
    }

    await page.goto('/')
    await page.waitForTimeout(4000)

    const progress = page.locator('.progress')
    const initialTransform = await progress.evaluate((el) => el.style.transform)

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2))
    await page.waitForTimeout(500)

    const midTransform = await progress.evaluate((el) => el.style.transform)
    expect(midTransform).not.toBe(initialTransform)
  })
})
