'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import {
  ExternalLink,
  Github,
  Calendar,
  ArrowUpRight,
  ChevronDown,
  Sparkles,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const projects = [
  {
    date: '2025',
    title: 'Peek-a-boo',
    slug: 'peek-a-boo',
    description:
      'Ditch the ordinary and make your gender reveal unforgettable. Share the big news in a fun, interactive, and modern way—wherever your loved ones are! Micro-SaaS I launched.',
    madeAt: 'Micro-SaaS Launch',
    tools: ['Next.js', 'PostgreSQL', 'GitHub Actions', 'Stripe', 'TypeScript'],
    link: 'https://www.lovepeekaboo.com/',
    image: 'peekaboo.png', // You can update this with actual image
  },
  {
    date: '2025',
    title: 'MemoryGram',
    slug: 'memorygram',
    description:
      'Upload a photo and let AI transform it into a story, memory, journal entry, or poem. Reflect, save, and share your memories.',
    madeAt: 'Hackathon Entry',
    tools: ['React', 'AI/ML', 'Next.js', 'TypeScript', 'Vercel'],
    link: 'https://prova-hackathon-ecru.vercel.app/',
    image: 'memorygram.png', // You can update this with actual image
  },
  {
    date: '2024',
    title: 'CSC Confederation',
    slug: 'csc-confederation',
    description:
      'Contributed to development work for a weekly gaming league platform.',
    madeAt: 'Gaming League Platform',
    tools: ['React', 'GraphQL', 'Python'],
    link: 'https://csconfederation.com/',
    image: 'csconfederation.png', // You can update this with actual image
  },
  {
    date: '2024',
    title: 'RayFoundation',
    slug: 'ray-foundation',
    description:
      "Created for a non-profit organization to help my friend. A modern website showcasing the foundation's mission and impact.",
    madeAt: 'Non-profit Project',
    tools: ['React', 'Next.js', 'TypeScript', 'Vercel'],
    link: 'https://ray-foundation.vercel.app/',
    image: 'rayfoundation.png', // You can update this with actual image
  },
  {
    date: '2024',
    title: '2024 Tracker',
    slug: '2024-tracker',
    description:
      'Single Page Application to keep track of all the goals I set for the year 2024. This app fetches data from Google Spreadsheets and displays a simple UI.',
    tools: ['react', 'TypeScript', 'GitHub Actions', 'SheetDB.io', 'Vite'],
    link: 'https://spencer-rafada.github.io/2024-Tracker/',
    image: '2024tracker_thumbnail.png',
  },
  {
    date: '2023',
    title: 'Diab10',
    slug: 'diab10',
    description:
      'Diab10 Albion Online is a bot tracks attendance and gives priority to those who are active in playing the game Albion Online. I created this project to help out friends who use Discord often.',
    madeAt: 'Personal Project',
    tools: ['NodeJS', 'DiscordJS', 'MongoDB'],
    link: 'https://github.com/spencer-rafada/Diab10-AO',
    image: 'diab10_thumbnail.png',
  },
  {
    date: '2023',
    title: 'Arkad',
    slug: 'arkad',
    description:
      'Full Stack Web App that guides user to grow their wealth and finances through smart goals, financial tracker, and surrounding yourself with like minded people.',
    madeAt: 'Personal Project',
    tools: [
      'react',
      'TDD',
      'jest',
      'GitHub Actions',
      'NodeJS',
      'Express',
      'MongoDB',
    ],
    link: 'https://arkad-4hz9.onrender.com/',
    image: 'arkad_thumbnail.png',
  },
  {
    date: '2023',
    title: 'My Own Wedding Website',
    slug: 'wedding-website',
    description: `Full Stack Web app for my wife and I's wedding. View details about our wedding, RSVP, contacting us, and sending us notes`,
    madeAt: 'Personal Project',
    tools: ['react', 'NodeJS', 'Express', 'MongoDB', 'SCSS', 'Trello'],
    link: 'https://hanaandspencer.onrender.com/',
    image: 'weddingwebsite_thumbnail.png',
  },
  {
    date: '2022',
    title: `KoRa's Treats`,
    slug: 'koras-treats',
    description:
      'Web App that features baking products that my wife has made. This web app utilizes Vanilla JavaScript and CSS',
    madeAt: 'BYU-I',
    tools: ['JavaScript', 'CSS'],
    link: 'https://spencer-rafada.github.io/kora-s-treats/',
    image: 'korastreat_thumbnail.png',
  },
  {
    date: '2022',
    title: 'Math Ninja',
    slug: 'math-ninja',
    description:
      'Single Page Application that gamifies mathematics into Fruit Ninja. I was part of a group when we created this app.',
    madeAt: 'BYU-I',
    tools: ['react', 'Firebase', 'Canvas', 'Trello'],
    link: 'https://mathninja-6aks.onrender.com',
    image: 'mathninja_thumbnail.png',
  },
]

function NewBadge() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const visited = localStorage.getItem('projectDetailsVisited')
    if (!visited) {
      setVisible(true)
    }
  }, [])

  if (!visible) return null

  return (
    <span className='inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-400/30 rounded-full animate-pulse'>
      <Sparkles size={10} />
      New
    </span>
  )
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [showAll, setShowAll] = useState(false)
  
  const displayedProjects = showAll ? projects : projects.slice(0, 3)

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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section id='projects' ref={ref} className='py-24 section-padding'>
      <div className='max-width-container'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl lg:text-5xl font-bold mb-6'>
            Featured <span className='code-accent'>Projects</span>
          </h2>
          <div className='font-mono text-sm text-slate-500 mb-4'>
            <span className='text-green-400'>// Some things I've built</span>
          </div>
          <p className='text-xl text-slate-400 max-w-2xl mx-auto'>
            A collection of projects that showcase my journey in web
            development, from simple websites to full-stack applications.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          className='grid md:grid-cols-2 xl:grid-cols-3 gap-8'
        >
          {displayedProjects.map((project, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Link
                href={`/projects/${project.slug}`}
                className='group relative block glass-effect rounded-xl overflow-hidden hover:bg-slate-800/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl'
              >
                {/* Image */}
                <div className='relative h-48 overflow-hidden bg-slate-800'>
                  <Image
                    src={`/${project.image}`}
                    alt={project.title}
                    fill
                    className='object-cover group-hover:scale-105 transition-transform duration-300'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent' />

                  {/* Date Badge */}
                  <div className='absolute bottom-4 left-4'>
                    <span className='inline-flex items-center gap-1 px-2 py-1 bg-slate-950/80 rounded-full text-xs font-mono text-slate-300'>
                      <Calendar size={12} />
                      {project.date}
                    </span>
                  </div>

                  {/* New Badge */}
                  {index === 0 && (
                    <div className='absolute top-4 right-4'>
                      <NewBadge />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className='p-6'>
                  <div className='flex items-start justify-between mb-3'>
                    <h3 className='text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors'>
                      {project.title}
                    </h3>
                    <div className='flex items-center gap-2'>
                      {project.link.includes('github.com') && (
                        <span className='text-slate-400'>
                          <Github size={16} />
                        </span>
                      )}
                      <span className='text-slate-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300'>
                        <ArrowUpRight size={20} />
                      </span>
                    </div>
                  </div>

                  {project.madeAt && (
                    <div className='text-sm text-slate-500 mb-3 font-mono'>
                      // {project.madeAt}
                    </div>
                  )}

                  <p className='text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3'>
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className='flex flex-wrap gap-2'>
                    {project.tools.map((tool, toolIndex) => (
                      <span
                        key={toolIndex}
                        className='px-2 py-1 text-xs font-mono bg-slate-800/50 text-slate-400 rounded border border-slate-700/50 hover:border-blue-400/50 hover:text-blue-400 transition-colors'
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className='absolute inset-0 border-2 border-transparent group-hover:border-blue-400/20 rounded-xl transition-colors duration-300 pointer-events-none' />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Show More Button */}
        {!showAll && projects.length > 3 && (
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
              <span>Show More Projects</span>
              <ChevronDown 
                size={20} 
                className="group-hover:translate-y-1 transition-transform duration-300" 
              />
            </button>
          </motion.div>
        )}

        {/* View More Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className='text-center mt-16'
        >
          <div className='glass-effect p-8 rounded-xl max-w-md mx-auto'>
            <h3 className='text-xl font-semibold mb-4 text-slate-100'>
              Want to see more?
            </h3>
            <p className='text-slate-400 mb-6'>
              Check out my GitHub for more projects and contributions.
            </p>
            <a
              href='https://github.com/spencer-rafada'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg transition-colors font-medium'
            >
              <Github size={20} />
              View GitHub Profile
              <ExternalLink size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
