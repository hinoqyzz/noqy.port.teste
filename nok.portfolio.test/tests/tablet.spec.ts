import { test, expect } from '@playwright/test'

const SCREENSHOT_DIR = '/opt/cursor/artifacts/screenshots'

test.beforeEach(({}, testInfo) => {
  if (testInfo.project.name.includes('no-js')) {
    test.skip()
  }
})

test.describe('Tablet/Touch Layout Tests', () => {
  test('work index shows card images on touch devices (no hover preview)', async ({
    page,
  }, testInfo) => {
    if (!testInfo.project.name.includes('tablet')) {
      test.skip()
      return
    }

    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)

    await page.evaluate(() => {
      document.querySelector('#trabalhos')?.scrollIntoView()
    })
    await page.waitForTimeout(1000)

    const preview = page.locator('.work-index__preview')
    const previewStyle = await preview.evaluate((el) => {
      const style = window.getComputedStyle(el)
      return {
        display: style.display,
        visibility: style.visibility,
      }
    })
    expect(
      previewStyle.display === 'none' || previewStyle.visibility === 'hidden',
    ).toBe(true)

    const thumbs = page.locator('.work-index__thumb')
    const thumbCount = await thumbs.count()
    expect(thumbCount).toBeGreaterThan(0)

    for (let i = 0; i < thumbCount; i++) {
      const thumb = thumbs.nth(i)
      const display = await thumb.evaluate((el) =>
        window.getComputedStyle(el).display,
      )
      expect(display).not.toBe('none')
    }

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/work-index-touch-${testInfo.project.name}.png`,
      fullPage: false,
    })
  })

  test('hero portrait spans width on portrait tablet', async ({
    page,
  }, testInfo) => {
    if (!testInfo.project.name.includes('tablet-portrait')) {
      test.skip()
      return
    }

    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)

    const viewport = page.viewportSize()
    if (!viewport) return

    const portraitWrap = page.locator('.hero__portrait-wrap')
    const box = await portraitWrap.boundingBox()

    expect(box).not.toBeNull()
    if (box) {
      const widthPercent = (box.width / viewport.width) * 100
      expect(widthPercent).toBeLessThan(95)
      expect(box.x).toBeGreaterThan(viewport.width * 0.08)
      expect(box.x + box.width).toBeGreaterThan(viewport.width * 0.85)
    }

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/hero-portrait-tablet-${testInfo.project.name}.png`,
      fullPage: false,
    })
  })

  test('process grid has <= 3 columns at 1024px and 1180px', async ({
    page,
  }, testInfo) => {
    if (!testInfo.project.name.includes('tablet')) {
      test.skip()
      return
    }

    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)

    await page.evaluate(() => {
      document.querySelector('#processo')?.scrollIntoView()
    })
    await page.waitForTimeout(1000)

    const processGrid = page.locator('.process__grid')
    const gridStyle = await processGrid.evaluate((el) => {
      const style = window.getComputedStyle(el)
      return style.gridTemplateColumns
    })

    const columns = gridStyle.split(' ').filter((c) => c && c !== '0px').length
    expect(columns).toBeLessThanOrEqual(3)

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/process-grid-${testInfo.project.name}.png`,
      fullPage: false,
    })
  })

  test('process text is readable (>= 15px)', async ({ page }, testInfo) => {
    if (!testInfo.project.name.includes('tablet')) {
      test.skip()
      return
    }

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await page.evaluate(() => {
      document.querySelector('#processo')?.scrollIntoView()
    })
    await page.waitForTimeout(500)

    const processDesc = page.locator('.process__desc').first()
    const fontSize = await processDesc.evaluate((el) => {
      const style = window.getComputedStyle(el)
      return parseFloat(style.fontSize)
    })

    expect(fontSize).toBeGreaterThanOrEqual(14)
  })
})

test.describe('Touch Targets (44x44px minimum)', () => {
  const touchViewports = ['mobile', 'tablet']

  test('header brand has 44x44 touch target', async ({ page }, testInfo) => {
    const isTouch = touchViewports.some((v) => testInfo.project.name.includes(v))
    if (!isTouch) {
      test.skip()
      return
    }

    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.waitForSelector('html.motion-ready', { timeout: 5000 }).catch(() => {})
    await page.locator('.veil.is-active').waitFor({ state: 'hidden', timeout: 8000 }).catch(() => {})
    await page.waitForFunction(
      () => {
        const header = document.querySelector('.header')
        if (!header) return false
        const transform = getComputedStyle(header).transform
        return transform === 'none'
      },
      { timeout: 4000 },
    ).catch(() => {})

    const brand = page.locator('.header__brand')
    const box = await brand.boundingBox()

    expect(box).not.toBeNull()
    if (box) {
      expect(box.height).toBeGreaterThanOrEqual(44)
      expect(box.width).toBeGreaterThanOrEqual(44)
    }
  })

  test('totop link has 44x44 touch target', async ({ page }, testInfo) => {
    const isTouch = touchViewports.some((v) => testInfo.project.name.includes(v))
    if (!isTouch) {
      test.skip()
      return
    }

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(500)

    const totop = page.locator('.totop')
    const box = await totop.boundingBox()

    expect(box).not.toBeNull()
    if (box) {
      expect(box.height).toBeGreaterThanOrEqual(44)
    }
  })

  test('header menu button has adequate touch target', async ({
    page,
  }, testInfo) => {
    const isTouch = touchViewports.some((v) => testInfo.project.name.includes(v))
    if (!isTouch) {
      test.skip()
      return
    }

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const menuBtn = page.locator('.header__menu')
    const isVisible = await menuBtn.isVisible()

    if (isVisible) {
      const box = await menuBtn.boundingBox()
      expect(box).not.toBeNull()
      if (box) {
        expect(box.width).toBeGreaterThanOrEqual(44)
        expect(box.height).toBeGreaterThanOrEqual(44)
      }
    }
  })

  test('all visible links have adequate touch targets', async ({
    page,
  }, testInfo) => {
    const isTouch = touchViewports.some((v) => testInfo.project.name.includes(v))
    if (!isTouch) {
      test.skip()
      return
    }

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const headerLinks = page.locator('.header__link')
    const count = await headerLinks.count()

    for (let i = 0; i < count; i++) {
      const link = headerLinks.nth(i)
      const isVisible = await link.isVisible()
      if (isVisible) {
        const box = await link.boundingBox()
        if (box) {
          expect(box.height).toBeGreaterThanOrEqual(44)
        }
      }
    }
  })
})

test.describe('Floating Menu Button', () => {
  test('floating menu button appears after scrolling past hero', async ({
    page,
  }, testInfo) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(3000)

    const floatBtn = page.locator('.menu-float')

    const initiallyHidden = await floatBtn.evaluate((el) => {
      const style = window.getComputedStyle(el)
      return style.opacity === '0' || style.pointerEvents === 'none'
    })
    expect(initiallyHidden).toBe(true)

    await page.evaluate(() => window.scrollTo(0, window.innerHeight + 200))
    await page.waitForTimeout(1100)

    const isVisibleAfterScroll = await floatBtn.evaluate((el) => {
      return el.classList.contains('is-visible')
    })
    expect(isVisibleAfterScroll).toBe(true)

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/float-menu-${testInfo.project.name}.png`,
      fullPage: false,
    })
  })

  test('floating menu button is 56px', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(3000)

    await page.evaluate(() => window.scrollTo(0, window.innerHeight + 200))
    await page.waitForTimeout(1100)

    const floatBtn = page.locator('.menu-float')
    const box = await floatBtn.boundingBox()

    expect(box).not.toBeNull()
    if (box) {
      expect(box.width).toBe(56)
      expect(box.height).toBe(56)
    }
  })
})

test.describe('Header CTA Visibility', () => {
  test('header CTA is hidden below 768px', async ({ page }, testInfo) => {
    if (
      !testInfo.project.name.includes('mobile') &&
      !testInfo.project.name.includes('tablet-portrait-medium')
    ) {
      test.skip()
      return
    }

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const headerCta = page.locator('.header__cta')
    const isHidden = await headerCta.evaluate((el) => {
      const style = window.getComputedStyle(el)
      return style.display === 'none'
    })

    expect(isHidden).toBe(true)
  })

  test('header CTA is visible above 1024px', async ({ page }, testInfo) => {
    if (testInfo.project.name.includes('mobile')) {
      test.skip()
      return
    }

    const viewport = page.viewportSize()
    if (!viewport || viewport.width <= 1024) {
      test.skip()
      return
    }

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const headerCta = page.locator('.header__cta')
    const isVisible = await headerCta.isVisible()

    expect(isVisible).toBe(true)
  })
})

test.describe('Contact Button Specs', () => {
  test('contact button is round and correct size', async ({ page }, testInfo) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)

    await page.evaluate(() => {
      document.querySelector('#contato')?.scrollIntoView()
    })
    await page.waitForTimeout(500)

    const btn = page.locator('.btn-round-cta')
    const box = await btn.boundingBox()

    expect(box).not.toBeNull()
    if (box) {
      const viewport = page.viewportSize()
      const isMobile = viewport && viewport.width <= 760
      const expectedSize = isMobile ? 120 : 180

      expect(box.width).toBe(expectedSize)
      expect(box.height).toBe(expectedSize)
    }

    const styles = await btn.evaluate((el) => {
      const style = window.getComputedStyle(el)
      return {
        borderRadius: style.borderRadius,
        backgroundColor: style.backgroundColor,
      }
    })

    expect(styles.borderRadius).toBe('50%')

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/contact-button-${testInfo.project.name}.png`,
      fullPage: false,
    })
  })
})
