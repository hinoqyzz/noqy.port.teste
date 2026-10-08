/**
 * Static Site Generation - Build-time HTML generation
 * Generates static HTML files with visible content for JS-disabled users
 * Works on Vercel build environment (no browser needed)
 */

import { writeFile, mkdir, readdir } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = join(__dirname, '..', 'dist')

const projects = [
  {
    slug: 'caldo-cafe',
    name: 'Caldo Café',
    category: 'Landing page · Identidade visual',
    year: '2026',
    description: 'Site para uma cafeteria de especialidade em Belo Horizonte.',
    cover: '/assets/images/caldo-cafe-cover.webp',
  },
  {
    slug: 'serra-bikes',
    name: 'Serra Bikes',
    category: 'Landing page de lançamento',
    year: '2026',
    description: 'Lançamento de uma bike elétrica feita para as ladeiras mineiras.',
    cover: '/assets/images/serra-bikes-cover.webp',
  },
  {
    slug: 'atlas-arquitetura',
    name: 'Atlas Arquitetura',
    category: 'Portfólio · Front-end',
    year: '2025',
    description: 'Portfólio para um estúdio de arquitetura.',
    cover: '/assets/images/atlas-arquitetura-cover.webp',
  },
  {
    slug: 'pulso',
    name: 'Pulso',
    category: 'Landing page de app · UI design',
    year: '2025',
    description: 'Pré-lançamento de um app de treino.',
    cover: '/assets/images/pulso-cover.webp',
  },
]

const profile = {
  name: 'Adryan Miguel',
  role: 'Designer e desenvolvedor',
  bio: 'Designer e desenvolvedor. Crio landing pages, sites completos e sistemas sob medida, do primeiro rascunho ao código no ar.',
  location: 'Minas Gerais, Brasil',
  availability: 'Disponível para projetos',
}

const meta = {
  title: 'Adryan Miguel — Sites, landing pages e sistemas | Minas Gerais',
  description: 'Designer e desenvolvedor em Minas Gerais. Crio landing pages, sites completos e sistemas sob medida, do primeiro rascunho ao código no ar.',
  ogImageAlt: 'Adryan Miguel — sites, landing pages e sistemas',
}

function generateHomeContent() {
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
      <section class="hero" id="intro">
        <div class="hero__grid shell">
          <div class="hero__content">
            <h1 class="sr-only">${profile.name}</h1>
            <p class="hero__value body-l">${profile.bio}</p>
            <p class="hero__status label">
              <span class="hero__dot" aria-hidden="true"></span>
              ${profile.availability} · ${profile.location}
            </p>
          </div>
          <figure class="hero__portrait-wrap">
            <div class="hero__portrait">
              <img src="/assets/images/hero-portrait.webp" alt="${profile.name}" width="1600" height="2000" loading="eager">
            </div>
          </figure>
        </div>
      </section>
      <section class="section services" id="servicos">
        <div class="shell">
          <h2 class="services__title">O que faço</h2>
          <div class="services__table">
            <div class="service"><span class="service__index">01</span><h3 class="service__title">Landing pages</h3><p class="service__desc">Uma página, uma história. Do rascunho ao ar, com o ritmo da marca.</p></div>
            <div class="service"><span class="service__index">02</span><h3 class="service__title">Sites completos</h3><p class="service__desc">Site institucional com várias páginas, rápido no celular e fácil de achar no Google.</p></div>
            <div class="service"><span class="service__index">03</span><h3 class="service__title">Design digital</h3><p class="service__desc">Direção visual com personalidade, longe do template e perto da marca.</p></div>
            <div class="service"><span class="service__index">04</span><h3 class="service__title">Sistemas sob medida</h3><p class="service__desc">Agendamentos, cardápios, painéis e o que o seu negócio precisar, feito sob medida.</p></div>
          </div>
        </div>
      </section>
      <section class="section work-index" id="trabalhos">
        <div class="shell">
          <h2 class="work-index__title">Trabalhos selecionados</h2>
          <p class="work-index__note">Estudos conceituais criados para mostrar processo, direção e código.</p>
          <div class="work-index__list" role="list">
            ${projects.map(p => `
              <a href="/trabalhos/${p.slug}" class="work-index__row" role="listitem">
                <span class="work-index__name">${p.name}</span>
                <span class="work-index__category">${p.category}</span>
                <span class="work-index__year">${p.year}</span>
              </a>
            `).join('')}
          </div>
        </div>
      </section>
      <section class="section process" id="processo">
        <div class="shell">
          <h2 class="process__title">Como trabalho</h2>
          <ol class="process__grid" role="list">
            <li class="process__step"><span class="process__index">01</span><h3 class="process__name">Descoberta</h3><p class="process__desc">Entendo o negócio, quem chega e o que a página precisa fazer.</p></li>
            <li class="process__step"><span class="process__index">02</span><h3 class="process__name">Direção</h3><p class="process__desc">Defino hierarquia, referências e como a interface se move.</p></li>
            <li class="process__step"><span class="process__index">03</span><h3 class="process__name">Design</h3><p class="process__desc">Desenho a interface e o sistema visual, do tipo à cor.</p></li>
            <li class="process__step"><span class="process__index">04</span><h3 class="process__name">Desenvolvimento</h3><p class="process__desc">Escrevo o front-end responsivo e deixo o site no ar.</p></li>
            <li class="process__step"><span class="process__index">05</span><h3 class="process__name">Refinamento</h3><p class="process__desc">Ajusto movimento, detalhes e o que só aparece no uso.</p></li>
          </ol>
        </div>
      </section>
      <section class="section about" id="sobre">
        <div class="shell">
          <div class="about__grid">
            <figure class="about__figure">
              <div class="frame about__photo">
                <img src="/assets/images/caldo-cafe-brand.webp" alt="Peça de branding" width="1600" height="2000" loading="lazy">
              </div>
            </figure>
            <div class="about__copy">
              <h2 class="section__title">Sobre</h2>
              <p class="about__text">Sou o Adryan, de Minas Gerais. Trabalho onde o design encontra o código: desenho a interface, escrevo o front-end e cuido de cada transição, hover e rolagem até o site parecer vivo.</p>
            </div>
          </div>
        </div>
      </section>
      <section class="contact" id="contato">
        <div class="cta">
          <div class="shell">
            <h2 class="cta__title">Tem um projeto? Vamos tirar do papel.</h2>
            <div class="cta__actions">
              <a href="mailto:contato@noqyzz.com.br" class="btn-round">Vamos conversar</a>
            </div>
          </div>
        </div>
        <div class="sheet" id="contact-list">
          <div class="shell">
            <ul class="sheet__list">
              <li><a class="sheet__row" href="mailto:contato@noqyzz.com.br"><span class="sheet__label">E-mail</span><span class="sheet__value">contato@noqyzz.com.br</span></a></li>
              <li><a class="sheet__row" href="https://wa.me/5537998684391"><span class="sheet__label">WhatsApp</span><span class="sheet__value">(37) 99868-4391</span></a></li>
              <li><a class="sheet__row" href="https://www.instagram.com/hinoqyzz/"><span class="sheet__label">Instagram</span><span class="sheet__value">@hinoqyzz</span></a></li>
            </ul>
          </div>
        </div>
      </section>
    </main>
    <footer class="footer">
      <div class="shell">
        <div class="footer__row">
          <p class="footer__name">${profile.name}</p>
          <p class="footer__center">Design, código e movimento.</p>
          <div class="footer__right">
            <p>© 2026</p>
          </div>
        </div>
      </div>
    </footer>
  `
}

function generateCaseContent(project) {
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
            <img src="${project.cover}" alt="${project.name}" width="2400" height="1350" loading="eager">
          </div>
          <div class="shell">
            <div class="case-study__intro">
              <h1 class="case-study__title">${project.name}</h1>
              <dl class="case-study__meta">
                <div><dt>Tipo</dt><dd>${project.category}</dd></div>
                <div><dt>Ano</dt><dd>${project.year}</dd></div>
              </dl>
              <p class="case-study__badge">Estudo conceitual</p>
            </div>
          </div>
        </header>
        <section class="case-study__section">
          <div class="shell">
            <h2 class="case-study__h2">Desafio</h2>
            <p class="case-study__text">${project.description}</p>
          </div>
        </section>
      </article>
    </main>
    <footer class="footer">
      <div class="shell">
        <div class="footer__row">
          <p class="footer__name">${profile.name}</p>
          <p class="footer__center">Design, código e movimento.</p>
          <div class="footer__right">
            <p>© 2026</p>
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
    if (file.endsWith('.css') && file.startsWith('index-')) {
      cssPath = `/assets/${file}`
    }
    if (file.endsWith('.js') && file.startsWith('index-')) {
      jsPath = `/assets/${file}`
    }
  }

  return { cssPath, jsPath }
}

const BASE_URL = 'https://adryanmiguel.vercel.app'

function getMeta(route, project = null) {
  const isHome = route === '/'
  const title = isHome
    ? meta.title
    : `${project.name} — Adryan Miguel`
  const description = isHome
    ? meta.description
    : `${project.description} Projeto de ${project.category.toLowerCase()}.`
  const canonical = `${BASE_URL}${route === '/' ? '' : route}`
  const ogImage = `${BASE_URL}/assets/images/og-image.jpg`

  return { title, description, canonical, ogImage }
}

async function generatePage(route, content, assets, project = null) {
  const { cssPath, jsPath } = assets
  const pageMeta = getMeta(route, project)

  const html = `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${pageMeta.title}</title>
    <meta name="description" content="${pageMeta.description}" />
    <meta name="theme-color" content="#090A0B" />
    <meta name="author" content="Adryan Miguel" />
    <link rel="canonical" href="${pageMeta.canonical}" />
    <meta property="og:title" content="${pageMeta.title}" />
    <meta property="og:description" content="${pageMeta.description}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="pt_BR" />
    <meta property="og:url" content="${pageMeta.canonical}" />
    <meta property="og:image" content="${pageMeta.ogImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${meta.ogImageAlt}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${pageMeta.title}" />
    <meta name="twitter:description" content="${pageMeta.description}" />
    <meta name="twitter:image" content="${pageMeta.ogImage}" />
    <meta name="twitter:image:alt" content="${meta.ogImageAlt}" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="preload" as="font" href="/assets/fonts/bricolage-grotesque-latin.woff2" type="font/woff2" crossorigin />${route === '/' ? `
    <link rel="preload" as="image" href="/assets/images/hero-portrait.webp" type="image/webp" />` : ''}
    <link rel="stylesheet" href="${cssPath}" />
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Adryan Miguel",
        "jobTitle": "${profile.role}",
        "description": "${meta.description}",
        "knowsAbout": ["Landing pages", "Sites completos", "Design digital", "Sistemas sob medida"],
        "address": { "@type": "PostalAddress", "addressRegion": "Minas Gerais", "addressCountry": "BR" }
      }
    </script>
    <script>
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
    </noscript>
  </head>
  <body>
    <div id="root">${content}</div>
    <script type="module" src="${jsPath}"></script>
  </body>
</html>`

  const filePath = route === '/'
    ? join(distDir, 'index.html')
    : join(distDir, route.slice(1), 'index.html')

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
