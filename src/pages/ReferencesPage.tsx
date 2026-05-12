import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BookOpen, FileText, GitBranch, Video } from 'lucide-react'
import PageHeader from '@/components/shared/PageHeader'
import FilterBar from '@/components/shared/FilterBar'
import { useLocalisedReferences } from '@/hooks/useLocalisedData'
import type { ReferenceType } from '@/types'

const TYPE_ICONS: Record<ReferenceType, React.ReactNode> = {
  doc:   <BookOpen size={11} />,
  blog:  <FileText size={11} />,
  repo:  <GitBranch size={11} />,
  video: <Video size={11} />,
}

const TYPE_CLASSES: Record<ReferenceType, string> = {
  doc:   'ref-type-doc',
  blog:  'ref-type-blog',
  repo:  'ref-type-repo',
  video: 'ref-type-video',
}

export default function ReferencesPage() {
  const { t } = useTranslation()
  const references = useLocalisedReferences()
  const [activeType, setActiveType] = useState('all')

  const TYPE_OPTIONS = [
    { value: 'all',   label: t('references.allTypes') },
    { value: 'doc',   label: t('references.type.doc') },
    { value: 'blog',  label: t('references.type.blog') },
    { value: 'repo',  label: t('references.type.repo') },
    { value: 'video', label: t('references.type.video') },
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
                    <span className={`ref-type-badge ${TYPE_CLASSES[link.type]}`}>
                      {TYPE_ICONS[link.type]}
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
