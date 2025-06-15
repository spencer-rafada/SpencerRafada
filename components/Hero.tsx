'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { ChevronDown, Code2, Terminal } from 'lucide-react'
import Typed from 'typed.js'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const typedRef = useRef<HTMLSpanElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  useEffect(() => {
    if (typedRef.current) {
      const typed = new Typed(typedRef.current, {
        strings: [
          'Full Stack Developer"',
          'Software Engineer"',
          'Husband"',
          'EB Dad"',
          'MTBer"',
          'Competitive Gamer"',
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|',
      })

      return () => {
        typed.destroy()
      }
    }
  }, [])

  return (
    <section
      ref={ref}
      className='relative min-h-screen flex items-center justify-center overflow-hidden'
    >
      {/* Parallax Background */}
      <motion.div style={{ y, opacity }} className='absolute inset-0 -z-10'>
        <div className='absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]' />

        {/* Floating Code Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className='absolute top-20 left-20 opacity-20'
        >
          <Code2 size={40} className='text-blue-400' />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, -3, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className='absolute top-40 right-32 opacity-20'
        >
          <Terminal size={32} className='text-green-400' />
        </motion.div>

        {/* Grid Pattern */}
        <div className='absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:40px_40px]' />
      </motion.div>

      {/* Content */}
      <div className='section-padding max-width-container relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='text-center'
        >
          {/* Terminal-style greeting */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className='inline-block terminal-border p-4 mb-8 font-mono text-sm'
          >
            <span className='text-green-400'>$</span>
            <span className='text-slate-300 ml-2'>whoami</span>
            <br />
            <span className='text-blue-400'>spencer@developer:~$</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className='text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-balance'
          >
            <span className='text-slate-100'>Spencer</span>{' '}
            <span className='code-accent'>Rafada</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className='text-xl sm:text-2xl text-slate-400 mb-8 font-mono'
          >
            <span className='text-slate-500'>const</span>{' '}
            <span className='text-blue-400'>role</span>{' '}
            <span className='text-slate-500'>=</span>{' '}
            <span className='text-green-400'>
              "<span ref={typedRef}></span>
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className='text-lg sm:text-xl text-slate-300 mb-12 max-w-2xl mx-auto text-balance'
          >
            Passionate about creating user-centric applications that make a
            positive impact. Ready to{' '}
            <span className='code-accent font-semibold'>Go Forth and Code</span>
            .
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className='flex flex-col sm:flex-row gap-4 justify-center items-center'
          >
            <button
              onClick={() => {
                const element = document.getElementById('projects')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className='glass-effect px-8 py-3 rounded-lg text-slate-100 hover:bg-slate-800/30 transition-all duration-300 font-medium'
            >
              View My Work
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('contact')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className='border border-blue-400 text-blue-400 px-8 py-3 rounded-lg hover:bg-blue-400 hover:text-slate-950 transition-all duration-300 font-medium'
            >
              Get In Touch
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        onClick={() => {
          const element = document.getElementById('about')
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }}
        className='absolute bottom-8 left-1/2 transform -translate-x-1/2 hover:text-slate-200 transition-colors cursor-pointer'
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <ChevronDown size={24} className='text-slate-400' />
        </motion.div>
      </motion.button>
    </section>
  )
}
