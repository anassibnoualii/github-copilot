import { useTranslation } from 'react-i18next'
import features from '@/data/features'
import LevelBadge from '@/components/shared/LevelBadge'
import PageHeader from '@/components/shared/PageHeader'
import SearchInput from '@/components/shared/SearchInput'
import FilterBar from '@/components/shared/FilterBar'
import { useFeaturesFilter } from '@/hooks/useFeaturesFilter'

export default function FeaturesPage() {
  const { t } = useTranslation()
  const { query, setQuery, activeLevel, setActiveLevel, activeCategory, setActiveCategory, filtered } =
    useFeaturesFilter(features)

  const LEVELS = [
    { value: 'all',          label: t('features.allLevels') },
    { value: 'beginner',     label: t('levels.beginner') },
    { value: 'intermediate', label: t('levels.intermediate') },
    { value: 'advanced',     label: t('levels.advanced') },
  ]

  const CATEGORIES = [
    { value: 'all',        label: t('features.allCategories') },
    { value: 'IDE',        label: t('features.categories.IDE') },
    { value: 'CLI',        label: t('features.categories.CLI') },
    { value: 'GitHub.com', label: t('features.categories.githubCom') },
    { value: 'Extensions', label: t('features.categories.extensions') },
    { value: 'Enterprise', label: t('features.categories.enterprise') },
  ]

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
