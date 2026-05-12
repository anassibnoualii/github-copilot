import type { ModuleMeta } from '@/types'

const modulesMeta: ModuleMeta[] = [
  {
    id: '01',
    title: 'Getting Started',
    level: 'beginner',
    duration: '30 min',
    description: 'Install GitHub Copilot, understand how it works, and get your first inline suggestions.',
    outcomes: [
      'Install and authenticate Copilot in VS Code',
      'Accept and cycle through inline suggestions',
      'Understand what context Copilot uses to generate code',
      'Choose the right subscription plan for your needs',
    ],
    tryIt: 'Open any file, type a comment like # Function to parse a JSON config file, and press Tab to see Copilot complete the implementation.',
    tutorial: [
      {
        input: '// Function to validate an email address',
        output: 'function validateEmail(email: string): boolean {\n  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);\n}\n// ✓ Press Tab to accept',
      },
      {
        input: 'Alt+] / Alt+[',
        output: '→ Cycling through 3 alternative suggestions...\n  1. Using regex (current)\n  2. Using a validation library\n  3. Step-by-step validation',
      },
      {
        input: 'Ctrl+Enter',
        output: '→ Opening Copilot panel with 10 parallel suggestions...\n  Select any to accept it in your editor.',
      },
    ],
  },
  {
    id: '02',
    title: 'Copilot Chat',
    level: 'beginner',
    duration: '35 min',
    description: 'Use the Chat panel, inline chat, and workspace participants to get answers about your code.',
    outcomes: [
      'Open and use the Chat panel for code questions',
      'Trigger inline chat with Cmd+I / Ctrl+I',
      'Use @workspace to ask questions about your whole project',
      'Reference files and selections with #file and #selection',
    ],
    tryIt: 'Select a function in your editor, press Cmd+I (Mac) or Ctrl+I (Windows), and ask Copilot to add error handling to it.',
    tutorial: [
      {
        input: 'Ctrl+I → "Add error handling"',
        output: '> Copilot: I\'ll add try/catch with proper error logging to your function.\n\nfunction fetchData(url: string) {\n  try {\n    const res = await fetch(url);\n    return await res.json();\n  } catch (err) {\n    console.error(\'Fetch failed:\', err);\n    throw err;\n  }\n}',
      },
      {
        input: '@workspace how many API routes do we have?',
        output: '> @workspace: I found 8 API routes across your project:\n  - GET  /api/users (src/routes/users.ts)\n  - POST /api/users (src/routes/users.ts)\n  - GET  /api/posts (src/routes/posts.ts)\n  - ... and 5 more',
      },
      {
        input: '#file:utils.ts explain this file',
        output: '> Copilot: utils.ts contains 4 helper functions:\n  1. formatDate() — formats timestamps\n  2. slugify()    — converts strings to URL slugs\n  3. debounce()   — delays function execution\n  4. clamp()      — constrains a number to a range',
      },
    ],
  },
  {
    id: '03',
    title: 'Slash Commands',
    level: 'beginner',
    duration: '35 min',
    description: 'Master /explain, /fix, /tests, /doc and context variables like #file and #selection.',
    outcomes: [
      'Explain complex code with /explain',
      'Auto-fix bugs and errors with /fix',
      'Generate unit tests with /tests',
      'Create documentation with /doc',
    ],
    tryIt: 'Select a complex function, open Copilot Chat, type /explain to understand it, then use /tests to generate unit tests for it.',
    tutorial: [
      {
        input: '/explain #selection',
        output: '> This function implements a binary search algorithm:\n  1. Sets low/high pointers at array boundaries\n  2. Calculates mid-point each iteration\n  3. Narrows search range by comparing target\n  Time complexity: O(log n)',
      },
      {
        input: '/fix — TypeError: cannot read property of undefined',
        output: '> Copilot found the issue on line 42:\n  The object may be null before accessing .data\n\n  Fix: add optional chaining\n  - result.data.items\n  + result?.data?.items ?? []',
      },
      {
        input: '/tests',
        output: '> Generated 4 unit tests:\n  ✓ returns correct result for valid input\n  ✓ handles empty array edge case\n  ✓ throws when input is null\n  ✓ handles duplicate values correctly',
      },
    ],
  },
  {
    id: '04',
    title: 'Copilot CLI',
    level: 'beginner',
    duration: '30 min',
    description: 'Install and use the new agentic Copilot CLI for autonomous terminal tasks.',
    outcomes: [
      'Install the Copilot CLI via the GitHub CLI extension',
      'Use gh copilot suggest to get shell command suggestions',
      'Use gh copilot explain to understand complex commands',
      'Run autonomous terminal tasks with natural language',
    ],
    tryIt: 'Run gh copilot suggest "how do I find all files larger than 100MB and sort them by size" in your terminal.',
    tutorial: [
      {
        input: '$ npm install -g @github/copilot',
        output: 'added 142 packages in 8s\n✓ Copilot CLI installed successfully\n\n$ copilot\n> Welcome to GitHub Copilot CLI\n  Type your task in plain English...',
      },
      {
        input: 'find all files modified in the last 7 days',
        output: '> Suggested command:\n  find . -mtime -7 -type f\n\n  Run this command? (y/n)',
      },
      {
        input: 'Shift+Tab → Autopilot mode',
        output: '⚡ Autopilot mode enabled\n  Agent will execute commands autonomously\n  and show you a summary when done.\n\n  Task: find large files\n  ✓ Searching... found 3 files over 100MB\n  ✓ Sorted by size: [build.zip, node_modules.tar, db.sql]',
      },
    ],
  },
  {
    id: '05',
    title: 'Copilot Edits',
    level: 'intermediate',
    duration: '45 min',
    description: 'Make multi-file edits, review hunks, and use working sets effectively.',
    outcomes: [
      'Create and manage working sets of files',
      'Apply multi-file edits with a single prompt',
      'Review and accept or reject individual change hunks',
      'Understand the streaming diff review workflow',
    ],
    tryIt: 'Open 3 related files in your working set, then ask Copilot Edits to rename a variable or update a pattern across all of them.',
    tutorial: [
      {
        input: 'Add 3 files to working set',
        output: 'Working set:\n  📄 src/api/users.ts\n  📄 src/types/user.ts\n  📄 src/utils/userHelpers.ts\n\nReady. Type your edit request below.',
      },
      {
        input: 'Rename userId to user_id throughout',
        output: '> Applying changes across 3 files...\n\n  users.ts    — 8 occurrences renamed\n  user.ts     — 3 occurrences renamed\n  helpers.ts  — 2 occurrences renamed\n\n  Review hunks: [Accept All] [Review Each]',
      },
      {
        input: 'Review Each → Keep / Discard',
        output: '  Hunk 1/13 in users.ts:\n  - const userId = req.params.userId\n  + const user_id = req.params.user_id\n\n  [Keep] [Discard]',
      },
    ],
  },
  {
    id: '06',
    title: 'Custom Instructions',
    level: 'intermediate',
    duration: '45 min',
    description: 'Configure .github/copilot-instructions.md, AGENTS.md, and user-level settings.',
    outcomes: [
      'Write a .github/copilot-instructions.md for your repo',
      'Configure user-level personal instructions',
      'Set coding style rules that apply to all suggestions',
      'Use per-file instructions for specialized contexts',
    ],
    tryIt: 'Create a .github/copilot-instructions.md that tells Copilot to "always use async/await instead of .then() chains" and verify it changes suggestions.',
    tutorial: [
      {
        input: 'Create .github/copilot-instructions.md',
        output: '# Copilot Instructions\n\n- Always use async/await instead of .then()\n- Prefer TypeScript interfaces over type aliases\n- Use named exports, not default exports\n- Write JSDoc for all public functions\n\n✓ Saved — Copilot reads this on every request',
      },
      {
        input: 'Before: fetch(url).then(r => r.json())',
        output: 'After (Copilot now suggests):\n\nconst response = await fetch(url);\nconst data = await response.json();\n\n✓ async/await applied automatically',
      },
      {
        input: 'Add AGENTS.md for agent mode',
        output: '# AGENTS.md\n\n- Never delete files without confirmation\n- Run tests after each code change\n- Commit with conventional commit format\n- Use pnpm, not npm\n\n✓ Agent reads this before autonomous tasks',
      },
    ],
  },
  {
    id: '07',
    title: 'Agent Mode',
    level: 'intermediate',
    duration: '50 min',
    description: 'Use autonomous agent mode for complex multi-step tasks with tool use and approval.',
    outcomes: [
      'Enable and switch to agent mode in Copilot Chat',
      'Understand tool use: filesystem, terminal, and browser',
      'Use approval workflows for potentially destructive ops',
      'Compose multi-step tasks with a single high-level prompt',
    ],
    tryIt: 'Enable agent mode and ask: "Add JSDoc comments to all exported functions in src/ that currently lack documentation."',
    tutorial: [
      {
        input: 'Enable Agent Mode → Send task',
        output: '🤖 Agent Mode active\n\nTask: "Add JSDoc to all exported functions"\n\n> Tool: search_files("src/**/*.ts")\n  Found 24 TypeScript files\n\n> Tool: read_file("src/api/users.ts")\n  Found 6 exported functions without JSDoc',
      },
      {
        input: 'Tool call approval prompt',
        output: '> Agent wants to run:\n  write_file("src/api/users.ts", ...)\n\n  Preview of changes:\n  + /** Fetches a user by their unique ID */\n  + @param id - The user UUID\n  + @returns Promise<User>\n  export async function getUserById(id: string)\n\n  [Approve] [Skip] [Stop Agent]',
      },
      {
        input: 'Approve → Continue',
        output: '✓ 6 functions documented in users.ts\n✓ 4 functions documented in posts.ts\n✓ 3 functions documented in utils.ts\n\nSummary: Added JSDoc to 13 exported functions\nacross 3 files. No functions skipped.',
      },
    ],
  },
  {
    id: '08',
    title: 'GitHub.com',
    level: 'intermediate',
    duration: '45 min',
    description: 'PR summaries, code review, Copilot Workspace, and Copilot on github.com.',
    outcomes: [
      'Generate PR summaries and descriptions with Copilot',
      'Use Copilot for AI-assisted code review on pull requests',
      'Navigate Copilot Workspace for larger feature changes',
      'Ask Copilot questions directly on github.com',
    ],
    tryIt: 'Open a pull request on GitHub and click the Copilot button to generate a summary. Then ask Copilot to review the diff for potential issues.',
    tutorial: [
      {
        input: 'PR → Copilot → Generate Summary',
        output: '## Summary\nThis PR adds user authentication using JWT tokens.\n\n**Changes:**\n- Added `/auth/login` and `/auth/refresh` endpoints\n- Implemented JWT middleware for protected routes\n- Added user session management\n- Updated tests for auth flows\n\n**Testing:** All 42 tests pass.',
      },
      {
        input: 'Copilot → Review this PR',
        output: '> 🔍 Copilot Review:\n\n  ⚠ Line 47 (auth.ts): JWT secret falls back to\n  a hardcoded value in development. Consider\n  always requiring the env variable.\n\n  ⚠ Line 82 (middleware.ts): Token expiry is not\n  checked for refresh tokens. This could allow\n  expired tokens to generate new access tokens.',
      },
      {
        input: 'github.com → Copilot → Ask a question',
        output: '> @github What are the most discussed issues\n  in this repository this week?\n\n  Top 3 discussions:\n  1. #234 — Performance regression in search\n  2. #241 — Feature: dark mode toggle\n  3. #238 — API rate limiting strategy',
      },
    ],
  },
  {
    id: '09',
    title: 'Extensions & MCP',
    level: 'advanced',
    duration: '60 min',
    description: 'Install Copilot Extensions, connect MCP servers, and build custom extensions.',
    outcomes: [
      'Install and use Copilot Extensions from the marketplace',
      'Connect MCP servers to extend Copilot with external tools',
      'Call extensions using @extension-name in chat',
      'Build a basic custom Copilot Extension',
    ],
    tryIt: 'Install the GitHub MCP server and connect it to Copilot Chat. Ask @github to search for issues in a repository.',
    tutorial: [
      {
        input: '@docker build an image for my Node app',
        output: '> @docker: I\'ll create a Dockerfile for your Node.js app.\n\nFROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY . .\nEXPOSE 3000\nCMD ["node", "src/index.js"]\n\nAlso adding .dockerignore...',
      },
      {
        input: 'Connect MCP server (settings.json)',
        output: '{\n  "mcp": {\n    "servers": {\n      "github": {\n        "command": "npx",\n        "args": ["-y", "@modelcontextprotocol/server-github"],\n        "env": { "GITHUB_TOKEN": "${env:GITHUB_TOKEN}" }\n      }\n    }\n  }\n}\n✓ MCP server connected',
      },
      {
        input: '@github search issues: auth bug label:bug',
        output: '> @github: Found 3 issues matching "auth bug":\n\n  #198 — Login fails with special chars in password\n         Opened 3 days ago · 🔴 bug · 5 comments\n\n  #201 — JWT refresh token not invalidated on logout\n         Opened 1 day ago · 🔴 bug · 2 comments',
      },
    ],
  },
  {
    id: '10',
    title: 'Enterprise Config',
    level: 'advanced',
    duration: '60 min',
    description: 'Org policies, content exclusions, audit logs, SSO, and Business vs Enterprise plans.',
    outcomes: [
      'Configure org-level Copilot policies for your team',
      'Set up content exclusions to protect sensitive files',
      'Monitor usage via audit logs and activity reports',
      'Understand the difference between Business and Enterprise',
    ],
    tryIt: 'In your org settings, add a content exclusion for **/.env* and **/secrets/** and verify Copilot no longer suggests completions in those files.',
    tutorial: [
      {
        input: 'Org Settings → Copilot → Policies',
        output: 'GitHub Copilot Policies:\n\n  [✓] Enable Copilot for all members\n  [✓] Allow suggestions matching public code\n  [✗] Allow Copilot Chat in IDE\n  [✓] Enable Copilot in GitHub.com\n\n  Click any policy to toggle for the whole org.',
      },
      {
        input: 'Add content exclusion: **/.env*',
        output: 'Content Exclusions:\n  **/.env*      ← added\n  **/secrets/**\n  **/credentials/**\n\n✓ Copilot will no longer index or suggest\n  completions inside these files/paths.\n\nEffective for all org members immediately.',
      },
      {
        input: 'View audit log → Copilot events',
        output: 'Audit Log — Last 24 hours:\n\n  09:14  user@org.com  suggestion.accepted\n  09:15  user@org.com  chat.opened\n  10:02  admin@org.com policy.updated\n           github.copilot.enable → false (plaintext)\n  11:30  user2@org.com suggestion.dismissed',
      },
    ],
  },
  {
    id: '11',
    title: 'Prompt Engineering',
    level: 'advanced',
    duration: '60 min',
    description: 'Write highly effective prompts using few-shot examples, chain-of-thought, and constraints.',
    outcomes: [
      'Structure prompts with context, task, and constraints',
      'Use few-shot examples to guide output format and style',
      'Apply chain-of-thought for complex multi-step reasoning',
      'Diagnose and fix common prompting anti-patterns',
    ],
    tryIt: 'Rewrite a vague prompt like "make this better" into a structured prompt that specifies the language, constraints, output format, and includes one example.',
    tutorial: [
      {
        input: 'Bad prompt: "make this function better"',
        output: '> Copilot: Here\'s an improved version:\n  [generic refactor with no direction]\n\n  Result: Unpredictable — Copilot guesses\n  what "better" means. Low quality output.',
      },
      {
        input: 'Good prompt: "Refactor this TypeScript function to use async/await instead of callbacks, add JSDoc, and keep the same public API. Example of target style: [paste example]"',
        output: '> Copilot: Refactored with async/await:\n\n  /**\n   * Fetches user data by ID\n   * @param id - User UUID\n   * @returns Promise resolving to User object\n   */\n  async function getUser(id: string): Promise<User> {\n    const data = await db.query(\'SELECT...\', [id]);\n    return mapToUser(data.rows[0]);\n  }\n\n  ✓ Matches your specified style exactly',
      },
      {
        input: 'Chain-of-thought: "Think step by step: what edge cases exist in this login function?"',
        output: '> Copilot thinking step by step:\n\n  1. Empty username/password → no validation\n  2. SQL injection via unsanitized input\n  3. No rate limiting → brute force risk\n  4. Password stored as plain text\n  5. No CSRF token on form submission\n\n  → 5 critical issues found',
      },
    ],
  },
  {
    id: '12',
    title: 'Copilot for Testing',
    level: 'intermediate',
    duration: '45 min',
    description: 'Generate tests with /tests, work TDD-style, mock dependencies, and fix flaky tests with Copilot.',
    outcomes: [
      'Generate unit tests for any function using /tests',
      'Apply a test-first TDD workflow with Copilot assistance',
      'Generate mocks, stubs, and test data factories',
      'Diagnose and fix flaky tests using Copilot',
    ],
    tryIt: 'Select any async function in your project, run /tests in Copilot Chat, and review the generated test suite. Then try adding one more edge case test by describing it in a comment.',
    tutorial: [
      {
        input: 'Select getUserById function → /tests',
        output: "describe('getUserById', () => {\n  it('returns a user when found', async () => {\n    mockDb.query.mockResolvedValue({ id: '1', name: 'Alice' })\n    const user = await getUserById('1')\n    expect(user.id).toBe('1')\n  })\n\n  it('throws when user not found', async () => {\n    mockDb.query.mockResolvedValue(null)\n    await expect(getUserById('99')).rejects.toThrow('User 99 not found')\n  })\n})",
      },
      {
        input: 'TDD: write test first → Copilot implements',
        output: "// Test written first:\nit('rejects passwords shorter than 8 chars', () => {\n  expect(validatePassword('abc').valid).toBe(false)\n})\n\n// Copilot reads the test and generates:\nfunction validatePassword(password: string): ValidationResult {\n  if (password.length < 8) {\n    return { valid: false, error: 'Must be at least 8 characters' }\n  }\n  return { valid: true }\n}",
      },
      {
        input: '"This test is flaky. Error: [timeout]. Diagnose and fix."',
        output: '> Copilot: The test calls setInterval but never advances\n  fake timers. Fix:\n\n  + vi.useFakeTimers()\n    await triggerPolling()\n  + vi.advanceTimersByTime(5000)\n    expect(callback).toHaveBeenCalled()\n  + vi.useRealTimers()',
      },
    ],
  },
]

export default modulesMeta
