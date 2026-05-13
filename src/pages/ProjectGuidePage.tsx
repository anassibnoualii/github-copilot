import { lazy, Suspense, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MDXProvider } from '@mdx-js/react'
import mdxComponents from '@/components/mdx/mdx-components'
import PageHeader from '@/components/shared/PageHeader'
import TabBar from '@/components/shared/TabBar'

type TabId = 'installation' | 'workspace' | 'instructions' | 'agents' | 'extensions' | 'github' | 'cli' | 'team'

const mdxGlob = import.meta.glob('../content/project-guide/*.mdx')

const TAB_COMPONENTS: Record<TabId, React.LazyExoticComponent<React.ComponentType>> = {
  installation: lazy(mdxGlob['../content/project-guide/installation.mdx'] as () => Promise<{ default: React.ComponentType }>),
  workspace:    lazy(mdxGlob['../content/project-guide/workspace.mdx'] as () => Promise<{ default: React.ComponentType }>),
  instructions: lazy(mdxGlob['../content/project-guide/instructions.mdx'] as () => Promise<{ default: React.ComponentType }>),
  agents:       lazy(mdxGlob['../content/project-guide/agents.mdx'] as () => Promise<{ default: React.ComponentType }>),
  extensions:   lazy(mdxGlob['../content/project-guide/extensions.mdx'] as () => Promise<{ default: React.ComponentType }>),
  github:       lazy(mdxGlob['../content/project-guide/github.mdx'] as () => Promise<{ default: React.ComponentType }>),
  cli:          lazy(mdxGlob['../content/project-guide/cli.mdx'] as () => Promise<{ default: React.ComponentType }>),
  team:         lazy(mdxGlob['../content/project-guide/team.mdx'] as () => Promise<{ default: React.ComponentType }>),
}

export default function ProjectGuidePage() {
  const { t } = useTranslation()
  const [tab, setTab] = useState<TabId>('installation')

  const TABS: { id: TabId; label: string }[] = [
    { id: 'installation', label: t('projectGuide.tabs.installation') },
    { id: 'workspace',    label: t('projectGuide.tabs.workspace') },
    { id: 'instructions', label: t('projectGuide.tabs.instructions') },
    { id: 'agents',       label: t('projectGuide.tabs.agents') },
    { id: 'extensions',   label: t('projectGuide.tabs.extensions') },
    { id: 'github',       label: t('projectGuide.tabs.github') },
    { id: 'cli',          label: t('projectGuide.tabs.cli') },
    { id: 'team',         label: t('projectGuide.tabs.team') },
  ]

  const Content = TAB_COMPONENTS[tab]

  return (
    <div className="page">
      <PageHeader
        badge={t('projectGuide.badge')}
        title={t('projectGuide.title')}
        desc={t('projectGuide.description')}
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
