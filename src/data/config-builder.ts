import { Code2, MessageSquare, Shield, Globe } from 'lucide-react'
import { createElement } from 'react'

export interface ToggleDef {
  key: string
  settingKey: string
  settingVal: unknown
  defaultOn: boolean
}

export interface GroupDef {
  id: string
  icon: React.ReactNode
  isLangGroup: boolean
  toggles: ToggleDef[]
}

const configGroups: GroupDef[] = [
  {
    id: 'inlineCompletions',
    icon: createElement(Code2, { size: 14 }),
    isLangGroup: false,
    toggles: [
      { key: 'completions',   settingKey: 'github.copilot.enable',                          settingVal: { '*': true }, defaultOn: true  },
      { key: 'autoTrigger',   settingKey: 'github.copilot.editor.enableAutoCompletions',    settingVal: true,          defaultOn: true  },
      { key: 'nextEdit',      settingKey: 'github.copilot.nextEditSuggestions.enabled',     settingVal: true,          defaultOn: true  },
      { key: 'inlineSuggest', settingKey: 'editor.inlineSuggest.enabled',                  settingVal: true,          defaultOn: true  },
    ],
  },
  {
    id: 'chat',
    icon: createElement(MessageSquare, { size: 14 }),
    isLangGroup: false,
    toggles: [
      { key: 'chatEnabled', settingKey: 'github.copilot.chat.enabled',            settingVal: true,     defaultOn: true  },
      { key: 'voiceInput',  settingKey: 'github.copilot.chat.voiceInput.enabled', settingVal: true,     defaultOn: false },
      { key: 'followUp',    settingKey: 'github.copilot.chat.followUp',           settingVal: 'always', defaultOn: true  },
    ],
  },
  {
    id: 'security',
    icon: createElement(Shield, { size: 14 }),
    isLangGroup: false,
    toggles: [
      { key: 'publicCode', settingKey: 'github.copilot.advanced.duplicationDetection', settingVal: true, defaultOn: false },
      { key: 'telemetry',  settingKey: 'github.copilot.telemetry.enabled',             settingVal: true, defaultOn: true  },
    ],
  },
  {
    id: 'langExclusions',
    icon: createElement(Globe, { size: 14 }),
    isLangGroup: true,
    toggles: [
      { key: 'exclMarkdown',  settingKey: 'markdown',  settingVal: false, defaultOn: false },
      { key: 'exclPlaintext', settingKey: 'plaintext', settingVal: false, defaultOn: true  },
      { key: 'exclYaml',      settingKey: 'yaml',      settingVal: false, defaultOn: false },
      { key: 'exclEnv',       settingKey: 'dotenv',    settingVal: false, defaultOn: true  },
    ],
  },
]

export default configGroups
