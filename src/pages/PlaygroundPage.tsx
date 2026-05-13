import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Play, RotateCcw, Terminal, ChevronRight, ChevronLeft } from 'lucide-react'
import { usePlayground } from '@/hooks/usePlayground'
import type { PlaygroundMode, TerminalLine } from '@/types'

type HistoryEntry =
  | { kind: 'system'; text: string }
  | { kind: 'user'; text: string; mode: PlaygroundMode }
  | { kind: 'output'; lines: TerminalLine[] }

export default function PlaygroundPage() {
  const { t } = useTranslation()
  const { build, examples } = usePlayground()

  const WELCOME: HistoryEntry[] = [
    { kind: 'system', text: t('playground.welcome1') },
    { kind: 'system', text: t('playground.welcome2') },
  ]

  const [pgMode, setPgMode] = useState<'free' | 'guided'>('free')
  const [mode, setMode] = useState<PlaygroundMode>('normal')
  const [history, setHistory] = useState<HistoryEntry[]>(WELCOME)
  const [input, setInput] = useState('')
  const [guidedStep, setGuidedStep] = useState(0)
  const bodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [history])

  function run(task: string, runMode?: PlaygroundMode) {
    if (!task.trim()) return
    const m = runMode ?? mode
    setHistory(prev => [
      ...prev,
      { kind: 'user', text: task, mode: m },
      { kind: 'output', lines: build(task, m) },
    ])
    setInput('')
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  function reset() {
    setHistory(WELCOME)
    setInput('')
    setGuidedStep(0)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const currentExample = examples[guidedStep]

  return (
    <div className="pg-wrap">
      <div className="pg-topbar">
        <div className="pg-mode-tabs">
          <button
            className={`pg-mode-tab ${pgMode === 'free' ? 'active' : ''}`}
            onClick={() => setPgMode('free')}
          >
            <Terminal size={13} /> {t('playground.freeType')}
          </button>
          <button
            className={`pg-mode-tab ${pgMode === 'guided' ? 'active' : ''}`}
            onClick={() => setPgMode('guided')}
          >
            <Play size={13} /> {t('playground.guided')}
          </button>
        </div>

        <div className="pg-topbar-right">
          <div className="cli-mode-select">
            {(['normal', 'autopilot'] as PlaygroundMode[]).map(m => (
              <button
                key={m}
                className={`cli-mode-btn ${mode === m ? 'active' : ''}`}
                onClick={() => setMode(m)}
              >
                {t(`playground.${m}`)}
              </button>
            ))}
          </div>
          <button className="pg-reset-btn" onClick={reset}>
            <RotateCcw size={13} /> {t('playground.reset')}
          </button>
        </div>
      </div>

      <div className="pg-terminal" onClick={() => inputRef.current?.focus()}>
        <div className="pg-terminal-bar">
          <div className="pg-dots">
            <span className="pg-dot pg-dot-red" />
            <span className="pg-dot pg-dot-yellow" />
            <span className="pg-dot pg-dot-green" />
          </div>
          <span className="pg-terminal-title">
            <Terminal size={11} /> copilot — ~/my-project
          </span>
          <div />
        </div>

        <div className="pg-terminal-body" ref={bodyRef}>
          {history.map((entry, i) => {
            if (entry.kind === 'system') {
              return <div key={i} className="pg-entry-system">{entry.text}</div>
            }
            if (entry.kind === 'user') {
              return (
                <div key={i} className="pg-entry-user">
                  <span className="pg-entry-prompt">
                    {'$ copilot'}
                    {entry.mode === 'autopilot' && <span className="cli-autopilot-badge"> [autopilot]</span>}
                    {' ›'}
                  </span>
                  <span className="pg-entry-text"> {entry.text}</span>
                </div>
              )
            }
            return (
              <div key={i} className="pg-entry-output">
                {entry.lines.map((line, j) => (
                  <div key={j} className={`cli-${line.kind}`}>{line.text}</div>
                ))}
              </div>
            )
          })}
        </div>

        <div className="pg-input-row">
          <span className="pg-input-prompt">
            {'$ copilot'}
            {mode === 'autopilot' && <span className="cli-autopilot-badge"> [autopilot]</span>}
            {' ›'}
          </span>
          <input
            ref={inputRef}
            className="pg-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') run(input) }}
            placeholder={t('playground.inputPlaceholder')}
            autoFocus
          />
          <button className="pg-run-btn" onClick={() => run(input)} disabled={!input.trim()}>
            <Play size={13} />
          </button>
        </div>
      </div>

      {pgMode === 'free' ? (
        <div className="pg-examples-section">
          <span className="pg-examples-label">{t('playground.examples')}</span>
          <div className="pg-chips">
            {examples.map(ex => (
              <button
                key={ex.task}
                className={`pg-chip ${ex.mode === 'autopilot' ? 'pg-chip-autopilot' : ''}`}
                onClick={() => run(ex.task, ex.mode)}
              >
                {ex.mode === 'autopilot' && <span className="pg-chip-badge">autopilot</span>}
                {ex.task}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="pg-guided-section">
          <div className="pg-guided-card">
            <div className="pg-guided-meta">
              <span className="pg-guided-counter">
                {t('playground.step', { current: guidedStep + 1, total: examples.length })}
              </span>
              {currentExample?.mode === 'autopilot' && (
                <span className="cli-autopilot-badge">autopilot</span>
              )}
            </div>
            <p className="pg-guided-task">{currentExample?.task}</p>
            <div className="pg-guided-actions">
              <button
                className="pg-guided-nav"
                onClick={() => setGuidedStep(s => Math.max(0, s - 1))}
                disabled={guidedStep === 0}
              >
                <ChevronLeft size={14} />
                {t('playground.prev')}
              </button>
              <button
                className="pg-guided-run"
                onClick={() => { if (currentExample) run(currentExample.task, currentExample.mode) }}
              >
                <Play size={13} /> {t('playground.runThis')}
              </button>
              <button
                className="pg-guided-nav"
                onClick={() => setGuidedStep(s => Math.min(examples.length - 1, s + 1))}
                disabled={guidedStep === examples.length - 1}
              >
                {t('playground.next')}
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
