import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CheckCircle2, Circle, Trophy, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import LevelBadge from '@/components/shared/LevelBadge'
import HeroTerminal from '@/components/shared/HeroTerminal'
import { useLocalisedModules } from '@/hooks/useLocalisedData'
import { useProgress } from '@/hooks/useProgress'
import { FIRST_MODULE_ID, calculateProgress } from '@/lib/utils'
import { ROUTES } from '@/lib/routes'
import { QUICK_LINK_KEYS } from '@/data/home-links'

export default function HomePage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const modules = useLocalisedModules()
  const { completed, reset } = useProgress()

  const doneCount = completed.length
  const totalCount = modules.length
  const pct = calculateProgress(doneCount, totalCount)
  const allDone = totalCount > 0 && doneCount >= totalCount

  return (
    <div className="page">
      {allDone && (
        <div className="completion-banner">
          <Trophy size={28} className="completion-trophy" />
          <div className="completion-text">
            <span className="completion-title">{t('home.completionTitle')}</span>
            <span className="completion-sub">{t('home.completionSub', { count: totalCount })}</span>
          </div>
          <Button variant="ghost" className="completion-reset" onClick={reset}>
            <RotateCcw size={13} /> {t('home.completionReset')}
          </Button>
        </div>
      )}

      <div className="hero hero-split">
        <div className="hero-text">
          <div className="section-label">{t('home.welcomeLabel')}</div>
          <h1>{t('home.title')}</h1>
          <p>{t('home.description')}</p>
          <div className="hero-actions">
            <Button onClick={() => navigate(ROUTES.module(FIRST_MODULE_ID))}>{t('home.startLearning')}</Button>
            <Button variant="outline" onClick={() => navigate(ROUTES.QUIZ)}>{t('home.findYourLevel')}</Button>
          </div>
          {doneCount > 0 && !allDone && (
            <div className="hero-progress">
              <div className="hero-progress-bar">
                <div className="hero-progress-fill" style={{ width: `${pct}%` }} />
              </div>
              <span className="hero-progress-label">{t('home.progressLabel', { current: doneCount, total: totalCount })}</span>
            </div>
          )}
        </div>
        <div className="hero-terminal-wrap">
          <HeroTerminal />
        </div>
      </div>

      <div className="section-label">{t('home.curriculumLabel')}</div>
      <h2>{t('home.modulesTitle', { count: modules.length })}</h2>
      <div className="module-grid grid-3 mt-4">
        {modules.map(m => {
          const done = completed.includes(m.id)
          return (
            <button type="button" key={m.id} className={`module-card ${done ? 'module-card-done' : ''}`} onClick={() => navigate(ROUTES.module(m.id))}>
              <div className="card-num-row">
                <span className="card-num">{m.id}</span>
                {done
                  ? <CheckCircle2 size={16} className="card-done-icon" />
                  : <Circle size={16} className="card-todo-icon" />}
              </div>
              <div className="card-title">{m.title}</div>
              <div className="card-meta">
                <span>{m.duration}</span>
                <LevelBadge level={m.level} />
              </div>
            </button>
          )
        })}
      </div>

      <div className="section-spacer">
        <div className="section-label">{t('home.referenceLabel')}</div>
        <h2>{t('home.referenceTitle')}</h2>
        <div className="quick-links">
          {QUICK_LINK_KEYS.map(({ to, key }) => (
            <button type="button" key={to} className="quick-link" onClick={() => navigate(to)}>
              <h3>{t(`home.quickLinks.${key}.title`)}</h3>
              <p>{t(`home.quickLinks.${key}.desc`)}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
