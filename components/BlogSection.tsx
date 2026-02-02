'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import BlogCard from '@/components/BlogCard'
import type { BlogPostMeta } from '@/lib/blog'

interface BlogSectionProps {
  posts: BlogPostMeta[]
}

export default function BlogSection({ posts }: BlogSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

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

  if (posts.length === 0) return null

  return (
    <section id='blog' ref={ref} className='py-24 section-padding'>
      <div className='max-width-container'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl lg:text-5xl font-bold mb-6'>
            Latest <span className='code-accent'>Posts</span>
          </h2>
          <div className='font-mono text-sm text-slate-500 mb-4'>
            <span className='text-green-400'>// Thoughts and tutorials</span>
          </div>
          <p className='text-xl text-slate-400 max-w-2xl mx-auto'>
            Writing about web development, lessons learned, and things I find
            interesting.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          className='grid md:grid-cols-2 xl:grid-cols-3 gap-8'
        >
          {posts.map((post) => (
            <motion.div key={post.slug} variants={itemVariants}>
              <BlogCard post={post} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={
            isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.6, delay: 0.6 }}
          className='text-center mt-12'
        >
          <Link
            href='/blog'
            className='inline-flex items-center gap-2 px-6 py-3 glass-effect hover:bg-slate-800/30 text-slate-100 rounded-lg transition-all duration-300 font-medium group'
          >
            <span>View All Posts</span>
            <ArrowRight
              size={20}
              className='group-hover:translate-x-1 transition-transform duration-300'
            />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
