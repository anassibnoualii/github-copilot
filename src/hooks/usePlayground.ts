import { useLocalisedPlayground } from '@/hooks/useLocalisedData'
import playgroundData from '@/data/playground'
import type { PlaygroundData, PlaygroundMode } from '@/types'

function resolveEntry(task: string, localised: PlaygroundData) {
  if (localised.responseDb[task]) return localised.responseDb[task]
  const idx = localised.examples.findIndex(ex => ex.task === task)
  if (idx !== -1) return localised.responseDb[playgroundData.examples[idx].task]
  return null
}

export function buildResponseHtml(task: string, mode: PlaygroundMode, localised: PlaygroundData): string {
  const entry = resolveEntry(task, localised)
  if (!entry) {
    return `<span class="cli-label">Thinking about your request...</span>\n<span class="cli-result">No pre-built response for this task — try an example below.</span>`
  }
  const plan = entry.plan.map((s, i) => `<span class="cli-result">  ${i + 1}. ${s}</span>`).join('\n')
  const executing = mode === 'autopilot' ? 'Executing (autopilot)...' : 'Executing...'
  return `<span class="cli-label">Plan:</span>\n${plan}\n\n<span class="cli-label">${executing}</span>\n\n${entry.steps}\n\n<span class="cli-success">✓ Done.</span>`
}

export function usePlayground() {
  const localised = useLocalisedPlayground()

  function build(task: string, mode: PlaygroundMode): string {
    return buildResponseHtml(task, mode, localised)
  }

  return { build, examples: localised.examples }
}
