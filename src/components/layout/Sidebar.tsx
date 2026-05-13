import { useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Home, Target, Terminal, BookOpen, LayoutGrid, BookMarked, Settings2, CheckCircle2, Keyboard, Wand2, Search, Coffee, FolderOpen } from 'lucide-react'
import { useLocalisedModules } from '@/hooks/useLocalisedData'
import { useProgress } from '@/hooks/useProgress'
import { navLinkClass, LEVEL_NAV_BADGE, LEVEL_SHORT_LABEL, calculateProgress } from '@/lib/utils'
import { ROUTES } from '@/lib/routes'

function ModuleLinks({ modules, completed, onClose }: {
  modules: ReturnType<typeof useLocalisedModules>
  completed: string[]
  onClose: () => void
}) {
  return (
    <>
      {modules.map(m => {
        const done = completed.includes(m.id)
        return (
          <NavLink
            key={m.id}
            to={`/module/${m.id}`}
            className={({ isActive }) => navLinkClass(isActive)}
            onClick={onClose}
          >
            <span className="nav-icon nav-num">{m.id}</span>
            {m.title}
            {done
              ? <CheckCircle2 size={12} className="nav-done-icon" />
              : <span className={`nav-badge ${LEVEL_NAV_BADGE[m.level]}`}>{LEVEL_SHORT_LABEL[m.level]}</span>}
          </NavLink>
        )
      })}
    </>
  )
}

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  onSearch: () => void
}

export default function Sidebar({ isOpen, onClose, onSearch }: SidebarProps) {
  const { t } = useTranslation()
  const modules = useLocalisedModules()
  const { completed } = useProgress()

  const beginners     = useMemo(() => modules.filter(m => m.level === 'beginner'),     [modules])
  const intermediates = useMemo(() => modules.filter(m => m.level === 'intermediate'), [modules])
  const advanceds     = useMemo(() => modules.filter(m => m.level === 'advanced'),     [modules])

  const levelSections = useMemo(() => [
    { label: t('nav.beginner'),     modules: beginners },
    { label: t('nav.intermediate'), modules: intermediates },
    { label: t('nav.advanced'),     modules: advanceds },
  ], [t, beginners, intermediates, advanceds])

  const doneCount = completed.length
  const totalCount = modules.length

  const START_LINKS = [
    { to: ROUTES.HOME,       end: true, icon: <Home size={14} />,     label: t('nav.home') },
    { to: ROUTES.QUIZ,                  icon: <Target size={14} />,   label: t('nav.findYourLevel') },
    { to: ROUTES.PLAYGROUND,            icon: <Terminal size={14} />, label: t('nav.playground') },
  ]

  const REF_LINKS = [
    { to: ROUTES.CHEATSHEET,      icon: <BookOpen size={14} />,    label: t('nav.cheatSheet') },
    { to: ROUTES.FEATURES,        icon: <LayoutGrid size={14} />,  label: t('nav.featureIndex') },
    { to: ROUTES.REFERENCES,      icon: <BookMarked size={14} />,  label: t('nav.references') },
    { to: ROUTES.CONFIG_BUILDER,  icon: <Settings2 size={14} />,   label: t('nav.configBuilder') },
    { to: ROUTES.SHORTCUT_TRAINER,icon: <Keyboard size={14} />,    label: t('nav.shortcutTrainer') },
    { to: ROUTES.PROMPT_BUILDER,  icon: <Wand2 size={14} />,       label: t('nav.promptBuilder') },
    { to: ROUTES.JAVA_GUIDE,      icon: <Coffee size={14} />,      label: t('nav.javaGuide') },
    { to: ROUTES.PROJECT_GUIDE,   icon: <FolderOpen size={14} />,  label: t('nav.projectGuide') },
  ]

  return (
    <>
      <aside id="sidebar" className={isOpen ? 'open' : ''}>
        <div className="sidebar-logo">
          <h2>{t('app.name')}</h2>
          <span>{t('app.subtitle')}</span>
        </div>

        <button type="button" className="sidebar-search-btn" onClick={() => { onSearch(); onClose() }}>
          <Search size={13} />
          <span>{t('search.trigger')}</span>
          <kbd className="sidebar-search-kbd">⌘K</kbd>
        </button>

        {totalCount > 0 && (
          <div className="sidebar-progress">
            <div className="sidebar-progress-bar">
              <div className="sidebar-progress-fill" style={{ width: `${calculateProgress(doneCount, totalCount)}%` }} />
            </div>
            <span className="sidebar-progress-label">{t('sidebar.progress', { current: doneCount, total: totalCount })}</span>
          </div>
        )}

        <nav>
          <div className="nav-section">
            <div className="nav-section-label">{t('nav.startHere')}</div>
            {START_LINKS.map(({ to, end, icon, label }) => (
              <NavLink key={to} to={to} end={end} className={({ isActive }) => navLinkClass(isActive)} onClick={onClose}>
                <span className="nav-icon">{icon}</span> {label}
              </NavLink>
            ))}
          </div>

          {levelSections.map(({ label, modules: mods }) => (
            <div key={label} className="nav-section">
              <div className="nav-section-label">{label}</div>
              <ModuleLinks modules={mods} completed={completed} onClose={onClose} />
            </div>
          ))}

          <div className="nav-section">
            <div className="nav-section-label">{t('nav.reference')}</div>
            {REF_LINKS.map(({ to, icon, label }) => (
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
