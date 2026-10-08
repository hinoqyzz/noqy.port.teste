# Adryan Miguel — Oxide Studio

Portfólio pessoal de Adryan Miguel (landing pages, front-end e design digital). Direção de arte **Oxide Studio**: editorial industrial, tátil, escura e quente.

## Setup

```bash
cd nok.portfolio.test
npm install
```

## Commands

```bash
npm run dev       # servidor local
npm run build     # TypeScript + build de produção
npm run preview   # pré-visualiza o build
npm run lint      # oxlint
```

## Project structure

```
nok.portfolio.test/
├── public/assets/images/     # fotografias, capas e noise.webp
├── src/components/           # header, cursor, botão, reveals, scroll
├── src/sections/             # hero, services, work, process, about, contact, footer
├── src/data/content.ts       # ÚNICO arquivo de conteúdo editável
├── src/hooks/                # reduced motion, mobile, GSAP, estado do site
├── src/styles/               # tokens, tipo, movimento, seções
├── index.html                # SEO, Open Graph, JSON-LD
└── README.md
```

`src/data/projects.ts`, `services.ts` e `social.ts` apenas reexportam `content.ts`.

## Customization

Edite somente `src/data/content.ts`.

| O que mudar | Onde |
| --- | --- |
| Nome | `profile.name`, `profile.given`, `profile.family` |
| Bio curta do hero | `profile.shortBio` |
| Texto sobre | `profile.about` |
| Ano de início | `profile.since` (hoje `[PLACEHOLDER]`) |
| E-mail, WhatsApp, Instagram, LinkedIn, GitHub | `contact[]` — preencha `value` e `href` |
| Link do botão “Start a project” | `cta.href` |
| Serviços | `services` |
| Processo | `processSteps` |
| Competências | `skills` |
| Projetos | `projects` — nome, categoria, ano, descrição, URL e imagens |

Enquanto `href` estiver vazio ou contiver `PLACEHOLDER`, o item não vira link. O botão principal leva à ficha de contato até existir um destino real.

Não invente clientes, métricas ou depoimentos. O que ainda não existe deve continuar marcado como `[PLACEHOLDER]`.

## Asset Generation Guide

Coloque os arquivos em `public/assets/images/`, com estes nomes exatos. O site já aponta para eles.

### Retratos — arquivos finais

Estes dois arquivos já são as fotografias de Adryan. Só substitua se houver uma nova versão, mantendo o nome e o tamanho.

| Arquivo | Tamanho | Uso |
| --- | --- | --- |
| `hero-adryan.webp` | 2000×1200 (5:3) | Hero. O rosto fica à direita; os monitores claros ficam à esquerda. |
| `about-adryan.webp` | 1600×2000 (4:5) | Seção About. |

### Capas de projeto — ainda temporárias

São placas gráficas marcadas `REPLACE`. Troque pelo screenshot ou apresentação do case, sem mockup 3D genérico.

| Arquivo | Tamanho | Uso |
| --- | --- | --- |
| `project-01-cover.webp` | 1920×1200 | Capa do projeto 01 (imagem à esquerda) |
| `project-01-detail.webp` | 1600×1200 | Detalhe do projeto 01, abaixo da capa |
| `project-02-cover.webp` | 1920×1200 | Capa do projeto 02 |
| `project-02-detail.webp` | 1600×1200 | Detalhe complementar do projeto 02 |
| `project-03-cover.webp` | 1920×1200 | Capa do projeto 03 (quase full-width) |
| `project-03-mobile.webp` | 1000×1600 | Placa vertical do projeto 03, ao lado da capa no desktop e acima dela no mobile |
| `project-04-cover.webp` | 1920×1200 | Capa do projeto 04 |
| `project-04-detail.webp` | 1600×1200 | Segunda imagem do projeto 04 (layout dividido). Arquivo extra em relação à lista original, necessário para o par de imagens. |

Direção das capas: a interface é a protagonista, fundo carvão / creme / terracota, enquadramento nítido, sem mockup de notebook.

### Textura

| Arquivo | Tamanho | Uso |
| --- | --- | --- |
| `noise.webp` | 512×512 | Overlay global de grão. Opacidade CSS `0.045`. Não substituir por ruído pesado. |

### Como gerar ou fotografar, se precisar refazer

**Hero.** Retrato editorial horizontal no setup escuro. Roupa neutra, luz indireta quente, brilho discreto dos monitores, sem RGB azul/roxo. Deixar espaço negativo. Não usar pessoa fictícia.

**About.** Retrato vertical documental, Adryan fora do centro, ambiente real visível, luz quente e baixa saturação.

**Projetos.** Screenshot ou recorte editorial da interface real. Cada projeto com enquadramento diferente.

**Open Graph.** `index.html` usa `hero-adryan.webp` como `og:image`. Troque o meta quando existir uma imagem de compartilhamento própria.

**Srcset e AVIF.** `npm run images` gera `public/assets/images/opt/` (WebP + AVIF nas larguras de exibição) e reescreve `src/data/imageSets.ts`. O componente `Picture` usa `<picture>` com `srcset` e `sizes`. Rode o script de novo depois de trocar uma fotografia ou capa. O `src` original continua sendo o fallback.

## Design Direction

Oxide Studio — industrial editorial / tactile digital system.

Paleta:

- `#171411` fundo
- `#24201B` superfície
- `#EFE7D8` texto
- `#9D9488` texto secundário
- `#625B53` texto discreto
- `#C85B3C` accent (terracota), em torno de 5–12% da composição

Fontes (Google Fonts):

- Familjen Grotesk — títulos, navegação, corpo
- DM Mono — índices, labels, metadados

O accent não leva glow. Não há preto puro como fundo.

## Performance Notes

- GSAP + ScrollTrigger para timelines, pin da coluna “Selected work”, scrub do processo e parallax. O deslocamento é de 8% do elemento (`yPercent` / `xPercent`), no teto do intervalo de 3–8% do briefing, só no desktop e só com `transform`.
- Lenis só quando `prefers-reduced-motion` não está ativo. Com movimento reduzido, a rolagem é nativa, o cursor customizado some, o véu de entrada não aparece e os reveals pesados não rodam.
- Animações usam `transform` e `opacity`. O cursor, o hover de imagem e o parallax também.
- Hero sem lazy-load, com `preload` do AVIF em `srcset`. Demais imagens usam `loading="lazy"`, `width`/`height` e `<picture>` (AVIF + WebP).
- Abertura: um véu carvão com fio terracota, cerca de 1s (`0.4s` de traço + `0.62s` de wipe), dentro do teto de 1,5s. A tipografia do hero entra junto com o wipe.
- Navegação por âncoras (header e menu INDEX) cobre a tela com o mesmo wipe, troca a seção por baixo e revela. Sem rotas internas. `prefers-reduced-motion` pula o wipe e salta direto.
- Horário do rodapé é o relógio local do navegador, sem API.
- JSON-LD traz só o que é conhecido: nome, função e Minas Gerais / BR. Sem telefone, cidade, empresa ou redes inventadas.
