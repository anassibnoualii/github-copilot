import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, Target, ArrowRight, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import LanguageSwitcher from '@/components/shared/LanguageSwitcher'
import { useLocalisedModules } from '@/hooks/useLocalisedData'
import { FIRST_MODULE_ID } from '@/lib/utils'

interface TopbarProps {
  onMenuClick: () => void
  onSearch: () => void
}

export default function Topbar({ onMenuClick, onSearch }: TopbarProps) {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const modules = useLocalisedModules()

  function getBreadcrumb(pathname: string): string {
    if (pathname.startsWith('/module/')) {
      const id = pathname.replace('/module/', '')
      return modules.find(m => m.id === id)?.title ?? id
    }
    const map: Record<string, string> = {
      '/':                  t('nav.home'),
      '/playground':        t('nav.playground'),
      '/cheatsheet':        t('nav.cheatSheet'),
      '/features':          t('nav.featureIndex'),
      '/quiz':              t('nav.findYourLevel'),
      '/references':        t('nav.references'),
      '/config-builder':    t('nav.configBuilder'),
      '/shortcut-trainer':  t('nav.shortcutTrainer'),
      '/prompt-builder':    t('nav.promptBuilder'),
    }
    return map[pathname] ?? t('app.breadcrumbRoot')
  }

  return (
    <header id="topbar">
      <button id="menu-btn" aria-label={t('topbar.menuAriaLabel')} onClick={onMenuClick}>
        <Menu size={18} />
      </button>
      <div className="breadcrumb">
        <span>{t('app.breadcrumbRoot')}</span>
        <span className="sep">/</span>
        <span className="current">{getBreadcrumb(location.pathname)}</span>
      </div>
      <div className="topbar-actions">
        <button className="topbar-search-btn" onClick={onSearch} aria-label={t('search.placeholder')}>
          <Search size={14} />
          <span className="topbar-search-label">{t('search.trigger')}</span>
          <kbd className="topbar-search-kbd">⌘K</kbd>
        </button>
        <LanguageSwitcher />
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
