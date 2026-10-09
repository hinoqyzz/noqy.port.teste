import { test, expect } from '@playwright/test'

const VIEWPORTS = [
  { width: 1025, height: 768 },
  { width: 1280, height: 800 },
  { width: 1536, height: 864 },
  { width: 1920, height: 1080 },
]

test.describe('Float menu does not cover Contact at the page end', () => {
  test.beforeEach(({}, testInfo) => {
    if (testInfo.project.name.includes('no-js')) {
      test.skip()
    }
  })

  for (const vp of VIEWPORTS) {
    test(`${vp.width}x${vp.height}: float misses contact copy, button and pills`, async ({
      page,
    }) => {
      await page.setViewportSize(vp)
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      await page.waitForSelector('html.motion-ready', { timeout: 5000 }).catch(() => {})
      await page.waitForTimeout(400)

      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
      await page.waitForTimeout(300)

      const overlap = await page.evaluate(() => {
        const float = document.querySelector('.menu-float') as HTMLElement | null
        const floatBox = float?.getBoundingClientRect()
        const floatVisible = Boolean(
          float &&
            float.classList.contains('is-visible') &&
            getComputedStyle(float).visibility !== 'hidden' &&
            getComputedStyle(float).opacity !== '0',
        )

        const targets = [
          document.querySelector('.cta__note'),
          document.querySelector('.btn-round-cta'),
          document.querySelector('.sheet__list'),
        ].filter((node): node is HTMLElement => Boolean(node))

        const intersects = (a: DOMRect, b: DOMRect) =>
          a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top

        const hits = targets.flatMap((el) => {
          const box = el.getBoundingClientRect()
          const points = [
            [box.left + 8, box.top + 8],
            [box.right - 8, box.top + 8],
            [box.left + box.width / 2, box.top + box.height / 2],
            [box.right - 8, box.bottom - 8],
          ]
          return points.map(([x, y]) => {
            const node = document.elementFromPoint(x, y)
            return Boolean(node && (node as HTMLElement).closest('.menu-float'))
          })
        })

        const rectHits =
          floatVisible && floatBox
            ? targets.some((el) => intersects(floatBox, el.getBoundingClientRect()))
            : false

        return { floatVisible, rectHits, pointHits: hits.some(Boolean) }
      })

      expect(overlap.rectHits, `rect overlap at ${vp.width}x${vp.height}`).toBe(false)
      expect(overlap.pointHits, `elementFromPoint hit float at ${vp.width}x${vp.height}`).toBe(
        false,
      )
    })
  }
})
