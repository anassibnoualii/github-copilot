import references from '@/data/references'
import PageHeader from '@/components/shared/PageHeader'

export default function ReferencesPage() {
  return (
    <div className="page">
      <PageHeader
        badge="Reference"
        title="References"
        desc="Official documentation, changelogs, learning resources, and IDE extensions — everything you need to go deeper."
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
