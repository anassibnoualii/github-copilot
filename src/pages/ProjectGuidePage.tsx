import TabbedMdxPage, { type MdxGlob } from '@/components/shared/TabbedMdxPage'

const glob: MdxGlob = import.meta.glob('../content/project-guide/*.mdx')

const TABS = [
  { id: 'installation', labelKey: 'projectGuide.tabs.installation', mdxKey: '../content/project-guide/installation.mdx' },
  { id: 'workspace',    labelKey: 'projectGuide.tabs.workspace',    mdxKey: '../content/project-guide/workspace.mdx' },
  { id: 'instructions', labelKey: 'projectGuide.tabs.instructions', mdxKey: '../content/project-guide/instructions.mdx' },
  { id: 'agents',       labelKey: 'projectGuide.tabs.agents',       mdxKey: '../content/project-guide/agents.mdx' },
  { id: 'extensions',   labelKey: 'projectGuide.tabs.extensions',   mdxKey: '../content/project-guide/extensions.mdx' },
  { id: 'github',       labelKey: 'projectGuide.tabs.github',       mdxKey: '../content/project-guide/github.mdx' },
  { id: 'cli',          labelKey: 'projectGuide.tabs.cli',          mdxKey: '../content/project-guide/cli.mdx' },
  { id: 'team',         labelKey: 'projectGuide.tabs.team',         mdxKey: '../content/project-guide/team.mdx' },
]

export default function ProjectGuidePage() {
  return (
    <TabbedMdxPage
      badgeKey="projectGuide.badge"
      titleKey="projectGuide.title"
      descKey="projectGuide.description"
      tabs={TABS}
      glob={glob}
    />
  )
}
