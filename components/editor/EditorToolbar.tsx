'use client'

import type { Editor } from '@tiptap/react'
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Minus,
  Link,
  Image,
  Table,
  Undo,
  Redo,
  Braces,
} from 'lucide-react'
import { useCallback, useState } from 'react'

interface EditorToolbarProps {
  editor: Editor
}

function ToolbarButton({
  onClick,
  isActive = false,
  disabled = false,
  title,
  children,
}: {
  onClick: () => void
  isActive?: boolean
  disabled?: boolean
  title: string
  children: React.ReactNode
}) {
  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 rounded-md transition-colors ${
        isActive
          ? 'bg-primary/20 text-primary'
          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
      } ${disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {children}
    </button>
  )
}

function ToolbarDivider() {
  return <div className='w-px h-6 bg-slate-700 mx-1' />
}

export default function EditorToolbar({ editor }: EditorToolbarProps) {
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [showImageInput, setShowImageInput] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  const setLink = useCallback(() => {
    if (!linkUrl) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      setShowLinkInput(false)
      return
    }
    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: linkUrl })
      .run()
    setLinkUrl('')
    setShowLinkInput(false)
  }, [editor, linkUrl])

  const addImage = useCallback(() => {
    if (!imageUrl) {
      setShowImageInput(false)
      return
    }
    editor.chain().focus().setImage({ src: imageUrl }).run()
    setImageUrl('')
    setShowImageInput(false)
  }, [editor, imageUrl])

  const iconSize = 16

  return (
    <div className='border-b border-slate-700/50 bg-slate-900/50'>
      <div className='flex flex-wrap items-center gap-0.5 p-2'>
        {/* Undo/Redo */}
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title='Undo'
        >
          <Undo size={iconSize} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title='Redo'
        >
          <Redo size={iconSize} />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Text formatting */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          title='Bold'
        >
          <Bold size={iconSize} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          title='Italic'
        >
          <Italic size={iconSize} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          title='Strikethrough'
        >
          <Strikethrough size={iconSize} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive('code')}
          title='Inline Code'
        >
          <Code size={iconSize} />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Headings */}
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          isActive={editor.isActive('heading', { level: 1 })}
          title='Heading 1'
        >
          <Heading1 size={iconSize} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isActive={editor.isActive('heading', { level: 2 })}
          title='Heading 2'
        >
          <Heading2 size={iconSize} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          isActive={editor.isActive('heading', { level: 3 })}
          title='Heading 3'
        >
          <Heading3 size={iconSize} />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Lists */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          title='Bullet List'
        >
          <List size={iconSize} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          title='Ordered List'
        >
          <ListOrdered size={iconSize} />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Block elements */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          title='Blockquote'
        >
          <Quote size={iconSize} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive('codeBlock')}
          title='Code Block'
        >
          <Braces size={iconSize} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title='Horizontal Rule'
        >
          <Minus size={iconSize} />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Insert */}
        <ToolbarButton
          onClick={() => {
            setShowLinkInput(!showLinkInput)
            setShowImageInput(false)
          }}
          isActive={editor.isActive('link')}
          title='Insert Link'
        >
          <Link size={iconSize} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            setShowImageInput(!showImageInput)
            setShowLinkInput(false)
          }}
          title='Insert Image'
        >
          <Image size={iconSize} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
          title='Insert Table'
        >
          <Table size={iconSize} />
        </ToolbarButton>
      </div>

      {/* Link input */}
      {showLinkInput && (
        <div className='flex items-center gap-2 px-3 pb-2'>
          <input
            type='url'
            placeholder='https://example.com'
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && setLink()}
            className='flex-1 px-3 py-1.5 text-sm bg-slate-800 border border-slate-700 rounded-md text-slate-200 placeholder-slate-500 focus:outline-none focus:border-primary'
            autoFocus
          />
          <button
            onClick={setLink}
            className='px-3 py-1.5 text-sm bg-primary/20 text-primary rounded-md hover:bg-primary/30 transition-colors'
          >
            Set
          </button>
          <button
            onClick={() => {
              setShowLinkInput(false)
              setLinkUrl('')
            }}
            className='px-3 py-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors'
          >
            Cancel
          </button>
        </div>
      )}

      {/* Image input */}
      {showImageInput && (
        <div className='flex items-center gap-2 px-3 pb-2'>
          <input
            type='url'
            placeholder='https://example.com/image.png'
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addImage()}
            className='flex-1 px-3 py-1.5 text-sm bg-slate-800 border border-slate-700 rounded-md text-slate-200 placeholder-slate-500 focus:outline-none focus:border-primary'
            autoFocus
          />
          <button
            onClick={addImage}
            className='px-3 py-1.5 text-sm bg-primary/20 text-primary rounded-md hover:bg-primary/30 transition-colors'
          >
            Add
          </button>
          <button
            onClick={() => {
              setShowImageInput(false)
              setImageUrl('')
            }}
            className='px-3 py-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors'
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}
