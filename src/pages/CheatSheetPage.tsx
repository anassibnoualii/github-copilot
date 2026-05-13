import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Monitor, Apple, Terminal } from 'lucide-react'
import PageHeader from '@/components/shared/PageHeader'
import SearchInput from '@/components/shared/SearchInput'
import { useCheatsheetSearch } from '@/hooks/useCheatsheetSearch'
import { useLocalisedCheatsheet } from '@/hooks/useLocalisedData'
import type { OS } from '@/types'
import type { TextSegment } from '@/lib/utils'

function Highlighted({ segments }: { segments: TextSegment[] }) {
  return (
    <>
      {segments.map((seg, i) =>
        seg.match ? <mark key={i}>{seg.text}</mark> : <span key={i}>{seg.text}</span>
      )}
    </>
  )
}

const OS_OPTIONS: { value: OS; label: string; icon: React.ReactNode }[] = [
  { value: 'mac',   label: 'Mac',     icon: <Apple size={12} /> },
  { value: 'win',   label: 'Windows', icon: <Monitor size={12} /> },
  { value: 'linux', label: 'Linux',   icon: <Terminal size={12} /> },
]

function resolveCmd(cmd: string, platforms: { mac: string; win: string } | undefined, os: OS): string {
  if (!platforms) return cmd
  if (os === 'mac') return platforms.mac
  return platforms.win
}

export default function CheatSheetPage() {
  const { t } = useTranslation()
  const [os, setOs] = useState<OS>(() => (localStorage.getItem('preferred-os') as OS) ?? 'mac')
  const localisedGroups = useLocalisedCheatsheet()
  const { query, setQuery, filtered, highlight } = useCheatsheetSearch(localisedGroups)

  function switchOs(value: OS) {
    setOs(value)
    localStorage.setItem('preferred-os', value)
  }

  return (
    <div className="page">
      <PageHeader
        badge={t('cheatsheet.badge')}
        title={t('cheatsheet.title')}
        desc={t('cheatsheet.description')}
      />

      <div className="cs-toolbar">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder={t('cheatsheet.searchPlaceholder')}
          className="cs-search-inline"
        />
        <div className="os-toggle">
          {OS_OPTIONS.map(opt => (
            <button
              key={opt.value}
              className={`os-btn ${os === opt.value ? 'active' : ''}`}
              onClick={() => switchOs(opt.value)}
            >
              {opt.icon} {opt.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.map(group => (
        <div key={group.title} className="cs-group">
          <div className="cs-group-title">{group.icon} {group.title}</div>
          <div className="cs-grid">
            {group.items.map(item => {
              const displayCmd = resolveCmd(item.cmd, item.platforms, os)
              return (
                <div key={item.cmd} className="cs-item">
                  <div className="cs-item-cmd"><Highlighted segments={highlight(displayCmd)} /></div>
                  <div className="cs-item-desc"><Highlighted segments={highlight(item.desc)} /></div>
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <p className="muted">{t('cheatsheet.noResults', { query })}</p>
      )}
    </div>
  )
}
