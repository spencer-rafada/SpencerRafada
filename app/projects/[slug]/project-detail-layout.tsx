'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  ExternalLink,
  Github,
} from 'lucide-react'
import type { ProjectMeta } from '@/lib/projects'
import { ProjectGallery } from '@/components/ProjectGallery'

interface ProjectDetailLayoutProps {
  meta: ProjectMeta
  prevProject: ProjectMeta | null
  nextProject: ProjectMeta | null
  children: React.ReactNode
}

export default function ProjectDetailLayout({
  meta,
  prevProject,
  nextProject,
  children,
}: ProjectDetailLayoutProps) {
  return (
    <main className='min-h-screen py-24 section-padding'>
      <div className='max-width-container max-w-4xl mx-auto'>
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href='/#projects'
            className='inline-flex items-center gap-2 text-slate-400 hover:text-slate-100 transition-colors mb-8 group'
          >
            <ArrowLeft
              size={16}
              className='group-hover:-translate-x-1 transition-transform'
            />
            <span>Back to Projects</span>
          </Link>
        </motion.div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className='relative w-full h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden mb-8'
        >
          <Image
            src={`/${meta.image}`}
            alt={meta.title}
            fill
            className='object-cover'
            priority
          />
          <div className='absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent' />
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='mb-12'
        >
          <div className='flex items-start justify-between gap-4 mb-4'>
            <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 text-balance'>
              {meta.title}
            </h1>
            <div className='flex items-center gap-3 shrink-0 pt-2'>
              {meta.github && (
                <a
                  href={meta.github}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2 px-4 py-2 glass-effect hover:bg-slate-800/30 text-slate-300 hover:text-slate-100 rounded-lg transition-all text-sm font-medium'
                >
                  <Github size={16} />
                  Code
                </a>
              )}
              {meta.link && (
                <a
                  href={meta.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg transition-all text-sm font-medium'
                >
                  <ExternalLink size={16} />
                  Live Site
                </a>
              )}
            </div>
          </div>

          <p className='text-lg text-slate-400 mb-4'>{meta.description}</p>

          {/* Meta info */}
          <div className='flex items-center gap-4 text-sm font-mono text-slate-500 mb-4'>
            <span className='inline-flex items-center gap-1.5'>
              <Calendar size={14} />
              {meta.date.split('-')[0]}
            </span>
            {meta.madeAt && (
              <span className='text-slate-600'>// {meta.madeAt}</span>
            )}
            <span className='inline-flex items-center gap-1.5'>
              <Clock size={14} />
              {meta.readingTime}
            </span>
          </div>

          {/* Tech stack */}
          <div className='flex flex-wrap gap-2'>
            {meta.tools.map((tool) => (
              <span
                key={tool}
                className='px-2 py-1 text-xs font-mono bg-slate-800/50 text-slate-400 rounded border border-slate-700/50 hover:border-blue-400/50 hover:text-blue-400 transition-colors'
              >
                {tool}
              </span>
            ))}
          </div>

          <div className='mt-8 border-b border-slate-800' />
        </motion.header>

        {/* MDX content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className='prose prose-lg max-w-none'
        >
          {children}
        </motion.div>

        {/* Screenshot/video gallery */}
        {(meta.screenshots.length > 0 || meta.video) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='mt-16'
          >
            <h2 className='text-2xl font-bold text-slate-100 mb-6'>Demo</h2>
            <ProjectGallery
              screenshots={meta.screenshots}
              video={meta.video}
              title={meta.title}
            />
          </motion.div>
        )}

        {/* Previous / Next navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className='mt-16 pt-8 border-t border-slate-800'
        >
          <div className='flex items-center justify-between'>
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug}`}
                className='group flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors'
              >
                <ArrowLeft
                  size={16}
                  className='group-hover:-translate-x-1 transition-transform'
                />
                <div className='text-left'>
                  <div className='text-xs text-slate-500'>Previous</div>
                  <span className='text-sm font-medium'>
                    {prevProject.title}
                  </span>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextProject ? (
              <Link
                href={`/projects/${nextProject.slug}`}
                className='group flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors text-right'
              >
                <div>
                  <div className='text-xs text-slate-500'>Next</div>
                  <span className='text-sm font-medium'>
                    {nextProject.title}
                  </span>
                </div>
                <ArrowRight
                  size={16}
                  className='group-hover:translate-x-1 transition-transform'
                />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </motion.div>
      </div>
    </main>
  )
}
