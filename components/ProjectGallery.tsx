'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface ProjectGalleryProps {
  screenshots: string[]
  video?: string
  title: string
}

export function ProjectGallery({
  screenshots,
  video,
  title,
}: ProjectGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const goToPrev = () => {
    if (lightboxIndex === null) return
    setLightboxIndex(
      lightboxIndex === 0 ? screenshots.length - 1 : lightboxIndex - 1
    )
  }

  const goToNext = () => {
    if (lightboxIndex === null) return
    setLightboxIndex(
      lightboxIndex === screenshots.length - 1 ? 0 : lightboxIndex + 1
    )
  }

  return (
    <div>
      {/* Video */}
      {video && (
        <div className='mb-6'>
          <video
            src={video}
            controls
            className='w-full rounded-xl border border-slate-800'
            preload='metadata'
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {/* Screenshots grid */}
      {screenshots.length > 0 && (
        <div className='grid grid-cols-2 gap-4'>
          {screenshots.map((src, index) => (
            <button
              key={src}
              onClick={() => openLightbox(index)}
              className='relative aspect-video rounded-lg overflow-hidden border border-slate-800 hover:border-blue-400/50 transition-colors group cursor-pointer'
            >
              <Image
                src={src}
                alt={`${title} screenshot ${index + 1}`}
                fill
                className='object-cover group-hover:scale-105 transition-transform duration-300'
              />
              <div className='absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/20 transition-colors' />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-sm'
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className='absolute top-6 right-6 text-slate-400 hover:text-slate-100 transition-colors z-10'
          >
            <X size={24} />
          </button>

          {screenshots.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goToPrev()
                }}
                className='absolute left-6 text-slate-400 hover:text-slate-100 transition-colors z-10'
              >
                <ChevronLeft size={32} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goToNext()
                }}
                className='absolute right-6 text-slate-400 hover:text-slate-100 transition-colors z-10'
              >
                <ChevronRight size={32} />
              </button>
            </>
          )}

          <div
            className='relative max-w-5xl max-h-[80vh] w-full mx-6'
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={screenshots[lightboxIndex]}
              alt={`${title} screenshot ${lightboxIndex + 1}`}
              width={1920}
              height={1080}
              className='w-full h-auto rounded-xl object-contain'
            />
            <div className='text-center mt-4 text-sm text-slate-400 font-mono'>
              {lightboxIndex + 1} / {screenshots.length}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
