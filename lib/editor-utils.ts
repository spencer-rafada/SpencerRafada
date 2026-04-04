import TurndownService from 'turndown'

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
})

// Preserve language class on code blocks for fenced code
turndown.addRule('fencedCodeBlock', {
  filter: (node) => {
    return (
      node.nodeName === 'PRE' &&
      node.firstChild !== null &&
      node.firstChild.nodeName === 'CODE'
    )
  },
  replacement: (_content, node) => {
    const codeEl = node.firstChild as HTMLElement
    const classAttr = codeEl.getAttribute('class') || ''
    const langMatch = classAttr.match(/language-(\w+)/)
    const lang = langMatch ? langMatch[1] : ''
    const code = codeEl.textContent || ''
    return `\n\n\`\`\`${lang}\n${code}\n\`\`\`\n\n`
  },
})

export function htmlToMarkdown(html: string): string {
  return turndown.turndown(html)
}

interface PostMeta {
  title: string
  description: string
  tags: string[]
  date: string
  published: boolean
}

export function generateFrontmatter(meta: PostMeta): string {
  const tagList = meta.tags.map((t) => `"${t}"`).join(', ')
  return `---
title: "${meta.title}"
description: "${meta.description}"
date: "${meta.date}"
tags: [${tagList}]
published: ${meta.published}
---`
}

export function generateMdxContent(meta: PostMeta, html: string): string {
  const frontmatter = generateFrontmatter(meta)
  const markdown = htmlToMarkdown(html)
  return `${frontmatter}\n\n${markdown}\n`
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function todayDateString(): string {
  const d = new Date()
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
