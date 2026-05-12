import { useState } from 'react'
import cheatsheetGroups from '@/data/cheatsheet'

function highlight(text: string, q: string): string {
  if (!q) return text
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return text.replace(new RegExp(`(${escaped})`, 'gi'), '<mark>$1</mark>')
}

export default function CheatSheetPage() {
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()

  const filtered = cheatsheetGroups.map(g => ({
    ...g,
    items: g.items.filter(
      item => !q || item.cmd.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q)
    ),
  })).filter(g => g.items.length > 0)

  return (
    <div className="page">
      <div className="module-header">
        <div className="meta"><span className="badge badge-purple">Reference</span></div>
        <h1>Cheat Sheet</h1>
        <p className="desc">Every shortcut, slash command, context variable, and CLI command — searchable.</p>
      </div>

      <div className="cheatsheet-search">
        <span className="search-icon">⌕</span>
        <input
          type="text"
          placeholder="Search shortcuts, commands…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      {filtered.map(group => (
        <div key={group.title} className="cs-group">
          <div className="cs-group-title">{group.icon} {group.title}</div>
          <div className="cs-grid">
            {group.items.map(item => (
              <div key={item.cmd} className="cs-item">
                <div className="cs-item-cmd" dangerouslySetInnerHTML={{ __html: highlight(item.cmd, q) }} />
                <div className="cs-item-desc" dangerouslySetInnerHTML={{ __html: highlight(item.desc, q) }} />
              </div>
            ))}
          </div>
        </div>
      ))}

      {filtered.length === 0 && <p className="muted">No results for "{query}"</p>}
    </div>
  )
}
