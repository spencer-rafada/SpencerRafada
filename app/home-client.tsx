'use client'

import { useState, useEffect } from 'react'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import BlogSection from '@/components/BlogSection'
import Contact from '@/components/Contact'
import { CommandDialog } from '@/components/CommandDialog'
import { Command } from 'lucide-react'
import type { BlogPostMeta } from '@/lib/blog'

interface HomeClientProps {
  latestPosts: BlogPostMeta[]
}

export default function HomeClient({ latestPosts }: HomeClientProps) {
  const [commandOpen, setCommandOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <>
      <main className='relative'>
        <Hero />
        <BlogSection posts={latestPosts} />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>

      {/* Command Dialog */}
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen} />

      {/* Command Palette Button */}
      <button
        onClick={() => setCommandOpen(true)}
        className='fixed bottom-8 right-8 z-50 flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg shadow-lg hover:bg-accent transition-colors group'
        title='Open command palette'
      >
        <Command
          size={16}
          className='text-muted-foreground group-hover:text-foreground'
        />
        <span className='hidden sm:inline'>K</span>
      </button>
    </>
  )
}
