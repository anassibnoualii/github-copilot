import { useTranslation } from 'react-i18next'
import PageHeader from '@/components/shared/PageHeader'
import SearchInput from '@/components/shared/SearchInput'
import { useCheatsheetSearch } from '@/hooks/useCheatsheetSearch'
import { useLocalisedCheatsheet } from '@/hooks/useLocalisedData'

export default function CheatSheetPage() {
  const { t } = useTranslation()
  const localisedGroups = useLocalisedCheatsheet()
  const { query, setQuery, filtered, highlight } = useCheatsheetSearch(localisedGroups)

  return (
    <div className="page">
      <PageHeader
        badge={t('cheatsheet.badge')}
        title={t('cheatsheet.title')}
        desc={t('cheatsheet.description')}
      />

      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder={t('cheatsheet.searchPlaceholder')}
        className="cs-search"
      />

      {filtered.map(group => (
        <div key={group.title} className="cs-group">
          <div className="cs-group-title">{group.icon} {group.title}</div>
          <div className="cs-grid">
            {group.items.map(item => (
              <div key={item.cmd} className="cs-item">
                <div className="cs-item-cmd" dangerouslySetInnerHTML={{ __html: highlight(item.cmd) }} />
                <div className="cs-item-desc" dangerouslySetInnerHTML={{ __html: highlight(item.desc) }} />
              </div>
            ))}
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <p className="muted">{t('cheatsheet.noResults', { query })}</p>
      )}
    </div>
  )
}
