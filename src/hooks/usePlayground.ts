import { useState } from 'react'
import { useLocalisedPlayground } from '@/hooks/useLocalisedData'
import playgroundData from '@/data/playground'
import type { PlaygroundData, PlaygroundMode } from '@/types'

function resolveEntry(task: string, localised: PlaygroundData) {
  if (localised.responseDb[task]) return localised.responseDb[task]
  const idx = localised.examples.findIndex(ex => ex.task === task)
  if (idx !== -1) return localised.responseDb[playgroundData.examples[idx].task]
  return null
}

function buildResponse(task: string, mode: PlaygroundMode, localised: PlaygroundData): string {
  const header = mode === 'autopilot'
    ? `<span class="cli-prompt">$ copilot  <span class="cli-autopilot-badge">[autopilot]</span></span>\n\n`
    : `<span class="cli-prompt">$ copilot</span>\n\n`

  const entry = resolveEntry(task, localised)
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

  const localised = useLocalisedPlayground()

  function runTask(t: string) {
    setOutput(buildResponse(t, mode, localised))
  }

  return { mode, setMode, task, setTask, output, runTask, examples: localised.examples }
}
