import { test, expect } from '@playwright/test'

const SCREENSHOT_DIR = '/opt/cursor/artifacts/screenshots'

const VIEWPORTS = [
  { width: 1025, height: 768 },
  { width: 1280, height: 800 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
]

const SCROLLS = [0, 240, 800, 1600]

test.describe('Header CTA is not covered by the float menu', () => {
  test.beforeEach(({}, testInfo) => {
    if (testInfo.project.name.includes('no-js')) {
      test.skip()
    }
  })

  for (const vp of VIEWPORTS) {
    test(`${vp.width}: CTA corners stay on the CTA after scroll`, async ({ page }, testInfo) => {
      await page.setViewportSize(vp)
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      await page.waitForSelector('html.motion-ready', { timeout: 5000 }).catch(() => {})
      await page.locator('.veil.is-active').waitFor({ state: 'hidden', timeout: 8000 }).catch(() => {})
      await page.waitForTimeout(200)

      const cta = page.locator('.header__cta')
      await expect(cta).toBeVisible()

      for (const y of SCROLLS) {
        await page.evaluate((top) => window.scrollTo(0, top), y)
        await page.waitForTimeout(200)

        const hits = await cta.evaluate((el) => {
          const box = el.getBoundingClientRect()
          const inset = 12
          const points = [
            [box.left + inset, box.top + inset],
            [box.right - inset, box.top + inset],
            [box.left + box.width / 2, box.top + box.height / 2],
            [box.left + inset, box.bottom - inset],
            [box.right - inset, box.bottom - inset],
          ]
          return points.map(([x, y]) => {
            const node = document.elementFromPoint(x, y)
            return {
              x,
              y,
              tag: node?.nodeName,
              className: (node as HTMLElement | null)?.className ?? '',
              inCta: Boolean(node && el.contains(node)),
              inFloat: Boolean(node && (node as HTMLElement).closest('.menu-float')),
            }
          })
        })

        for (const hit of hits) {
          expect(hit.inFloat, `scroll ${y} point ${hit.x},${hit.y} hit float`).toBe(false)
          expect(hit.inCta, `scroll ${y} point ${hit.x},${hit.y} ${hit.className}`).toBe(true)
        }
      }

      if (
        (vp.width === 1280 || vp.width === 1440) &&
        testInfo.project.name === 'desktop-no-preference'
      ) {
        await page.evaluate(() => window.scrollTo(0, 800))
        await page.waitForTimeout(200)
        await page.screenshot({
          path: `${SCREENSHOT_DIR}/header-scrolled-${vp.width}.png`,
          fullPage: false,
        })
      }
    })
  }
})
