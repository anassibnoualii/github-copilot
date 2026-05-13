import type { CheatsheetGroup } from '@/types'

const cheatsheetGroups: CheatsheetGroup[] = [
  {
    title: 'Inline Completions — Keyboard Shortcuts',
    icon: '⌨',
    items: [
      { cmd: 'Tab', desc: 'Accept the current inline suggestion' },
      { cmd: 'Esc', desc: 'Dismiss the current suggestion' },
      { cmd: 'Alt + ]', desc: 'Show next suggestion', platforms: { mac: 'Option + ]', win: 'Alt + ]' } },
      { cmd: 'Alt + [', desc: 'Show previous suggestion', platforms: { mac: 'Option + [', win: 'Alt + [' } },
      { cmd: 'Ctrl + Enter', desc: 'Open the Copilot suggestion panel' },
      { cmd: 'Ctrl + →', desc: 'Accept next word of suggestion', platforms: { mac: 'Cmd + →', win: 'Ctrl + →' } },
    ]
  },
  {
    title: 'Chat & Inline Chat',
    icon: '💬',
    items: [
      { cmd: 'Ctrl+Shift+Alt+L', desc: 'Open Copilot quick chat', platforms: { mac: 'Shift+Option+Cmd+L', win: 'Ctrl+Shift+Alt+L' } },
      { cmd: 'Ctrl+I', desc: 'Open inline chat at cursor', platforms: { mac: 'Cmd+I', win: 'Ctrl+I' } },
      { cmd: 'Escape', desc: 'Close inline chat / dismiss suggestion' },
      { cmd: 'Enter', desc: 'Send message in chat panel' },
      { cmd: 'Shift+Enter', desc: 'Add newline without sending' },
      { cmd: 'Up / Down', desc: 'Navigate message history in chat input' },
    ]
  },
  {
    title: 'Chat Slash Commands',
    icon: '/',
    items: [
      { cmd: '/explain', desc: 'Explain the selected code or file' },
      { cmd: '/fix', desc: 'Suggest a fix for problems in the code' },
      { cmd: '/fixTestFailure', desc: 'Find and fix a failing test' },
      { cmd: '/tests', desc: 'Generate unit tests for the selection' },
      { cmd: '/new', desc: 'Create a new file or project scaffold' },
      { cmd: '/clear', desc: 'Clear the chat conversation history' },
      { cmd: '/help', desc: 'Show available commands and participants' },
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
