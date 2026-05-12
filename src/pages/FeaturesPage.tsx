import { useState, useMemo } from 'react'
import features from '@/data/features'
import type { Level, FeatureCategory } from '@/types'

const LEVELS: Array<{ value: string; label: string }> = [
  { value: 'all', label: 'All Levels' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
]

const CATEGORIES: Array<{ value: string; label: string }> = [
  { value: 'all', label: 'All Categories' },
  { value: 'IDE', label: 'IDE' },
  { value: 'CLI', label: 'CLI' },
  { value: 'GitHub.com', label: 'GitHub.com' },
  { value: 'Extensions', label: 'Extensions' },
  { value: 'Enterprise', label: 'Enterprise' },
]

const LEVEL_BADGE: Record<string, string> = {
  beginner:     'badge-beginner',
  intermediate: 'badge-intermediate',
  advanced:     'badge-advanced',
}

export default function FeaturesPage() {
  const [query, setQuery] = useState('')
  const [activeLevel, setActiveLevel] = useState('all')
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return features.filter(f => {
      if (activeLevel !== 'all' && f.level !== (activeLevel as Level)) return false
      if (activeCategory !== 'all' && f.category !== (activeCategory as FeatureCategory)) return false
      if (q && !f.name.toLowerCase().includes(q) && !f.desc.toLowerCase().includes(q)) return false
      return true
    })
  }, [query, activeLevel, activeCategory])

  return (
    <div className="page">
      <div className="module-header">
        <div className="meta"><span className="badge badge-purple">Reference</span></div>
        <h1>Feature Index</h1>
        <p className="desc">Every GitHub Copilot feature, searchable and filterable by level and category.</p>
      </div>

      <div className="feature-search">
        <input
          type="text"
          placeholder="Search features…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      <div className="feature-filters">
        {LEVELS.map(l => (
          <button
            key={l.value}
            className={`filter-btn${activeLevel === l.value ? ' active' : ''}`}
            onClick={() => setActiveLevel(l.value)}
          >
            {l.label}
          </button>
        ))}
      </div>

      <div className="feature-filters">
        {CATEGORIES.map(c => (
          <button
            key={c.value}
            className={`filter-btn${activeCategory === c.value ? ' active' : ''}`}
            onClick={() => setActiveCategory(c.value)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="feature-count">{filtered.length} feature{filtered.length !== 1 ? 's' : ''}</div>

      <div className="feature-list">
        {filtered.map(f => (
          <div key={f.name} className="feature-item">
            <div className="feature-item-icon">{f.icon}</div>
            <div className="feature-item-body">
              <div className="feature-item-name">{f.name}</div>
              <div className="feature-item-desc">{f.desc}</div>
            </div>
            <div className="feature-item-tags">
              <span className={`badge ${LEVEL_BADGE[f.level]}`}>{f.level.charAt(0).toUpperCase() + f.level.slice(1)}</span>
              <span className="badge badge-purple">{f.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
