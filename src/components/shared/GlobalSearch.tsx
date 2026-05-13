import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Search, BookOpen, LayoutGrid, BookMarked, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLocalisedModules } from '@/hooks/useLocalisedData'
import featuresData from '@/data/features'
import cheatsheetData from '@/data/cheatsheet'
import { ROUTES } from '@/lib/routes'
import { SEARCH_LIMIT_MODULES, SEARCH_LIMIT_FEATURES, SEARCH_LIMIT_CHEATSHEET, SEARCH_RESULTS_MAX } from '@/lib/search'

interface SearchResult {
  id: string
  label: string
  sublabel: string
  icon: React.ReactNode
  path: string
}

function buildResults(query: string, modules: ReturnType<typeof useLocalisedModules>): SearchResult[] {
  if (!query.trim()) return []
  const q = query.toLowerCase()
  const out: SearchResult[] = []

  for (const m of modules) {
    if (m.title.toLowerCase().includes(q) || m.description.toLowerCase().includes(q)) {
      out.push({
        id: `mod-${m.id}`,
        label: `${m.id}. ${m.title}`,
        sublabel: m.description,
        icon: <BookOpen size={14} />,
        path: ROUTES.module(m.id),
      })
    }
    if (out.length >= SEARCH_LIMIT_MODULES) break
  }

  for (const f of featuresData) {
    if (f.name.toLowerCase().includes(q) || f.desc.toLowerCase().includes(q)) {
      out.push({
        id: `feat-${f.name}`,
        label: f.name,
        sublabel: f.desc,
        icon: <LayoutGrid size={14} />,
        path: ROUTES.FEATURES,
      })
    }
    if (out.length >= SEARCH_LIMIT_FEATURES) break
  }

  for (const g of cheatsheetData) {
    for (const item of g.items) {
      if (item.cmd.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q)) {
        out.push({
          id: `cs-${item.cmd}`,
          label: item.cmd,
          sublabel: item.desc,
          icon: <BookMarked size={14} />,
          path: ROUTES.CHEATSHEET,
        })
      }
      if (out.length >= SEARCH_LIMIT_CHEATSHEET) break
    }
    if (out.length >= SEARCH_LIMIT_CHEATSHEET) break
  }

  return out.slice(0, SEARCH_RESULTS_MAX)
}

interface Props {
  open: boolean
  onClose: () => void
}

export default function GlobalSearch({ open, onClose }: Props) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const modules = useLocalisedModules()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const results = useMemo(() => buildResults(query, modules), [query, modules])

  useEffect(() => {
    if (!open) return
    const id = setTimeout(() => {
      setQuery('')
      setActive(0)
      inputRef.current?.focus()
    }, 0)
    return () => clearTimeout(id)
  }, [open])

  const go = useCallback((path: string) => {
    navigate(path)
    onClose()
  }, [navigate, onClose])

  function onKey(e: React.KeyboardEvent) {
    if (e.key === 'Escape') { onClose(); return }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(a + 1, results.length - 1)) }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setActive(a => Math.max(a - 1, 0)) }
    if (e.key === 'Enter' && results[active]) { go(results[active].path) }
  }

  if (!open) return null

  return (
    <div className="gs-backdrop" onClick={onClose}>
      <div className="gs-dialog" onClick={e => e.stopPropagation()}>
        <div className="gs-input-row">
          <Search size={16} className="gs-search-icon" />
          <input
            ref={inputRef}
            className="gs-input"
            value={query}
            onChange={e => { setQuery(e.target.value); setActive(0) }}
            onKeyDown={onKey}
            placeholder={t('search.placeholder')}
          />
          <Button variant="ghost" size="icon" className="gs-close-btn" onClick={onClose}><X size={14} /></Button>
        </div>

        {results.length > 0 && (
          <div className="gs-results">
            {results.map((r, i) => (
              <button
                type="button"
                key={r.id}
                className={`gs-result ${i === active ? 'gs-result-active' : ''}`}
                onClick={() => go(r.path)}
                onMouseEnter={() => setActive(i)}
              >
                <span className="gs-result-icon">{r.icon}</span>
                <span className="gs-result-text">
                  <span className="gs-result-label">{r.label}</span>
                  <span className="gs-result-sublabel">{r.sublabel}</span>
                </span>
              </button>
            ))}
          </div>
        )}

        {query.trim() && results.length === 0 && (
          <div className="gs-empty">{t('search.noResults', { query })}</div>
        )}

        <div className="gs-footer">
          <span className="gs-hint">↑↓ {t('search.navigate')}</span>
          <span className="gs-hint">↵ {t('search.open')}</span>
          <span className="gs-hint">Esc {t('search.close')}</span>
        </div>
      </div>
    </div>
  )
}
