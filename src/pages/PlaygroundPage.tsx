import { useState } from 'react'
import playgroundData from '@/data/playground'
import type { PlaygroundMode } from '@/types'

function getResponse(task: string, mode: PlaygroundMode): string {
  const { responseDb } = playgroundData
  const sessionHeader = mode === 'autopilot'
    ? `<span class="cli-prompt">$ copilot  <span style="color:#db6d28">[autopilot]</span></span>\n\n`
    : `<span class="cli-prompt">$ copilot</span>\n\n`

  const entry = responseDb[task]
  if (!entry) {
    return sessionHeader + `<span class="cli-label">Thinking about your request...</span>\n<span class="cli-result">No pre-built response for this task. Try the examples!</span>`
  }

  const planLines = entry.plan.map((step, i) => `<span class="cli-result">  ${i + 1}. ${step}</span>`).join('\n')
  const planBlock = `<span class="cli-label">Plan:</span>\n${planLines}\n\n<span class="cli-label">Executing${mode === 'autopilot' ? ' (autopilot)' : ''}...</span>\n\n`

  return sessionHeader + planBlock + entry.steps + `\n\n<span class="cli-result" style="color:#3fb950">✓ Done.</span>`
}

const MODE_BADGE: Record<PlaygroundMode, string> = {
  normal:    'badge-green',
  autopilot: 'badge-purple',
}

export default function PlaygroundPage() {
  const [mode, setMode] = useState<PlaygroundMode>('normal')
  const [task, setTask] = useState('')
  const [output, setOutput] = useState('')

  function runTask(t: string) {
    const result = getResponse(t, mode)
    setOutput(result)
  }

  return (
    <div className="page page-full">
      <div className="playground-topbar">
        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--gh-text2)' }}>Copilot CLI Simulator</span>
        <div className="cli-mode-select">
          {(['normal', 'autopilot'] as PlaygroundMode[]).map(m => (
            <button
              key={m}
              className={`cli-mode-btn${mode === m ? ' active' : ''}`}
              onClick={() => setMode(m)}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>
        <span style={{ fontSize: '0.75rem', color: 'var(--gh-muted)', marginLeft: 'auto' }}>
          Install: <code style={{ fontSize: '0.72rem' }}>npm install -g @github/copilot</code>
        </span>
      </div>

      <div className="playground-layout">
        <div className="playground-panel" style={{ width: 320 }}>
          <div className="playground-panel-header">Task</div>
          <div className="cli-input-wrap" style={{ flexDirection: 'column', borderBottom: 'none' }}>
            <textarea
              placeholder="Describe a task for Copilot CLI…"
              value={task}
              onChange={e => setTask(e.target.value)}
              rows={4}
            />
            <button
              className="btn btn-primary btn-sm"
              style={{ marginTop: 8, alignSelf: 'flex-end' }}
              onClick={() => runTask(task)}
            >
              Run
            </button>
          </div>

          <div className="playground-panel-header" style={{ borderTop: '1px solid var(--gh-border)' }}>Examples</div>
          <div className="cli-examples">
            {playgroundData.examples.map(ex => (
              <div
                key={ex.task}
                className="cli-example-item"
                onClick={() => { setTask(ex.task); setMode(ex.mode); runTask(ex.task) }}
              >
                <span className={`badge ${MODE_BADGE[ex.mode]}`} style={{ flexShrink: 0 }}>
                  {ex.mode}
                </span>
                {ex.task}
              </div>
            ))}
          </div>
        </div>

        <div className="playground-panel" style={{ flex: 1 }}>
          <div className="playground-panel-header">Output</div>
          {output
            ? <div className="cli-output" dangerouslySetInnerHTML={{ __html: output }} />
            : (
              <div className="cli-output" style={{ opacity: 0.4 }}>
                {'Select an example or type a task and click Run…'}
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}
