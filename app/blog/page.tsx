import { getAllPosts } from '@/lib/blog'
import { Metadata } from 'next'
import BlogListClient from './blog-list-client'

export const metadata: Metadata = {
  title: 'Blog - Spencer Rafada',
  description:
    'Thoughts on web development, software engineering, and technology by Spencer Rafada.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return <BlogListClient posts={posts} />
}
