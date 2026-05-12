import type { ReferenceSection } from '@/types'

const references: ReferenceSection[] = [
  {
    label: 'Official Documentation',
    icon: '📖',
    links: [
      { title: 'GitHub Copilot Docs (Home)', url: 'https://docs.github.com/en/copilot', desc: 'The complete official documentation for all Copilot features.', type: 'doc' },
      { title: 'Subscription Plans', url: 'https://docs.github.com/en/copilot/about-github-copilot/subscription-plans-for-github-copilot', desc: 'Free, Pro, Pro+, Business, Enterprise — features and pricing.', type: 'doc' },
      { title: 'Copilot in VS Code', url: 'https://docs.github.com/en/copilot/using-github-copilot/using-github-copilot-in-your-ide', desc: 'Inline completions, shortcuts, and IDE integration details.', type: 'doc' },
      { title: 'Copilot Chat', url: 'https://docs.github.com/en/copilot/using-github-copilot/copilot-chat/asking-github-copilot-questions-in-your-ide', desc: 'Chat panel, inline chat, slash commands, and context variables.', type: 'doc' },
      { title: 'Copilot Edits', url: 'https://docs.github.com/en/copilot/using-github-copilot/copilot-edits', desc: 'Multi-file editing, working sets, and diff review.', type: 'doc' },
      { title: 'Custom Instructions', url: 'https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot', desc: '.github/copilot-instructions.md, scoped instructions, AGENTS.md.', type: 'doc' },
      { title: 'Agent Mode', url: 'https://docs.github.com/en/copilot/using-github-copilot/using-copilot-coding-agent', desc: 'Autonomous task execution, tool use, and approval workflow.', type: 'doc' },
      { title: 'Copilot Extensions', url: 'https://docs.github.com/en/copilot/using-github-copilot/copilot-extensions', desc: '@docker, @sentry, @datadog and other Marketplace extensions.', type: 'doc' },
      { title: 'MCP Servers', url: 'https://docs.github.com/en/copilot/customizing-copilot/using-model-context-protocol', desc: 'Connecting external tools to Copilot via the Model Context Protocol.', type: 'doc' },
      { title: 'Enterprise Configuration', url: 'https://docs.github.com/en/copilot/managing-copilot/managing-github-copilot-in-your-organization', desc: 'Org policies, content exclusions, audit logs, and rollout.', type: 'doc' },
      { title: 'Copilot CLI (New)', url: 'https://docs.github.com/en/copilot/github-copilot-in-the-cli/about-github-copilot-in-the-cli', desc: 'The new npm-based agentic terminal CLI.', type: 'doc' },
      { title: 'GitHub Copilot on GitHub.com', url: 'https://docs.github.com/en/copilot/using-github-copilot/using-github-copilot-on-githubcom', desc: 'PR summaries, code review, Copilot Workspace, and code search.', type: 'doc' },
    ]
  },
  {
    label: 'GitHub Blog & Changelog',
    icon: '📰',
    links: [
      { title: 'GitHub Copilot CLI is GA', url: 'https://github.blog/changelog/2026-02-25-github-copilot-cli-is-now-generally-available/', desc: 'The new npm-based Copilot CLI reached general availability (Feb 2026).', type: 'blog' },
      { title: 'Copilot CLI Public Preview', url: 'https://github.blog/changelog/2025-09-25-github-copilot-cli-is-now-in-public-preview/', desc: 'Initial announcement of the new agentic Copilot CLI (Sep 2025).', type: 'blog' },
      { title: 'gh copilot Extension Deprecated', url: 'https://github.com/github/gh-copilot', desc: 'The old gh copilot suggest/explain extension (deprecated Oct 2025).', type: 'repo' },
      { title: 'GitHub Copilot Features Overview', url: 'https://github.com/features/copilot', desc: 'Official feature landing page with plans and pricing.', type: 'blog' },
      { title: 'Copilot Plans & Pricing', url: 'https://github.com/features/copilot/plans', desc: 'Side-by-side plan comparison with current pricing.', type: 'blog' },
      { title: 'GitHub Copilot CLI Repo', url: 'https://github.com/github/copilot-cli', desc: 'Source, changelog, and releases for the new Copilot CLI.', type: 'repo' },
    ]
  },
  {
    label: 'Model Context Protocol',
    icon: '🔌',
    links: [
      { title: 'MCP Official Site', url: 'https://modelcontextprotocol.io', desc: 'The open standard for connecting AI models to external tools and data.', type: 'doc' },
      { title: 'MCP TypeScript SDK', url: 'https://github.com/modelcontextprotocol/typescript-sdk', desc: 'Build MCP servers in TypeScript/JavaScript.', type: 'repo' },
      { title: 'MCP Python SDK', url: 'https://github.com/modelcontextprotocol/python-sdk', desc: 'Build MCP servers in Python.', type: 'repo' },
      { title: 'MCP Server Examples', url: 'https://github.com/modelcontextprotocol/servers', desc: 'Reference implementations: filesystem, GitHub, PostgreSQL, and more.', type: 'repo' },
    ]
  },
  {
    label: 'Learning Resources',
    icon: '🎓',
    links: [
      { title: 'GitHub Skills: Copilot', url: 'https://skills.github.com/', desc: 'Free interactive courses on GitHub Copilot from GitHub.', type: 'video' },
      { title: 'VS Code Copilot Tips', url: 'https://code.visualstudio.com/docs/copilot/overview', desc: 'VS Code official guide covering Chat, Edits, and Agent Mode.', type: 'doc' },
      { title: 'Prompt Engineering for Copilot', url: 'https://docs.github.com/en/copilot/using-github-copilot/prompt-engineering-for-github-copilot', desc: 'Official guidance on writing effective prompts for better results.', type: 'doc' },
      { title: 'Copilot Trust Center', url: 'https://resources.github.com/copilot-trust-center/', desc: 'Privacy, security, IP policy, and compliance information.', type: 'doc' },
      { title: 'GitHub Copilot Feedback', url: 'https://github.com/orgs/community/discussions/categories/copilot', desc: 'Community discussions, feature requests, and bug reports.', type: 'repo' },
    ]
  },
  {
    label: 'Supported IDEs',
    icon: '💻',
    links: [
      { title: 'VS Code Extension', url: 'https://marketplace.visualstudio.com/items?itemName=GitHub.copilot', desc: 'The primary GitHub Copilot extension for Visual Studio Code.', type: 'repo' },
      { title: 'JetBrains Plugin', url: 'https://plugins.jetbrains.com/plugin/17718-github-copilot', desc: 'Copilot for IntelliJ IDEA, PyCharm, WebStorm, GoLand, and others.', type: 'repo' },
      { title: 'Visual Studio Extension', url: 'https://marketplace.visualstudio.com/items?itemName=GitHub.copilotvs', desc: 'Copilot for Visual Studio 2022.', type: 'repo' },
      { title: 'Neovim Plugin', url: 'https://github.com/github/copilot.vim', desc: 'Copilot integration for Neovim and Vim.', type: 'repo' },
      { title: 'Xcode Extension', url: 'https://docs.github.com/en/copilot/using-github-copilot/getting-code-suggestions-in-your-ide-with-github-copilot?tool=xcode', desc: 'Copilot for Xcode — Apple development.', type: 'doc' },
    ]
  },
]

export default references
