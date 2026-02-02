import Link from 'next/link'
import { Calendar, Clock, ArrowUpRight } from 'lucide-react'
import type { BlogPostMeta } from '@/lib/blog'

interface BlogCardProps {
  post: BlogPostMeta
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className='block group'>
      <div className='glass-effect rounded-xl overflow-hidden hover:bg-slate-800/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl relative'>
        <div className='p-6'>
          <div className='flex items-center gap-4 mb-4 text-sm font-mono text-slate-400'>
            <span className='inline-flex items-center gap-1'>
              <Calendar size={14} />
              {(() => {
                const [y, m, d] = post.date.split('-').map(Number)
                return new Date(y, m - 1, d).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })
              })()}
            </span>
            <span className='inline-flex items-center gap-1'>
              <Clock size={14} />
              {post.readingTime}
            </span>
          </div>

          <div className='flex items-start justify-between gap-2 mb-3'>
            <h3 className='text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors'>
              {post.title}
            </h3>
            <ArrowUpRight
              size={20}
              className='text-slate-400 group-hover:text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0 mt-1'
            />
          </div>

          <p className='text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3'>
            {post.description}
          </p>

          <div className='flex flex-wrap gap-2'>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className='px-2 py-1 text-xs font-mono bg-slate-800/50 text-slate-400 rounded border border-slate-700/50 hover:border-blue-400/50 hover:text-blue-400 transition-colors'
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className='absolute inset-0 border-2 border-transparent group-hover:border-blue-400/20 rounded-xl transition-colors duration-300 pointer-events-none' />
      </div>
    </Link>
  )
}
