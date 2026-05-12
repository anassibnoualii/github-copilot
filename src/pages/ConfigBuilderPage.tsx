import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Copy, Check, Settings, Shield, MessageSquare, Code2, Globe } from 'lucide-react'
import PageHeader from '@/components/shared/PageHeader'

interface Toggle {
  key: string
  label: string
  desc: string
  settingKey: string
  settingVal: unknown
  defaultOn: boolean
}

interface Group {
  icon: React.ReactNode
  label: string
  toggles: Toggle[]
}

const GROUPS: Group[] = [
  {
    icon: <Code2 size={14} />,
    label: 'Inline Completions',
    toggles: [
      { key: 'completions', label: 'Enable Copilot', desc: 'Enable inline completions globally', settingKey: '"github.copilot.enable"', settingVal: { '*': true }, defaultOn: true },
      { key: 'autoTrigger', label: 'Auto-trigger suggestions', desc: 'Show suggestions as you type (disable for manual-only)', settingKey: '"github.copilot.editor.enableAutoCompletions"', settingVal: true, defaultOn: true },
      { key: 'nextEdit', label: 'Next Edit Suggestions', desc: 'Predict your next edit based on recent changes', settingKey: '"github.copilot.nextEditSuggestions.enabled"', settingVal: true, defaultOn: true },
      { key: 'inlineSuggest', label: 'Inline Suggest', desc: 'Show ghost text in the editor', settingKey: '"editor.inlineSuggest.enabled"', settingVal: true, defaultOn: true },
    ],
  },
  {
    icon: <MessageSquare size={14} />,
    label: 'Copilot Chat',
    toggles: [
      { key: 'chatEnabled', label: 'Enable Chat', desc: 'Enable Copilot Chat panel in the IDE', settingKey: '"github.copilot.chat.enabled"', settingVal: true, defaultOn: true },
      { key: 'voiceInput', label: 'Voice Input', desc: 'Allow dictating chat prompts via microphone', settingKey: '"github.copilot.chat.voiceInput.enabled"', settingVal: true, defaultOn: false },
      { key: 'followUp', label: 'Follow-up Suggestions', desc: 'Show suggested follow-up questions after responses', settingKey: '"github.copilot.chat.followUp"', settingVal: 'always', defaultOn: true },
    ],
  },
  {
    icon: <Shield size={14} />,
    label: 'Security & Privacy',
    toggles: [
      { key: 'publicCode', label: 'Public Code Filter', desc: 'Block suggestions that match public code (reduces IP risk)', settingKey: '"github.copilot.advanced.duplicationDetection"', settingVal: true, defaultOn: false },
      { key: 'telemetry', label: 'Share Usage Data', desc: 'Send usage statistics to improve Copilot', settingKey: '"github.copilot.telemetry.enabled"', settingVal: true, defaultOn: true },
    ],
  },
  {
    icon: <Globe size={14} />,
    label: 'Language Exclusions',
    toggles: [
      { key: 'exclMarkdown', label: 'Disable for Markdown', desc: 'Turn off completions in .md files', settingKey: '"markdown"', settingVal: false, defaultOn: false },
      { key: 'exclPlaintext', label: 'Disable for Plain Text', desc: 'Turn off completions in .txt files', settingKey: '"plaintext"', settingVal: false, defaultOn: true },
      { key: 'exclYaml', label: 'Disable for YAML', desc: 'Turn off completions in .yaml/.yml files', settingKey: '"yaml"', settingVal: false, defaultOn: false },
      { key: 'exclEnv', label: 'Disable for .env files', desc: 'Turn off completions in .env files (recommended)', settingKey: '"dotenv"', settingVal: false, defaultOn: true },
    ],
  },
]

function buildJson(enabled: Record<string, boolean>): string {
  const settings: Record<string, unknown> = {}
  const langExclusions: Record<string, boolean> = {}

  for (const group of GROUPS) {
    for (const t of group.toggles) {
      if (group.label === 'Language Exclusions') {
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
            <div key={group.label} className="cb-group">
              <div className="cb-group-title">
                <span className="cb-group-icon">{group.icon}</span>
                {group.label}
              </div>
              {group.toggles.map(toggle_ => (
                <label key={toggle_.key} className="cb-toggle">
                  <div className="cb-toggle-info">
                    <span className="cb-toggle-label">{toggle_.label}</span>
                    <span className="cb-toggle-desc">{toggle_.desc}</span>
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
              <Settings size={13} /> .vscode/settings.json
            </div>
            <button className="cb-copy-btn" onClick={copy}>
              {copied ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
            </button>
          </div>
          <pre className="cb-json">{json}</pre>
          <p className="cb-hint">
            Paste this into your VS Code <code>.vscode/settings.json</code> or user settings to apply these Copilot preferences.
          </p>
        </div>
      </div>
    </div>
  )
}
