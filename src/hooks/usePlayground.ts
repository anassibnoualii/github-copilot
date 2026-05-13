import { useTranslation } from 'react-i18next'
import { useLocalisedPlayground } from '@/hooks/useLocalisedData'
import playgroundData from '@/data/playground'
import type { PlaygroundData, PlaygroundMode, TerminalLine } from '@/types'

function resolveEntry(task: string, localised: PlaygroundData) {
  if (localised.responseDb[task]) return localised.responseDb[task]
  const idx = localised.examples.findIndex(ex => ex.task === task)
  if (idx !== -1) return localised.responseDb[playgroundData.examples[idx].task]
  return null
}

export function usePlayground() {
  const { t } = useTranslation()
  const localised = useLocalisedPlayground()

  function build(task: string, mode: PlaygroundMode): TerminalLine[] {
    const entry = resolveEntry(task, localised)

    if (!entry) {
      return [
        { kind: 'label',  text: t('playground.thinking') },
        { kind: 'result', text: t('playground.noResponse') },
      ]
    }

    const executingKey = mode === 'autopilot' ? 'playground.executingAutopilot' : 'playground.executing'
    const planLines: TerminalLine[] = entry.plan.map((s, i) => ({ kind: 'result', text: `  ${i + 1}. ${s}` }))

    return [
      { kind: 'label',   text: t('playground.plan') },
      ...planLines,
      { kind: 'label',   text: t(executingKey) },
      ...entry.steps,
      { kind: 'success', text: t('playground.done') },
    ]
  }

  return { build, examples: localised.examples }
}
