'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import type { BlogPostMeta } from '@/lib/blog'

interface BlogPostLayoutProps {
  meta: BlogPostMeta
  children: React.ReactNode
}

export default function BlogPostLayout({
  meta,
  children,
}: BlogPostLayoutProps) {
  return (
    <main className='min-h-screen py-24 section-padding'>
      <article className='max-width-container max-w-3xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href='/blog'
            className='inline-flex items-center gap-2 text-slate-400 hover:text-slate-100 transition-colors mb-8 group'
          >
            <ArrowLeft
              size={16}
              className='group-hover:-translate-x-1 transition-transform'
            />
            <span>Back to Blog</span>
          </Link>
        </motion.div>

        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className='mb-12'
        >
          <div className='flex flex-wrap gap-2 mb-4'>
            {meta.tags.map((tag) => (
              <span
                key={tag}
                className='px-2 py-1 text-xs font-mono bg-slate-800/50 text-slate-400 rounded border border-slate-700/50'
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 mb-6 text-balance'>
            {meta.title}
          </h1>

          <div className='flex items-center gap-4 text-sm font-mono text-slate-400'>
            <span className='inline-flex items-center gap-1.5'>
              <Calendar size={14} />
              {(() => {
                const [y, m, d] = meta.date.split('-').map(Number)
                return new Date(y, m - 1, d).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              })()}
            </span>
            <span className='inline-flex items-center gap-1.5'>
              <Clock size={14} />
              {meta.readingTime}
            </span>
          </div>

          <div className='mt-8 border-b border-slate-800' />
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className='prose prose-lg max-w-none'
        >
          {children}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className='mt-16 pt-8 border-t border-slate-800'
        >
          <Link
            href='/blog'
            className='inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors group'
          >
            <ArrowLeft
              size={16}
              className='group-hover:-translate-x-1 transition-transform'
            />
            <span>Back to all posts</span>
          </Link>
        </motion.div>
      </article>
    </main>
  )
}
