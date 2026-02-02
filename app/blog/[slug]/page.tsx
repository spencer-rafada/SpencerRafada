import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { compileMDX } from 'next-mdx-remote/rsc'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { mdxComponents } from '@/components/mdx-components'
import BlogPostLayout from './blog-post-layout'

interface BlogPostPageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = getPostBySlug(params.slug)
  if (!post) return { title: 'Post Not Found' }

  return {
    title: `${post.title} - Spencer Rafada`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: ['Spencer Rafada'],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug)
  if (!post || !post.published) notFound()

  const { content } = await compileMDX({
    source: post.content,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
    },
  })

  return <BlogPostLayout meta={post}>{content}</BlogPostLayout>
}
