import { useTranslation } from 'react-i18next'
import PageHeader from '@/components/shared/PageHeader'
import { useLocalisedReferences } from '@/hooks/useLocalisedData'

export default function ReferencesPage() {
  const { t } = useTranslation()
  const references = useLocalisedReferences()

  return (
    <div className="page">
      <PageHeader
        badge={t('references.badge')}
        title={t('references.title')}
        desc={t('references.description')}
      />

      {references.map(section => (
        <div key={section.label} className="ref-section">
          <h2>{section.icon} {section.label}</h2>
          <div className="ref-grid">
            {section.links.map(link => (
              <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="ref-card">
                <div className="ref-card-title">{link.title}</div>
                <div className="ref-card-desc">{link.desc}</div>
                <div className="ref-card-url">{link.url.replace('https://', '')}</div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
