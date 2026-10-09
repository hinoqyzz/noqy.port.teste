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
          <svg class="header__logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 397 542" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M35.8 533.5C34.5 532.8 34.0 529.1 33.5 517.3C33.4 513.8 33.0 506.9 32.6 501.9C32.3 496.9 31.9 490.3 31.8 487.1C31.6 484.0 31.3 479.6 31.1 477.4C30.9 475.2 30.6 470.7 30.5 467.3C30.3 463.9 30.1 458.7 29.9 455.8C29.7 452.8 29.3 447.2 29.1 443.2C28.9 439.3 28.5 433.1 28.2 429.4C28.0 425.7 27.6 420.0 27.5 416.9C27.4 413.7 27.1 408.6 26.9 405.5C26.7 402.4 26.3 396.8 26.1 393.0C25.9 389.2 25.6 383.6 25.4 380.6C24.8 372.0 24.5 368.3 24.2 362.0C24.1 358.8 23.7 353.1 23.5 349.5C23.2 345.9 22.9 340.3 22.8 337.1C22.6 334.0 22.3 328.6 22.0 325.1C21.7 321.7 21.3 316.6 21.1 313.8C20.9 310.9 20.6 307.1 20.4 305.1C20.2 303.2 19.9 300.0 19.7 297.9C19.6 295.8 19.3 292.0 19.0 289.5C18.8 287.0 18.4 283.1 18.3 281.0C18.1 278.9 17.7 274.4 17.4 271.1C17.1 267.8 16.7 264.0 16.6 262.6C16.6 261.2 16.3 258.8 16.1 257.1C15.9 255.5 15.6 251.8 15.4 248.9C15.2 246.0 14.7 241.2 14.4 238.1C14.1 235.1 13.7 231.4 13.6 230.0C13.5 228.6 13.3 226.0 13.1 224.3C12.9 222.6 12.5 218.5 12.2 215.3C12.0 212.0 11.5 207.5 11.3 205.2C11.0 203.0 10.7 200.1 10.6 198.8C10.5 197.4 10.3 194.5 10.0 192.2C8.0 175.1 7.7 155.9 9.4 146.6C11.7 133.3 18.3 123.6 27.9 119.4C29.0 118.9 33.7 117.3 38.4 115.7C52.7 111.1 68.3 104.9 93.5 94.2C105.5 89.2 104.9 88.8 106.5 102.5C106.6 103.8 107.0 106.8 107.4 109.1C108.5 117.2 109.0 120.9 109.5 125.3C109.8 127.8 110.2 131.4 110.5 133.3C110.7 135.3 111.1 138.1 111.2 139.5C111.4 140.9 111.7 144.1 112.0 146.5C112.3 148.9 112.6 152.3 112.7 154.0C112.9 155.7 113.2 159.0 113.5 161.4C114.0 166.1 115.1 178.1 115.5 184.4C116.4 197.1 115.8 196.9 127.4 189.0C196.3 141.8 250.2 84.8 294.9 11.6C297.7 7.2 299.4 6.8 300.5 10.6C300.6 11.0 301.0 12.6 301.5 14.0C304.0 22.7 307.0 35.9 308.4 44.8C309.0 48.5 309.3 50.9 310.6 62.8C312.8 81.9 312.6 104.3 310.1 117.5C304.0 150.2 291.8 173.9 268.5 198.7C262.8 204.7 262.8 204.7 268.8 207.1C289.4 215.4 302.8 228.7 309.6 247.6C312.0 254.3 314.7 266.5 315.8 274.9C315.9 276.1 316.2 277.8 316.4 278.7C316.6 279.6 316.8 281.6 317.0 283.0C317.1 284.4 317.5 287.8 317.9 290.5C318.2 293.2 318.6 296.6 318.7 298.1C318.9 299.6 319.2 301.8 319.4 302.9C319.6 304.0 319.9 306.1 320.0 307.6C320.5 312.5 321.7 323.5 322.4 328.2C322.9 332.5 323.4 336.2 324.4 345.9C324.6 347.8 325.0 351.3 325.4 353.6C325.7 356.0 326.0 358.7 326.1 359.6C326.3 361.5 327.6 372.9 328.0 376.0C332.3 409.4 351.8 444.6 384.1 477.5C391.5 485.0 391.5 484.9 383.2 487.2C372.8 490.1 357.2 493.6 349.3 494.7C347.4 495.0 345.0 495.4 344.0 495.6C328.8 498.6 302.6 499.1 288.2 496.7C265.4 493.0 249.6 483.5 240.3 468.0C232.4 454.9 212.1 402.7 197.5 358.2C193.6 346.4 194.3 346.9 185.1 349.1C182.4 349.7 178.8 350.5 177.2 350.8C175.7 351.2 171.1 352.2 167.0 353.1C162.9 354.0 156.6 355.4 153.0 356.2C142.6 358.5 143.4 357.2 144.6 370.5C146.4 390.2 146.7 413.1 145.5 427.9C144.6 437.8 143.7 447.2 143.4 448.9C143.2 450.0 142.9 452.2 142.6 453.9C141.0 467.3 140.5 468.9 137.0 473.1C116.2 498.3 86.5 518.6 55.8 528.7C43.7 532.6 37.3 534.2 35.8 533.5Z"/></svg>
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
              <p class="about__vert mono" aria-hidden="true">${profile.given}</p>
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
          <svg class="header__logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 397 542" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M35.8 533.5C34.5 532.8 34.0 529.1 33.5 517.3C33.4 513.8 33.0 506.9 32.6 501.9C32.3 496.9 31.9 490.3 31.8 487.1C31.6 484.0 31.3 479.6 31.1 477.4C30.9 475.2 30.6 470.7 30.5 467.3C30.3 463.9 30.1 458.7 29.9 455.8C29.7 452.8 29.3 447.2 29.1 443.2C28.9 439.3 28.5 433.1 28.2 429.4C28.0 425.7 27.6 420.0 27.5 416.9C27.4 413.7 27.1 408.6 26.9 405.5C26.7 402.4 26.3 396.8 26.1 393.0C25.9 389.2 25.6 383.6 25.4 380.6C24.8 372.0 24.5 368.3 24.2 362.0C24.1 358.8 23.7 353.1 23.5 349.5C23.2 345.9 22.9 340.3 22.8 337.1C22.6 334.0 22.3 328.6 22.0 325.1C21.7 321.7 21.3 316.6 21.1 313.8C20.9 310.9 20.6 307.1 20.4 305.1C20.2 303.2 19.9 300.0 19.7 297.9C19.6 295.8 19.3 292.0 19.0 289.5C18.8 287.0 18.4 283.1 18.3 281.0C18.1 278.9 17.7 274.4 17.4 271.1C17.1 267.8 16.7 264.0 16.6 262.6C16.6 261.2 16.3 258.8 16.1 257.1C15.9 255.5 15.6 251.8 15.4 248.9C15.2 246.0 14.7 241.2 14.4 238.1C14.1 235.1 13.7 231.4 13.6 230.0C13.5 228.6 13.3 226.0 13.1 224.3C12.9 222.6 12.5 218.5 12.2 215.3C12.0 212.0 11.5 207.5 11.3 205.2C11.0 203.0 10.7 200.1 10.6 198.8C10.5 197.4 10.3 194.5 10.0 192.2C8.0 175.1 7.7 155.9 9.4 146.6C11.7 133.3 18.3 123.6 27.9 119.4C29.0 118.9 33.7 117.3 38.4 115.7C52.7 111.1 68.3 104.9 93.5 94.2C105.5 89.2 104.9 88.8 106.5 102.5C106.6 103.8 107.0 106.8 107.4 109.1C108.5 117.2 109.0 120.9 109.5 125.3C109.8 127.8 110.2 131.4 110.5 133.3C110.7 135.3 111.1 138.1 111.2 139.5C111.4 140.9 111.7 144.1 112.0 146.5C112.3 148.9 112.6 152.3 112.7 154.0C112.9 155.7 113.2 159.0 113.5 161.4C114.0 166.1 115.1 178.1 115.5 184.4C116.4 197.1 115.8 196.9 127.4 189.0C196.3 141.8 250.2 84.8 294.9 11.6C297.7 7.2 299.4 6.8 300.5 10.6C300.6 11.0 301.0 12.6 301.5 14.0C304.0 22.7 307.0 35.9 308.4 44.8C309.0 48.5 309.3 50.9 310.6 62.8C312.8 81.9 312.6 104.3 310.1 117.5C304.0 150.2 291.8 173.9 268.5 198.7C262.8 204.7 262.8 204.7 268.8 207.1C289.4 215.4 302.8 228.7 309.6 247.6C312.0 254.3 314.7 266.5 315.8 274.9C315.9 276.1 316.2 277.8 316.4 278.7C316.6 279.6 316.8 281.6 317.0 283.0C317.1 284.4 317.5 287.8 317.9 290.5C318.2 293.2 318.6 296.6 318.7 298.1C318.9 299.6 319.2 301.8 319.4 302.9C319.6 304.0 319.9 306.1 320.0 307.6C320.5 312.5 321.7 323.5 322.4 328.2C322.9 332.5 323.4 336.2 324.4 345.9C324.6 347.8 325.0 351.3 325.4 353.6C325.7 356.0 326.0 358.7 326.1 359.6C326.3 361.5 327.6 372.9 328.0 376.0C332.3 409.4 351.8 444.6 384.1 477.5C391.5 485.0 391.5 484.9 383.2 487.2C372.8 490.1 357.2 493.6 349.3 494.7C347.4 495.0 345.0 495.4 344.0 495.6C328.8 498.6 302.6 499.1 288.2 496.7C265.4 493.0 249.6 483.5 240.3 468.0C232.4 454.9 212.1 402.7 197.5 358.2C193.6 346.4 194.3 346.9 185.1 349.1C182.4 349.7 178.8 350.5 177.2 350.8C175.7 351.2 171.1 352.2 167.0 353.1C162.9 354.0 156.6 355.4 153.0 356.2C142.6 358.5 143.4 357.2 144.6 370.5C146.4 390.2 146.7 413.1 145.5 427.9C144.6 437.8 143.7 447.2 143.4 448.9C143.2 450.0 142.9 452.2 142.6 453.9C141.0 467.3 140.5 468.9 137.0 473.1C116.2 498.3 86.5 518.6 55.8 528.7C43.7 532.6 37.3 534.2 35.8 533.5Z"/></svg>
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
