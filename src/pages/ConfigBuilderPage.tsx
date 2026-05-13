import { useTranslation } from 'react-i18next'
import { Settings } from 'lucide-react'
import { useState } from 'react'
import PageHeader from '@/components/shared/PageHeader'
import CopyButton from '@/components/shared/CopyButton'
import GROUPS from '@/data/config-builder'

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
  function toggle(key: string) {
    setEnabled(prev => ({ ...prev, [key]: !prev[key] }))
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
            <CopyButton text={json} />
          </div>
          <pre className="cb-json">{json}</pre>
          <p className="cb-hint">{t('configBuilder.hint')}</p>
        </div>
      </div>
    </div>
  )
}
