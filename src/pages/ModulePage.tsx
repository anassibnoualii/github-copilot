import { lazy, Suspense, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MDXProvider } from '@mdx-js/react'
import modulesMeta from '@/data/modules-meta'
import mdxComponents from '@/components/mdx/mdx-components'

const mdxGlob = import.meta.glob('../content/modules/*.mdx')

const lazyModules: Record<string, React.LazyExoticComponent<React.ComponentType>> = {}
for (const path in mdxGlob) {
  lazyModules[path] = lazy(mdxGlob[path] as () => Promise<{ default: React.ComponentType }>)
}

const LEVEL_CLASSES: Record<string, string> = {
  beginner:     'badge-beginner',
  intermediate: 'badge-intermediate',
  advanced:     'badge-advanced',
}

const LEVEL_COLORS: Record<string, string> = {
  beginner:     'panel-level-b',
  intermediate: 'panel-level-i',
  advanced:     'panel-level-a',
}

export default function ModulePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const idx = modulesMeta.findIndex(m => m.id === id)
  const mod = modulesMeta[idx]
  const prev = idx > 0 ? modulesMeta[idx - 1] : null
  const next = idx < modulesMeta.length - 1 ? modulesMeta[idx + 1] : null

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
          <span className={`badge ${LEVEL_CLASSES[mod.level]}`}>
            {mod.level.charAt(0).toUpperCase() + mod.level.slice(1)}
          </span>
          <span className="module-panel-duration">⏱ {mod.duration}</span>
        </div>

        <h1 className="module-panel-title">{mod.title}</h1>
        <p className="module-panel-desc">{mod.description}</p>

        <div className="module-panel-section">
          <div className={`module-panel-section-label ${LEVEL_COLORS[mod.level]}`}>
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
              <span className="panel-nav-arrow">←</span>
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
              <span className="panel-nav-arrow">→</span>
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
          <Suspense fallback={<p className="muted" style={{ padding: '32px 40px' }}>Loading…</p>}>
            {Content ? <Content /> : <p className="muted" style={{ padding: '32px 40px' }}>Content coming soon.</p>}
          </Suspense>
        </MDXProvider>
      </div>
    </div>
  )
}
