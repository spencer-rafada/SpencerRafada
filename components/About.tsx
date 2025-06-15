'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code, Heart, Globe } from 'lucide-react'

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <section id="about" ref={ref} className="py-24 section-padding">
      <div className="max-width-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
                About <span className="code-accent">Me</span>
              </h2>
              
              {/* Code-style comment */}
              <div className="font-mono text-sm text-slate-500 mb-6">
                <span className="text-green-400">// Personal Background</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6 text-lg text-slate-300 leading-relaxed">
              <p>
                My greatest source of strength comes from my family. My{' '}
                <span className="text-green-400 font-medium">wife has always been my #1 supporter</span>, 
                standing by me through every challenge and celebration. My son, who was diagnosed with epidermolysis bullosa, 
                is an incredible fighter who teaches me{' '}
                <span className="text-green-400 font-medium">resilience and determination</span> every day. 
                His courage inspires me to push through challenges and reminds me why building technology that can improve lives is so important.
              </p>
              
              <p>
                As a Software Engineer, I've discovered that I thrive in{' '}
                <span className="text-purple-400 font-medium">startup environments</span>{' '}
                where innovation meets impact. There's something energizing about the fast-paced nature of startups—the ability to wear multiple hats, 
                iterate quickly, and see your code directly translate into solutions that matter.
              </p>

              <p>
                My motivation to <span className="font-bold text-blue-400">Go Forth and Code</span> comes from 
                knowing that a single component I develop can potentially help someone or make their life better—whether that's through a startup's innovative product or a solution that reaches those who need it most.
              </p>
            </motion.div>
          </div>

          {/* Code Block Visualization & Stats */}
          <motion.div variants={itemVariants} className="lg:order-last space-y-8">
            {/* Stats/Highlights */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg glass-effect flex items-center justify-center">
                  <Code className="text-blue-400" size={24} />
                </div>
                <div className="text-2xl font-bold text-slate-100">3+</div>
                <div className="text-sm text-slate-400">Years Coding</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg glass-effect flex items-center justify-center">
                  <Globe className="text-green-400" size={24} />
                </div>
                <div className="text-2xl font-bold text-slate-100">10+</div>
                <div className="text-sm text-slate-400">Projects Built</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg glass-effect flex items-center justify-center">
                  <Heart className="text-red-400" size={24} />
                </div>
                <div className="text-2xl font-bold text-slate-100">∞</div>
                <div className="text-sm text-slate-400">Passion Level</div>
              </div>
            </div>

            {/* Code Block */}
            <div className="terminal-border p-8 font-mono text-sm">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-700">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="ml-4 text-slate-400">~/spencer-rafada</span>
              </div>
              
              <div className="space-y-2">
                <div>
                  <span className="text-purple-400">interface</span>{' '}
                  <span className="text-yellow-400">Developer</span>{' '}
                  <span className="text-slate-300">{'{'}</span>
                </div>
                <div className="ml-4">
                  <span className="text-green-400">name</span>
                  <span className="text-slate-300">: </span>
                  <span className="text-blue-400">string</span>
                </div>
                <div className="ml-4">
                  <span className="text-green-400">role</span>
                  <span className="text-slate-300">: </span>
                  <span className="text-blue-400">string</span>
                </div>
                <div className="ml-4">
                  <span className="text-green-400">passion</span>
                  <span className="text-slate-300">: </span>
                  <span className="text-blue-400">string</span>
                </div>
                <div className="ml-4">
                  <span className="text-green-400">motto</span>
                  <span className="text-slate-300">: </span>
                  <span className="text-blue-400">string</span>
                </div>
                <div className="text-slate-300">{'}'}</div>
                <div className="mt-4">
                  <span className="text-purple-400">const</span>{' '}
                  <span className="text-yellow-400">spencer</span>
                  <span className="text-slate-300">: </span>
                  <span className="text-blue-400">Developer</span>
                  <span className="text-slate-300"> = {'{'}</span>
                </div>
                <div className="ml-4">
                  <span className="text-green-400">name</span>
                  <span className="text-slate-300">: </span>
                  <span className="text-orange-400">'Spencer Rafada'</span>
                  <span className="text-slate-300">,</span>
                </div>
                <div className="ml-4">
                  <span className="text-green-400">role</span>
                  <span className="text-slate-300">: </span>
                  <span className="text-orange-400">'Full Stack Developer'</span>
                  <span className="text-slate-300">,</span>
                </div>
                <div className="ml-4">
                  <span className="text-green-400">passion</span>
                  <span className="text-slate-300">: </span>
                  <span className="text-orange-400">'User-Centric Apps'</span>
                  <span className="text-slate-300">,</span>
                </div>
                <div className="ml-4">
                  <span className="text-green-400">motto</span>
                  <span className="text-slate-300">: </span>
                  <span className="text-orange-400">'Go Forth and Code'</span>
                </div>
                <div className="text-slate-300">{'}'}</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}