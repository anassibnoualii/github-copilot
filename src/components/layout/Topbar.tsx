import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, Target, ArrowRight, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import LanguageSwitcher from '@/components/shared/LanguageSwitcher'
import { useLocalisedModules } from '@/hooks/useLocalisedData'
import { FIRST_MODULE_ID } from '@/lib/utils'
import { ROUTES } from '@/lib/routes'

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
    if (pathname.startsWith(ROUTES.MODULE_PREFIX)) {
      const id = pathname.replace(ROUTES.MODULE_PREFIX, '')
      return modules.find(m => m.id === id)?.title ?? id
    }
    const map: Record<string, string> = {
      [ROUTES.HOME]:             t('nav.home'),
      [ROUTES.PLAYGROUND]:       t('nav.playground'),
      [ROUTES.CHEATSHEET]:       t('nav.cheatSheet'),
      [ROUTES.FEATURES]:         t('nav.featureIndex'),
      [ROUTES.QUIZ]:             t('nav.findYourLevel'),
      [ROUTES.REFERENCES]:       t('nav.references'),
      [ROUTES.CONFIG_BUILDER]:   t('nav.configBuilder'),
      [ROUTES.SHORTCUT_TRAINER]: t('nav.shortcutTrainer'),
      [ROUTES.PROMPT_BUILDER]:   t('nav.promptBuilder'),
      [ROUTES.JAVA_GUIDE]:       t('nav.javaGuide'),
      [ROUTES.PROJECT_GUIDE]:    t('nav.projectGuide'),
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
        <Button variant="ghost" size="sm" onClick={() => navigate(ROUTES.QUIZ)}>
          <Target size={13} /> {t('topbar.findMyLevel')}
        </Button>
        <Button size="sm" onClick={() => navigate(ROUTES.module(FIRST_MODULE_ID))}>
          {t('topbar.start')} <ArrowRight size={13} />
        </Button>
      </div>
    </header>
  )
}
