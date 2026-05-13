import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Settings } from 'lucide-react'
import PageHeader from '@/components/shared/PageHeader'
import CopyButton from '@/components/shared/CopyButton'
import GROUPS from '@/data/config-builder'
import { buildJson } from '@/lib/config'

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

  const json = buildJson(enabled, GROUPS)

  return (
    <div className="page page-wide">
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
                    type="button"
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
