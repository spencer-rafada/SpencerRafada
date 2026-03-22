import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { compileMDX } from 'next-mdx-remote/rsc'
import { getAllProjects, getProjectBySlug } from '@/lib/projects'
import { mdxComponents } from '@/components/mdx-components'
import ProjectDetailLayout from './project-detail-layout'

interface ProjectPageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  const projects = getAllProjects()
  return projects.map((project) => ({ slug: project.slug }))
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = getProjectBySlug(params.slug)
  if (!project) return { title: 'Project Not Found' }

  return {
    title: `${project.title} - Spencer Rafada`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'article',
      images: project.image ? [`/${project.image}`] : [],
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug)
  if (!project || !project.published) notFound()

  const { content } = await compileMDX({
    source: project.content,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
    },
  })

  const allProjects = getAllProjects()
  const currentIndex = allProjects.findIndex((p) => p.slug === params.slug)
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null
  const nextProject =
    currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null

  return (
    <ProjectDetailLayout
      meta={project}
      prevProject={prevProject}
      nextProject={nextProject}
    >
      {content}
    </ProjectDetailLayout>
  )
}
