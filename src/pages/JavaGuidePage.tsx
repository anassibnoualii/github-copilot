import TabbedMdxPage from '@/components/shared/TabbedMdxPage'

const glob = import.meta.glob('../content/java-guide/*.mdx')

const TABS = [
  { id: 'overview',      labelKey: 'javaGuide.tabs.overview',      mdxKey: '../content/java-guide/overview.mdx' },
  { id: 'instructions',  labelKey: 'javaGuide.tabs.instructions',  mdxKey: '../content/java-guide/instructions.mdx' },
  { id: 'settings',      labelKey: 'javaGuide.tabs.settings',      mdxKey: '../content/java-guide/settings.mdx' },
  { id: 'prompting',     labelKey: 'javaGuide.tabs.prompting',     mdxKey: '../content/java-guide/prompting.mdx' },
  { id: 'cli',           labelKey: 'javaGuide.tabs.cli',           mdxKey: '../content/java-guide/cli.mdx' },
  { id: 'agent',         labelKey: 'javaGuide.tabs.agent',         mdxKey: '../content/java-guide/agent.mdx' },
  { id: 'edits',         labelKey: 'javaGuide.tabs.edits',         mdxKey: '../content/java-guide/edits.mdx' },
]

export default function JavaGuidePage() {
  return (
    <TabbedMdxPage
      badgeKey="javaGuide.badge"
      titleKey="javaGuide.title"
      descKey="javaGuide.description"
      tabs={TABS}
      glob={glob}
    />
  )
}
