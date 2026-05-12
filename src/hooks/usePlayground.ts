import { useState } from 'react'
import playgroundData from '@/data/playground'
import type { PlaygroundMode } from '@/types'

function buildResponse(task: string, mode: PlaygroundMode): string {
  const { responseDb } = playgroundData
  const header = mode === 'autopilot'
    ? `<span class="cli-prompt">$ copilot  <span class="cli-autopilot-badge">[autopilot]</span></span>\n\n`
    : `<span class="cli-prompt">$ copilot</span>\n\n`

  const entry = responseDb[task]
  if (!entry) {
    return header + `<span class="cli-label">Thinking about your request...</span>\n<span class="cli-result">No pre-built response for this task. Try the examples!</span>`
  }

  const plan = entry.plan.map((s, i) => `<span class="cli-result">  ${i + 1}. ${s}</span>`).join('\n')
  const body = `<span class="cli-label">Plan:</span>\n${plan}\n\n<span class="cli-label">Executing${mode === 'autopilot' ? ' (autopilot)' : ''}...</span>\n\n`

  return header + body + entry.steps + `\n\n<span class="cli-success">✓ Done.</span>`
}

export function usePlayground() {
  const [mode, setMode]     = useState<PlaygroundMode>('normal')
  const [task, setTask]     = useState('')
  const [output, setOutput] = useState('')

  function runTask(t: string) {
    setOutput(buildResponse(t, mode))
  }

  return { mode, setMode, task, setTask, output, runTask, examples: playgroundData.examples }
}
