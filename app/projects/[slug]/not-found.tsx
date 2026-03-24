import Link from 'next/link'

export default function ProjectNotFound() {
  return (
    <main className='min-h-screen flex items-center justify-center section-padding'>
      <div className='text-center'>
        <div className='terminal-border p-8 inline-block mb-8 font-mono text-sm'>
          <span className='text-red-400'>Error 404:</span>
          <span className='text-slate-300 ml-2'>Project not found</span>
        </div>
        <h1 className='text-3xl font-bold text-slate-100 mb-4'>
          Project Not Found
        </h1>
        <p className='text-slate-400 mb-8'>
          The project you are looking for does not exist.
        </p>
        <Link
          href='/#projects'
          className='inline-flex items-center gap-2 px-6 py-3 glass-effect hover:bg-slate-800/30 text-slate-100 rounded-lg transition-all duration-300 font-medium'
        >
          Back to Projects
        </Link>
      </div>
    </main>
  )
}
