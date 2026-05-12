import { NavLink } from 'react-router-dom'
import modulesMeta from '@/data/modules-meta'

const LEVEL_BADGE: Record<string, string> = {
  beginner:     'badge-b',
  intermediate: 'badge-i',
  advanced:     'badge-a',
}
const LEVEL_LABEL: Record<string, string> = {
  beginner: 'B', intermediate: 'I', advanced: 'A',
}

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const beginners     = modulesMeta.filter(m => m.level === 'beginner')
const intermediates = modulesMeta.filter(m => m.level === 'intermediate')
const advanceds     = modulesMeta.filter(m => m.level === 'advanced')

function ModuleLinks({ modules, onClose }: { modules: typeof modulesMeta; onClose: () => void }) {
  return (
    <>
      {modules.map(m => (
        <NavLink
          key={m.id}
          to={`/module/${m.id}`}
          className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          onClick={onClose}
        >
          <span className="nav-icon nav-num">{m.id}</span>
          {m.title}
          <span className={`nav-badge ${LEVEL_BADGE[m.level]}`}>{LEVEL_LABEL[m.level]}</span>
        </NavLink>
      ))}
    </>
  )
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      <aside id="sidebar" className={isOpen ? 'open' : ''}>
        <div className="sidebar-logo">
          <h2>GitHub Copilot</h2>
          <span>Interactive Workshop</span>
        </div>
        <nav>
          <div className="nav-section">
            <div className="nav-section-label">Start Here</div>
            <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={onClose}>
              <span className="nav-icon">⌂</span> Home
            </NavLink>
            <NavLink to="/quiz" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={onClose}>
              <span className="nav-icon">◈</span> Find Your Level
            </NavLink>
            <NavLink to="/playground" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={onClose}>
              <span className="nav-icon">▶</span> Playground
            </NavLink>
          </div>

          <div className="nav-section">
            <div className="nav-section-label">Beginner</div>
            <ModuleLinks modules={beginners} onClose={onClose} />
          </div>

          <div className="nav-section">
            <div className="nav-section-label">Intermediate</div>
            <ModuleLinks modules={intermediates} onClose={onClose} />
          </div>

          <div className="nav-section">
            <div className="nav-section-label">Advanced</div>
            <ModuleLinks modules={advanceds} onClose={onClose} />
          </div>

          <div className="nav-section">
            <div className="nav-section-label">Reference</div>
            <NavLink to="/cheatsheet" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={onClose}>
              <span className="nav-icon">≡</span> Cheat Sheet
            </NavLink>
            <NavLink to="/features" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={onClose}>
              <span className="nav-icon">◉</span> Feature Index
            </NavLink>
            <NavLink to="/references" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={onClose}>
              <span className="nav-icon">⌖</span> References
            </NavLink>
          </div>
        </nav>
      </aside>

      <div
        id="sidebar-overlay"
        className={isOpen ? 'show' : ''}
        onClick={onClose}
      />
    </>
  )
}
