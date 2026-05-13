import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PageHeader from '@/components/shared/PageHeader'
import FilterBar from '@/components/shared/FilterBar'
import { useLocalisedReferences } from '@/hooks/useLocalisedData'
import { REFERENCE_TYPE_ICONS, REFERENCE_TYPE_CLASSES, REFERENCE_TYPE_KEYS } from '@/data/references-meta'

export default function ReferencesPage() {
  const { t } = useTranslation()
  const references = useLocalisedReferences()
  const [activeType, setActiveType] = useState('all')

  const TYPE_OPTIONS = [
    { value: 'all', label: t('references.allTypes') },
    ...REFERENCE_TYPE_KEYS.map(k => ({ value: k, label: t(`references.type.${k}`) })),
  ]

  return (
    <div className="page">
      <PageHeader
        badge={t('references.badge')}
        title={t('references.title')}
        desc={t('references.description')}
      />

      <FilterBar options={TYPE_OPTIONS} active={activeType} onChange={setActiveType} />

      {references.map(section => {
        const links = activeType === 'all'
          ? section.links
          : section.links.filter(l => l.type === activeType)
        if (links.length === 0) return null
        return (
          <div key={section.label} className="ref-section">
            <h2>{section.icon} {section.label}</h2>
            <div className="ref-grid">
              {links.map(link => (
                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="ref-card">
                  <div className="ref-card-title">{link.title}</div>
                  <div className="ref-card-desc">{link.desc}</div>
                  <div className="ref-card-footer">
                    <div className="ref-card-url">{link.url.replace('https://', '')}</div>
                    <span className={`ref-type-badge ${REFERENCE_TYPE_CLASSES[link.type]}`}>
                      {REFERENCE_TYPE_ICONS[link.type]}
                      {t(`references.type.${link.type}`)}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
