'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  Mail,
  Linkedin,
  Github,
  FileText,
  Send,
  MessageSquare,
} from 'lucide-react'

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const subject = `Portfolio Contact from ${formData.name}`
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    const mailtoLink = `mailto:neilspencerrafada@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`

    window.location.href = mailtoLink
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  const socialLinks = [
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:neilspencerrafada@gmail.com',
      color: 'text-red-400 hover:text-red-300',
      description: 'neilspencerrafada@gmail.com',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com/in/spencer-rafada',
      color: 'text-blue-400 hover:text-blue-300',
      description: 'Connect with me',
    },
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/spencer-rafada',
      color: 'text-slate-400 hover:text-slate-300',
      description: 'Check out my code',
    },
    {
      name: 'Resume',
      icon: FileText,
      href: '/SpencerRafada.pdf',
      color: 'text-green-400 hover:text-green-300',
      description: 'Download my resume',
    },
  ]

  return (
    <section
      id='contact'
      ref={ref}
      className='py-24 section-padding bg-slate-900/30'
    >
      <div className='max-width-container'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          className='max-w-4xl mx-auto'
        >
          <motion.div variants={itemVariants} className='text-center mb-16'>
            <h2 className='text-4xl lg:text-5xl font-bold mb-6'>
              Get In <span className='code-accent'>Touch</span>
            </h2>
            <div className='font-mono text-sm text-slate-500 mb-6'>
              <span className='text-green-400'>
                // Let's build something together
              </span>
            </div>
            <p className='text-xl text-slate-400 max-w-2xl mx-auto'>
              I'm always interested in new opportunities and interesting
              projects. Whether you have a question or just want to say hi, feel
              free to reach out!
            </p>
          </motion.div>

          <div className='grid lg:grid-cols-2 gap-12 items-start'>
            {/* Contact Info */}
            <motion.div variants={itemVariants} className='space-y-8'>
              <div className='terminal-border p-8'>
                <div className='flex items-center gap-2 mb-6 pb-4 border-b border-slate-700'>
                  <div className='w-3 h-3 rounded-full bg-red-400'></div>
                  <div className='w-3 h-3 rounded-full bg-yellow-400'></div>
                  <div className='w-3 h-3 rounded-full bg-green-400'></div>
                  <span className='ml-4 text-slate-400 font-mono text-sm'>
                    ~/contact-info
                  </span>
                </div>

                <div className='font-mono text-sm space-y-3'>
                  <div>
                    <span className='text-purple-400'>const</span>{' '}
                    <span className='text-yellow-400'>contactInfo</span>{' '}
                    <span className='text-slate-300'>= {'{'}</span>
                  </div>
                  <div className='ml-4'>
                    <span className='text-blue-400'>name</span>
                    <span className='text-slate-300'>: </span>
                    <span className='text-green-400'>"Spencer Rafada"</span>
                    <span className='text-slate-300'>,</span>
                  </div>
                  <div className='ml-4'>
                    <span className='text-blue-400'>role</span>
                    <span className='text-slate-300'>: </span>
                    <span className='text-green-400'>
                      "Full Stack Developer"
                    </span>
                    <span className='text-slate-300'>,</span>
                  </div>
                  <div className='ml-4'>
                    <span className='text-blue-400'>location</span>
                    <span className='text-slate-300'>: </span>
                    <span className='text-green-400'>"Remote / Utah"</span>
                    <span className='text-slate-300'>,</span>
                  </div>
                  <div className='ml-4'>
                    <span className='text-blue-400'>availability</span>
                    <span className='text-slate-300'>: </span>
                    <span className='text-green-400'>
                      "Open to opportunities"
                    </span>
                  </div>
                  <div className='text-slate-300'>{'}'}</div>
                </div>
              </div>

              {/* Social Links */}
              <div className='grid grid-cols-2 gap-4'>
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target={link.name !== 'Email' ? '_blank' : undefined}
                    rel={
                      link.name !== 'Email' ? 'noopener noreferrer' : undefined
                    }
                    variants={itemVariants}
                    className='glass-effect p-4 rounded-lg hover:bg-slate-800/30 transition-all duration-300 group'
                  >
                    <div className='flex items-center gap-3 mb-2'>
                      <link.icon size={20} className={link.color} />
                      <span className='font-medium text-slate-100'>
                        {link.name}
                      </span>
                    </div>
                    <p className='text-sm text-slate-400 group-hover:text-slate-300 transition-colors break-all'>
                      {link.description}
                    </p>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              variants={itemVariants}
              className='glass-effect p-8 rounded-xl'
            >
              <div className='flex items-center gap-2 mb-6'>
                <MessageSquare size={20} className='text-blue-400' />
                <h3 className='text-xl font-semibold text-slate-100'>
                  Send a Message
                </h3>
              </div>

              <form onSubmit={handleSubmit} className='space-y-6'>
                <div>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium text-slate-300 mb-2'
                  >
                    Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    value={formData.name}
                    onChange={handleInputChange}
                    className='w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:border-blue-400 focus:outline-none text-slate-100 placeholder-slate-500 transition-colors'
                    placeholder='Your name'
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-slate-300 mb-2'
                  >
                    Email
                  </label>
                  <input
                    type='email'
                    id='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    className='w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:border-blue-400 focus:outline-none text-slate-100 placeholder-slate-500 transition-colors'
                    placeholder='your.email@example.com'
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor='message'
                    className='block text-sm font-medium text-slate-300 mb-2'
                  >
                    Message
                  </label>
                  <textarea
                    id='message'
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className='w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:border-blue-400 focus:outline-none text-slate-100 placeholder-slate-500 transition-colors resize-none'
                    placeholder='Tell me about your project or just say hello!'
                    required
                  />
                </div>

                <button
                  type='submit'
                  className='w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium'
                >
                  <Send size={18} />
                  Send Message
                </button>
              </form>

              <div className='mt-6 pt-6 border-t border-slate-700'>
                <p className='text-sm text-slate-400 text-center'>
                  Or reach out directly at{' '}
                  <a
                    href='mailto:neilspencerrafada@gmail.com'
                    className='text-blue-400 hover:text-blue-300 transition-colors'
                  >
                    neilspencerrafada@gmail.com
                  </a>
                </p>
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div
            variants={itemVariants}
            className='text-center mt-16 pt-8 border-t border-slate-800'
          >
            <p className='text-slate-400 font-mono'>
              <span className='text-green-400'>// </span>
              For Hana and Coen, I love you both.
            </p>
            <p className='text-slate-500 mt-2'>© 2025 Spencer Rafada</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
