# Kshitij Patil — Website

Built from the "Kshitij-Patil-website" Figma design. No build step — every
page is plain HTML that shares one stylesheet:

```
kshitij-site/
├── index.html            ← Homepage: hero + tic-tac-toe, folder links, methodology, resume CTA, contact form
├── product/index.html    ← Product case-study timeline
├── marketing/index.html  ← Marketing case-study timeline
├── design/index.html     ← Design work, personal art, Instagram grid
├── styles.css            ← every page's styles, in one file
├── resume.pdf            ← downloadable resume, linked from the homepage CTA
└── images/                ← exported Figma assets + project photos/logos
```

## See it on your computer

Because the sub-pages use root-relative-looking folder links (`product/`,
`marketing/`, etc.), open `index.html` through a local server rather than
double-clicking it — e.g. from this folder:

```
ruby -run -e httpd . -p 8000
```

then visit `http://localhost:8000`. (Any static server works — `npx serve`,
VS Code's Live Server extension, etc.)

## Where things live

| Feature | File | What to look for |
|---|---|---|
| Homepage hero + animated folder links | `index.html` + `styles.css` | `.hero`, `.folders`, the `slideUp`/`fadeIn` keyframes |
| Product/Marketing/Design case-study timelines | `product/index.html`, `marketing/index.html`, `design/index.html` | `.timeline-entry` — plain `<details>/<summary>`, no JS |
| Contact form | `index.html`, `#contact` section | `.contact-form` — a real Netlify Form |
| Share button | `index.html` + `share.js` | native share sheet where supported, clipboard-copy fallback elsewhere |
| Page-color circle transitions | `transition.js` | `data-transition-color` attributes on links |

## Common tweaks

**Add a new case-study entry** — in `product/index.html`, `marketing/index.html`,
or `design/index.html`, each `<details class="timeline-entry">` is one entry.
Copy an existing one, update the `<summary>` badge/title/year, the aim/part/
why/what-it-took/tools copy, and swap `.timeline-card__images` for the new
project's photos.

**Change page background colors** — each page sets its own color via a class
on `<body>` (`.page-home`, `.page-product`, `.page-marketing`, `.page-design`)
near the top of `styles.css`.

**Change fonts** — the whole site uses Headland One (headings) and Fustat
(body), loaded via the `<link>` tag near the top of each page and set on
`body` in `styles.css`.

**Re-export a Figma asset** — everything in `images/` came from the Figma
file via the Figma MCP `download_assets` tool. `back-curve.svg` was
hand-edited afterward to strip a baked-in page-background rect (a known
export quirk) so it can overlay any of the 4 pastel page colors.

**Update the resume** — replace `resume.pdf` with a new export; no other
changes needed, the homepage CTA links directly to that filename.

## Deploying it for real (free)

1. Create a free [GitHub](https://github.com) account if you don't have one,
   and put this folder in a new repository.
2. Create a free [Netlify](https://netlify.com) account, connect it to that
   GitHub repo. It auto-detects there's no build step and publishes the site
   as-is — and because the homepage's contact form has `data-netlify="true"`,
   Netlify automatically wires up form submissions (check Site settings →
   Forms for entries, no backend code needed).
3. Every time you push a change to GitHub, Netlify redeploys automatically.
4. Once you have a custom domain (e.g. kshitijpatil.com) pointed at the site
   via Netlify's domain settings, update the placeholder `og:url` /
   `og:image` URLs in each page's `<head>` to match the real domain — they
   currently point at `https://kshitijpatil.com/` as a placeholder.

## What's next

Site content is real and current across all four pages. Remaining
lower-priority items: the Design page's Instagram grid depends on a
third-party embed (mirror-app.com) with no fallback if that service ever
goes down, and the `og:url`/`og:image` domain should be updated once the
site is live on its real domain (see step 4 above).
