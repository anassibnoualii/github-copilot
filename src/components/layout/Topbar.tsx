import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, Target, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import modulesMeta from '@/data/modules-meta'
import { FIRST_MODULE_ID } from '@/lib/utils'

function getBreadcrumb(pathname: string, t: (key: string) => string): string {
  if (pathname.startsWith('/module/')) {
    const id = pathname.replace('/module/', '')
    return modulesMeta.find(m => m.id === id)?.title ?? id
  }
  const map: Record<string, string> = {
    '/':           t('nav.home'),
    '/playground': t('nav.playground'),
    '/cheatsheet': t('nav.cheatSheet'),
    '/features':   t('nav.featureIndex'),
    '/quiz':       t('nav.findYourLevel'),
    '/references': t('nav.references'),
  }
  return map[pathname] ?? t('app.breadcrumbRoot')
}

interface TopbarProps {
  onMenuClick: () => void
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const label = getBreadcrumb(location.pathname, t)

  return (
    <header id="topbar">
      <button id="menu-btn" aria-label="Toggle menu" onClick={onMenuClick}>
        <Menu size={18} />
      </button>
      <div className="breadcrumb">
        <span>{t('app.breadcrumbRoot')}</span>
        <span className="sep">/</span>
        <span className="current">{label}</span>
      </div>
      <div className="topbar-actions">
        <Button variant="ghost" size="sm" onClick={() => navigate('/quiz')}>
          <Target size={13} /> {t('topbar.findMyLevel')}
        </Button>
        <Button size="sm" onClick={() => navigate(`/module/${FIRST_MODULE_ID}`)}>
          {t('topbar.start')} <ArrowRight size={13} />
        </Button>
      </div>
    </header>
  )
}
