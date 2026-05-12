import { NavLink } from 'react-router-dom'
import { Home, Target, Terminal, BookOpen, LayoutGrid, BookMarked } from 'lucide-react'
import modulesMeta from '@/data/modules-meta'
import { navLinkClass } from '@/lib/utils'

const LEVEL_BADGE: Record<string, string> = {
  beginner:     'badge-b',
  intermediate: 'badge-i',
  advanced:     'badge-a',
}
const LEVEL_LABEL: Record<string, string> = {
  beginner: 'B', intermediate: 'I', advanced: 'A',
}

const NAV_SECTIONS = [
  { label: 'Start Here', links: [
    { to: '/', end: true,  icon: <Home size={14} />,       label: 'Home' },
    { to: '/quiz',         icon: <Target size={14} />,     label: 'Find Your Level' },
    { to: '/playground',   icon: <Terminal size={14} />,   label: 'Playground' },
  ]},
  { label: 'Reference', links: [
    { to: '/cheatsheet',   icon: <BookOpen size={14} />,   label: 'Cheat Sheet' },
    { to: '/features',     icon: <LayoutGrid size={14} />, label: 'Feature Index' },
    { to: '/references',   icon: <BookMarked size={14} />, label: 'References' },
  ]},
]

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
          className={({ isActive }) => navLinkClass(isActive)}
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

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
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
            <div className="nav-section-label">{NAV_SECTIONS[0].label}</div>
            {NAV_SECTIONS[0].links.map(({ to, end, icon, label }) => (
              <NavLink key={to} to={to} end={end} className={({ isActive }) => navLinkClass(isActive)} onClick={onClose}>
                <span className="nav-icon">{icon}</span> {label}
              </NavLink>
            ))}
          </div>

          {[
            { label: 'Beginner',     modules: beginners },
            { label: 'Intermediate', modules: intermediates },
            { label: 'Advanced',     modules: advanceds },
          ].map(({ label, modules }) => (
            <div key={label} className="nav-section">
              <div className="nav-section-label">{label}</div>
              <ModuleLinks modules={modules} onClose={onClose} />
            </div>
          ))}

          <div className="nav-section">
            <div className="nav-section-label">{NAV_SECTIONS[1].label}</div>
            {NAV_SECTIONS[1].links.map(({ to, icon, label }) => (
              <NavLink key={to} to={to} className={({ isActive }) => navLinkClass(isActive)} onClick={onClose}>
                <span className="nav-icon">{icon}</span> {label}
              </NavLink>
            ))}
          </div>
        </nav>
      </aside>

      <div id="sidebar-overlay" className={isOpen ? 'show' : ''} onClick={onClose} />
    </>
  )
}
