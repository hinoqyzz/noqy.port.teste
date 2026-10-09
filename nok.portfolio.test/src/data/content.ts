/**
 * Conteúdo central - Grafite A2
 * Todos os textos, projetos, serviços e metadados.
 */

export type Media = {
  src: string
  width: number
  height: number
  alt: string
}

export type ProjectLayout = 'left' | 'right' | 'full' | 'split'

export type Project = {
  id: string
  slug: string
  index: string
  name: string
  category: string
  year: string
  description: string
  challenge: string
  direction: {
    colors: string[]
    fonts: string[]
  }
  role: string
  stack: string[]
  cover: Media
  thumb: Media
  detail: Media
  brand: Media
  secondary?: Media
  layout: ProjectLayout
  cursor?: string
  url?: string
}

export type Service = {
  index: string
  title: string
  description: string
}

export type ProcessStep = {
  index: string
  title: string
  description: string
}

export type ContactItem = {
  id: string
  label: string
  value: string
  href: string
  external?: boolean
}

export const profile = {
  name: 'noqyzz',
  given: 'Adryan',
  family: '',
  role: 'Designer e desenvolvedor',
  location: '',
  availability: 'Disponível para projetos',
  year: '2026',
  shortBio:
    'Designer e desenvolvedor. Crio landing pages, sites completos e sistemas sob medida, do primeiro rascunho ao código no ar.',
  about:
    'Sou o Adryan. Trabalho onde o design encontra o código: desenho a interface, escrevo o código e cuido de cada transição, hover e rolagem até o site parecer vivo. Gosto de projetos com personalidade, que fogem do template e contam a história de uma marca em poucos segundos.',
  quote: 'Design, código e movimento.',
  since: 'Desde 2021',
  marks: {
    portfolio: '© 2026',
    practice: 'Design, código e movimento.',
  },
}

export const projectSeal = 'Estudo conceitual'

export const navigation = [
  { id: 'trabalhos', label: 'Trabalhos', href: '/#trabalhos' },
  { id: 'sobre', label: 'Sobre', href: '/#sobre' },
  { id: 'contato', label: 'Contato', href: '/#contato' },
] as const

export const services: Service[] = [
  {
    index: '01',
    title: 'Landing pages',
    description: 'Uma página, uma história. Do rascunho ao ar, com o ritmo da marca.',
  },
  {
    index: '02',
    title: 'Sites completos',
    description: 'Site institucional com várias páginas, rápido no celular e fácil de achar no Google.',
  },
  {
    index: '03',
    title: 'Design digital',
    description: 'Direção visual com personalidade, longe do template e perto da marca.',
  },
  {
    index: '04',
    title: 'Sistemas sob medida',
    description: 'Agendamentos, cardápios, painéis e o que o seu negócio precisar, feito sob medida.',
  },
]

// Slugs para as URLs: caldo-cafe, serra-bikes, atlas-arquitetura, pulso
export const projects: Project[] = [
  {
    id: 'caldo-cafe',
    slug: 'caldo-cafe',
    index: '01',
    name: 'Caldo Café',
    category: 'Landing page · Identidade visual',
    year: '2026',
    description:
      'Site para uma cafeteria de especialidade em Belo Horizonte, com cardápio que se monta na rolagem e fotos que respiram no ritmo da página.',
    challenge:
      'Criar uma experiência digital que traduzisse o cuidado artesanal do café especial em cada detalhe da interface.',
    direction: {
      colors: ['#2C1810', '#D4A574', '#F5F0E8', '#8B4513'],
      fonts: ['Playfair Display', 'Inter'],
    },
    role: 'Design e desenvolvimento front-end',
    stack: ['React', 'GSAP', 'Vite'],
    layout: 'left',
    cover: {
      src: '/assets/images/caldo-cafe-cover.webp',
      width: 2400,
      height: 1350,
      alt: 'Mockup do site Caldo Café: xícara sobre a mesa de madeira, título e botão Ver cardápio.',
    },
    thumb: {
      src: '/assets/images/caldo-cafe-thumb.webp',
      width: 960,
      height: 600,
      alt: 'Preview do site Caldo Café.',
    },
    detail: {
      src: '/assets/images/caldo-cafe-detail.webp',
      width: 1600,
      height: 1600,
      alt: 'Detalhe do cardápio do Caldo Café, com espresso, coado V60 e pão de queijo.',
    },
    brand: {
      src: '/assets/images/caldo-cafe-brand.webp',
      width: 1600,
      height: 2000,
      alt: 'Peça de marca do Caldo Café: embalagem de café especial.',
    },
  },
  {
    id: 'serra-bikes',
    slug: 'serra-bikes',
    index: '02',
    name: 'Serra Bikes',
    category: 'Landing page de lançamento',
    year: '2026',
    description:
      'Lançamento de uma bike elétrica feita para as ladeiras mineiras, com apresentação dinâmica das especificações técnicas.',
    challenge:
      'Apresentar um produto técnico de forma envolvente, destacando inovação sem perder a clareza das informações.',
    direction: {
      colors: ['#0A0A0A', '#00D4AA', '#FFFFFF', '#1A1A1A'],
      fonts: ['Space Grotesk', 'Inter'],
    },
    role: 'Design e desenvolvimento front-end',
    stack: ['React', 'Three.js', 'GSAP'],
    layout: 'right',
    cover: {
      src: '/assets/images/serra-bikes-cover.webp',
      width: 2400,
      height: 1350,
      alt: 'Mockup da Serra Bikes: bike elétrica preta com especificações de motor 250W e 80 km de autonomia.',
    },
    thumb: {
      src: '/assets/images/serra-bikes-thumb.webp',
      width: 960,
      height: 600,
      alt: 'Preview do site Serra Bikes.',
    },
    detail: {
      src: '/assets/images/serra-bikes-detail.webp',
      width: 1600,
      height: 1600,
      alt: 'Detalhe técnico da Serra Bikes: painel de especificações.',
    },
    brand: {
      src: '/assets/images/serra-bikes-brand.webp',
      width: 1600,
      height: 2000,
      alt: 'Peça de marca Serra Bikes: cartaz de lançamento.',
    },
  },
  {
    id: 'atlas-arquitetura',
    slug: 'atlas-arquitetura',
    index: '03',
    name: 'Atlas Arquitetura',
    category: 'Portfólio · Front-end',
    year: '2025',
    description:
      'Portfólio para um estúdio de arquitetura, com grid editorial, transições entre obras e plantas que se desenham na tela.',
    challenge:
      'Construir uma navegação fluida entre projetos arquitetônicos, respeitando a estética minimalista do estúdio.',
    direction: {
      colors: ['#FAFAFA', '#1A1A1A', '#D4D4D4', '#737373'],
      fonts: ['Neue Haas Grotesk', 'Cormorant'],
    },
    role: 'Desenvolvimento front-end',
    stack: ['Next.js', 'Framer Motion', 'Sanity'],
    layout: 'full',
    cover: {
      src: '/assets/images/atlas-arquitetura-cover.webp',
      width: 2400,
      height: 1350,
      alt: 'Mockup do portfólio Atlas Arquitetura, com a casa na serra e a planta sobreposta.',
    },
    thumb: {
      src: '/assets/images/atlas-arquitetura-thumb.webp',
      width: 960,
      height: 600,
      alt: 'Preview do site Atlas Arquitetura.',
    },
    detail: {
      src: '/assets/images/atlas-arquitetura-detail.webp',
      width: 1600,
      height: 1600,
      alt: 'Detalhe da obra Casa Serra no site Atlas Arquitetura.',
    },
    brand: {
      src: '/assets/images/atlas-arquitetura-brand.webp',
      width: 1600,
      height: 2000,
      alt: 'Peça de marca Atlas Arquitetura: cartão de visita e papelaria.',
    },
  },
  {
    id: 'pulso',
    slug: 'pulso',
    index: '04',
    name: 'Pulso',
    category: 'Landing page de app · UI design',
    year: '2025',
    description:
      'Pré-lançamento de um app de treino, com microinterações que imitam o ritmo cardíaco e uma lista de espera em um clique.',
    challenge:
      'Transmitir energia e movimento em uma página estática, criando urgência para o pré-lançamento.',
    direction: {
      colors: ['#FF3366', '#1A1A2E', '#FFFFFF', '#FF6B6B'],
      fonts: ['Satoshi', 'Inter'],
    },
    role: 'Design e desenvolvimento front-end',
    stack: ['React', 'GSAP', 'Tailwind'],
    layout: 'split',
    cover: {
      src: '/assets/images/pulso-cover.webp',
      width: 2400,
      height: 1350,
      alt: 'Mockup da landing Pulso: o site no navegador e o app no celular, com o pulso em 128 bpm.',
    },
    thumb: {
      src: '/assets/images/pulso-thumb.webp',
      width: 960,
      height: 600,
      alt: 'Preview do site Pulso.',
    },
    detail: {
      src: '/assets/images/pulso-detail.webp',
      width: 1600,
      height: 1600,
      alt: 'Detalhe do app Pulso: tela de treino com ritmo cardíaco.',
    },
    brand: {
      src: '/assets/images/pulso-brand.webp',
      width: 1600,
      height: 2000,
      alt: 'Peça de marca Pulso: cartões do app com ritmo cardíaco e progresso.',
    },
  },
]

export const processSteps: ProcessStep[] = [
  {
    index: '01',
    title: 'Descoberta',
    description: 'Entendo o negócio, quem chega e o que a página precisa fazer.',
  },
  {
    index: '02',
    title: 'Direção',
    description: 'Defino hierarquia, referências e como a interface se move.',
  },
  {
    index: '03',
    title: 'Design',
    description: 'Desenho a interface e o sistema visual, do tipo à cor.',
  },
  {
    index: '04',
    title: 'Desenvolvimento',
    description: 'Escrevo o front-end responsivo e deixo o site no ar.',
  },
  {
    index: '05',
    title: 'Refinamento',
    description: 'Ajusto movimento, detalhes e o que só aparece no uso.',
  },
]

export const skills = [
  'Design',
  'Landing pages',
  'Front-end',
  'Movimento',
  'Design de interface',
  'Design responsivo',
]

export const whatsappNumber = '37998684391'
export const instagramHandle = 'hinoqyzz'

export const whatsappText = 'Oi! Vi seu portfólio e queria conversar sobre um projeto.'

export const whatsapp = {
  href: `https://wa.me/55${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`,
  line1: 'Chamar no',
  line2: 'WhatsApp',
  ariaLabel: 'Chamar no WhatsApp (abre em nova aba)',
}

export const contact: ContactItem[] = [
  {
    id: 'email',
    label: 'E-mail',
    value: 'contato@noqyzz.com.br',
    href: 'mailto:contato@noqyzz.com.br',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    value: `@${instagramHandle}`,
    href: `https://www.instagram.com/${instagramHandle}/`,
    external: true,
  },
]

export const cta = {
  href: 'mailto:contato@noqyzz.com.br',
  label: 'Começar um projeto',
  note: 'Ou, se preferir, por e-mail ou Instagram:',
}

export const portraits = {
  hero: {
    src: '/assets/images/hero-portrait.webp',
    width: 1600,
    height: 2000,
    alt: 'Retrato em preto e branco no setup de trabalho, com monitores e microfone.',
  } satisfies Media,
  about: {
    src: '/assets/images/about-portrait.webp',
    width: 1600,
    height: 2000,
    alt: 'Adryan, de moletom preto, faz um enquadramento de câmera com as mãos. Foto em preto e branco.',
  } satisfies Media,
}

export function isRealHref(href: string) {
  const value = href.trim()
  if (value.length === 0 || value === '#' || value.includes('PLACEHOLDER')) return false
  if (/^https:\/\/wa\.me\/55(?:\?|$)/.test(value)) return false
  if (/^https:\/\/(?:www\.)?instagram\.com\/?$/.test(value)) return false
  return true
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getNextProject(currentSlug: string): Project {
  const index = projects.findIndex((p) => p.slug === currentSlug)
  const nextIndex = (index + 1) % projects.length
  return projects[nextIndex]
}

export const meta = {
  title: 'noqyzz — Sites, landing pages e sistemas',
  description:
    'noqyzz: design e desenvolvimento de landing pages, sites completos e sistemas sob medida, do primeiro rascunho ao código no ar.',
  ogImageAlt: 'noqyzz — sites, landing pages e sistemas',
  baseUrl: 'https://adryanmiguel.vercel.app',
}

export type PageMeta = {
  title: string
  description: string
  canonical: string
  ogImage: string
  ogImageAlt: string
}

function ogImageUrl() {
  return `${meta.baseUrl}/assets/images/og-image.jpg`
}

export function getHomeMeta(): PageMeta {
  return {
    title: meta.title,
    description: meta.description,
    canonical: meta.baseUrl,
    ogImage: ogImageUrl(),
    ogImageAlt: meta.ogImageAlt,
  }
}

export function getCaseMeta(project: Project): PageMeta {
  return {
    title: `${project.name} — noqyzz`,
    description: `${project.description} Projeto de ${project.category}.`,
    canonical: `${meta.baseUrl}/trabalhos/${project.slug}`,
    ogImage: ogImageUrl(),
    ogImageAlt: meta.ogImageAlt,
  }
}

export function getNotFoundMeta(): PageMeta {
  return {
    title: 'Página não encontrada — noqyzz',
    description: 'O endereço que você tentou acessar não existe ou foi movido.',
    canonical: meta.baseUrl,
    ogImage: ogImageUrl(),
    ogImageAlt: meta.ogImageAlt,
  }
}
