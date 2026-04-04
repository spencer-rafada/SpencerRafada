'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import LinkExtension from '@tiptap/extension-link'
import ImageExtension from '@tiptap/extension-image'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { Table as TableExtension } from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import Placeholder from '@tiptap/extension-placeholder'
import { common, createLowlight } from 'lowlight'
import EditorToolbar from './EditorToolbar'

const lowlight = createLowlight(common)

interface TipTapEditorProps {
  content?: string
  onUpdate?: (html: string) => void
}

export default function TipTapEditor({
  content = '',
  onUpdate,
}: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary hover:text-primary/80 underline transition-colors',
        },
      }),
      ImageExtension.configure({
        HTMLAttributes: {
          class: 'rounded-lg my-6 max-w-full',
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: 'bg-code-bg border border-code-border rounded-lg',
        },
      }),
      TableExtension.configure({
        resizable: false,
      }),
      TableRow,
      TableCell,
      TableHeader,
      Placeholder.configure({
        placeholder: 'Start writing your blog post...',
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[400px] px-6 py-4',
      },
    },
    onUpdate: ({ editor }) => {
      onUpdate?.(editor.getHTML())
    },
  })

  if (!editor) return null

  return (
    <div className='border border-slate-700/50 rounded-lg overflow-hidden bg-slate-900/30'>
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}
