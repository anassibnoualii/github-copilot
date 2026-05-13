import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown, ChevronUp } from 'lucide-react'
import LevelBadge from '@/components/shared/LevelBadge'
import PageHeader from '@/components/shared/PageHeader'
import SearchInput from '@/components/shared/SearchInput'
import FilterBar from '@/components/shared/FilterBar'
import { useFeaturesFilter } from '@/hooks/useFeaturesFilter'
import { useLocalisedFeatures } from '@/hooks/useLocalisedData'
import { LEVEL_FILTER_VALUES, CATEGORY_FILTER_VALUES } from '@/data/features'

const LEVEL_LABEL_KEYS: Record<string, string> = {
  all: 'features.allLevels', beginner: 'levels.beginner',
  intermediate: 'levels.intermediate', advanced: 'levels.advanced',
}

const CATEGORY_LABEL_KEYS: Record<string, string> = {
  all: 'features.allCategories', IDE: 'features.categories.IDE',
  CLI: 'features.categories.CLI', 'GitHub.com': 'features.categories.githubCom',
  Extensions: 'features.categories.extensions', Enterprise: 'features.categories.enterprise',
}

export default function FeaturesPage() {
  const { t } = useTranslation()
  const localisedFeatures = useLocalisedFeatures()
  const { query, setQuery, activeLevel, setActiveLevel, activeCategory, setActiveCategory, filtered } =
    useFeaturesFilter(localisedFeatures)
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null)

  const LEVELS     = useMemo(() => LEVEL_FILTER_VALUES.map(v => ({ value: v, label: t(LEVEL_LABEL_KEYS[v]) })), [t])
  const CATEGORIES = useMemo(() => CATEGORY_FILTER_VALUES.map(v => ({ value: v, label: t(CATEGORY_LABEL_KEYS[v]) })), [t])

  function toggleExpand(i: number) {
    setExpandedIdx(prev => (prev === i ? null : i))
  }

  return (
    <div className="page">
      <PageHeader
        badge={t('features.badge')}
        title={t('features.title')}
        desc={t('features.description')}
      />

      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder={t('features.searchPlaceholder')}
        className="mb-4"
      />

      <FilterBar options={LEVELS}      active={activeLevel}    onChange={setActiveLevel} />
      <FilterBar options={CATEGORIES}  active={activeCategory} onChange={setActiveCategory} />

      <div className="feature-count">
        {t('features.count', { count: filtered.length })}
      </div>

      <div className="feature-list">
        {filtered.map((f, i) => {
          const isExpanded = expandedIdx === i
          const hasExample = Boolean(f.example)
          return (
            <div
              key={i}
              className={`feature-item ${hasExample ? 'feature-item-clickable' : ''} ${isExpanded ? 'feature-item-expanded' : ''}`}
              onClick={() => hasExample && toggleExpand(i)}
            >
              <div className="feature-item-row">
                <div className="feature-item-icon">{f.icon}</div>
                <div className="feature-item-body">
                  <div className="feature-item-name">{f.name}</div>
                  <div className="feature-item-desc">{f.desc}</div>
                </div>
                <div className="feature-item-tags">
                  <LevelBadge level={f.level} />
                  <span className="badge badge-purple">{f.category}</span>
                  {hasExample && (
                    <span className="feature-expand-icon">
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </span>
                  )}
                </div>
              </div>
              {isExpanded && f.example && (
                <pre className="feature-example">{f.example}</pre>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
