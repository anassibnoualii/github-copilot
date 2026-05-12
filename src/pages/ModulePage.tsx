import { lazy, Suspense, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MDXProvider } from '@mdx-js/react'
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import modulesMeta from '@/data/modules-meta'
import mdxComponents from '@/components/mdx/mdx-components'
import LevelBadge from '@/components/shared/LevelBadge'
import { LEVEL_PANEL_COLORS } from '@/lib/utils'

const mdxGlob = import.meta.glob('../content/modules/*.mdx')

const lazyModules: Record<string, React.LazyExoticComponent<React.ComponentType>> = {}
for (const path in mdxGlob) {
  lazyModules[path] = lazy(mdxGlob[path] as () => Promise<{ default: React.ComponentType }>)
}

export default function ModulePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const idx = modulesMeta.findIndex(m => m.id === id)
  const mod = idx !== -1 ? modulesMeta[idx] : null
  const prev = idx > 0 ? modulesMeta[idx - 1] : null
  const next = idx !== -1 && idx < modulesMeta.length - 1 ? modulesMeta[idx + 1] : null

  useEffect(() => { window.scrollTo(0, 0) }, [id])

  if (!mod) {
    return <div className="page"><p>Module not found.</p></div>
  }

  const key = `../content/modules/${id}.mdx`
  const Content = lazyModules[key] ?? null

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
            What You'll Learn
          </div>
          <ul className="module-outcomes">
            {mod.outcomes.map((outcome, i) => (
              <li key={i}>{outcome}</li>
            ))}
          </ul>
        </div>

        <div className="module-panel-section">
          <div className="module-panel-section-label panel-level-tryit">
            Try It Yourself
          </div>
          <p className="module-tryit-text">{mod.tryIt}</p>
        </div>

        <div className="module-panel-nav">
          {prev ? (
            <button className="panel-nav-btn" onClick={() => navigate(`/module/${prev.id}`)}>
              <ChevronLeft size={16} className="panel-nav-arrow" />
              <span className="panel-nav-info">
                <span className="panel-nav-label">Previous</span>
                <span className="panel-nav-title">{prev.title}</span>
              </span>
            </button>
          ) : <div />}
          {next ? (
            <button className="panel-nav-btn panel-nav-btn-next" onClick={() => navigate(`/module/${next.id}`)}>
              <span className="panel-nav-info">
                <span className="panel-nav-label">Next</span>
                <span className="panel-nav-title">{next.title}</span>
              </span>
              <ChevronRight size={16} className="panel-nav-arrow" />
            </button>
          ) : <div />}
        </div>

        <div className="module-panel-progress">
          <span className="progress-label">Module {id} of {modulesMeta.length}</span>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(idx + 1) / modulesMeta.length * 100}%` }}
            />
          </div>
        </div>
      </aside>

      <div className="module-content">
        <MDXProvider components={mdxComponents}>
          <Suspense fallback={<p className="muted module-content-loading">Loading…</p>}>
            {Content ? <Content /> : <p className="muted module-content-loading">Content coming soon.</p>}
          </Suspense>
        </MDXProvider>
      </div>
    </div>
  )
}
