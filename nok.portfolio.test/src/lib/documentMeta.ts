import type { PageMeta } from '../data/content'

function setAttr(selector: string, attr: string, value: string) {
  const node = document.querySelector(selector)
  if (node) node.setAttribute(attr, value)
}

export function applyDocumentMeta(page: PageMeta) {
  document.title = page.title
  setAttr('meta[name="description"]', 'content', page.description)
  setAttr('link[rel="canonical"]', 'href', page.canonical)
  setAttr('meta[property="og:title"]', 'content', page.title)
  setAttr('meta[property="og:description"]', 'content', page.description)
  setAttr('meta[property="og:url"]', 'content', page.canonical)
  setAttr('meta[property="og:image"]', 'content', page.ogImage)
  setAttr('meta[property="og:image:alt"]', 'content', page.ogImageAlt)
  setAttr('meta[name="twitter:title"]', 'content', page.title)
  setAttr('meta[name="twitter:description"]', 'content', page.description)
  setAttr('meta[name="twitter:image"]', 'content', page.ogImage)
  setAttr('meta[name="twitter:image:alt"]', 'content', page.ogImageAlt)
}
