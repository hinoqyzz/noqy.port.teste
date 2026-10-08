/**
 * Conteúdo central - Oxide Editorial
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
  name: 'Adryan Miguel',
  given: 'Adryan',
  family: 'Miguel',
  role: 'Designer e desenvolvedor front-end',
  location: 'Minas Gerais, Brasil',
  availability: 'Disponível para projetos',
  year: '2026',
  shortBio:
    'Designer e desenvolvedor front-end. Crio landing pages e interfaces com movimento, do primeiro rascunho ao código no ar.',
  about:
    'Sou o Adryan, de Minas Gerais. Trabalho onde o design encontra o código: desenho a interface, escrevo o front-end e cuido de cada transição, hover e rolagem até o site parecer vivo. Gosto de projetos com personalidade, que fogem do template e contam a história de uma marca em poucos segundos.',
  quote: 'Design, código e movimento.',
  since: 'Desde 2021',
  marks: {
    portfolio: '© 2026',
    practice: 'Design, código e movimento.',
  },
}

export const projectSeal = 'Estudo conceitual'

export const navigation = [
  { id: 'work', label: 'Trabalhos', href: '/#trabalhos' },
  { id: 'services', label: 'Serviços', href: '/#servicos' },
  { id: 'about', label: 'Sobre', href: '/#sobre' },
  { id: 'contact', label: 'Contato', href: '/#contato' },
] as const

export const sectionIndex: Record<string, string> = {
  intro: '01',
  services: '02',
  work: '03',
  process: '04',
  about: '05',
  contact: '06',
}

export const services: Service[] = [
  {
    index: '01',
    title: 'Landing pages',
    description: 'Uma página, uma história. Do rascunho ao ar, com o ritmo da marca.',
  },
  {
    index: '02',
    title: 'Desenvolvimento front-end',
    description: 'A interface vira código: responsivo, preciso e com movimento no lugar certo.',
  },
  {
    index: '03',
    title: 'Design digital',
    description: 'Direção visual com personalidade, longe do template e perto da marca.',
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

const whatsappText = 'Oi Adryan, vi seu portfólio e queria conversar sobre um projeto'

export const contact: ContactItem[] = [
  {
    id: 'email',
    label: 'E-mail',
    value: 'contato@noqyzz.com.br',
    href: 'mailto:contato@noqyzz.com.br',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: '(37) 99868-4391',
    href: `https://wa.me/55${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`,
    external: true,
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
  note: 'contato@noqyzz.com.br',
}

export const portraits = {
  hero: {
    src: '/assets/images/hero-portrait.webp',
    width: 1600,
    height: 2000,
    alt: 'Adryan Miguel, retrato editorial vertical.',
  } satisfies Media,
  about: {
    src: '/assets/images/about-adryan.webp',
    width: 1600,
    height: 2000,
    alt: 'Adryan Miguel trabalhando no setup, retrato editorial vertical.',
  } satisfies Media,
}

// Provisional: mapeamento das imagens atuais para os nomes finais
// Quando as imagens finais chegarem, basta trocar os arquivos
export const imageMapping: Record<string, string> = {
  'hero-portrait.webp': 'about-adryan.webp',
  'caldo-cafe-cover.webp': 'project-01-cover.webp',
  'caldo-cafe-thumb.webp': 'project-01-cover.webp',
  'caldo-cafe-detail.webp': 'project-01-detail.webp',
  'caldo-cafe-brand.webp': 'project-01-detail.webp',
  'serra-bikes-cover.webp': 'project-02-cover.webp',
  'serra-bikes-thumb.webp': 'project-02-cover.webp',
  'serra-bikes-detail.webp': 'project-02-cover.webp',
  'serra-bikes-brand.webp': 'project-02-cover.webp',
  'atlas-arquitetura-cover.webp': 'project-03-cover.webp',
  'atlas-arquitetura-thumb.webp': 'project-03-cover.webp',
  'atlas-arquitetura-detail.webp': 'project-03-cover.webp',
  'atlas-arquitetura-brand.webp': 'project-03-mobile.webp',
  'pulso-cover.webp': 'project-04-cover.webp',
  'pulso-thumb.webp': 'project-04-cover.webp',
  'pulso-detail.webp': 'project-04-detail.webp',
  'pulso-brand.webp': 'project-04-detail.webp',
}

export function getImagePath(filename: string): string {
  const mapped = imageMapping[filename]
  if (mapped) {
    return `/assets/images/${mapped}`
  }
  return `/assets/images/${filename}`
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
