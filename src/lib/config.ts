import type { GroupDef } from '@/data/config-builder'

export function buildJson(enabled: Record<string, boolean>, groups: GroupDef[]): string {
  const settings: Record<string, unknown> = {}
  const langExclusions: Record<string, boolean> = {}

  for (const group of groups) {
    for (const t of group.toggles) {
      if (group.isLangGroup) {
        if (enabled[t.key]) {
          langExclusions[t.settingKey] = false
        }
      } else {
        if (enabled[t.key]) {
          settings[t.settingKey] = t.settingVal
        }
      }
    }
  }

  if (Object.keys(langExclusions).length > 0) {
    settings['github.copilot.enable'] = {
      '*': enabled['completions'] !== false,
      ...langExclusions,
    }
  }

  return JSON.stringify(settings, null, 2)
}
