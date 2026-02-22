# Project Details Page — Implementation Plan

## Decisions

| Decision | Choice |
|----------|--------|
| Content storage | **MDX files** (mirrors blog system) |
| Page sections | "Why I Built This" + "How It Works" + "What I Learned" |
| Demo embedding | **Screenshot/video gallery** embedded on the detail page |
| Dead databases | Don't redeploy. Record demos locally, embed as images/video. |
| New feature indicator | **Animated "New" badge/pill** with localStorage dismissal |

---

## Content Storage: MDX Files

- Create `/content/projects/<slug>.mdx` for each project
- Frontmatter holds metadata (title, date, tools, links, image, screenshot/video paths)
- MDX body holds the rich content (Why I Built This, How It Works, What I Learned)
- New `lib/projects.ts` mirroring `lib/blog.ts` for data access
- `generateStaticParams()` for static generation

### Frontmatter schema

```yaml
---
title: "Peek-a-boo"
slug: "peek-a-boo"
description: "Gender reveal platform - Micro-SaaS"
date: "2025"
madeAt: "Micro-SaaS Launch"
tools: ["Next.js", "PostgreSQL", "GitHub Actions", "Stripe", "TypeScript"]
link: "https://www.lovepeekaboo.com/"
github: ""
image: "peekaboo.png"
screenshots: ["peekaboo-home.png", "peekaboo-dashboard.png"]
video: ""
published: true
---
```

---

## Page Layout

```
┌─────────────────────────────────────────┐
│  ← Back to projects                     │
│                                         │
│  [Project Image — full width banner]    │
│                                         │
│  Project Title              [Live] [GH] │
│  Short description                      │
│  Tech tags: Next.js · Postgres · ...    │
│  Date · Made at: ...                    │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  ## Why I Built This                    │
│  (motivation, problem, inspiration)     │
│                                         │
│  ## How It Works                        │
│  (architecture, tech decisions, code)   │
│                                         │
│  ## What I Learned                      │
│  (takeaways, mistakes, growth)          │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  ## Demo                                │
│  [Screenshot gallery / video embed]     │
│  "Demo environment unavailable" note    │
│  if no live link                        │
│                                         │
├─────────────────────────────────────────┤
│  ← Previous Project  Next Project →     │
└─────────────────────────────────────────┘
```

---

## Demo: Screenshot/Video Gallery

- Each project can have `screenshots[]` and/or `video` in frontmatter
- Render a gallery section on the detail page with:
  - Lightbox-style image viewer for screenshots (click to expand)
  - `<video>` tag for screen recordings (controls, no autoplay)
- For projects with a live link: show a prominent "Visit Live Site" button alongside the gallery
- For projects with dead backends: show the gallery + a note like "Live demo unavailable — see walkthrough below"
- Store media in `/public/projects/<slug>/` to keep assets organized

---

## Animated "New" Badge

- Small pill/badge on project cards: "New: Click for details"
- CSS pulse animation (subtle glow or scale pulse)
- On first visit to any project detail page, set `localStorage.setItem('projectDetailsVisited', 'true')`
- Badge only renders when that flag is absent
- Place on the first visible project card (or on the section header)

---

## Implementation Steps

1. **Create project data layer** — `lib/projects.ts` mirroring `lib/blog.ts`
2. **Create MDX content files** — `/content/projects/*.mdx` with frontmatter + placeholder sections
3. **Create route** — `/app/projects/[slug]/page.tsx` with `generateStaticParams`
4. **Create detail page layout** — `/app/projects/[slug]/project-detail-layout.tsx`
5. **Build screenshot/video gallery component** — `/components/ProjectGallery.tsx`
6. **Update project cards** — Wrap cards in `<Link href="/projects/slug">` instead of external links
7. **Add "New" badge** — Animated indicator on project cards with localStorage dismissal
8. **Add not-found page** — `/app/projects/[slug]/not-found.tsx`
9. **Update CommandDialog** — Add project detail pages to command palette navigation

---

## Files to Create

```
lib/projects.ts                              # Data access layer
content/projects/*.mdx                       # 10 MDX files (one per project)
app/projects/[slug]/page.tsx                 # Route + SSG
app/projects/[slug]/project-detail-layout.tsx # Detail page layout component
app/projects/[slug]/not-found.tsx            # 404 for bad slugs
components/ProjectGallery.tsx                # Screenshot/video gallery
```

## Files to Modify

```
components/Projects.tsx                      # Cards → Link wrappers + "New" badge
components/CommandDialog.tsx                 # Add project routes to palette
```
