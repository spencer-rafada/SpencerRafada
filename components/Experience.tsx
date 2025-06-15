'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ExternalLink, Calendar, Building2, ChevronDown } from 'lucide-react'

const experience = [
  {
    date: '2025',
    company: 'VIUS Built',
    position: 'Software Engineer (Founding Engineer)',
    achievements: [
      'Enabled 10 businesses to manage thousands of subcontractors by building Trade Partner Directory feature using TypeScript, Node.js, and PostgreSQL through centralized compliance system',
      'Shipped features end-to-end with minimal oversight by owning complete development from scoping to deployment across backend architecture, frontend UX, and CI/CD pipelines',
      'Improved onboarding efficiency by developing GenAI-enhanced bulk import tool through rapid prototyping to streamline backend processes',
      'Reduced release turnaround time by 70% by implementing automated CI/CD pipelines using GitHub Actions and Docker',
      'Contributed to roadmap clarity and execution speed by collaborating directly with founders to translate complex business requirements into shippable features',
    ],
    tools: [
      'TypeScript',
      'Next.js',
      'Node.js',
      'PostgreSQL',
      'GitHub Actions',
      'Docker',
      'GenAI',
      'TDD',
      'Jest',
    ],
    link: 'https://www.viusbuilt.com/',
  },
  {
    date: '2024',
    company: 'ThriftBooks',
    position: 'Software Engineer',
    achievements: [
      'Increased user engagement by 20% by enhancing ReadingRewards dashboard using React and Node.js optimization techniques to improve load speed',
      'Improved system reliability across shopping and logistics workflows by refactoring backend SQL queries and APIs to handle high-volume data operations',
      'Decreased manual finance team overhead by delivering automated payout tools through integrating multiple internal services to improve operational efficiency',
    ],
    tools: ['React', 'Next.js', 'C# .NET', 'Node.js', 'SQL', 'API Integration'],
    link: 'https://www.thriftbooks.com/',
  },
  {
    date: '2023',
    company: 'FamilySearch',
    position: 'Web Developer Intern',
    achievements: [
      'Increased database consistency by 10% by shipping Places Verification production feature using React/ES6 with Jest testing',
      'Ensured 99% uptime during new feature rollouts by resolving 35% of production UI bugs across React codebase',
    ],
    tools: ['React', 'ES6', 'Jest', 'TDD', 'JavaScript'],
    link: 'https://www.familysearch.org/',
  },
  {
    date: '2023',
    company: 'Subitt',
    position: 'Software Engineer',
    achievements: [
      'Generated first wave of customer conversions by creating responsive landing page and navigation system using React and SCSS for early-stage startup',
      'Boosted team productivity by leading DevOps infrastructure setup and backend integration using Node.js and automated testing to streamline deployment processes',
    ],
    tools: ['React', 'SCSS', 'Node.js', 'DevOps'],
    link: 'https://subitt.io/',
  },
]

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [showAll, setShowAll] = useState(false)
  
  const displayedExperience = showAll ? experience : experience.slice(0, 1)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section
      id='experience'
      ref={ref}
      className='py-24 section-padding bg-slate-900/30'
    >
      <div className='max-width-container'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl lg:text-5xl font-bold mb-6'>
            Work <span className='code-accent'>Experience</span>
          </h2>
          <div className='font-mono text-sm text-slate-500 mb-4'>
            <span className='text-green-400'>// Professional Journey</span>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          className='relative'
        >
          {/* Timeline Line */}
          <div className='absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-400 via-purple-400 to-green-400 hidden md:block' />

          <div className='space-y-12'>
            {displayedExperience.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className='relative flex flex-col md:flex-row gap-8 group'
              >
                {/* Timeline Node */}
                <div className='hidden md:flex items-center'>
                  <div className='w-16 h-16 bg-slate-950 border-4 border-blue-400 rounded-full flex items-center justify-center relative z-10'>
                    <Building2 size={24} className='text-blue-400' />
                  </div>
                </div>

                {/* Content Card */}
                <div className='flex-1 glass-effect p-8 rounded-xl hover:bg-slate-800/30 transition-all duration-300 group-hover:scale-[1.02]'>
                  <div className='flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6'>
                    <div>
                      <h3 className='text-xl font-bold text-slate-100 mb-2'>
                        {exp.position}
                      </h3>
                      <div className='flex items-center gap-2 text-blue-400 font-medium mb-2'>
                        <Building2 size={16} />
                        <span>{exp.company}</span>
                        <a
                          href={exp.link}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='opacity-0 group-hover:opacity-100 transition-opacity'
                        >
                          <ExternalLink
                            size={14}
                            className='hover:text-blue-300'
                          />
                        </a>
                      </div>
                    </div>
                    <div className='flex items-center gap-2 text-slate-400 font-mono text-sm bg-slate-800/50 px-3 py-1 rounded-full whitespace-nowrap'>
                      <Calendar size={14} />
                      {exp.date}
                    </div>
                  </div>

                  <ul className='text-slate-300 mb-6 leading-relaxed space-y-3'>
                    {exp.achievements.map((achievement, achievementIndex) => (
                      <li
                        key={achievementIndex}
                        className='flex items-start gap-3'
                      >
                        <span className='text-blue-400 mt-2 flex-shrink-0'>
                          •
                        </span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack */}
                  <div className='flex flex-wrap gap-2'>
                    {exp.tools.map((tool, toolIndex) => (
                      <span
                        key={toolIndex}
                        className='px-3 py-1 text-xs font-mono bg-slate-800/50 text-slate-300 rounded-full border border-slate-700/50 hover:border-blue-400/50 transition-colors'
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Show More Button */}
          {!showAll && experience.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className='text-center mt-12'
            >
              <button
                onClick={() => setShowAll(true)}
                className='inline-flex items-center gap-2 px-6 py-3 glass-effect hover:bg-slate-800/30 text-slate-100 rounded-lg transition-all duration-300 font-medium group'
              >
                <span>Show More Experience</span>
                <ChevronDown 
                  size={20} 
                  className="group-hover:translate-y-1 transition-transform duration-300" 
                />
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
