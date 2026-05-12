# GitHub Copilot Interactive Workshop

A hands-on, interactive workshop for mastering GitHub Copilot — built with React 19, TypeScript, Tailwind CSS, shadcn/ui, and MDX.

## Features

- **11 learning modules** covering inline completions, Chat, slash commands, CLI, Edits, custom instructions, Agent Mode, GitHub.com, Extensions & MCP, enterprise config, and prompt engineering
- **Interactive terminal** with guided steps and free-play mode per module
- **Progress tracking** persisted in localStorage
- **Per-module knowledge checks** with explanations
- **Copilot CLI Simulator** playground
- **Cheat Sheet** with OS toggle (Mac / Windows / Linux) and search
- **Feature Index** — 60+ features filterable by level and category
- **Config Builder** — generate VS Code `settings.json` visually
- **Quiz** — find your starting module
- **References** — filtered by type (Docs / Blog / Repo / Video)
- **EN / FR** — fully internationalised with react-i18next

## Tech Stack

| Concern | Choice |
|---|---|
| Build | Vite 6 + `@vitejs/plugin-react` |
| UI | React 19, TypeScript |
| Routing | React Router v6 `HashRouter` |
| Styling | Tailwind CSS v3 + shadcn/ui |
| Content | MDX via `@mdx-js/rollup` |
| Syntax highlight | `rehype-pretty-code` + Shiki (github-dark) |
| i18n | react-i18next |

## Project Structure

```
src/
├── content/modules/   # 01–11.mdx — one file per module
├── data/              # Typed TypeScript data files
├── components/
│   ├── layout/        # Sidebar, Topbar, Layout
│   ├── mdx/           # Callout, KeyPoints, ModuleQuiz, PromptList
│   ├── module/        # ModuleTerminal
│   └── shared/        # PageHeader, FilterBar, SearchInput, LevelBadge…
├── pages/             # One file per route
├── hooks/             # useProgress, usePlayground, useLocalisedData…
├── i18n/locales/      # en.json, fr.json
└── types/index.ts     # Shared TypeScript interfaces
```

## Development

```bash
npm install
npm run dev
```

## Build & Deploy

The project deploys to GitHub Pages via GitHub Actions on every push to `main`.

```bash
npm run build   # outputs to dist/
```
