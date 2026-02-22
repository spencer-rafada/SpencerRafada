import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

export interface ProjectMeta {
  slug: string
  title: string
  description: string
  date: string
  madeAt?: string
  tools: string[]
  link: string
  github?: string
  image: string
  screenshots: string[]
  video?: string
  published: boolean
  readingTime: string
}

export interface Project extends ProjectMeta {
  content: string
}

const PROJECTS_DIR = path.join(process.cwd(), 'content', 'projects')

export function getAllProjects(): ProjectMeta[] {
  if (!fs.existsSync(PROJECTS_DIR)) return []

  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith('.mdx'))

  const projects = files.map((filename) => {
    const slug = filename.replace('.mdx', '')
    const filePath = path.join(PROJECTS_DIR, filename)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)
    const stats = readingTime(content)

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      madeAt: data.madeAt,
      tools: data.tools || [],
      link: data.link || '',
      github: data.github,
      image: data.image,
      screenshots: data.screenshots || [],
      video: data.video,
      published: data.published ?? false,
      readingTime: stats.text,
    } as ProjectMeta
  })

  return projects
    .filter((project) => project.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getProjectBySlug(slug: string): Project | null {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) return null

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)
  const stats = readingTime(content)

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    madeAt: data.madeAt,
    tools: data.tools || [],
    link: data.link || '',
    github: data.github,
    image: data.image,
    screenshots: data.screenshots || [],
    video: data.video,
    published: data.published ?? false,
    readingTime: stats.text,
    content,
  }
}
