/**
 * Static HTML for no-JS users, generated from src/data/content.ts.
 *
 * Full renderToString + hydrateRoot would require an SSR bundle and
 * stripping GSAP/Lenis from the server. This script keeps createRoot on
 * the client and emits markup from the same content module the React
 * tree reads, so copy, alts, and meta cannot drift.
 */

import { writeFile, mkdir, readdir } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import {
  profile,
  projects,
  services,
  processSteps,
  portraits,
  contact,
  cta,
  skills,
  getHomeMeta,
  getCaseMeta,
  type Project,
} from '../src/data/content.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = join(__dirname, '..', 'dist')

function generateHomeContent() {
  const status = `${profile.availability}${profile.location ? ` · ${profile.location}` : ''}`
  return `
    <a class="skip" href="#main">Pular para o conteúdo</a>
    <header class="header">
      <div class="header__inner shell">
        <a href="/" class="header__brand" aria-label="Ir para o topo">
          <span>${profile.name}</span>
        </a>
        <nav class="header__nav" aria-label="Navegação principal">
          <a class="header__link" href="/#trabalhos">Trabalhos</a>
          <a class="header__link" href="/#sobre">Sobre</a>
          <a class="header__link" href="/#contato">Contato</a>
        </nav>
        <div class="header__end">
          <a class="header__cta" href="${cta.href}">${cta.label}</a>
        </div>
      </div>
    </header>
    <main id="main" tabindex="-1">
      <section class="hero" id="intro">
        <div class="hero__grid shell">
          <div class="hero__content">
            <span class="hero__arrow" aria-hidden="true">↘</span>
            <p class="hero__value body-l">${profile.shortBio}</p>
            <p class="hero__status label">
              <span class="hero__dot" aria-hidden="true"></span>
              ${status}
            </p>
            <a href="#contato" class="hero__contact-link">Começar um projeto <span aria-hidden="true">↗</span></a>
          </div>
          <figure class="hero__portrait-wrap">
            <div class="hero__portrait">
              <img src="${portraits.hero.src}" alt="${portraits.hero.alt}" width="${portraits.hero.width}" height="${portraits.hero.height}" loading="eager">
            </div>
          </figure>
        </div>
        <div class="hero__marquee" aria-hidden="true">
          <div class="hero__marquee-track">
            <span class="hero__name display-xl">${profile.name} —&nbsp;</span>
            <span class="hero__name display-xl">${profile.name} —&nbsp;</span>
            <span class="hero__name display-xl">${profile.name} —&nbsp;</span>
          </div>
        </div>
        <h1 id="hero-title" class="sr-only">${profile.name}</h1>
      </section>
      <section class="section services" id="servicos">
        <div class="shell">
          <header class="services__header">
            <p class="mono">02</p>
            <h2 class="services__title display-l">O QUE <em>faço</em></h2>
          </header>
          <div class="services__table" role="list">
            ${services
              .map(
                (service) => `
            <article class="service" role="listitem">
              <span class="service__index mono">${service.index}</span>
              <h3 class="service__title h3">${service.title}</h3>
              <p class="service__desc">${service.description}</p>
            </article>`,
              )
              .join('')}
          </div>
        </div>
      </section>
      <section class="section work-index" id="trabalhos">
        <div class="shell">
          <h2 class="work-index__title">Trabalhos selecionados</h2>
          <p class="work-index__note">Estudos conceituais criados para mostrar processo, direção e código.</p>
          <div class="work-index__list" role="list">
            ${projects
              .map(
                (p) => `
              <a href="/trabalhos/${p.slug}" class="work-index__row" role="listitem">
                <span class="work-index__name">${p.name}</span>
                <span class="work-index__category">${p.category}</span>
                <span class="work-index__year">${p.year}</span>
              </a>`,
              )
              .join('')}
          </div>
        </div>
      </section>
      <section class="section process" id="processo">
        <div class="shell">
          <h2 class="process__title">Como trabalho</h2>
          <ol class="process__grid" role="list">
            ${processSteps
              .map(
                (step) => `
            <li class="process__step">
              <span class="process__index">${step.index}</span>
              <h3 class="process__name">${step.title}</h3>
              <p class="process__desc">${step.description}</p>
            </li>`,
              )
              .join('')}
          </ol>
        </div>
      </section>
      <section class="section about about--inverse" id="sobre">
        <div class="shell">
          <div class="about__grid">
            <figure class="about__figure">
              <p class="about__vert mono">${profile.given}</p>
              <div class="frame about__photo">
                <img src="${portraits.about.src}" alt="${portraits.about.alt}" width="${portraits.about.width}" height="${portraits.about.height}" loading="lazy">
              </div>
              <figcaption class="about__caption mono">${profile.given}</figcaption>
            </figure>
            <div class="about__copy">
              <div class="mono"><span>05</span><span aria-hidden="true">/</span><span>Sobre</span></div>
              <h2 class="section__title">Sobre</h2>
              <p class="about__text">${profile.about}</p>
              <p class="about__since mono">${profile.since}</p>
              <ul class="skills">
                ${skills.map((skill) => `<li>${skill}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section class="contact" id="contato">
        <div class="cta">
          <div class="shell">
            <h2 class="cta__title">Tem um projeto? Vamos tirar do papel.</h2>
            <div class="cta__actions">
              <a href="${cta.href}" class="btn-round-cta"><span class="btn-round-cta__text">Vamos conversar</span></a>
            </div>
          </div>
        </div>
        <div class="sheet" id="contact-list">
          <div class="shell">
            <ul class="sheet__list">
              ${contact
                .map(
                  (item) => `
              <li>
                <a class="sheet__row" href="${item.href}">
                  <span class="sheet__label">${item.label}</span>
                  <span class="sheet__value">${item.value}</span>
                </a>
              </li>`,
                )
                .join('')}
            </ul>
          </div>
        </div>
      </section>
    </main>
    <footer class="footer">
      <div class="shell">
        <div class="footer__row">
          <p class="footer__name">${profile.name}</p>
          <p class="footer__center">${profile.quote}</p>
          <div class="footer__right">
            <p>${profile.marks.portfolio}</p>
          </div>
        </div>
      </div>
    </footer>
  `
}

function generateCaseContent(project: Project) {
  return `
    <a class="skip" href="#main">Pular para o conteúdo</a>
    <header class="header">
      <div class="header__inner shell">
        <a href="/" class="header__brand" aria-label="Ir para o topo">
          <span>${profile.name}</span>
        </a>
        <nav class="header__nav" aria-label="Navegação principal">
          <a class="header__link" href="/#trabalhos">Trabalhos</a>
          <a class="header__link" href="/#sobre">Sobre</a>
          <a class="header__link" href="/#contato">Contato</a>
        </nav>
      </div>
    </header>
    <main id="main" tabindex="-1">
      <article class="case-study">
        <header class="case-study__header">
          <div class="case-study__cover">
            <img src="${project.cover.src}" alt="${project.cover.alt}" width="${project.cover.width}" height="${project.cover.height}" loading="eager">
          </div>
          <div class="shell">
            <div class="case-study__intro">
              <h1 class="case-study__title">${project.name}</h1>
              <dl class="case-study__meta">
                <div><dt>Tipo</dt><dd>${project.category}</dd></div>
                <div><dt>Ano</dt><dd>${project.year}</dd></div>
                <div><dt>Papel</dt><dd>${project.role}</dd></div>
                <div><dt>Stack</dt><dd>${project.stack.join(', ')}</dd></div>
              </dl>
              <p class="case-study__badge">Estudo conceitual</p>
            </div>
          </div>
        </header>
        <section class="case-study__section">
          <div class="shell">
            <h2 class="case-study__h2">Desafio</h2>
            <p class="case-study__text">${project.challenge}</p>
          </div>
        </section>
      </article>
    </main>
    <footer class="footer">
      <div class="shell">
        <div class="footer__row">
          <p class="footer__name">${profile.name}</p>
          <p class="footer__center">${profile.quote}</p>
          <div class="footer__right">
            <p>${profile.marks.portfolio}</p>
          </div>
        </div>
      </div>
    </footer>
  `
}

async function getAssetPaths() {
  const assetsDir = join(distDir, 'assets')
  const files = await readdir(assetsDir, { recursive: true })
  let cssPath = ''
  let jsPath = ''

  for (const file of files) {
    const name = String(file)
    if (name.endsWith('.css') && name.startsWith('index-')) {
      cssPath = `/assets/${name}`
    }
    if (name.endsWith('.js') && name.startsWith('index-')) {
      jsPath = `/assets/${name}`
    }
  }

  return { cssPath, jsPath }
}

function bootScript() {
  return `    <script>
      ;(function () {
        var html = document.documentElement
        var SAFETY_TIMEOUT = 3500
        try {
          var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
          if (reduced) {
            html.classList.add('reduced-motion')
          } else {
            html.classList.add('is-booting')
          }
          html.classList.add('js')
          setTimeout(function () {
            if (!html.classList.contains('motion-ready')) {
              html.classList.add('motion-ready')
              html.classList.remove('is-booting')
            }
          }, SAFETY_TIMEOUT)
        } catch (error) {
          html.classList.add('motion-ready')
        }
      })()
    </script>
    <noscript>
      <style>
        .veil, .progress, .cursor { display: none !important; }
        .hero__portrait { clip-path: inset(0% 0% 0% 0%) !important; }
        .hero__marquee { animation: none !important; }
        .mask__in { transform: none !important; }
        .header { transform: none !important; opacity: 1 !important; }
        .service, .work-index__row, .process__step { opacity: 1 !important; transform: none !important; }
      </style>
    </noscript>`
}

async function generatePage(route: string, content: string, assets: { cssPath: string; jsPath: string }, project: Project | null) {
  const { cssPath, jsPath } = assets
  const pageMeta = project ? getCaseMeta(project) : getHomeMeta()

  const html = `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${pageMeta.title}</title>
    <meta name="description" content="${pageMeta.description}" />
    <meta name="theme-color" content="#090A0B" />
    <meta name="author" content="noqyzz" />
    <link rel="canonical" href="${pageMeta.canonical}" />
    <meta property="og:title" content="${pageMeta.title}" />
    <meta property="og:description" content="${pageMeta.description}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="pt_BR" />
    <meta property="og:url" content="${pageMeta.canonical}" />
    <meta property="og:image" content="${pageMeta.ogImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${pageMeta.ogImageAlt}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${pageMeta.title}" />
    <meta name="twitter:description" content="${pageMeta.description}" />
    <meta name="twitter:image" content="${pageMeta.ogImage}" />
    <meta name="twitter:image:alt" content="${pageMeta.ogImageAlt}" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="preload" as="font" href="/assets/fonts/bricolage-grotesque-latin.woff2" type="font/woff2" crossorigin />${route === '/' ? `
    <link rel="preload" as="image" href="${portraits.hero.src}" type="image/webp" />` : ''}
    <link rel="stylesheet" href="${cssPath}" />
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "noqyzz",
        "jobTitle": "${profile.role}",
        "description": "${getHomeMeta().description}",
        "knowsAbout": ["Landing pages", "Sites completos", "Design digital", "Sistemas sob medida"]
      }
    </script>
${bootScript()}
  </head>
  <body>
    <div id="root">${content}</div>
    <script type="module" src="${jsPath}"></script>
  </body>
</html>`

  const filePath =
    route === '/' ? join(distDir, 'index.html') : join(distDir, route.slice(1), 'index.html')

  await mkdir(dirname(filePath), { recursive: true })
  await writeFile(filePath, html, 'utf-8')
  console.log(`✅ Generated ${filePath.replace(distDir, 'dist')}`)
}

async function ssg() {
  console.log('🚀 Starting SSG...')

  if (!existsSync(distDir)) {
    console.error('❌ dist/ not found. Run vite build first.')
    process.exit(1)
  }

  const assets = await getAssetPaths()
  if (!assets.cssPath || !assets.jsPath) {
    console.error('❌ Could not find built assets')
    process.exit(1)
  }

  console.log(`📦 Found assets: CSS=${assets.cssPath}, JS=${assets.jsPath}`)

  await generatePage('/', generateHomeContent(), assets, null)

  for (const project of projects) {
    await generatePage(`/trabalhos/${project.slug}`, generateCaseContent(project), assets, project)
  }

  console.log('\n🎉 SSG complete!')
}

ssg().catch((err) => {
  console.error('❌ SSG failed:', err)
  process.exit(1)
})
