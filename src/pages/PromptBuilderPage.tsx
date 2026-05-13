import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PageHeader from '@/components/shared/PageHeader'
import CopyButton from '@/components/shared/CopyButton'
import { PARTICIPANTS, SLASH_COMMANDS, CONTEXT_VARS } from '@/data/prompt-builder'
import { assemblePrompt } from '@/lib/prompt'

export default function PromptBuilderPage() {
  const { t } = useTranslation()

  const [participant, setParticipant] = useState('')
  const [command, setCommand] = useState('')
  const [context, setContext] = useState<string[]>([])
  const [task, setTask] = useState('')
  const [constraints, setConstraints] = useState('')
  const prompt = assemblePrompt(participant, command, context, task, constraints)

  function toggleContext(v: string) {
    setContext(prev => prev.includes(v) ? prev.filter(c => c !== v) : [...prev, v])
  }

  return (
    <div className="page">
      <PageHeader
        badge={t('promptBuilder.badge')}
        title={t('promptBuilder.title')}
        desc={t('promptBuilder.description')}
      />

      <div className="pb-layout">
        <div className="pb-panel">
          <div className="pb-section">
            <div className="pb-section-label">{t('promptBuilder.participant')}</div>
            <div className="pb-chips">
              {PARTICIPANTS.map(p => (
                <button
                  type="button"
                  key={p}
                  className={`pb-chip ${participant === p ? 'active' : ''}`}
                  onClick={() => setParticipant(prev => prev === p ? '' : p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="pb-section">
            <div className="pb-section-label">{t('promptBuilder.command')}</div>
            <div className="pb-chips">
              {SLASH_COMMANDS.map(c => (
                <button
                  type="button"
                  key={c}
                  className={`pb-chip pb-chip-cmd ${command === c ? 'active' : ''}`}
                  onClick={() => setCommand(prev => prev === c ? '' : c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="pb-section">
            <div className="pb-section-label">{t('promptBuilder.contextVars')}</div>
            <div className="pb-chips">
              {CONTEXT_VARS.map(v => (
                <button
                  type="button"
                  key={v}
                  className={`pb-chip pb-chip-ctx ${context.includes(v) ? 'active' : ''}`}
                  onClick={() => toggleContext(v)}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className="pb-section">
            <div className="pb-section-label">{t('promptBuilder.task')}</div>
            <textarea
              className="pb-textarea"
              rows={3}
              value={task}
              onChange={e => setTask(e.target.value)}
              placeholder={t('promptBuilder.taskPlaceholder')}
            />
          </div>

          <div className="pb-section">
            <div className="pb-section-label">{t('promptBuilder.constraints')}</div>
            <textarea
              className="pb-textarea"
              rows={2}
              value={constraints}
              onChange={e => setConstraints(e.target.value)}
              placeholder={t('promptBuilder.constraintsPlaceholder')}
            />
          </div>
        </div>

        <div className="pb-preview-panel">
          <div className="pb-preview-header">
            <span className="pb-preview-title">{t('promptBuilder.previewTitle')}</span>
            <CopyButton text={prompt} disabled={!prompt.trim()} />
          </div>
          <pre className="pb-preview">
            {prompt.trim() || <span className="pb-preview-empty">{t('promptBuilder.previewEmpty')}</span>}
          </pre>

          <div className="pb-tips">
            <div className="pb-tips-title">{t('promptBuilder.tipsTitle')}</div>
            <ul className="pb-tips-list">
              <li>{t('promptBuilder.tip1')}</li>
              <li>{t('promptBuilder.tip2')}</li>
              <li>{t('promptBuilder.tip3')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
