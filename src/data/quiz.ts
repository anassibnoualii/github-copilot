import type { QuizData } from '@/types'

const quizData: QuizData = {
  questions: [
    {
      q: 'Have you used Copilot inline suggestions (ghost text) before?',
      opts: [
        { text: 'No, never used GitHub Copilot', score: 0 },
        { text: 'I have it installed but rarely use it', score: 1 },
        { text: 'Yes, I use it daily for completions', score: 3 },
        { text: 'Yes, and I understand how context affects suggestions', score: 4 },
      ]
    },
    {
      q: 'Do you know what @workspace does in Copilot Chat?',
      opts: [
        { text: 'No idea', score: 0 },
        { text: 'I\'ve used Chat but not that participant', score: 1 },
        { text: 'Yes — it lets Copilot search across the whole project', score: 3 },
        { text: 'Yes, and I use slash commands like /explain and /fix regularly', score: 4 },
      ]
    },
    {
      q: 'Have you used the new GitHub Copilot CLI (not gh copilot)?',
      opts: [
        { text: 'What\'s the Copilot CLI?', score: 0 },
        { text: 'I used the old gh copilot extension', score: 1 },
        { text: 'Yes, I\'ve installed and run `copilot` in my terminal', score: 3 },
        { text: 'Yes, and I\'ve used Normal and Autopilot modes', score: 4 },
      ]
    },
    {
      q: 'Have you written custom instructions for Copilot?',
      opts: [
        { text: 'No, I didn\'t know you could', score: 0 },
        { text: 'I\'ve heard of copilot-instructions.md but haven\'t set it up', score: 1 },
        { text: 'Yes, I have a .github/copilot-instructions.md file', score: 3 },
        { text: 'Yes, including AGENTS.md and language-specific instructions', score: 4 },
      ]
    },
    {
      q: 'Have you used Agent Mode or Copilot Edits for multi-file tasks?',
      opts: [
        { text: 'No, what is that?', score: 0 },
        { text: 'I\'ve heard of it but haven\'t tried it', score: 1 },
        { text: 'Yes, I\'ve used Copilot Edits for multi-file changes', score: 3 },
        { text: 'Yes, and I\'ve used Agent Mode with tool approvals', score: 5 },
      ]
    },
  ],
  results: [
    { threshold: 0,  module: '01', name: 'Getting Started',    label: 'Start from the beginning', desc: 'Get Copilot installed, understand inline suggestions, and learn the keyboard shortcuts.' },
    { threshold: 5,  module: '02', name: 'Copilot Chat',        label: 'Learn Chat & Commands',    desc: 'You know the basics — now master Chat, slash commands, and context variables.' },
    { threshold: 9,  module: '04', name: 'Copilot CLI',         label: 'Explore the CLI',          desc: 'You\'re comfortable with IDE features. Try the new agentic terminal CLI next.' },
    { threshold: 13, module: '06', name: 'Custom Instructions', label: 'Customize your setup',     desc: 'Great foundational skills. Level up with custom instructions and personalization.' },
    { threshold: 17, module: '09', name: 'Extensions & MCP',    label: 'Go advanced',              desc: 'You\'re already a power user. Dive into Extensions, MCP, and enterprise configuration.' },
  ]
}

export default quizData
