# Blog Feature

## Architecture

The blog uses **MDX files** stored in the repository at `content/blog/`. Each `.mdx` file is a blog post with YAML frontmatter for metadata and MDX content for the body.

### Why MDX?

- **Rich text**: Supports headings, bold, italic, hyperlinks, code blocks, images, blockquotes, and lists out of the box via Markdown syntax
- **React components**: Embed custom React components directly in blog posts (e.g., `<Callout>`)
- **Zero external dependencies**: No CMS, database, or third-party service required
- **Version controlled**: Posts are tracked in git alongside the codebase
- **Static generation**: All posts are pre-rendered at build time for fast page loads

### Key Libraries

| Package | Purpose |
|---------|---------|
| `next-mdx-remote` | Compiles MDX to React components on the server |
| `gray-matter` | Parses YAML frontmatter from MDX files |
| `reading-time` | Calculates estimated reading time |
| `@tailwindcss/typography` | Provides `prose` CSS classes for styled rendered content |

## Directory Structure

```
content/
  blog/
    my-post-slug.mdx      # Each file = one blog post
    another-post.mdx

lib/
  blog.ts                  # Utility functions for reading/parsing posts

components/
  BlogCard.tsx             # Reusable post card (used on homepage + /blog)
  BlogSection.tsx          # Homepage "Latest Posts" section
  mdx-components.tsx       # Custom component overrides for MDX rendering

app/
  blog/
    page.tsx               # /blog listing page
    blog-list-client.tsx   # Client component for listing animations
    [slug]/
      page.tsx             # /blog/:slug individual post page
      blog-post-layout.tsx # Client component for post layout/animations
      not-found.tsx        # 404 page for invalid slugs
```

## Creating a New Blog Post

1. Create a new `.mdx` file in `content/blog/`:

```bash
touch content/blog/my-new-post.mdx
```

The filename becomes the URL slug (e.g., `my-new-post` -> `/blog/my-new-post`).

2. Add frontmatter at the top of the file:

```yaml
---
title: "My Post Title"
description: "A short description for cards and SEO."
date: "2026-02-15"
tags: ["Tag1", "Tag2"]
published: true
---
```

3. Write your content below the frontmatter using standard Markdown:

```markdown
## Section Heading

This is a paragraph with a [hyperlink](https://example.com) and **bold text**.

- List item one
- List item two

> A blockquote for emphasis.
```

4. Push to the repository. The post will appear on the site after the next deployment.

## Frontmatter Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Display title shown on cards and post page |
| `description` | string | Yes | Short excerpt for post cards and SEO meta description |
| `date` | string | Yes | ISO date string (e.g., `"2026-02-15"`). Used for sorting (newest first) |
| `tags` | string[] | Yes | Array of tag strings displayed as pills on cards |
| `published` | boolean | Yes | Set to `true` to publish, `false` to keep as draft |

## Drafts

Set `published: false` in the frontmatter to create a draft post. Drafts are:
- **Not shown** on the homepage blog section
- **Not shown** on the `/blog` listing page
- **Not accessible** via direct URL (`/blog/draft-slug` returns 404)
- **Not included** in static generation

This lets you commit work-in-progress posts without them being visible on the site.

## Rich Text Features

All standard Markdown syntax is supported and styled:

- **Headings** (`## H2`, `### H3`, etc.)
- **Bold** (`**text**`) and *italic* (`*text*`)
- **Hyperlinks** (`[text](url)`) - external links open in a new tab, internal links use Next.js navigation
- **Code blocks** (triple backtick with language) - styled with the site's code theme
- **Inline code** (single backtick)
- **Blockquotes** (`> text`)
- **Lists** (ordered and unordered)
- **Images** (`![alt](path)`)
- **Horizontal rules** (`---`)
- **Tables** (standard Markdown table syntax)

## Custom MDX Components

You can use custom React components inside MDX files:

### Callout

```mdx
<Callout type="info">
  This is an informational callout.
</Callout>

<Callout type="warning">
  This is a warning callout.
</Callout>

<Callout type="tip">
  This is a tip callout.
</Callout>
```

Types: `info` (blue), `warning` (yellow), `tip` (green).

## Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with "Latest Posts" section (shows 3 most recent) |
| `/blog` | Full blog listing page with all published posts |
| `/blog/[slug]` | Individual blog post page |

## Adding New Custom Components

To make a new React component available inside MDX files:

1. Define the component in `components/mdx-components.tsx`
2. Add it to the `mdxComponents` export object
3. Use it directly in any `.mdx` file (no import needed)
