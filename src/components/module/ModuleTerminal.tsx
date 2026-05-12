import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Play, RotateCcw, ChevronRight, ChevronLeft, Terminal } from 'lucide-react'
import type { TutorialStep } from '@/types'

interface Props {
  tutorial: TutorialStep[]
  moduleId: string
}

const FREE_RESPONSES: Record<string, string> = {
  explain: '> Copilot: This code implements a pattern where...\n  [Copilot analyzes your selection and provides\n   a plain-English explanation with key points.]',
  fix:     '> Copilot: I found 2 potential issues:\n  Line 12: possible null reference\n  Line 27: unused variable "tmp"\n  \n  Apply fixes? [Yes] [Preview]',
  test:    '> Copilot: Generated 3 unit tests:\n  ✓ returns correct output for valid input\n  ✓ handles edge case: empty input\n  ✓ throws for invalid arguments',
  doc:     '> Copilot: Added JSDoc to 4 functions:\n  /**\n   * @param input - Description of input\n   * @returns Description of return value\n   */',
  default: '> Copilot: I can help with that.\n  Use /explain, /fix, /tests, or /doc\n  for specific tasks on selected code.',
}

function simulateResponse(input: string): string {
  const lower = input.toLowerCase()
  if (/explain|what|how|why/.test(lower)) return FREE_RESPONSES.explain
  if (/fix|bug|error|issue|problem/.test(lower)) return FREE_RESPONSES.fix
  if (/test|spec|unit|jest|vitest/.test(lower)) return FREE_RESPONSES.test
  if (/doc|comment|jsdoc|document/.test(lower)) return FREE_RESPONSES.doc
  return FREE_RESPONSES.default
}

export default function ModuleTerminal({ tutorial }: Props) {
  const { t } = useTranslation()
  const [tab, setTab] = useState<'guided' | 'free'>('guided')
  const [step, setStep] = useState(0)
  const [freeInput, setFreeInput] = useState('')
  const [freeOutput, setFreeOutput] = useState('')
  const [ran, setRan] = useState(false)

  const totalSteps = tutorial.length
  const current = tutorial[step]

  function runFree() {
    if (!freeInput.trim()) return
    setFreeOutput(simulateResponse(freeInput))
    setRan(true)
  }

  function reset() {
    setFreeInput('')
    setFreeOutput('')
    setRan(false)
  }

  return (
    <div className="mt-wrap">
      <div className="mt-tabs">
        <button
          className={`mt-tab ${tab === 'guided' ? 'active' : ''}`}
          onClick={() => setTab('guided')}
        >
          <Play size={11} /> {t('moduleTerminal.guided')}
        </button>
        <button
          className={`mt-tab ${tab === 'free' ? 'active' : ''}`}
          onClick={() => setTab('free')}
        >
          <Terminal size={11} /> {t('moduleTerminal.tryIt')}
        </button>
      </div>

      {tab === 'guided' ? (
        <div className="mt-guided">
          <div className="mt-step-header">
            <span className="mt-step-num">{t('moduleTerminal.step', { current: step + 1, total: totalSteps })}</span>
            <div className="mt-step-dots">
              {tutorial.map((_, i) => (
                <span key={i} className={`mt-dot ${i === step ? 'active' : i < step ? 'done' : ''}`} />
              ))}
            </div>
          </div>

          <div className="mt-step-input">
            <span className="mt-prompt-glyph">›</span>
            <code>{current.input}</code>
          </div>

          <pre className="mt-step-output">{current.output}</pre>

          <div className="mt-step-nav">
            <button
              className="mt-nav-btn"
              onClick={() => setStep(s => s - 1)}
              disabled={step === 0}
            >
              <ChevronLeft size={13} /> {t('moduleTerminal.prev')}
            </button>
            <button
              className="mt-nav-btn"
              onClick={() => setStep(s => s + 1)}
              disabled={step === totalSteps - 1}
            >
              {t('moduleTerminal.next')} <ChevronRight size={13} />
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-free">
          <textarea
            className="mt-free-input"
            value={freeInput}
            onChange={e => setFreeInput(e.target.value)}
            placeholder={t('moduleTerminal.placeholder')}
            rows={3}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); runFree() } }}
          />
          <div className="mt-free-actions">
            {ran && (
              <button className="mt-reset-btn" onClick={reset}>
                <RotateCcw size={11} /> {t('moduleTerminal.reset')}
              </button>
            )}
            <button className="mt-run-btn" onClick={runFree} disabled={!freeInput.trim()}>
              <Play size={11} /> {t('moduleTerminal.run')}
            </button>
          </div>
          {freeOutput && (
            <pre className="mt-step-output mt-free-output">{freeOutput}</pre>
          )}
          {!freeOutput && (
            <p className="mt-free-hint">{t('moduleTerminal.hint')}</p>
          )}
        </div>
      )}
    </div>
  )
}
