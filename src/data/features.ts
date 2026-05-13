import type { Feature } from '@/types'

export interface FilterOption {
  value: string
  label: string
}

export const LEVEL_FILTER_VALUES = ['all', 'beginner', 'intermediate', 'advanced'] as const
export const CATEGORY_FILTER_VALUES = ['all', 'IDE', 'CLI', 'GitHub.com', 'Extensions', 'Enterprise'] as const

const features: Feature[] = [
  // IDE Features
  {
    icon: '⌨', name: 'Inline Completions', desc: 'Ghost text suggestions as you type, accepted with Tab',
    level: 'beginner', category: 'IDE',
    example: '// Type a comment and Copilot fills in the code:\n// Function to parse a JSON config file\nfunction parseConfig(path: string): Config {\n  const raw = fs.readFileSync(path, "utf-8");\n  return JSON.parse(raw) as Config; // ← Tab to accept\n}',
  },
  {
    icon: '◎', name: 'Multi-line Suggestions', desc: 'Complete functions, classes, and blocks in one suggestion',
    level: 'beginner', category: 'IDE',
    example: '// Copilot can complete an entire class:\nclass UserRepository {\n  async findById(id: string): Promise<User | null> {\n    return db.query("SELECT * FROM users WHERE id = $1", [id])\n      .then(r => r.rows[0] ?? null);\n  }\n}',
  },
  {
    icon: '↻', name: 'Alternative Suggestions', desc: 'Cycle through multiple options with Alt+] / Alt+[',
    level: 'beginner', category: 'IDE',
    example: '// Press Alt+] to see the next suggestion:\n// Option 1: regex approach\nconst isEmail = (s: string) => /^[^@]+@[^@]+$/.test(s);\n// Option 2: split approach\nconst isEmail = (s: string) => s.includes("@") && s.includes(".");',
  },
  {
    icon: '▦', name: 'Suggestion Panel', desc: 'Open 10 parallel suggestions with Ctrl+Enter',
    level: 'beginner', category: 'IDE',
  },
  {
    icon: '💬', name: 'Copilot Chat Panel', desc: 'Persistent chat sidebar for code questions and explanations',
    level: 'beginner', category: 'IDE',
    example: '// Ask anything about your code:\n> What does this regex do?\n> /^(?=.*[A-Z])(?=.*\\d).{8,}$/\n\n// Copilot explains:\n// Matches strings that:\n// - have at least 8 characters\n// - contain at least one uppercase letter\n// - contain at least one digit',
  },
  {
    icon: '✏', name: 'Inline Chat', desc: 'Chat directly in the editor at cursor position with Ctrl+I',
    level: 'beginner', category: 'IDE',
    example: '// Select code → Ctrl+I → type prompt:\n// "add input validation"\n\n// Before:\nfunction setAge(age: number) {\n  this.age = age;\n}\n\n// After Copilot:\nfunction setAge(age: number) {\n  if (age < 0 || age > 150) throw new Error("Invalid age");\n  this.age = age;\n}',
  },
  {
    icon: '/', name: '/explain Command', desc: 'Get a plain-English explanation of selected code',
    level: 'beginner', category: 'IDE',
    example: '// Select code → /explain\n// Input:\nconst memoize = (fn) => {\n  const cache = new Map();\n  return (...args) => {\n    const key = JSON.stringify(args);\n    if (cache.has(key)) return cache.get(key);\n    const result = fn(...args);\n    cache.set(key, result);\n    return result;\n  };\n};\n// Copilot: "This is a memoization wrapper that\n// caches function results by argument signature..."',
  },
  {
    icon: '/', name: '/fix Command', desc: 'Suggest fixes for bugs, errors, and code issues',
    level: 'beginner', category: 'IDE',
    example: '// Paste error + /fix:\n// TypeError: Cannot read property "name" of undefined\n\n// Before:\nconst name = user.profile.name;\n\n// Copilot fix:\nconst name = user?.profile?.name ?? "Unknown";',
  },
  {
    icon: '/', name: '/tests Command', desc: 'Auto-generate unit tests for selected functions',
    level: 'beginner', category: 'IDE',
    example: '// Select function → /tests\ndescribe("validateEmail", () => {\n  it("returns true for valid email", () => {\n    expect(validateEmail("user@example.com")).toBe(true);\n  });\n  it("returns false for missing @", () => {\n    expect(validateEmail("userexample.com")).toBe(false);\n  });\n  it("handles empty string", () => {\n    expect(validateEmail("")).toBe(false);\n  });\n});',
  },
  {
    icon: '/', name: '/doc Command', desc: 'Add JSDoc, docstrings, or inline comments automatically',
    level: 'beginner', category: 'IDE',
    example: '// Select function → /doc\n\n/**\n * Calculates the total price including tax.\n * @param price - Base price in USD\n * @param taxRate - Tax rate as a decimal (e.g. 0.08 for 8%)\n * @returns Total price rounded to 2 decimal places\n */\nfunction calcTotal(price: number, taxRate: number): number {\n  return Math.round(price * (1 + taxRate) * 100) / 100;\n}',
  },
  { icon: '#', name: '#file Context', desc: 'Reference a specific file in your chat prompt', level: 'beginner', category: 'IDE' },
  { icon: '#', name: '#selection Context', desc: 'Attach selected code as context in chat', level: 'beginner', category: 'IDE' },
  {
    icon: '@', name: '@workspace Participant', desc: 'Let Copilot search and reason across your entire project',
    level: 'intermediate', category: 'IDE',
    example: '// @workspace how is authentication handled in this project?\n\n// Copilot searches your codebase and responds:\n// "Authentication uses JWT tokens via the auth middleware\n// in src/middleware/auth.ts. Tokens are validated on\n// every request to protected routes defined in\n// src/routes/protected.ts..."',
  },
  { icon: '@', name: '@vscode Participant', desc: 'Get help with VS Code settings, keybindings, and extensions', level: 'beginner', category: 'IDE' },
  { icon: '@', name: '@terminal Participant', desc: 'Explain terminal output and suggest shell commands in-IDE', level: 'beginner', category: 'IDE' },
  { icon: '#', name: '#codebase Context', desc: 'Semantic search across the whole codebase as context', level: 'intermediate', category: 'IDE' },
  {
    icon: '📝', name: 'Copilot Edits', desc: 'Make coordinated multi-file edits from a single prompt',
    level: 'intermediate', category: 'IDE',
    example: '// Working set: [users.ts, user.model.ts, user.service.ts]\n// Prompt: "Add soft delete support — add deletedAt field"\n\n// Copilot edits ALL 3 files:\n// user.model.ts → adds deletedAt?: Date field\n// users.ts      → adds DELETE endpoint\n// user.service.ts → adds softDelete() method',
  },
  { icon: '📋', name: 'Working Set', desc: 'Add specific files to the edit working set for targeted changes', level: 'intermediate', category: 'IDE' },
  { icon: '✓', name: 'Hunk Review', desc: 'Review, accept, or reject individual code chunks from Edits', level: 'intermediate', category: 'IDE' },
  {
    icon: '🤖', name: 'Agent Mode', desc: 'Autonomous multi-step task execution with tool use',
    level: 'intermediate', category: 'IDE',
    example: '// Prompt in Agent Mode:\n// "Write tests for all untested functions in src/utils/"\n\n// Agent automatically:\n// 1. Scans src/utils/ for functions\n// 2. Checks existing test files\n// 3. Identifies 7 untested functions\n// 4. Generates test file for each\n// 5. Runs tests and fixes failures\n// 6. Reports: "42 new tests, all passing"',
  },
  { icon: '🛑', name: 'Tool Call Approval', desc: 'Review and approve each tool call before agent executes it', level: 'intermediate', category: 'IDE' },
  { icon: '↩', name: 'Agent Revert', desc: 'Undo all agent-made changes with a single click', level: 'intermediate', category: 'IDE' },
  { icon: '/', name: '/new Command', desc: 'Scaffold new files, components, or entire project structures', level: 'beginner', category: 'IDE' },
  { icon: '/', name: '/fixTestFailure Command', desc: 'Find and fix a failing test — Copilot reads the error and applies a fix', level: 'intermediate', category: 'IDE' },
  { icon: '#', name: '#terminalLastCommand', desc: 'Reference the last terminal command in a chat prompt', level: 'intermediate', category: 'IDE' },
  { icon: '🔊', name: 'Voice Input', desc: 'Dictate chat prompts using your microphone (VS Code)', level: 'intermediate', category: 'IDE' },
  { icon: '🌐', name: 'Copilot for Jupyter', desc: 'Inline completions and chat inside Jupyter notebooks', level: 'intermediate', category: 'IDE' },
  // CLI Features
  {
    icon: '⚡', name: 'Copilot CLI', desc: 'New npm-based agentic terminal CLI (replaces gh copilot)',
    level: 'beginner', category: 'CLI',
    example: '$ npm install -g @github/copilot\n$ copilot\n> Welcome to GitHub Copilot CLI\n> Type a task in plain English:\n\nfind all TypeScript files modified in the last week\n> find . -name "*.ts" -mtime -7\nRun this? (y/n) y\n./src/api/users.ts\n./src/utils/format.ts',
  },
  { icon: '⚡', name: 'Normal Mode', desc: 'Interactive chat-style agent in the terminal', level: 'beginner', category: 'CLI' },
  {
    icon: '⚡', name: 'Autopilot Mode', desc: 'Autonomous execution — agent acts without step-by-step approval',
    level: 'intermediate', category: 'CLI',
    example: '$ copilot\n> Shift+Tab → switched to Autopilot\n⚡ Autopilot: deploy the staging build\n\n  ✓ Running: npm run build\n  ✓ Running: docker build -t app:staging .\n  ✓ Running: docker push registry/app:staging\n  ✓ Running: kubectl set image deploy/app app=registry/app:staging\n\nDone. Staging updated in 2m 14s.',
  },
  { icon: '☁', name: 'Cloud Agent (&)', desc: 'Offload long-running tasks to a cloud-based agent with & prefix', level: 'advanced', category: 'CLI' },
  { icon: '🔄', name: '/resume Command', desc: 'Resume a previous CLI session by ID', level: 'intermediate', category: 'CLI' },
  { icon: '🧠', name: '/model Command', desc: 'Switch AI model within an active CLI session', level: 'intermediate', category: 'CLI' },
  { icon: '🔒', name: 'CLI Security Model', desc: 'Only reads files in current directory; shows changes before applying', level: 'intermediate', category: 'CLI' },
  // GitHub.com Features
  { icon: '📝', name: 'PR Summaries', desc: 'Auto-generated pull request descriptions from diff analysis', level: 'beginner', category: 'GitHub.com' },
  { icon: '🔍', name: 'Copilot Code Review', desc: 'AI-powered review comments on pull request diffs', level: 'intermediate', category: 'GitHub.com' },
  { icon: '🔎', name: 'Copilot Code Search', desc: 'Natural language search across repositories on github.com', level: 'intermediate', category: 'GitHub.com' },
  { icon: '🏗', name: 'Copilot Workspace', desc: 'Plan and implement entire features from an issue description', level: 'advanced', category: 'GitHub.com' },
  { icon: '📱', name: 'Mobile Copilot', desc: 'Copilot Chat in the GitHub mobile app for on-the-go assistance', level: 'beginner', category: 'GitHub.com' },
  { icon: '💬', name: 'Issue Comments', desc: 'Use Copilot directly in GitHub issue and PR comments', level: 'intermediate', category: 'GitHub.com' },
  // Extensions
  {
    icon: '🐳', name: '@docker Extension', desc: 'Docker container management and Dockerfile generation via Copilot',
    level: 'advanced', category: 'Extensions',
    example: '// In Copilot Chat:\n@docker create a multi-stage Dockerfile for my React app\n\n// @docker responds:\nFROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM nginx:alpine\nCOPY --from=builder /app/dist /usr/share/nginx/html',
  },
  { icon: '🔴', name: '@sentry Extension', desc: 'Analyze Sentry errors and get fix suggestions in Copilot Chat', level: 'advanced', category: 'Extensions' },
  { icon: '📊', name: '@datadog Extension', desc: 'Query Datadog metrics and logs from within Copilot Chat', level: 'advanced', category: 'Extensions' },
  { icon: '🗄', name: '@mongodb Extension', desc: 'Write and explain MongoDB queries with Copilot assistance', level: 'advanced', category: 'Extensions' },
  {
    icon: '🔧', name: 'MCP Integration', desc: 'Connect any MCP server as a tool source for Copilot agents',
    level: 'advanced', category: 'Extensions',
    example: '// .vscode/settings.json:\n{\n  "mcp": {\n    "servers": {\n      "github": {\n        "command": "npx",\n        "args": ["-y", "@modelcontextprotocol/server-github"],\n        "env": { "GITHUB_TOKEN": "${env:GITHUB_TOKEN}" }\n      },\n      "filesystem": {\n        "command": "npx",\n        "args": ["-y", "@modelcontextprotocol/server-filesystem", "."]\n      }\n    }\n  }\n}',
  },
  { icon: '🏪', name: 'Extension Marketplace', desc: 'Install third-party Copilot extensions from GitHub Marketplace', level: 'intermediate', category: 'Extensions' },
  { icon: '🛠', name: 'Custom Extensions', desc: 'Build your own Copilot Extension with the GitHub Apps framework', level: 'advanced', category: 'Extensions' },
  // Enterprise
  { icon: '🏢', name: 'Org Policies', desc: 'Enable/disable Copilot features at the organization level', level: 'advanced', category: 'Enterprise' },
  {
    icon: '📋', name: 'Content Exclusions', desc: 'Prevent Copilot from indexing sensitive files or directories',
    level: 'advanced', category: 'Enterprise',
    example: '// GitHub Org Settings → Copilot → Content exclusions:\n// Add these patterns:\n//   **/.env*          (env files)\n//   **/secrets/**     (secrets directory)\n//   **/credentials/** (credential files)\n//   **/*.pem          (certificates)\n\n// Result: Copilot will not complete or index\n// any files matching these patterns.',
  },
  { icon: '📊', name: 'Audit Logs', desc: 'Track Copilot usage across your organization for compliance', level: 'advanced', category: 'Enterprise' },
  { icon: '🔐', name: 'SSO Integration', desc: 'Enforce SAML SSO for all Copilot users in your org', level: 'advanced', category: 'Enterprise' },
  { icon: '⚖', name: 'IP Indemnity', desc: 'Legal protection against IP claims for Copilot suggestions (Business+)', level: 'advanced', category: 'Enterprise' },
  { icon: '📚', name: 'Org Knowledge Bases', desc: 'Index internal docs and wikis for Enterprise Copilot context', level: 'advanced', category: 'Enterprise' },
  { icon: '📈', name: 'Usage Analytics', desc: 'Dashboard showing Copilot adoption and usage stats per team', level: 'advanced', category: 'Enterprise' },
  { icon: '🚫', name: 'Public Code Filter', desc: 'Block suggestions matching public code to reduce IP risk', level: 'advanced', category: 'Enterprise' },
  // Custom Instructions
  {
    icon: '📄', name: 'copilot-instructions.md', desc: 'Repo-level markdown file that customizes all Copilot behavior',
    level: 'intermediate', category: 'IDE',
    example: '# .github/copilot-instructions.md\n\n## Code Style\n- Use async/await, not .then() chains\n- Prefer named exports over default exports\n- Always add TypeScript return types\n\n## Testing\n- Use Vitest for all unit tests\n- Test file names must match: *.test.ts\n\n## Git\n- Use conventional commits (feat:, fix:, docs:)',
  },
  {
    icon: '🤖', name: 'AGENTS.md', desc: 'Agent-specific instructions file read by autonomous coding agents',
    level: 'intermediate', category: 'IDE',
    example: '# AGENTS.md\n\n## Before starting any task:\n- Read the existing test suite\n- Check open issues for context\n\n## Constraints:\n- Never delete files without confirmation\n- Always run `npm test` after changes\n- Use pnpm, never npm or yarn\n\n## Commit format:\nfeat(scope): description\nfix(scope): description',
  },
  { icon: '⚙', name: 'User Instructions', desc: 'VS Code setting for personal cross-project Copilot instructions', level: 'intermediate', category: 'IDE' },
  { icon: '🌐', name: 'Language Instructions', desc: 'Language-specific instructions applied only for matching file types', level: 'advanced', category: 'IDE' },
]

export default features
