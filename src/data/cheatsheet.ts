import type { CheatsheetGroup } from '@/types'

const cheatsheetGroups: CheatsheetGroup[] = [
  {
    title: 'Inline Completions — Keyboard Shortcuts',
    icon: '⌨',
    items: [
      { cmd: 'Tab', desc: 'Accept the current inline suggestion' },
      { cmd: 'Esc', desc: 'Dismiss the current suggestion' },
      { cmd: 'Alt + ]', desc: 'Show next suggestion' },
      { cmd: 'Alt + [', desc: 'Show previous suggestion' },
      { cmd: 'Ctrl + Enter', desc: 'Open the Copilot suggestion panel (10 options)' },
      { cmd: 'Alt + \\', desc: 'Trigger inline suggestion manually' },
      { cmd: 'Ctrl + →', desc: 'Accept next word of suggestion' },
    ]
  },
  {
    title: 'Chat Slash Commands',
    icon: '/',
    items: [
      { cmd: '/explain', desc: 'Explain the selected code or file' },
      { cmd: '/fix', desc: 'Suggest a fix for problems in the code' },
      { cmd: '/tests', desc: 'Generate unit tests for the selection' },
      { cmd: '/doc', desc: 'Add documentation comments to the code' },
      { cmd: '/new', desc: 'Create a new file or project scaffold' },
      { cmd: '/clear', desc: 'Clear the chat conversation history' },
      { cmd: '/help', desc: 'Show available commands and participants' },
      { cmd: '/review', desc: 'Request a code review of changes' },
    ]
  },
  {
    title: 'Context Variables',
    icon: '#',
    items: [
      { cmd: '#file', desc: 'Reference a specific file in your workspace' },
      { cmd: '#selection', desc: 'Reference the currently selected code' },
      { cmd: '#codebase', desc: 'Let Copilot search across your whole codebase' },
      { cmd: '#terminalLastCommand', desc: 'Reference the last terminal command run' },
      { cmd: '#terminalSelection', desc: 'Reference selected text in the terminal' },
      { cmd: '#editor', desc: 'Reference the current editor content' },
    ]
  },
  {
    title: 'Chat Participants',
    icon: '@',
    items: [
      { cmd: '@workspace', desc: 'Ask questions about your entire project' },
      { cmd: '@vscode', desc: 'Ask about VS Code settings and commands' },
      { cmd: '@terminal', desc: 'Explain terminal output or suggest commands' },
      { cmd: '@github', desc: 'Ask about GitHub — issues, PRs, code search' },
      { cmd: '@docker', desc: 'Docker extension for container help' },
    ]
  },
  {
    title: 'Copilot CLI Commands',
    icon: '$',
    items: [
      { cmd: 'npm install -g @github/copilot', desc: 'Install the new Copilot CLI globally' },
      { cmd: 'copilot', desc: 'Start an interactive Copilot CLI session' },
      { cmd: 'Shift + Tab', desc: 'Toggle between Normal and Autopilot mode in CLI' },
      { cmd: '/model', desc: 'Switch the AI model within a CLI session' },
      { cmd: '/resume', desc: 'Resume a previous CLI session' },
      { cmd: '& <task>', desc: 'Offload task to a cloud-based agent in CLI' },
    ]
  },
  {
    title: 'Agent Mode Actions',
    icon: '🤖',
    items: [
      { cmd: 'Continue', desc: 'Approve and continue agent execution' },
      { cmd: 'View Changes', desc: 'Review file changes before accepting' },
      { cmd: 'Keep / Discard', desc: 'Accept or reject individual file edits' },
      { cmd: 'Revert', desc: 'Undo all agent changes in the working set' },
    ]
  },
  {
    title: 'Custom Instructions Files',
    icon: '📄',
    items: [
      { cmd: '.github/copilot-instructions.md', desc: 'Repo-level instructions for all Copilot interactions' },
      { cmd: 'AGENTS.md', desc: 'Instructions specific to agent/autonomous mode' },
      { cmd: 'copilot-instructions.md', desc: 'Any directory — applies to files in that subtree' },
      { cmd: 'VS Code settings.json', desc: 'User or workspace-level instruction strings' },
    ]
  },
]

export default cheatsheetGroups
