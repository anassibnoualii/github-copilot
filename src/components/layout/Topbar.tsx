import { useLocation, useNavigate } from 'react-router-dom'
import modulesMeta from '@/data/modules-meta'

const BREADCRUMBS: Record<string, string> = {
  '/':           'Home',
  '/playground': 'Playground',
  '/cheatsheet': 'Cheat Sheet',
  '/features':   'Feature Index',
  '/quiz':       'Find Your Level',
  '/references': 'References',
}

function getBreadcrumb(pathname: string): string {
  if (pathname.startsWith('/module/')) {
    const id = pathname.replace('/module/', '')
    return modulesMeta.find(m => m.id === id)?.title ?? id
  }
  return BREADCRUMBS[pathname] ?? 'Workshop'
}

interface TopbarProps {
  onMenuClick: () => void
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const label = getBreadcrumb(location.pathname)

  return (
    <header id="topbar">
      <button id="menu-btn" aria-label="Toggle menu" onClick={onMenuClick}>☰</button>
      <div className="breadcrumb">
        <span>Copilot Workshop</span>
        <span className="sep">/</span>
        <span className="current">{label}</span>
      </div>
      <div className="topbar-actions">
        <button className="btn btn-sm btn-ghost" onClick={() => navigate('/quiz')}>◈ Find My Level</button>
        <button className="btn btn-sm btn-primary" onClick={() => navigate('/module/01')}>Start →</button>
      </div>
    </header>
  )
}
