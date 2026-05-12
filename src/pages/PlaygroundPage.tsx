import { useTranslation } from 'react-i18next'
import { Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePlayground } from '@/hooks/usePlayground'
import { MODE_BADGE_CLASSES } from '@/lib/utils'
import type { PlaygroundMode } from '@/types'

const MODES: PlaygroundMode[] = ['normal', 'autopilot']

export default function PlaygroundPage() {
  const { t } = useTranslation()
  const { mode, setMode, task, setTask, output, runTask, examples } = usePlayground()

  return (
    <div className="page page-full">
      <div className="playground-topbar">
        <span className="playground-topbar-title">{t('playground.title')}</span>
        <div className="cli-mode-select">
          {MODES.map(m => (
            <button
              key={m}
              className={`cli-mode-btn${mode === m ? ' active' : ''}`}
              onClick={() => setMode(m)}
            >
              {t(`playground.${m}`)}
            </button>
          ))}
        </div>
        <span className="playground-install-hint">
          {t('playground.installHint')} <code>{t('playground.installCmd')}</code>
        </span>
      </div>

      <div className="playground-layout">
        <div className="playground-panel playground-panel-left">
          <div className="playground-panel-header">{t('playground.task')}</div>
          <div className="cli-task-wrap">
            <textarea
              placeholder={t('playground.taskPlaceholder')}
              value={task}
              onChange={e => setTask(e.target.value)}
              rows={4}
            />
            <Button size="sm" className="cli-run-btn" onClick={() => runTask(task)}>
              <Play size={13} /> {t('playground.run')}
            </Button>
          </div>

          <div className="playground-panel-header playground-panel-header-sep">{t('playground.examples')}</div>
          <div className="cli-examples">
            {examples.map(ex => (
              <div
                key={ex.task}
                className="cli-example-item"
                onClick={() => { setTask(ex.task); setMode(ex.mode); runTask(ex.task) }}
              >
                <span className={`badge ${MODE_BADGE_CLASSES[ex.mode]} flex-shrink-0`}>{ex.mode}</span>
                {ex.task}
              </div>
            ))}
          </div>
        </div>

        <div className="playground-panel playground-panel-right">
          <div className="playground-panel-header">{t('playground.output')}</div>
          {output
            ? <div className="cli-output" dangerouslySetInnerHTML={{ __html: output }} />
            : <div className="cli-output cli-output-empty">{t('playground.outputEmpty')}</div>
          }
        </div>
      </div>
    </div>
  )
}
