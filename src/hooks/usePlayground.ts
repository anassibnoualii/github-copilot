import { useLocalisedPlayground } from '@/hooks/useLocalisedData'
import playgroundData from '@/data/playground'
import type { PlaygroundData, PlaygroundMode, TerminalLine } from '@/types'

function resolveEntry(task: string, localised: PlaygroundData) {
  if (localised.responseDb[task]) return localised.responseDb[task]
  const idx = localised.examples.findIndex(ex => ex.task === task)
  if (idx !== -1) return localised.responseDb[playgroundData.examples[idx].task]
  return null
}

export function buildResponseLines(task: string, mode: PlaygroundMode, localised: PlaygroundData): TerminalLine[] {
  const entry = resolveEntry(task, localised)
  if (!entry) {
    return [
      { kind: 'label',  text: 'Thinking about your request...' },
      { kind: 'result', text: 'No pre-built response for this task — try an example below.' },
    ]
  }

  const executing = mode === 'autopilot' ? 'Executing (autopilot)...' : 'Executing...'
  const planLines: TerminalLine[] = entry.plan.map((s, i) => ({ kind: 'result', text: `  ${i + 1}. ${s}` }))

  return [
    { kind: 'label', text: 'Plan:' },
    ...planLines,
    { kind: 'label', text: executing },
    ...entry.steps,
    { kind: 'success', text: '✓ Done.' },
  ]
}

export function usePlayground() {
  const localised = useLocalisedPlayground()

  function build(task: string, mode: PlaygroundMode): TerminalLine[] {
    return buildResponseLines(task, mode, localised)
  }

  return { build, examples: localised.examples }
}
