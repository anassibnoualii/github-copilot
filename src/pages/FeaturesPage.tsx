import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import features from '@/data/features'
import type { Level, FeatureCategory } from '@/types'
import LevelBadge from '@/components/shared/LevelBadge'
import { filterBtnClass } from '@/lib/utils'

const LEVELS: Array<{ value: string; label: string }> = [
  { value: 'all',          label: 'All Levels' },
  { value: 'beginner',     label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced',     label: 'Advanced' },
]

const CATEGORIES: Array<{ value: string; label: string }> = [
  { value: 'all',        label: 'All Categories' },
  { value: 'IDE',        label: 'IDE' },
  { value: 'CLI',        label: 'CLI' },
  { value: 'GitHub.com', label: 'GitHub.com' },
  { value: 'Extensions', label: 'Extensions' },
  { value: 'Enterprise', label: 'Enterprise' },
]

function FilterBar({ options, active, onChange }: {
  options: typeof LEVELS
  active: string
  onChange: (v: string) => void
}) {
  return (
    <div className="feature-filters">
      {options.map(o => (
        <button key={o.value} className={filterBtnClass(active === o.value)} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  )
}

export default function FeaturesPage() {
  const [query, setQuery]               = useState('')
  const [activeLevel, setActiveLevel]   = useState('all')
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
        <Search size={15} className="search-icon-svg" />
        <input
          type="text"
          placeholder="Search features…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      <FilterBar options={LEVELS}      active={activeLevel}    onChange={setActiveLevel} />
      <FilterBar options={CATEGORIES}  active={activeCategory} onChange={setActiveCategory} />

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
              <LevelBadge level={f.level} />
              <span className="badge badge-purple">{f.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
