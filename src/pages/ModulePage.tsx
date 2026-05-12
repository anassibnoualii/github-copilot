import { lazy, Suspense, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { MDXProvider } from '@mdx-js/react'
import { Clock, ChevronLeft, ChevronRight, CheckCircle2, Terminal } from 'lucide-react'
import mdxComponents from '@/components/mdx/mdx-components'
import LevelBadge from '@/components/shared/LevelBadge'
import ProgressBar from '@/components/shared/ProgressBar'
import ModuleTerminal from '@/components/module/ModuleTerminal'
import { useLocalisedModules } from '@/hooks/useLocalisedData'
import { useProgress } from '@/hooks/useProgress'
import { LEVEL_PANEL_COLORS, calculateProgress } from '@/lib/utils'

const mdxGlob = import.meta.glob('../content/modules/*.mdx')

const lazyModules: Record<string, React.LazyExoticComponent<React.ComponentType>> = {}
for (const path in mdxGlob) {
  lazyModules[path] = lazy(mdxGlob[path] as () => Promise<{ default: React.ComponentType }>)
}

export default function ModulePage() {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const modules = useLocalisedModules()
  const { completed, markDone } = useProgress()

  const idx = modules.findIndex(m => m.id === id)
  const mod = idx !== -1 ? modules[idx] : null
  const prev = idx > 0 ? modules[idx - 1] : null
  const next = idx !== -1 && idx < modules.length - 1 ? modules[idx + 1] : null
  const isDone = id ? completed.includes(id) : false

  useEffect(() => { window.scrollTo(0, 0) }, [id])

  if (!mod) {
    return <div className="page"><p>{t('module.notFound')}</p></div>
  }

  const key = `../content/modules/${id}.mdx`
  const Content = lazyModules[key] ?? null
  const progress = calculateProgress(idx + 1, modules.length)

  return (
    <div className="module-layout">
      <aside className="module-panel">
        <div className="module-panel-meta">
          <LevelBadge level={mod.level} />
          <span className="module-panel-duration">
            <Clock size={12} /> {mod.duration}
          </span>
        </div>

        <h1 className="module-panel-title">{mod.title}</h1>
        <p className="module-panel-desc">{mod.description}</p>

        <div className="module-panel-section">
          <div className={`module-panel-section-label ${LEVEL_PANEL_COLORS[mod.level]}`}>
            {t('module.whatYouWillLearn')}
          </div>
          <ul className="module-outcomes">
            {mod.outcomes.map((outcome, i) => (
              <li key={i}>{outcome}</li>
            ))}
          </ul>
        </div>

        <div className="module-panel-section">
          <div className="module-panel-section-label panel-level-tryit">
            {t('module.tryItYourself')}
          </div>
          <ModuleTerminal tutorial={mod.tutorial} moduleId={mod.id} />
        </div>

        <div className="module-panel-section">
          <button
            className={`module-done-btn ${isDone ? 'done' : ''}`}
            onClick={() => id && markDone(id)}
          >
            <CheckCircle2 size={14} />
            {isDone ? t('module.markedDone') : t('module.markDone')}
          </button>
        </div>

        <div className="module-panel-nav">
          {prev ? (
            <button className="panel-nav-btn" onClick={() => navigate(`/module/${prev.id}`)}>
              <ChevronLeft size={16} className="panel-nav-arrow" />
              <span className="panel-nav-info">
                <span className="panel-nav-label">{t('module.previous')}</span>
                <span className="panel-nav-title">{prev.title}</span>
              </span>
            </button>
          ) : <div />}
          {next ? (
            <button className="panel-nav-btn panel-nav-btn-next" onClick={() => navigate(`/module/${next.id}`)}>
              <span className="panel-nav-info">
                <span className="panel-nav-label">{t('module.next')}</span>
                <span className="panel-nav-title">{next.title}</span>
              </span>
              <ChevronRight size={16} className="panel-nav-arrow" />
            </button>
          ) : <div />}
        </div>

        <div className="module-panel-progress">
          <ProgressBar
            value={progress}
            label={t('module.progress', { current: idx + 1, total: modules.length })}
          />
        </div>
      </aside>

      <div className="module-content">
        <MDXProvider components={mdxComponents}>
          <Suspense fallback={<p className="muted module-content-loading">{t('module.loading')}</p>}>
            {Content ? <Content /> : <p className="muted module-content-loading">{t('module.comingSoon')}</p>}
          </Suspense>
        </MDXProvider>

        <div className="module-playground-cta" onClick={() => navigate('/playground')}>
          <Terminal size={16} className="module-playground-cta-icon" />
          <div className="module-playground-cta-text">
            <span className="module-playground-cta-title">{t('module.playCta')}</span>
            <span className="module-playground-cta-sub">{t('module.playCtaSub')}</span>
          </div>
          <ChevronRight size={16} className="module-playground-cta-arrow" />
        </div>
      </div>
    </div>
  )
}
