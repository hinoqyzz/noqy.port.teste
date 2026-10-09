import type { Page } from '@playwright/test'
import sharp from 'sharp'

/** First row of light ink below the photo, in CSS pixels. Works with JS disabled. */
export async function measurePhotoToNInkGap(page: Page) {
  const photo = await page.locator('.hero__portrait').boundingBox()
  const name = await page.locator('.hero__name').first().boundingBox()
  const viewport = page.viewportSize()
  if (!photo || !name || !viewport) return null

  const x = Math.max(0, Math.floor(name.x))
  const y = Math.max(0, Math.floor(photo.y + photo.height))
  const width = Math.min(Math.ceil(Math.min(name.width, 520)), viewport.width - x)
  const height = Math.min(
    Math.max(8, Math.ceil(name.y + name.height - (photo.y + photo.height) + 12)),
    viewport.height - y,
  )
  if (width < 4 || height < 4) return null

  let buffer: Buffer | undefined
  let lastError: unknown
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      buffer = await page.screenshot({ clip: { x, y, width, height } })
      lastError = undefined
      break
    } catch (error) {
      lastError = error
    }
  }
  if (!buffer) throw lastError
  const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true })

  for (let row = 0; row < info.height; row++) {
    for (let col = 0; col < info.width; col++) {
      const i = (row * info.width + col) * info.channels
      if (data[i] > 140 && data[i + 1] > 140 && data[i + 2] > 140) {
        return row
      }
    }
  }
  return -1
}
