import { useLocation, useNavigate } from 'react-router-dom'
import { Menu, Target, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import modulesMeta from '@/data/modules-meta'
import { FIRST_MODULE_ID } from '@/lib/utils'

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
      <button id="menu-btn" aria-label="Toggle menu" onClick={onMenuClick}>
        <Menu size={18} />
      </button>
      <div className="breadcrumb">
        <span>Copilot Workshop</span>
        <span className="sep">/</span>
        <span className="current">{label}</span>
      </div>
      <div className="topbar-actions">
        <Button variant="ghost" size="sm" onClick={() => navigate('/quiz')}>
          <Target size={13} /> Find My Level
        </Button>
        <Button size="sm" onClick={() => navigate(`/module/${FIRST_MODULE_ID}`)}>
          Start <ArrowRight size={13} />
        </Button>
      </div>
    </header>
  )
}
