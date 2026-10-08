import { test, expect } from '@playwright/test'

const SCREENSHOT_DIR = '/opt/cursor/artifacts/screenshots'

test.describe('Progressive Enhancement Verification', () => {
  test('noscript styles are present in HTML', async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name.includes('mobile'),
      'Only run on desktop project',
    )

    const response = await page.goto('/')
    const html = await response?.text()

    expect(html).toContain('<noscript>')
    expect(html).toContain('.hero__photo')
    expect(html).toContain('clip-path')

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/noscript-check-${testInfo.project.name}.png`,
      fullPage: false,
    })
  })

  test('inline boot script sets classes correctly', async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name.includes('mobile'),
      'Only run on desktop project',
    )

    const response = await page.goto('/')
    const html = await response?.text()

    expect(html).toContain("classList.add('is-booting')")
    expect(html).toContain("classList.add('motion-ready')")
    expect(html).toContain("classList.add('reduced-motion')")
    expect(html).toContain("classList.add('js')")
  })

  test('safety timeout is configured', async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name.includes('mobile'),
      'Only run on desktop project',
    )

    const response = await page.goto('/')
    const html = await response?.text()

    expect(html).toContain('SAFETY_TIMEOUT')
    expect(html).toContain('setTimeout')
  })

  test('CSS fallbacks ensure visibility without motion-ready', async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name.includes('mobile'),
      'Only run on desktop project',
    )

    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')

    const cssRules = await page.evaluate(() => {
      const sheets = Array.from(document.styleSheets)
      let rules: string[] = []
      sheets.forEach((sheet) => {
        try {
          const cssRules = Array.from(sheet.cssRules || [])
          cssRules.forEach((rule) => {
            if (rule.cssText.includes(':not(.motion-ready)')) {
              rules.push(rule.cssText)
            }
          })
        } catch (e) {
          // Ignore cross-origin stylesheets
        }
      })
      return rules
    })

    expect(cssRules.length).toBeGreaterThan(0)
  })

  test('hero portrait has correct fallback clip-path in CSS', async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name.includes('mobile'),
      'Only run on desktop project',
    )

    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(4000)

    const heroPortrait = page.locator('.hero__portrait')
    await expect(heroPortrait).toBeAttached()

    const clipPath = await heroPortrait.evaluate((el) => {
      return window.getComputedStyle(el).clipPath
    })

    expect(clipPath === 'none' || clipPath.includes('inset(0')).toBe(true)

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/hero-clippath-${testInfo.project.name}.png`,
      fullPage: false,
    })
  })
})
