# TipTap Editor Implementation Plan

## Context
Portfolio is a Next.js 14 static site. Blog posts are MDX files in `content/blog/`. No database, no API routes, no auth. The user wants to add a TipTap rich text editor as a portfolio feature demonstrating their work project skills, **without committing to a database yet**.

## Approach: Client-Side TipTap Editor (No Database Required)

Build a TipTap editor page that works entirely client-side. Published blog posts still render from MDX files as they do today. The editor serves as both a functional tool and a portfolio showcase.

If a database is added later, the editor is already built and just needs a save endpoint.

---

## Steps

### Step 1: Install TipTap dependencies
Install the core TipTap packages:
- `@tiptap/react` — React bindings
- `@tiptap/starter-kit` — Bundle of common extensions (bold, italic, headings, code blocks, blockquotes, lists, etc.)
- `@tiptap/extension-link` — Hyperlink support
- `@tiptap/extension-image` — Image embedding
- `@tiptap/extension-code-block-lowlight` — Code blocks with syntax highlighting (matches existing MDX code block styling)
- `@tiptap/extension-table`, `@tiptap/extension-table-row`, `@tiptap/extension-table-cell`, `@tiptap/extension-table-header` — Table support
- `@tiptap/extension-placeholder` — Placeholder text
- `lowlight` — Syntax highlighting engine for code blocks

### Step 2: Create the TipTap editor component
Create `components/editor/TipTapEditor.tsx`:
- Initialize TipTap with the extensions from Step 1
- Build a toolbar with formatting buttons (bold, italic, headings, link, image, code block, blockquote, lists, table)
- Style the editor content area to match the existing blog post prose styles (reuse the `prose prose-lg` classes)
- The editor is a client component (`'use client'`)

### Step 3: Create the editor toolbar component
Create `components/editor/EditorToolbar.tsx`:
- Formatting buttons that call TipTap commands (e.g., `editor.chain().focus().toggleBold().run()`)
- Visual feedback for active states (bold button highlighted when cursor is in bold text)
- Group buttons logically: text formatting | headings | lists | insert (link, image, code block, table)
- Style to match the portfolio's dark theme

### Step 4: Create the blog editor page
Create `app/blog/editor/page.tsx`:
- Layout with the TipTap editor as the main content area
- Sidebar or top section with metadata fields: title, description, tags, date
- "Export as Markdown" button — serializes TipTap JSON to Markdown/MDX string (using a custom serializer or `@tiptap/html` + turndown)
- "Copy HTML" button — exports raw HTML
- "Preview" toggle — switches between editor view and rendered preview (reusing the existing `BlogPostLayout` component)
- This page is **not** linked from the main nav (accessible via direct URL only, or behind a hidden link)

### Step 5: Add HTML-to-Markdown export utility
Create `lib/editor-utils.ts`:
- Function to convert TipTap HTML output to Markdown (for copying/exporting)
- Function to generate MDX frontmatter from the metadata fields
- This lets the user write in the TipTap editor, then export the content to paste into an MDX file or use later when a database is added

### Step 6: Style the editor to match portfolio theme
Update `app/globals.css` or create `components/editor/editor.css`:
- Style the TipTap `.ProseMirror` content area to match the existing blog prose styles
- Toolbar styles consistent with the dark theme
- Focus states, selection highlighting, placeholder text styling

---

## What This Gets You (Without a Database)
- A fully functional TipTap rich text editor in your portfolio
- Demonstrates the exact TipTap skills from your work project
- Content can be exported as Markdown/HTML and manually saved as MDX files
- Editor page exists at `/blog/editor` as a tool you can use and show off
- Zero infrastructure cost — no database, no auth, no API routes

## What a Database Would Add Later (Future)
- Save/load drafts via API routes
- Auth to protect the editor page
- Full CRUD for blog posts without touching MDX files
- This plan is structured so adding a database later is straightforward — just add API routes that accept the TipTap JSON and store it
