/**
 * Único arquivo de conteúdo.
 * Edite bio, contato, projetos, serviços e textos aqui.
 * Imagens de projeto ainda são placas temporárias; os textos já são os finais.
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
  external?: boolean
}

export const profile = {
  name: 'Adryan Miguel',
  given: 'Adryan',
  family: 'Miguel',
  role: 'Designer e desenvolvedor front-end',
  location: 'Minas Gerais, Brasil',
  availability: 'Aberto a novos projetos',
  year: '2026',
  disciplines: 'Design / Código / Movimento',
  shortBio:
    'Designer e desenvolvedor front-end. Crio landing pages e interfaces com movimento, do primeiro rascunho ao código no ar.',
  about:
    'Sou o Adryan, de Minas Gerais. Trabalho onde o design encontra o código: desenho a interface, escrevo o front-end e cuido de cada transição, hover e rolagem até o site parecer vivo. Gosto de projetos com personalidade, que fogem do template e contam a história de uma marca em poucos segundos.',
  since: 'Design, código e movimento.',
  marks: {
    portfolio: 'Portfólio / 2026',
    intro: '01 — Início',
    practice: 'Front-end / Design',
    code: 'AM_001',
    archive: 'Indice_Portfolio',
  },
}

export const navigation = [
  { id: 'work', label: 'Trabalhos', index: '01' },
  { id: 'services', label: 'Serviços', index: '02' },
  { id: 'about', label: 'Sobre', index: '03' },
  { id: 'contact', label: 'Contato', index: '04' },
] as const

export const sectionIndex: Record<string, string> = {
  intro: '01',
  services: '02',
  work: '03',
  process: '04',
  about: '05',
  contact: '06',
}

export const projectSeal = 'Projeto conceitual'

export const services: Service[] = [
  {
    index: '01',
    title: 'Landing pages',
    description: 'Uma página, uma história. Do rascunho ao ar, com o ritmo da marca.',
    image: {
      src: '/assets/images/project-01-cover.webp',
      width: 1920,
      height: 1200,
      alt: 'Referência de landing page a partir do projeto conceitual Caldo Café.',
    },
  },
  {
    index: '02',
    title: 'Desenvolvimento front-end',
    description: 'A interface vira código: responsivo, preciso e com movimento no lugar certo.',
    image: {
      src: '/assets/images/project-02-cover.webp',
      width: 1920,
      height: 1200,
      alt: 'Referência de front-end a partir do projeto conceitual Serra Bikes.',
    },
  },
  {
    index: '03',
    title: 'Design digital',
    description: 'Direção visual com personalidade, longe do template e perto da marca.',
    image: {
      src: '/assets/images/project-03-cover.webp',
      width: 1920,
      height: 1200,
      alt: 'Referência de design digital a partir do projeto conceitual Atlas Arquitetura.',
    },
  },
]

export const projects: Project[] = [
  {
    id: 'P_01',
    index: '01',
    cursor: 'VER_01',
    name: 'Caldo Café',
    category: 'Landing page · Identidade visual',
    year: '2026',
    description:
      'Site para uma cafeteria de especialidade em Belo Horizonte, com cardápio que se monta na rolagem e fotos que respiram no ritmo da página.',
    url: '',
    layout: 'left',
    cover: {
      src: '/assets/images/project-01-cover.webp',
      width: 1920,
      height: 1200,
      alt: 'Capa conceitual do site Caldo Café, cafeteria de especialidade em Belo Horizonte.',
    },
    secondary: {
      src: '/assets/images/project-01-detail.webp',
      width: 1600,
      height: 1200,
      alt: 'Detalhe conceitual do Caldo Café, com o cardápio se montando na rolagem.',
    },
  },
  {
    id: 'P_02',
    index: '02',
    cursor: 'VER_02',
    name: 'Serra Bikes',
    category: 'Landing page de lançamento',
    year: '2026',
    description:
      'Lançamento de uma bike elétrica feita para as ladeiras mineiras. A bike gira e se desmonta conforme a rolagem, peça por peça.',
    url: '',
    layout: 'right',
    cover: {
      src: '/assets/images/project-02-cover.webp',
      width: 1920,
      height: 1200,
      alt: 'Capa conceitual do lançamento Serra Bikes, bike elétrica para as ladeiras mineiras.',
    },
    secondary: {
      src: '/assets/images/project-02-detail.webp',
      width: 1600,
      height: 1200,
      alt: 'Detalhe conceitual da Serra Bikes, com a bike se desmontando peça por peça.',
    },
  },
  {
    id: 'P_03',
    index: '03',
    cursor: 'VER_03',
    name: 'Atlas Arquitetura',
    category: 'Portfólio · Front-end',
    year: '2025',
    description:
      'Portfólio para um estúdio de arquitetura, com grid editorial, transições entre obras e plantas que se desenham na tela.',
    url: '',
    layout: 'full',
    cover: {
      src: '/assets/images/project-03-cover.webp',
      width: 1920,
      height: 1200,
      alt: 'Capa conceitual do portfólio Atlas Arquitetura, com grid editorial de obras.',
    },
    secondary: {
      src: '/assets/images/project-03-mobile.webp',
      width: 1000,
      height: 1600,
      alt: 'Versão vertical conceitual do portfólio Atlas Arquitetura.',
    },
  },
  {
    id: 'P_04',
    index: '04',
    cursor: 'VER_04',
    name: 'Pulso',
    category: 'Landing page de app · UI design',
    year: '2025',
    description:
      'Pré-lançamento de um app de treino, com microinterações que imitam o ritmo cardíaco e uma lista de espera em um clique.',
    url: '',
    layout: 'split',
    cover: {
      src: '/assets/images/project-04-cover.webp',
      width: 1920,
      height: 1200,
      alt: 'Capa conceitual da landing Pulso, pré-lançamento de um app de treino.',
    },
    secondary: {
      src: '/assets/images/project-04-detail.webp',
      width: 1600,
      height: 1200,
      alt: 'Detalhe conceitual da landing Pulso, com microinterações no ritmo cardíaco.',
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
  const value = href.trim()
  if (value.length === 0 || value === '#' || value.includes('PLACEHOLDER')) return false
  if (/^https:\/\/wa\.me\/55(?:\?|$)/.test(value)) return false
  if (/^https:\/\/(?:www\.)?instagram\.com\/?$/.test(value)) return false
  return true
}
