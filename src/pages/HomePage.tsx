import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import modulesMeta from '@/data/modules-meta'
import LevelBadge from '@/components/shared/LevelBadge'
import { FIRST_MODULE_ID } from '@/lib/utils'

const QUICK_LINK_KEYS = [
  { to: '/playground', key: 'playground' },
  { to: '/cheatsheet', key: 'cheatsheet' },
  { to: '/features',   key: 'features' },
  { to: '/quiz',       key: 'quiz' },
] as const

export default function HomePage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="page">
      <div className="hero">
        <div className="section-label">{t('home.welcomeLabel')}</div>
        <h1>{t('home.title')}</h1>
        <p>{t('home.description')}</p>
        <div className="hero-actions">
          <Button onClick={() => navigate(`/module/${FIRST_MODULE_ID}`)}>{t('home.startLearning')}</Button>
          <Button variant="outline" onClick={() => navigate('/quiz')}>{t('home.findYourLevel')}</Button>
        </div>
      </div>

      <div className="section-label">{t('home.curriculumLabel')}</div>
      <h2>{t('home.modulesTitle', { count: modulesMeta.length })}</h2>
      <div className="module-grid grid-3 mt-4">
        {modulesMeta.map(m => (
          <div key={m.id} className="module-card" onClick={() => navigate(`/module/${m.id}`)}>
            <span className="card-num">{m.id}</span>
            <div className="card-title">{m.title}</div>
            <div className="card-meta">
              <span>{m.duration}</span>
              <LevelBadge level={m.level} />
            </div>
          </div>
        ))}
      </div>

      <div className="section-spacer">
        <div className="section-label">{t('home.referenceLabel')}</div>
        <h2>{t('home.referenceTitle')}</h2>
        <div className="quick-links">
          {QUICK_LINK_KEYS.map(({ to, key }) => (
            <div key={to} className="quick-link" onClick={() => navigate(to)}>
              <h3>{t(`home.quickLinks.${key}.title`)}</h3>
              <p>{t(`home.quickLinks.${key}.desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
