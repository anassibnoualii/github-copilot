import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Play, RotateCcw, Terminal } from 'lucide-react'
import TabBar from '@/components/shared/TabBar'
import NavPair from '@/components/shared/NavPair'
import StepDots from '@/components/shared/StepDots'
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
      <TabBar
        tabs={[
          { value: 'guided', label: <><Play size={11} /> {t('moduleTerminal.guided')}</> },
          { value: 'free',   label: <><Terminal size={11} /> {t('moduleTerminal.tryIt')}</> },
        ]}
        active={tab}
        onChange={(v) => setTab(v as 'guided' | 'free')}
        wrapClass="mt-tabs"
        btnClass="mt-tab"
      />

      {tab === 'guided' ? (
        <div className="mt-guided">
          <StepDots
            current={step}
            total={totalSteps}
            label={t('moduleTerminal.step', { current: step + 1, total: totalSteps })}
          />

          <div className="mt-step-input">
            <span className="mt-prompt-glyph">›</span>
            <code>{current.input}</code>
          </div>

          <pre className="mt-step-output">{current.output}</pre>

          <NavPair
            wrapClass="mt-step-nav"
            btnClass="mt-nav-btn"
            onPrev={() => setStep(s => s - 1)}
            prevDisabled={step === 0}
            prevLabel={t('moduleTerminal.prev')}
            onNext={() => setStep(s => s + 1)}
            nextDisabled={step === totalSteps - 1}
            nextLabel={t('moduleTerminal.next')}
            iconSize={13}
          />
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
