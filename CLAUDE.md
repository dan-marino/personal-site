# Personal Site

Personal site for Dan Marino ("Dan From Queens"). Built with Eleventy 3.1.0 and deployed to Netlify.

## Tech Stack
- **Eleventy 3.1.0** — static site generator
- **Nunjucks** (.njk) — templating
- **Markdown** (.md) — post content
- **Alpine.js v3** (CDN) — light interactivity
- **Luxon** — date formatting in config/filters
- Custom CSS with CSS variables (monospace aesthetic)

## Commands
```bash
npx eleventy          # production build → _site/
npx eleventy --serve  # dev server with live reload
```

## Structure
```
src/
├── _data/            # Global data (site.json, shows.js)
├── _includes/
│   ├── layout.njk    # Base layout for all pages
│   └── macros/
│       └── renderShows.njk
├── posts/YYYY/       # Blog posts, organized by year
├── public/           # Static assets (copied to site root)
│   ├── styles.css
│   ├── favicon.png
│   └── images/
├── index.md
├── about.njk
├── posts.njk
├── shows.njk
└── 404.njk
```

## Conventions

### Posts
- Path: `src/posts/YYYY/YYYY-MM-DD-slug.md`
- Required frontmatter:
  ```yaml
  ---
  title: "Post Title"
  date: YYYY-MM-DD
  tags: post
  layout: layout.njk
  ---
  ```
- The `tags: post` field is required for posts to appear in the `postsByYear` collection.

### Pages
- All pages use `layout: layout.njk`
- Permalinks default to directory-style URLs (e.g. `about.njk` → `/about/`)

### Shows data
- Managed in `src/_data/shows.js`
- Two categories: `improv` and `music`
- Each show: `{ title, date (YYYY-MM-DD), venue, tickets (URL or null) }`
- The file auto-splits shows into `upcoming` / `past` based on today's date

### Static assets
- Anything in `src/public/` is copied to the root of the build output
- `styles.css` lives at `src/public/styles.css` and is served as `/styles.css`

## Eleventy Config (`/.eleventy.js`)
- Input: `src/`, Output: `_site/`
- Collections: `postsByYear` (grouped by year), `shows` (glob `src/shows/**`)
- Filters: `date` (Luxon format), `toTimestamp`, `merge`
