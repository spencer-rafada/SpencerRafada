'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowLeft,
  Copy,
  Check,
  FileDown,
  Eye,
  Pencil,
  X,
  Plus,
} from 'lucide-react'
import TipTapEditor from '@/components/editor/TipTapEditor'
import {
  generateMdxContent,
  generateSlug,
  todayDateString,
} from '@/lib/editor-utils'

export default function BlogEditorPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [date, setDate] = useState(todayDateString())
  const [html, setHtml] = useState('')
  const [copied, setCopied] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const handleExportMdx = useCallback(() => {
    const mdx = generateMdxContent(
      { title, description, tags, date, published: false },
      html
    )
    const blob = new Blob([mdx], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${generateSlug(title) || 'untitled'}.mdx`
    a.click()
    URL.revokeObjectURL(url)
  }, [title, description, tags, date, html])

  const handleCopyMdx = useCallback(async () => {
    const mdx = generateMdxContent(
      { title, description, tags, date, published: false },
      html
    )
    await navigator.clipboard.writeText(mdx)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [title, description, tags, date, html])

  const addTag = useCallback(() => {
    const trimmed = tagInput.trim()
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed])
    }
    setTagInput('')
  }, [tagInput, tags])

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  return (
    <main className='min-h-screen py-24 section-padding'>
      <div className='max-width-container max-w-4xl mx-auto'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='mb-8'
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

          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-3xl sm:text-4xl font-bold mb-2'>
                Blog <span className='code-accent'>Editor</span>
              </h1>
              <div className='font-mono text-sm text-slate-500'>
                <span className='text-green-400'>
                  // Write, preview, and export
                </span>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className='inline-flex items-center gap-2 px-4 py-2 text-sm rounded-md border border-slate-700 text-slate-300 hover:text-slate-100 hover:border-slate-600 transition-colors'
              >
                {showPreview ? (
                  <Pencil size={14} />
                ) : (
                  <Eye size={14} />
                )}
                {showPreview ? 'Edit' : 'Preview'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Metadata fields */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className='mb-6 space-y-4'
        >
          <div>
            <input
              type='text'
              placeholder='Post title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='w-full px-4 py-3 text-2xl font-bold bg-transparent border-b border-slate-700/50 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-primary transition-colors'
            />
          </div>

          <div>
            <input
              type='text'
              placeholder='Short description...'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='w-full px-4 py-2 text-sm bg-transparent border-b border-slate-700/50 text-slate-300 placeholder-slate-600 focus:outline-none focus:border-primary transition-colors'
            />
          </div>

          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2'>
              <label className='text-xs font-mono text-slate-500'>DATE</label>
              <input
                type='date'
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className='px-3 py-1.5 text-sm bg-slate-800/50 border border-slate-700/50 rounded-md text-slate-300 focus:outline-none focus:border-primary transition-colors'
              />
            </div>

            <div className='flex items-center gap-2 flex-1'>
              <label className='text-xs font-mono text-slate-500'>TAGS</label>
              <div className='flex items-center gap-2 flex-wrap flex-1'>
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className='inline-flex items-center gap-1 px-2 py-1 text-xs font-mono bg-slate-800/50 text-slate-400 rounded border border-slate-700/50'
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className='hover:text-red-400 transition-colors'
                    >
                      <X size={10} />
                    </button>
                  </span>
                ))}
                <div className='inline-flex items-center gap-1'>
                  <input
                    type='text'
                    placeholder='Add tag...'
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addTag()}
                    className='w-24 px-2 py-1 text-xs bg-transparent border-b border-slate-700/50 text-slate-300 placeholder-slate-600 focus:outline-none focus:border-primary'
                  />
                  <button
                    onClick={addTag}
                    className='text-slate-500 hover:text-primary transition-colors'
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Editor / Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {showPreview ? (
            <div className='border border-slate-700/50 rounded-lg bg-slate-900/30 p-6'>
              <div className='prose prose-lg max-w-none'>
                {html ? (
                  <div dangerouslySetInnerHTML={{ __html: html }} />
                ) : (
                  <p className='text-slate-500 italic'>
                    Nothing to preview yet. Start writing!
                  </p>
                )}
              </div>
            </div>
          ) : (
            <TipTapEditor content={html} onUpdate={setHtml} />
          )}
        </motion.div>

        {/* Export actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className='mt-6 flex items-center gap-3'
        >
          <button
            onClick={handleExportMdx}
            disabled={!html}
            className='inline-flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-primary/20 text-primary hover:bg-primary/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed'
          >
            <FileDown size={14} />
            Export as MDX
          </button>
          <button
            onClick={handleCopyMdx}
            disabled={!html}
            className='inline-flex items-center gap-2 px-4 py-2 text-sm rounded-md border border-slate-700 text-slate-300 hover:text-slate-100 hover:border-slate-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed'
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copied!' : 'Copy MDX'}
          </button>
          <span className='text-xs font-mono text-slate-600 ml-2'>
            {generateSlug(title) ? `${generateSlug(title)}.mdx` : 'untitled.mdx'}
          </span>
        </motion.div>
      </div>
    </main>
  )
}
