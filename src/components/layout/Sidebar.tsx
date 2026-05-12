import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Home, Target, Terminal, BookOpen, LayoutGrid, BookMarked } from 'lucide-react'
import modulesMeta from '@/data/modules-meta'
import { navLinkClass, LEVEL_NAV_BADGE, LEVEL_SHORT_LABEL } from '@/lib/utils'

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
          <span className={`nav-badge ${LEVEL_NAV_BADGE[m.level]}`}>{LEVEL_SHORT_LABEL[m.level]}</span>
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
  const { t } = useTranslation()

  const NAV_SECTIONS = [
    { label: t('nav.startHere'), links: [
      { to: '/', end: true,  icon: <Home size={14} />,       label: t('nav.home') },
      { to: '/quiz',         icon: <Target size={14} />,     label: t('nav.findYourLevel') },
      { to: '/playground',   icon: <Terminal size={14} />,   label: t('nav.playground') },
    ]},
    { label: t('nav.reference'), links: [
      { to: '/cheatsheet',   icon: <BookOpen size={14} />,   label: t('nav.cheatSheet') },
      { to: '/features',     icon: <LayoutGrid size={14} />, label: t('nav.featureIndex') },
      { to: '/references',   icon: <BookMarked size={14} />, label: t('nav.references') },
    ]},
  ]

  return (
    <>
      <aside id="sidebar" className={isOpen ? 'open' : ''}>
        <div className="sidebar-logo">
          <h2>{t('app.name')}</h2>
          <span>{t('app.subtitle')}</span>
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
            { label: t('nav.beginner'),     modules: beginners },
            { label: t('nav.intermediate'), modules: intermediates },
            { label: t('nav.advanced'),     modules: advanceds },
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
