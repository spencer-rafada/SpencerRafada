'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import BlogCard from '@/components/BlogCard'
import type { BlogPostMeta } from '@/lib/blog'

interface BlogListClientProps {
  posts: BlogPostMeta[]
}

export default function BlogListClient({ posts }: BlogListClientProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <main className='min-h-screen py-24 section-padding'>
      <div className='max-width-container'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='mb-16'
        >
          <Link
            href='/'
            className='inline-flex items-center gap-2 text-slate-400 hover:text-slate-100 transition-colors mb-8 group'
          >
            <ArrowLeft
              size={16}
              className='group-hover:-translate-x-1 transition-transform'
            />
            <span>Back to Home</span>
          </Link>
          <h1 className='text-4xl lg:text-5xl font-bold mb-6'>
            Blog <span className='code-accent'>Posts</span>
          </h1>
          <div className='font-mono text-sm text-slate-500 mb-4'>
            <span className='text-green-400'>
              // Thoughts on code and life
            </span>
          </div>
          <p className='text-xl text-slate-400 max-w-2xl'>
            Writing about web development, software engineering, and lessons
            learned along the way.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='grid md:grid-cols-2 xl:grid-cols-3 gap-8'
        >
          {posts.map((post) => (
            <motion.div key={post.slug} variants={itemVariants}>
              <BlogCard post={post} />
            </motion.div>
          ))}
        </motion.div>

        {posts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='text-center py-16'
          >
            <p className='text-slate-400 text-lg'>
              No posts yet. Check back soon!
            </p>
          </motion.div>
        )}
      </div>
    </main>
  )
}
