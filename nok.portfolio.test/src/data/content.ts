/**
 * Único arquivo de conteúdo.
 * Edite bio, contato, projetos, serviços e textos aqui.
 * Tudo que ainda não foi definido fica marcado como [PLACEHOLDER].
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
  index: string
  cursor: string
  name: string
  category: string
  year: string
  description: string
  url: string
  cover: Media
  secondary?: Media
  layout: ProjectLayout
}

export type Service = {
  index: string
  title: string
  description: string
  image: Media
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
}

export const profile = {
  name: 'Adryan Miguel',
  given: 'Adryan',
  family: 'Miguel',
  role: 'Front-End Developer & Designer',
  location: 'Based in Minas Gerais, Brazil',
  availability: 'Available for select projects',
  year: '2026',
  disciplines: 'Design / Code / Motion',
  shortBio: '[PLACEHOLDER — BIO CURTA]',
  about: '[PLACEHOLDER — TEXTO SOBRE ADRYAN]',
  since: '[PLACEHOLDER]',
  marks: {
    portfolio: 'Portfolio / 2026',
    intro: '01 — Intro',
    practice: 'Front-end / Design',
    code: 'AM_001',
    archive: 'Portfolio_Index',
  },
}

export const navigation = [
  { id: 'work', label: 'Work', index: '01' },
  { id: 'services', label: 'Services', index: '02' },
  { id: 'about', label: 'About', index: '03' },
  { id: 'contact', label: 'Contact', index: '04' },
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
    title: 'Landing Pages',
    description:
      '[PLACEHOLDER] High-conversion pages combining strategy, interface design and front-end development.',
    image: {
      src: '/assets/images/project-01-cover.webp',
      width: 1920,
      height: 1200,
      alt: '[PLACEHOLDER] Imagem contextual do serviço de landing pages.',
    },
  },
  {
    index: '02',
    title: 'Front-end Development',
    description:
      '[PLACEHOLDER] Responsive interfaces built with attention to performance, motion and visual precision.',
    image: {
      src: '/assets/images/project-02-cover.webp',
      width: 1920,
      height: 1200,
      alt: '[PLACEHOLDER] Imagem contextual do serviço de front-end.',
    },
  },
  {
    index: '03',
    title: 'Digital Design',
    description:
      '[PLACEHOLDER] Visual direction and interface systems designed to give digital products a distinct identity.',
    image: {
      src: '/assets/images/project-03-cover.webp',
      width: 1920,
      height: 1200,
      alt: '[PLACEHOLDER] Imagem contextual do serviço de design digital.',
    },
  },
]

export const projects: Project[] = [
  {
    id: 'P_01',
    index: '01',
    cursor: 'VIEW_01',
    name: '[PLACEHOLDER — NOME DO PROJETO]',
    category: '[PLACEHOLDER — CATEGORIA]',
    year: '2026',
    description: '[PLACEHOLDER — DESCRIÇÃO CURTA DO CASE]',
    url: '[PLACEHOLDER — URL DO PROJETO]',
    layout: 'left',
    cover: {
      src: '/assets/images/project-01-cover.webp',
      width: 1920,
      height: 1200,
      alt: '[PLACEHOLDER — PROJETO 01] Capa temporária. Substituir project-01-cover.webp.',
    },
    secondary: {
      src: '/assets/images/project-01-detail.webp',
      width: 1600,
      height: 1200,
      alt: '[PLACEHOLDER — PROJETO 01] Detalhe temporário. Substituir project-01-detail.webp.',
    },
  },
  {
    id: 'P_02',
    index: '02',
    cursor: 'VIEW_02',
    name: '[PLACEHOLDER — NOME DO PROJETO]',
    category: '[PLACEHOLDER — CATEGORIA]',
    year: '2026',
    description: '[PLACEHOLDER — DESCRIÇÃO CURTA DO CASE]',
    url: '[PLACEHOLDER — URL DO PROJETO]',
    layout: 'right',
    cover: {
      src: '/assets/images/project-02-cover.webp',
      width: 1920,
      height: 1200,
      alt: '[PLACEHOLDER — PROJETO 02] Capa temporária. Substituir project-02-cover.webp.',
    },
    secondary: {
      src: '/assets/images/project-02-detail.webp',
      width: 1600,
      height: 1200,
      alt: '[PLACEHOLDER — PROJETO 02] Detalhe temporário. Substituir project-02-detail.webp.',
    },
  },
  {
    id: 'P_03',
    index: '03',
    cursor: 'VIEW_03',
    name: '[PLACEHOLDER — NOME DO PROJETO]',
    category: '[PLACEHOLDER — CATEGORIA]',
    year: '2026',
    description: '[PLACEHOLDER — DESCRIÇÃO CURTA DO CASE]',
    url: '[PLACEHOLDER — URL DO PROJETO]',
    layout: 'full',
    cover: {
      src: '/assets/images/project-03-cover.webp',
      width: 1920,
      height: 1200,
      alt: '[PLACEHOLDER — PROJETO 03] Capa temporária. Substituir project-03-cover.webp.',
    },
    secondary: {
      src: '/assets/images/project-03-mobile.webp',
      width: 1000,
      height: 1600,
      alt: '[PLACEHOLDER — PROJETO 03] Versão vertical temporária. Substituir project-03-mobile.webp.',
    },
  },
  {
    id: 'P_04',
    index: '04',
    cursor: 'VIEW_04',
    name: '[PLACEHOLDER — NOME DO PROJETO]',
    category: '[PLACEHOLDER — CATEGORIA]',
    year: '2026',
    description: '[PLACEHOLDER — DESCRIÇÃO CURTA DO CASE]',
    url: '[PLACEHOLDER — URL DO PROJETO]',
    layout: 'split',
    cover: {
      src: '/assets/images/project-04-cover.webp',
      width: 1920,
      height: 1200,
      alt: '[PLACEHOLDER — PROJETO 04] Capa temporária. Substituir project-04-cover.webp.',
    },
    secondary: {
      src: '/assets/images/project-04-detail.webp',
      width: 1600,
      height: 1200,
      alt: '[PLACEHOLDER — PROJETO 04] Imagem complementar temporária. Substituir project-04-detail.webp.',
    },
  },
]

export const processSteps: ProcessStep[] = [
  {
    index: '01',
    title: 'Discover',
    description: '[PLACEHOLDER] Understanding the business, audience and objective.',
  },
  {
    index: '02',
    title: 'Direction',
    description: '[PLACEHOLDER] Defining visual hierarchy, references and interaction.',
  },
  {
    index: '03',
    title: 'Design',
    description: '[PLACEHOLDER] Building the interface and visual system.',
  },
  {
    index: '04',
    title: 'Develop',
    description: '[PLACEHOLDER] Turning the design into a responsive, performant experience.',
  },
  {
    index: '05',
    title: 'Refine',
    description: '[PLACEHOLDER] Testing, polishing motion, responsiveness and details.',
  },
]

export const skills = [
  'Design',
  'UI Design',
  'Landing Pages',
  'Front-end',
  'Motion',
  'Responsive Design',
]

export const contact: ContactItem[] = [
  { id: 'email', label: 'Email', value: '[PLACEHOLDER — EMAIL]', href: '' },
  { id: 'whatsapp', label: 'WhatsApp', value: '[PLACEHOLDER — WHATSAPP]', href: '' },
  { id: 'instagram', label: 'Instagram', value: '[PLACEHOLDER — INSTAGRAM]', href: '' },
  { id: 'linkedin', label: 'LinkedIn', value: '[PLACEHOLDER — LINKEDIN]', href: '' },
  { id: 'github', label: 'GitHub', value: '[PLACEHOLDER — GITHUB]', href: '' },
]

export const cta = {
  href: '',
  label: 'Start a project',
  note: '[PLACEHOLDER — LINK DE CONTATO]',
}

export const portraits = {
  hero: {
    src: '/assets/images/hero-adryan.webp',
    width: 2000,
    height: 1200,
    alt: 'Adryan Miguel no setup, retrato editorial horizontal. Monitores à esquerda, rosto à direita.',
  } satisfies Media,
  about: {
    src: '/assets/images/about-adryan.webp',
    width: 1600,
    height: 2000,
    alt: 'Adryan Miguel trabalhando no setup, retrato editorial vertical.',
  } satisfies Media,
}

export function isRealHref(href: string) {
  return href.trim().length > 0 && !href.includes('PLACEHOLDER') && href !== '#'
}
