import { test, expect } from '@playwright/test'

const SCREENSHOT_DIR = '/opt/cursor/artifacts/screenshots'

const VIEWPORTS = [
  { width: 1025, height: 768 },
  { width: 1280, height: 800 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
]

const SCROLLS = [0, 200, 400, 800, 1200, 1600, 2400, 3200]

async function chromeState(page: import('@playwright/test').Page) {
  return page.evaluate(() => {
    const header = document.querySelector('.header') as HTMLElement | null
    const float = document.querySelector('.menu-float') as HTMLElement | null
    const cta = document.querySelector('.header__cta') as HTMLElement | null
    const headerStyle = header ? getComputedStyle(header) : null
    const floatStyle = float ? getComputedStyle(float) : null
    const headerVisible = Boolean(
      header &&
        !header.classList.contains('is-away') &&
        headerStyle?.visibility !== 'hidden' &&
        headerStyle?.pointerEvents !== 'none',
    )
    const floatVisible = Boolean(
      float &&
        float.classList.contains('is-visible') &&
        floatStyle?.visibility !== 'hidden' &&
        Number(floatStyle?.opacity) > 0.1,
    )
    const ctaBox = cta?.getBoundingClientRect()
    const floatBox = float?.getBoundingClientRect()
    const ctaVisible = Boolean(
      headerVisible && cta && ctaBox && ctaBox.width > 0 && getComputedStyle(cta).display !== 'none',
    )
    const coversCta = Boolean(
      floatVisible &&
        ctaVisible &&
        ctaBox &&
        floatBox &&
        floatBox.left < ctaBox.right &&
        floatBox.right > ctaBox.left &&
        floatBox.top < ctaBox.bottom &&
        floatBox.bottom > ctaBox.top,
    )
    return { headerVisible, floatVisible, ctaVisible, coversCta, headerAway: header?.inert ?? header?.hasAttribute('inert') }
  })
}

test.describe('One menu at a time', () => {
  test.beforeEach(({}, testInfo) => {
    if (
      testInfo.project.name !== 'desktop-no-preference' &&
      testInfo.project.name !== 'desktop-reduced-motion'
    ) {
      test.skip()
    }
  })

  for (const vp of VIEWPORTS) {
    test(`${vp.width}: header and float never share the screen`, async ({ page }, testInfo) => {
      await page.setViewportSize(vp)
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      await page.waitForSelector('html.motion-ready', { timeout: 5000 }).catch(() => {})
      await page.locator('.veil.is-active').waitFor({ state: 'hidden', timeout: 8000 }).catch(() => {})
      await page.waitForTimeout(200)

      const maxScroll = await page.evaluate(() =>
        Math.max(0, document.documentElement.scrollHeight - window.innerHeight),
      )
      const scrolls = [...new Set([...SCROLLS.filter((y) => y < maxScroll), maxScroll])]

      for (const y of scrolls) {
        await page.evaluate((top) => window.scrollTo(0, top), y)
        await page.waitForTimeout(1100)
        const state = await chromeState(page)
        expect(state.headerVisible && state.floatVisible, `both visible at ${vp.width} scroll ${y}`).toBe(
          false,
        )
        expect(state.coversCta, `float covers CTA at ${vp.width} scroll ${y}`).toBe(false)
        if (state.ctaVisible) {
          expect(state.floatVisible).toBe(false)
        }
        if (state.headerVisible) {
          expect(state.headerAway).toBeFalsy()
        }
        if (state.floatVisible) {
          expect(state.headerVisible).toBe(false)
          expect(state.headerAway).toBeTruthy()
        }
      }

      if (vp.width === 1440 && testInfo.project.name === 'desktop-no-preference') {
        for (const [y, name] of [
          [0, 'top'],
          [1200, 'mid'],
          [2400, 'deep'],
        ] as const) {
          await page.evaluate((top) => window.scrollTo(0, top), y)
          await page.waitForTimeout(1100)
          await page.screenshot({
            path: `${SCREENSHOT_DIR}/header-float-1440-${name}.png`,
            fullPage: false,
          })
        }
      }
    })
  }
})
