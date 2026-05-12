import { useNavigate } from 'react-router-dom'
import modulesMeta from '@/data/modules-meta'

const LEVEL_CLASSES: Record<string, string> = {
  beginner:     'badge-beginner',
  intermediate: 'badge-intermediate',
  advanced:     'badge-advanced',
}

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="page">
      <div className="hero">
        <div className="section-label">Welcome</div>
        <h1>GitHub Copilot Workshop</h1>
        <p>A hands-on guide to mastering GitHub Copilot — from inline completions and Chat to Agent Mode, extensions, and enterprise configuration.</p>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={() => navigate('/module/01')}>Start Learning</button>
          <button className="btn btn-ghost" onClick={() => navigate('/quiz')}>Find Your Level</button>
        </div>
      </div>

      <div className="section-label">Curriculum</div>
      <h2>11 Learning Modules</h2>
      <div className="module-grid grid-3" style={{ marginTop: 16 }}>
        {modulesMeta.map(m => (
          <div key={m.id} className="module-card" onClick={() => navigate(`/module/${m.id}`)}>
            <span className="card-num">{m.id}</span>
            <div className="card-title">{m.title}</div>
            <div className="card-meta">
              <span>{m.duration}</span>
              <span className={`badge ${LEVEL_CLASSES[m.level]}`}>{m.level.charAt(0).toUpperCase() + m.level.slice(1)}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 48 }}>
        <div className="section-label">Reference</div>
        <h2>Tools &amp; Reference</h2>
        <div className="quick-links">
          {[
            { to: '/playground', title: 'Playground',    desc: 'Try Copilot CLI commands interactively' },
            { to: '/cheatsheet', title: 'Cheat Sheet',   desc: 'All shortcuts, commands & context variables' },
            { to: '/features',   title: 'Feature Index', desc: 'Search 60+ features by level and category' },
            { to: '/quiz',       title: 'Quiz',          desc: 'Find the right starting module for you' },
          ].map(link => (
            <div key={link.to} className="quick-link" onClick={() => navigate(link.to)}>
              <h3>{link.title}</h3>
              <p>{link.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
