import { test, expect } from '@playwright/test'

const SCREENSHOT_DIR = '/opt/cursor/artifacts/screenshots'
const BASE_URL = 'https://adryanmiguel.vercel.app'

test.describe('GIT-02: Per-route Meta Tags', () => {
  test('home page has correct title and meta', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')

    await expect(page).toHaveTitle('noqyzz — Sites, landing pages e sistemas')

    const description = page.locator('meta[name="description"]')
    await expect(description).toHaveAttribute(
      'content',
      'noqyzz: design e desenvolvimento de landing pages, sites completos e sistemas sob medida, do primeiro rascunho ao código no ar.',
    )

    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute('href', BASE_URL)

    const ogTitle = page.locator('meta[property="og:title"]')
    await expect(ogTitle).toHaveAttribute(
      'content',
      'noqyzz — Sites, landing pages e sistemas',
    )

    const ogDescription = page.locator('meta[property="og:description"]')
    await expect(ogDescription).toHaveAttribute(
      'content',
      'noqyzz: design e desenvolvimento de landing pages, sites completos e sistemas sob medida, do primeiro rascunho ao código no ar.',
    )

    const ogImage = page.locator('meta[property="og:image"]')
    await expect(ogImage).toHaveAttribute('content', `${BASE_URL}/assets/images/og-image.jpg`)

    const ogImageAlt = page.locator('meta[property="og:image:alt"]')
    await expect(ogImageAlt).toHaveAttribute(
      'content',
      'noqyzz — sites, landing pages e sistemas',
    )

    const twitterImage = page.locator('meta[name="twitter:image"]')
    await expect(twitterImage).toHaveAttribute('content', `${BASE_URL}/assets/images/og-image.jpg`)

    const twitterImageAlt = page.locator('meta[name="twitter:image:alt"]')
    await expect(twitterImageAlt).toHaveAttribute(
      'content',
      'noqyzz — sites, landing pages e sistemas',
    )
  })

  test('case study page has project-specific title and meta', async ({ page }) => {
    await page.goto('/trabalhos/caldo-cafe')
    await page.waitForLoadState('domcontentloaded')

    await expect(page).toHaveTitle('Caldo Café — noqyzz')

    const ogTitle = page.locator('meta[property="og:title"]')
    await expect(ogTitle).toHaveAttribute('content', 'Caldo Café — noqyzz')

    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute('href', `${BASE_URL}/trabalhos/caldo-cafe`)

    const ogImage = page.locator('meta[property="og:image"]')
    await expect(ogImage).toHaveAttribute('content', `${BASE_URL}/assets/images/og-image.jpg`)
  })

  test('all case study routes have absolute og:image URLs', async ({ page }) => {
    const cases = ['caldo-cafe', 'serra-bikes', 'atlas-arquitetura', 'pulso']

    for (const slug of cases) {
      await page.goto(`/trabalhos/${slug}`)
      await page.waitForLoadState('domcontentloaded')

      const ogImage = page.locator('meta[property="og:image"]')
      const content = await ogImage.getAttribute('content')
      expect(content).toBe(`${BASE_URL}/assets/images/og-image.jpg`)
    }
  })
})

test.describe('GIT-03: 404 Page', () => {
  test('non-existent route shows NotFound page', async ({ page }) => {
    await page.goto('/pagina-que-nao-existe')
    await page.waitForLoadState('networkidle')

    const notFound = page.locator('.not-found')
    await expect(notFound).toBeVisible()

    const title = page.locator('.not-found__title')
    await expect(title).toContainText('Página não encontrada')

    const code = page.locator('.not-found__code')
    await expect(code).toContainText('404')

    const link = page.locator('.not-found__link')
    await expect(link).toBeVisible()
    await expect(link).toContainText('Voltar para noqyzz')
  })

  test('invalid case study slug shows NotFound', async ({ page }) => {
    await page.goto('/trabalhos/projeto-inexistente')
    await page.waitForLoadState('networkidle')

    const notFound = page.locator('.not-found')
    await expect(notFound).toBeVisible()
  })

  test('404 page has correct document title', async ({ page }) => {
    await page.goto('/pagina-que-nao-existe')
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveTitle('Página não encontrada — noqyzz')
  })

  test('404 link navigates back to home', async ({ page }) => {
    await page.goto('/pagina-que-nao-existe')
    await page.waitForLoadState('networkidle')

    const link = page.locator('.not-found__link')
    await link.click()
    await page.waitForURL('/')

    const hero = page.locator('.hero')
    await expect(hero).toBeVisible()
  })
})

test.describe('DS-01/DS-03/GIT-06: Menu Button Crossfade', () => {
  test('header menu button hidden after hero scroll', async ({ page }, testInfo) => {
    if (testInfo.project.name.includes('no-js')) {
      test.skip()
      return
    }
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.waitForSelector('html.motion-ready', { timeout: 5000 }).catch(() => {})
    await page.setViewportSize({ width: 768, height: 1024 })

    const headerMenu = page.locator('.header__menu')

    await page.locator('#servicos').scrollIntoViewIfNeeded()
    await expect(headerMenu).toHaveClass(/is-hidden/, { timeout: 4000 })

    const tabIndex = await headerMenu.getAttribute('tabindex')
    expect(tabIndex).toBe('-1')
  })

  test('float menu button visible after hero scroll', async ({ page }, testInfo) => {
    if (testInfo.project.name.includes('no-js')) {
      test.skip()
      return
    }
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const floatMenu = page.locator('.menu-float')

    await page.evaluate(() => window.scrollTo(0, window.innerHeight + 200))
    await page.waitForTimeout(1100)

    const isVisible = await floatMenu.evaluate((el) => el.classList.contains('is-visible'))
    expect(isVisible).toBe(true)
  })

  test('only one menu button is focusable at a time', async ({ page }, testInfo) => {
    if (testInfo.project.name.includes('no-js')) {
      test.skip()
      return
    }
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.setViewportSize({ width: 768, height: 1024 })

    const headerMenu = page.locator('.header__menu')
    const floatMenu = page.locator('.menu-float')

    let headerTabIndex = await headerMenu.getAttribute('tabindex')
    let floatTabIndex = await floatMenu.getAttribute('tabindex')
    expect(headerTabIndex).not.toBe('-1')
    expect(floatTabIndex).toBe('-1')

    await page.evaluate(() => window.scrollTo(0, window.innerHeight + 200))
    await page.waitForTimeout(1100)

    headerTabIndex = await headerMenu.getAttribute('tabindex')
    floatTabIndex = await floatMenu.getAttribute('tabindex')
    expect(headerTabIndex).toBe('-1')
    expect(floatTabIndex).not.toBe('-1')
  })
})

test.describe('DS-02: Close Control on Desktop', () => {
  test('close button visible when menu open', async ({ page }, testInfo) => {
    if (testInfo.project.name.includes('no-js')) {
      test.skip()
      return
    }
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.setViewportSize({ width: 1440, height: 900 })

    await page.locator('#servicos').scrollIntoViewIfNeeded()
    const floatMenu = page.locator('.menu-float')
    await expect(floatMenu).toBeVisible({ timeout: 4000 })
    await floatMenu.click()
    await page.waitForTimeout(300)

    const overlay = page.locator('.overlay')
    await expect(overlay).toBeVisible()

    await expect(floatMenu).toBeVisible()
    await expect(floatMenu).toContainText('Fechar')

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/menu-open-desktop-${testInfo.project.name}.png`,
      fullPage: false,
    })
  })

  test('close button closes menu', async ({ page }, testInfo) => {
    if (testInfo.project.name.includes('no-js')) {
      test.skip()
      return
    }
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.setViewportSize({ width: 1440, height: 900 })

    await page.locator('#servicos').scrollIntoViewIfNeeded()
    const floatMenu = page.locator('.menu-float')
    await expect(floatMenu).toBeVisible({ timeout: 4000 })
    await floatMenu.click()
    await page.waitForTimeout(400)

    const overlay = page.locator('.overlay')
    await expect(overlay).toBeVisible()

    await page.evaluate(() => {
      const btn = document.querySelector('.menu-float') as HTMLButtonElement
      if (btn) btn.click()
    })
    await page.waitForTimeout(400)

    await expect(overlay).toHaveCount(0, { timeout: 5000 })
  })
})

test.describe('Copy Updates', () => {
  test('services section has 4 services including "Sites completos" and "Sistemas sob medida"', async ({
    page,
  }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const services = page.locator('.service')
    await expect(services).toHaveCount(4)

    const servicesTitles = page.locator('.service__title')
    const titles = await servicesTitles.allTextContents()

    expect(titles).toContain('Sites completos')
    expect(titles).toContain('Sistemas sob medida')
    expect(titles).not.toContain('Desenvolvimento front-end')
  })

  test('hero text matches new copy', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const heroValue = page.locator('.hero__value')
    await expect(heroValue).toContainText(
      'Designer e desenvolvedor. Crio landing pages, sites completos e sistemas sob medida',
    )
  })

  test('about section has new portrait and caption', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await page.locator('#sobre').scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    const aboutImg = page.locator('.about__photo img')
    const src = await aboutImg.getAttribute('src')
    expect(src).toContain('about-portrait.webp')

    const aboutCaption = page.locator('.about__caption')
    await expect(aboutCaption).toContainText('Adryan')

    const aboutVert = page.locator('.about__vert')
    await expect(aboutVert).toContainText('Adryan')
  })
})

test.describe('GIT-01: No-JS Animations Not Blocked', () => {
  test('with JS enabled, animations work (no !important blocking)', async ({ page }, testInfo) => {
    if (testInfo.project.name.includes('no-js')) {
      test.skip()
      return
    }

    await page.goto('/')
    await page.waitForSelector('html.motion-ready', { timeout: 5000 }).catch(() => {})
    await page.waitForTimeout(3500)

    const heroPortrait = page.locator('.hero__portrait')
    const clipPath = await heroPortrait.evaluate((el) => {
      return window.getComputedStyle(el).clipPath
    })

    expect(clipPath === 'none' || clipPath.includes('inset(0')).toBe(true)
  })
})
