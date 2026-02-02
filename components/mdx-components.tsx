import Image from 'next/image'
import Link from 'next/link'

function Callout({
  children,
  type = 'info',
}: {
  children: React.ReactNode
  type?: 'info' | 'warning' | 'tip'
}) {
  const styles = {
    info: 'border-blue-400/50 bg-blue-400/5',
    warning: 'border-yellow-400/50 bg-yellow-400/5',
    tip: 'border-green-400/50 bg-green-400/5',
  }

  return (
    <div className={`border-l-4 ${styles[type]} p-4 my-6 rounded-r-lg`}>
      {children}
    </div>
  )
}

export const mdxComponents = {
  a: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (href?.startsWith('/')) {
      return (
        <Link
          href={href}
          className='text-primary hover:text-primary/80 underline transition-colors'
          {...props}
        >
          {children}
        </Link>
      )
    }
    return (
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className='text-primary hover:text-primary/80 underline transition-colors'
        {...props}
      >
        {children}
      </a>
    )
  },
  img: ({
    src,
    alt,
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <Image
      src={src || ''}
      alt={alt || ''}
      width={800}
      height={450}
      className='rounded-lg my-6'
    />
  ),
  Callout,
}
