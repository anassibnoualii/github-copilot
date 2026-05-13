import { lazy, Suspense, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MDXProvider } from '@mdx-js/react'
import mdxComponents from '@/components/mdx/mdx-components'
import PageHeader from '@/components/shared/PageHeader'
import TabBar from '@/components/shared/TabBar'

type MdxGlob = Record<string, () => Promise<unknown>>

interface TabDef {
  id: string
  labelKey: string
  mdxKey: string
}

interface Props {
  badgeKey: string
  titleKey: string
  descKey: string
  tabs: TabDef[]
  glob: MdxGlob
}

export default function TabbedMdxPage({ badgeKey, titleKey, descKey, tabs, glob }: Props) {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState(tabs[0].id)

  const COMPONENTS = Object.fromEntries(
    tabs.map(({ id, mdxKey }) => [
      id,
      lazy(glob[mdxKey] as () => Promise<{ default: React.ComponentType<object> }>),
    ])
  ) as Record<string, React.LazyExoticComponent<React.ComponentType<object>>>

  const Content = COMPONENTS[activeTab]

  return (
    <div className="page">
      <PageHeader
        badge={t(badgeKey)}
        title={t(titleKey)}
        desc={t(descKey)}
      />

      <TabBar
        tabs={tabs.map(({ id, labelKey }) => ({ value: id, label: t(labelKey) }))}
        active={activeTab}
        onChange={setActiveTab}
        wrapClass="jg-tabs"
        btnClass="jg-tab"
      />

      <div className="jg-panel module-content">
        <MDXProvider components={mdxComponents}>
          <Suspense fallback={<p className="muted">Loading…</p>}>
            <Content />
          </Suspense>
        </MDXProvider>
      </div>
    </div>
  )
}
