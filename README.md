# GitHub Copilot Interactive Workshop

> A hands-on, fully interactive workshop for mastering GitHub Copilot.
> **Live site → [anassibnoualii.github.io/github-copilot](https://anassibnoualii.github.io/github-copilot/)**

---

## What's inside

| Section | Description |
|---|---|
| **11 Learning Modules** | Inline completions → Chat → Slash commands → CLI → Edits → Custom instructions → Agent Mode → GitHub.com → Extensions & MCP → Enterprise → Prompt engineering |
| **Guided Terminal** | Step-by-step interactive terminal + free-play mode inside each module |
| **Knowledge Checks** | Per-module quiz with explanations and score |
| **Progress Tracking** | Completion state persisted in `localStorage` |
| **CLI Playground** | Simulated Copilot CLI with autopilot mode |
| **Cheat Sheet** | Every shortcut searchable, with Mac / Windows / Linux toggle |
| **Feature Index** | 60+ features filterable by level and category (click to expand examples) |
| **Config Builder** | Visual toggle UI that generates a ready-to-paste `settings.json` |
| **Quiz** | 5-question self-assessment that recommends a starting module |
| **References** | Curated docs, blogs, repos, and videos — filterable by type |
| **EN / FR** | Fully internationalised with react-i18next |

---

## Tech stack

| Concern | Choice |
|---|---|
| Build | Vite 6 + `@vitejs/plugin-react` |
| UI | React 19, TypeScript |
| Routing | React Router v6 `HashRouter` |
| Styling | Tailwind CSS v3 + shadcn/ui (forced dark — GitHub dark theme) |
| Content | MDX via `@mdx-js/rollup` |
| Syntax highlight | `rehype-pretty-code` + Shiki (`github-dark` theme) |
| i18n | react-i18next (EN + FR) |

## Project structure

```
src/
├── content/modules/     # 01–11.mdx — one MDX file per module
├── data/                # Typed data files (features, cheatsheet, quiz…)
├── components/
│   ├── layout/          # Sidebar, Topbar, Layout
│   ├── mdx/             # Callout, KeyPoints, ModuleQuiz, PromptList
│   ├── module/          # ModuleTerminal (guided + free-play)
│   └── shared/          # PageHeader, FilterBar, SearchInput, LevelBadge…
├── pages/               # One file per route
├── hooks/               # useProgress, usePlayground, useLocalisedData…
├── i18n/locales/        # en.json, fr.json
└── types/index.ts       # All shared TypeScript interfaces
```

## Local development

```bash
npm install
npm run dev      # start dev server
npm run lint     # ESLint check
npm run build    # TypeScript check + Vite production build
```

## Deployment

Pushes to `main` automatically build and deploy to GitHub Pages via GitHub Actions.
The workflow runs `lint → build → deploy`, so lint failures block deployment.
