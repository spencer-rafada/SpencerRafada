import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

export interface BlogPostMeta {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  published: boolean
  readingTime: string
}

export interface BlogPost extends BlogPostMeta {
  content: string
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'))

  const posts = files.map((filename) => {
    const slug = filename.replace('.mdx', '')
    const filePath = path.join(BLOG_DIR, filename)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)
    const stats = readingTime(content)

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      tags: data.tags || [],
      published: data.published ?? false,
      readingTime: stats.text,
    } as BlogPostMeta
  })

  return posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) return null

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)
  const stats = readingTime(content)

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    tags: data.tags || [],
    published: data.published ?? false,
    readingTime: stats.text,
    content,
  }
}

export function getLatestPosts(count: number = 3): BlogPostMeta[] {
  return getAllPosts().slice(0, count)
}
