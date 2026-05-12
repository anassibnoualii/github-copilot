import references from '@/data/references'

export default function ReferencesPage() {
  return (
    <div className="page">
      <div className="module-header">
        <div className="meta"><span className="badge badge-purple">Reference</span></div>
        <h1>References</h1>
        <p className="desc">Official documentation, changelogs, learning resources, and IDE extensions — everything you need to go deeper.</p>
      </div>

      {references.map(section => (
        <div key={section.label} style={{ marginBottom: 44 }}>
          <h2>{section.icon} {section.label}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 12, marginTop: 16 }}>
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
