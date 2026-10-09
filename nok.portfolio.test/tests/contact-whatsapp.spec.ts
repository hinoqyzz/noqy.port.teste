import { test, expect } from '@playwright/test'
import { cta, whatsapp } from '../src/data/content'

const SCREENSHOT_DIR = '/opt/cursor/artifacts/screenshots'

const VIEWPORTS = [
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1280, height: 800 },
  { width: 1440, height: 900 },
]

function isNoJs(testInfo: { project: { name: string } }) {
  return testInfo.project.name.includes('no-js')
}

async function loadContact(page: import('@playwright/test').Page, testInfo: { project: { name: string } }) {
  await page.goto('/')
  await page.waitForLoadState('domcontentloaded')
  if (!isNoJs(testInfo)) {
    await page.waitForLoadState('networkidle')
    await page.waitForSelector('html.motion-ready', { timeout: 5000 }).catch(() => {})
    await page.waitForTimeout(300)
  }
  await page.locator('#contato').scrollIntoViewIfNeeded()
}

test.describe('RED-07 WhatsApp primary contact', () => {
  test('round button opens wa.me in a new tab', async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await loadContact(page, testInfo)

    const btn = page.locator('.btn-round-cta')
    await expect(btn).toHaveAttribute('href', whatsapp.href)
    await expect(btn).toHaveAttribute('target', '_blank')
    await expect(btn).toHaveAttribute('rel', 'noopener noreferrer')
    await expect(btn).toHaveAttribute('aria-label', whatsapp.ariaLabel)
    await expect(btn.locator('.btn-round-cta__text span').nth(0)).toHaveText(whatsapp.line1)
    await expect(btn.locator('.btn-round-cta__text span').nth(1)).toHaveText(whatsapp.line2)
  })

  test('pills are only email and Instagram', async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await loadContact(page, testInfo)

    const labels = page.locator('.sheet__label')
    await expect(labels).toHaveCount(2)
    await expect(labels.nth(0)).toHaveText('E-mail')
    await expect(labels.nth(1)).toHaveText('Instagram')
    await expect(page.locator('.sheet__list')).not.toContainText('WhatsApp')
    await expect(page.locator('.cta__note')).toHaveText(cta.note)
  })

  for (const vp of VIEWPORTS) {
    test(`${vp.width}: WhatsApp label is two lines, sized, and inside the circle`, async ({
      page,
    }, testInfo) => {
      await page.setViewportSize(vp)
      await loadContact(page, testInfo)

      const btn = page.locator('.btn-round-cta')
      const text = btn.locator('.btn-round-cta__text')
      await expect(text.locator('span')).toHaveCount(2)
      await expect(text.locator('span').nth(0)).toHaveText('Chamar no')
      await expect(text.locator('span').nth(1)).toHaveText('WhatsApp')

      const metrics = await btn.evaluate((el) => {
        const textEl = el.querySelector('.btn-round-cta__text')
        if (!textEl) return null
        const btnBox = el.getBoundingClientRect()
        const cx = btnBox.left + btnBox.width / 2
        const cy = btnBox.top + btnBox.height / 2
        const radius = btnBox.width / 2
        let lines = 0
        const corners: { x: number; y: number; dist: number }[] = []
        for (const span of textEl.querySelectorAll('span')) {
          const range = document.createRange()
          range.selectNodeContents(span)
          const rects = [...range.getClientRects()].filter((rect) => rect.width > 1 && rect.height > 1)
          lines += rects.length
          for (const rect of rects) {
            for (const [x, y] of [
              [rect.left, rect.top],
              [rect.right, rect.top],
              [rect.left, rect.bottom],
              [rect.right, rect.bottom],
            ] as const) {
              const dist = Math.hypot(x - cx, y - cy)
              corners.push({ x, y, dist })
            }
          }
        }
        return {
          lines,
          fontSize: parseFloat(getComputedStyle(el).fontSize),
          width: btnBox.width,
          height: btnBox.height,
          radius,
          maxCornerDist: corners.reduce((max, corner) => Math.max(max, corner.dist), 0),
        }
      })

      expect(metrics, `metrics at ${vp.width}`).not.toBeNull()
      expect(metrics!.lines, `rendered lines at ${vp.width}`).toBe(2)
      expect(metrics!.width).toBe(metrics!.height)

      if (vp.width <= 760) {
        expect(metrics!.fontSize, `font-size at ${vp.width}`).toBeGreaterThanOrEqual(12.5)
        expect(metrics!.fontSize, `font-size at ${vp.width}`).toBeLessThanOrEqual(13.5)
      } else if (vp.width >= 1025) {
        expect(metrics!.fontSize, `font-size at ${vp.width}`).toBeGreaterThanOrEqual(14.5)
        expect(metrics!.fontSize, `font-size at ${vp.width}`).toBeLessThanOrEqual(15.5)
      } else {
        expect(metrics!.fontSize, `font-size at ${vp.width}`).toBeGreaterThanOrEqual(12.5)
        expect(metrics!.fontSize, `font-size at ${vp.width}`).toBeLessThanOrEqual(15.5)
      }

      expect(
        metrics!.maxCornerDist,
        `text overflows circle at ${vp.width}: dist ${metrics!.maxCornerDist} radius ${metrics!.radius}`,
      ).toBeLessThanOrEqual(metrics!.radius + 1)
    })
  }

  for (const vp of VIEWPORTS) {
    test(`${vp.width}: contact note sits left-aligned above the pills`, async ({
      page,
    }, testInfo) => {
      await page.setViewportSize(vp)
      await loadContact(page, testInfo)

      const title = await page.locator('.cta__title').boundingBox()
      const btn = await page.locator('.btn-round-cta').boundingBox()
      const note = await page.locator('.cta__note').boundingBox()
      const pills = await page.locator('.sheet__list').boundingBox()

      expect(title).not.toBeNull()
      expect(btn).not.toBeNull()
      expect(note).not.toBeNull()
      expect(pills).not.toBeNull()

      expect(title!.y).toBeLessThan(btn!.y)
      expect(btn!.y + btn!.height).toBeLessThanOrEqual(note!.y + 1)
      expect(note!.y).toBeLessThan(pills!.y)

      expect(Math.abs(note!.x - pills!.x), `note x ${note!.x} vs pills x ${pills!.x}`).toBeLessThanOrEqual(
        1,
      )

      const gap = pills!.y - (note!.y + note!.height)
      expect(gap, `gap between note and pills at ${vp.width}`).toBeGreaterThanOrEqual(-1)
      expect(gap, `gap between note and pills at ${vp.width}`).toBeLessThanOrEqual(24)
    })
  }

  test('390: two lines fit inside the 120px circle and stack is title, button, note, pills', async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await loadContact(page, testInfo)

    const btn = page.locator('.btn-round-cta')
    const btnBox = await btn.boundingBox()
    const textBox = await btn.locator('.btn-round-cta__text').boundingBox()
    expect(btnBox).not.toBeNull()
    expect(textBox).not.toBeNull()
    expect(btnBox!.width).toBe(120)
    expect(btnBox!.height).toBe(120)
    expect(textBox!.width).toBeLessThanOrEqual(120)
    expect(textBox!.height).toBeLessThanOrEqual(120)
    expect(textBox!.x).toBeGreaterThanOrEqual(btnBox!.x)
    expect(textBox!.y).toBeGreaterThanOrEqual(btnBox!.y)
    expect(textBox!.x + textBox!.width).toBeLessThanOrEqual(btnBox!.x + btnBox!.width + 1)
    expect(textBox!.y + textBox!.height).toBeLessThanOrEqual(btnBox!.y + btnBox!.height + 1)

    const line1 = await btn.locator('.btn-round-cta__text span').nth(0).boundingBox()
    const line2 = await btn.locator('.btn-round-cta__text span').nth(1).boundingBox()
    expect(line1!.y).toBeLessThan(line2!.y)

    const title = await page.locator('.cta__title').boundingBox()
    const note = await page.locator('.cta__note').boundingBox()
    const pills = await page.locator('.sheet__list').boundingBox()
    expect(title!.y).toBeLessThan(btnBox!.y)
    expect(btnBox!.y).toBeLessThan(note!.y)
    expect(note!.y).toBeLessThan(pills!.y)
  })

  for (const vp of [
    { width: 390, height: 844 },
    { width: 1024, height: 768 },
    { width: 1440, height: 900 },
  ]) {
    test(`contact screenshot ${vp.width}x${vp.height}`, async ({ page }, testInfo) => {
      const project = testInfo.project.name
      if (project !== 'desktop-no-preference' && project !== 'no-js') {
        test.skip()
      }
      await page.setViewportSize(vp)
      await loadContact(page, testInfo)
      if (!isNoJs(testInfo)) {
        await page.evaluate(() => {
          const title = document.querySelector('.cta__title')
          if (!title) return
          title.scrollIntoView({ block: 'start', behavior: 'instant' })
        })
        await page.waitForTimeout(1100)
      }
      const suffix = isNoJs(testInfo) ? 'nojs' : 'js'
      await page.locator('#contato').screenshot({
        path: `${SCREENSHOT_DIR}/contact-${vp.width}x${vp.height}-${suffix}.png`,
      })
    })
  }
})
