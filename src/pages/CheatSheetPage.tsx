import { useState } from 'react'
import { Search } from 'lucide-react'
import cheatsheetGroups from '@/data/cheatsheet'
import PageHeader from '@/components/shared/PageHeader'

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
      <PageHeader
        badge="Reference"
        title="Cheat Sheet"
        desc="Every shortcut, slash command, context variable, and CLI command — searchable."
      />

      <div className="cheatsheet-search">
        <Search size={15} className="search-icon-svg" />
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
