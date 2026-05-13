import { lazy, Suspense, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MDXProvider } from '@mdx-js/react'
import mdxComponents from '@/components/mdx/mdx-components'
import PageHeader from '@/components/shared/PageHeader'
import TabBar from '@/components/shared/TabBar'

type TabId = 'overview' | 'instructions' | 'settings' | 'prompting' | 'cli' | 'agent' | 'edits'

const mdxGlob = import.meta.glob('../content/java-guide/*.mdx')

const TAB_COMPONENTS: Record<TabId, React.LazyExoticComponent<React.ComponentType>> = {
  overview:     lazy(mdxGlob['../content/java-guide/overview.mdx'] as () => Promise<{ default: React.ComponentType }>),
  instructions: lazy(mdxGlob['../content/java-guide/instructions.mdx'] as () => Promise<{ default: React.ComponentType }>),
  settings:     lazy(mdxGlob['../content/java-guide/settings.mdx'] as () => Promise<{ default: React.ComponentType }>),
  prompting:    lazy(mdxGlob['../content/java-guide/prompting.mdx'] as () => Promise<{ default: React.ComponentType }>),
  cli:          lazy(mdxGlob['../content/java-guide/cli.mdx'] as () => Promise<{ default: React.ComponentType }>),
  agent:        lazy(mdxGlob['../content/java-guide/agent.mdx'] as () => Promise<{ default: React.ComponentType }>),
  edits:        lazy(mdxGlob['../content/java-guide/edits.mdx'] as () => Promise<{ default: React.ComponentType }>),
}

export default function JavaGuidePage() {
  const { t } = useTranslation()
  const [tab, setTab] = useState<TabId>('overview')

  const TABS: { id: TabId; label: string }[] = [
    { id: 'overview',      label: t('javaGuide.tabs.overview') },
    { id: 'instructions',  label: t('javaGuide.tabs.instructions') },
    { id: 'settings',      label: t('javaGuide.tabs.settings') },
    { id: 'prompting',     label: t('javaGuide.tabs.prompting') },
    { id: 'cli',           label: t('javaGuide.tabs.cli') },
    { id: 'agent',         label: t('javaGuide.tabs.agent') },
    { id: 'edits',         label: t('javaGuide.tabs.edits') },
  ]

  const Content = TAB_COMPONENTS[tab]

  return (
    <div className="page">
      <PageHeader
        badge={t('javaGuide.badge')}
        title={t('javaGuide.title')}
        desc={t('javaGuide.description')}
      />

      <TabBar
        tabs={TABS.map(({ id, label }) => ({ value: id, label }))}
        active={tab}
        onChange={(v) => setTab(v as TabId)}
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
