import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Copy, Check, Settings, Shield, MessageSquare, Code2, Globe } from 'lucide-react'
import PageHeader from '@/components/shared/PageHeader'

interface ToggleDef {
  key: string
  settingKey: string
  settingVal: unknown
  defaultOn: boolean
}

interface GroupDef {
  id: string
  icon: React.ReactNode
  isLangGroup: boolean
  toggles: ToggleDef[]
}

const GROUPS: GroupDef[] = [
  {
    id: 'inlineCompletions',
    icon: <Code2 size={14} />,
    isLangGroup: false,
    toggles: [
      { key: 'completions',   settingKey: '"github.copilot.enable"',                           settingVal: { '*': true }, defaultOn: true  },
      { key: 'autoTrigger',   settingKey: '"github.copilot.editor.enableAutoCompletions"',     settingVal: true,          defaultOn: true  },
      { key: 'nextEdit',      settingKey: '"github.copilot.nextEditSuggestions.enabled"',      settingVal: true,          defaultOn: true  },
      { key: 'inlineSuggest', settingKey: '"editor.inlineSuggest.enabled"',                   settingVal: true,          defaultOn: true  },
    ],
  },
  {
    id: 'chat',
    icon: <MessageSquare size={14} />,
    isLangGroup: false,
    toggles: [
      { key: 'chatEnabled', settingKey: '"github.copilot.chat.enabled"',           settingVal: true,    defaultOn: true  },
      { key: 'voiceInput',  settingKey: '"github.copilot.chat.voiceInput.enabled"',settingVal: true,    defaultOn: false },
      { key: 'followUp',    settingKey: '"github.copilot.chat.followUp"',          settingVal: 'always',defaultOn: true  },
    ],
  },
  {
    id: 'security',
    icon: <Shield size={14} />,
    isLangGroup: false,
    toggles: [
      { key: 'publicCode', settingKey: '"github.copilot.advanced.duplicationDetection"', settingVal: true, defaultOn: false },
      { key: 'telemetry',  settingKey: '"github.copilot.telemetry.enabled"',             settingVal: true, defaultOn: true  },
    ],
  },
  {
    id: 'langExclusions',
    icon: <Globe size={14} />,
    isLangGroup: true,
    toggles: [
      { key: 'exclMarkdown',  settingKey: '"markdown"',  settingVal: false, defaultOn: false },
      { key: 'exclPlaintext', settingKey: '"plaintext"', settingVal: false, defaultOn: true  },
      { key: 'exclYaml',      settingKey: '"yaml"',      settingVal: false, defaultOn: false },
      { key: 'exclEnv',       settingKey: '"dotenv"',    settingVal: false, defaultOn: true  },
    ],
  },
]

function buildJson(enabled: Record<string, boolean>): string {
  const settings: Record<string, unknown> = {}
  const langExclusions: Record<string, boolean> = {}

  for (const group of GROUPS) {
    for (const t of group.toggles) {
      if (group.isLangGroup) {
        if (enabled[t.key]) {
          langExclusions[t.settingKey.replace(/"/g, '')] = false
        }
      } else {
        if (enabled[t.key]) {
          settings[t.settingKey.replace(/"/g, '')] = t.settingVal
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

export default function ConfigBuilderPage() {
  const { t } = useTranslation()

  const initial: Record<string, boolean> = {}
  for (const group of GROUPS) {
    for (const toggle of group.toggles) {
      initial[toggle.key] = toggle.defaultOn
    }
  }
  const [enabled, setEnabled] = useState(initial)
  const [copied, setCopied] = useState(false)

  function toggle(key: string) {
    setEnabled(prev => ({ ...prev, [key]: !prev[key] }))
  }

  function copy() {
    navigator.clipboard.writeText(buildJson(enabled))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const json = buildJson(enabled)

  return (
    <div className="page" style={{ maxWidth: '100%', padding: '40px 40px 80px' }}>
      <PageHeader
        badge={t('configBuilder.badge')}
        title={t('configBuilder.title')}
        desc={t('configBuilder.description')}
      />

      <div className="cb-layout">
        <div className="cb-controls">
          {GROUPS.map(group => (
            <div key={group.id} className="cb-group">
              <div className="cb-group-title">
                <span className="cb-group-icon">{group.icon}</span>
                {t(`configBuilder.groups.${group.id}.label`)}
              </div>
              {group.toggles.map(toggle_ => (
                <label key={toggle_.key} className="cb-toggle">
                  <div className="cb-toggle-info">
                    <span className="cb-toggle-label">{t(`configBuilder.groups.${group.id}.${toggle_.key}.label`)}</span>
                    <span className="cb-toggle-desc">{t(`configBuilder.groups.${group.id}.${toggle_.key}.desc`)}</span>
                  </div>
                  <button
                    className={`cb-switch ${enabled[toggle_.key] ? 'on' : 'off'}`}
                    onClick={() => toggle(toggle_.key)}
                    role="switch"
                    aria-checked={enabled[toggle_.key]}
                  >
                    <span className="cb-switch-thumb" />
                  </button>
                </label>
              ))}
            </div>
          ))}
        </div>

        <div className="cb-preview">
          <div className="cb-preview-header">
            <div className="cb-preview-title">
              <Settings size={13} /> {t('configBuilder.previewTitle')}
            </div>
            <button className="cb-copy-btn" onClick={copy}>
              {copied ? <><Check size={12} /> {t('configBuilder.copied')}</> : <><Copy size={12} /> {t('configBuilder.copy')}</>}
            </button>
          </div>
          <pre className="cb-json">{json}</pre>
          <p className="cb-hint">{t('configBuilder.hint')}</p>
        </div>
      </div>
    </div>
  )
}
