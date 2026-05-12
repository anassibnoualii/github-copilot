import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import modulesMeta from '@/data/modules-meta'
import LevelBadge from '@/components/shared/LevelBadge'
import { FIRST_MODULE_ID } from '@/lib/utils'

const QUICK_LINKS = [
  { to: '/playground', title: 'Playground',    desc: 'Try Copilot CLI commands interactively' },
  { to: '/cheatsheet', title: 'Cheat Sheet',   desc: 'All shortcuts, commands & context variables' },
  { to: '/features',   title: 'Feature Index', desc: 'Search 60+ features by level and category' },
  { to: '/quiz',       title: 'Quiz',          desc: 'Find the right starting module for you' },
]

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="page">
      <div className="hero">
        <div className="section-label">Welcome</div>
        <h1>GitHub Copilot Workshop</h1>
        <p>A hands-on guide to mastering GitHub Copilot — from inline completions and Chat to Agent Mode, extensions, and enterprise configuration.</p>
        <div className="hero-actions">
          <Button onClick={() => navigate(`/module/${FIRST_MODULE_ID}`)}>Start Learning</Button>
          <Button variant="outline" onClick={() => navigate('/quiz')}>Find Your Level</Button>
        </div>
      </div>

      <div className="section-label">Curriculum</div>
      <h2>11 Learning Modules</h2>
      <div className="module-grid grid-3 mt-4">
        {modulesMeta.map(m => (
          <div key={m.id} className="module-card" onClick={() => navigate(`/module/${m.id}`)}>
            <span className="card-num">{m.id}</span>
            <div className="card-title">{m.title}</div>
            <div className="card-meta">
              <span>{m.duration}</span>
              <LevelBadge level={m.level} />
            </div>
          </div>
        ))}
      </div>

      <div className="section-spacer">
        <div className="section-label">Reference</div>
        <h2>Tools &amp; Reference</h2>
        <div className="quick-links">
          {QUICK_LINKS.map(link => (
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
