import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Copy, Check } from 'lucide-react'

type TabId = 'overview' | 'instructions' | 'settings' | 'prompting' | 'cli' | 'agent' | 'edits'

function CopyBlock({ label, code, lang }: { label?: string; code: string; lang: string }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="jg-code-wrap">
      <div className="jg-code-header">
        <span className="jg-code-lang">{label ?? lang}</span>
        <button className="pb-copy-btn" onClick={handleCopy}>
          {copied ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy</>}
        </button>
      </div>
      <pre className="jg-code-block"><code>{code}</code></pre>
    </div>
  )
}

function TabPanel({ active, children }: { active: boolean; children: React.ReactNode }) {
  if (!active) return null
  return <div className="jg-panel">{children}</div>
}

// ── Tab 2: Custom Instructions ────────────────────────────────────────
const INSTRUCTIONS_CODE = `# GitHub Copilot Instructions — Spring Boot Project

## Stack
- Java 21, Spring Boot 3.x, Maven
- JUnit 5, Mockito, Testcontainers for integration tests
- Lombok for boilerplate reduction
- MapStruct for DTO mapping

## Code Style
- Follow Google Java Style Guide
- Use 2-space indentation
- Prefer constructor injection over @Autowired field injection
- Return Optional<T> instead of null from service methods
- Use var for local variables where the type is obvious

## Naming
- Test methods: methodName_scenario_expectedResult
  e.g. getUserById_userNotFound_throwsEntityNotFoundException
- DTOs end in Dto (UserDto, OrderDto)
- Mappers end in Mapper (UserMapper)

## Architecture Rules
- Controllers are thin — delegate all logic to services
- @Transactional belongs on service methods, not controllers
- Never expose JPA entities directly from REST endpoints — always use DTOs
- Services talk to repositories only, not to other services directly

## Lombok Allowed
- @Getter, @Setter, @Builder, @Data, @RequiredArgsConstructor
- Avoid @SneakyThrows

## Build Commands
- Build: ./mvnw clean package -DskipTests
- Test:  ./mvnw test
- Single test: ./mvnw test -Dtest=UserServiceTest
- Run:   ./mvnw spring-boot:run

## Git Commit Format
<type>(<scope>): <summary>

Types: feat, fix, refactor, test, docs, chore
Example: feat(orders): add POST /api/v1/orders endpoint`

const AGENTS_MD_CODE = `# Agent Instructions — Spring Boot Project

## Before Making Changes
1. Read the relevant service/controller files to understand existing patterns
2. Check if a similar implementation already exists before creating new files
3. Verify the database schema by reading existing entity classes

## Build & Test After Changes
- Always run ./mvnw test after modifying service or repository classes
- For controller changes: ./mvnw test -Dtest="*IT"

## File Creation Rules
- Entities  → src/main/java/com/example/domain/
- DTOs      → src/main/java/com/example/dto/
- Services  → src/main/java/com/example/service/
- Tests mirror source: src/test/java/...

## Do Not
- Modify src/main/resources/application.properties directly
- Add dependencies to pom.xml without explaining why
- Change existing database migration files in src/main/resources/db/migration/`

// ── Tab 3: VS Code Settings ───────────────────────────────────────────
const SETTINGS_CODE = `{
  "github.copilot.enable": {
    "*": true,
    "plaintext": false,
    "markdown": false,
    "properties": false
  },
  "github.copilot.enable.dotenv": false,

  "github.copilot.chat.codeGeneration.useInstructionFiles": true,

  "editor.formatOnSave": true,
  "editor.tabSize": 2,
  "editor.insertSpaces": true,

  "java.format.settings.url": "https://raw.githubusercontent.com/google/styleguide/gh-pages/eclipse-java-google-style.xml",
  "java.format.settings.profile": "GoogleStyle",
  "java.completion.enabled": true,
  "java.debug.settings.enableRunDebugCodeLens": true,
  "java.test.defaultConfig": "junit5",

  "files.associations": {
    "*.java": "java"
  },

  "explorer.fileNesting.enabled": true,
  "explorer.fileNesting.patterns": {
    "pom.xml": ".mvn, mvnw, mvnw.cmd",
    "build.gradle": "gradlew, gradlew.bat, settings.gradle"
  }
}`

// ── Tab 5: CLI ────────────────────────────────────────────────────────
const CLI_INSTALL_CODE = `# npm (requires Node.js 22+) — all platforms
npm install -g @github/copilot

# Homebrew — macOS / Linux
brew install copilot-cli

# WinGet — Windows
winget install GitHub.Copilot

# Install script — macOS / Linux (supports PREFIX and VERSION env vars)
curl -fsSL https://gh.io/copilot-install | bash

# Verify
copilot version

# First launch — authenticate via GitHub OAuth
copilot        # then type /login`

const CLI_JAVA_TASKS_CODE = `# ── Pipe Maven output directly to Copilot ────────────────────────────
./mvnw test 2>&1 | copilot "analyse these test failures and fix the root causes"

# ── Add error handling across a package ──────────────────────────────
# (start copilot session, then type the task at the prompt)
Add try/catch with SLF4J logging to all public methods in
src/main/java/com/example/service/ — log entry at DEBUG, exceptions at ERROR

# ── Generate a production Dockerfile ─────────────────────────────────
Write a multi-stage Dockerfile for this Spring Boot app.
Use eclipse-temurin:21-jre-alpine as runtime. Run as non-root user.

# ── Find unhandled checked exceptions ────────────────────────────────
Find all methods in src/ that declare throws but callers don't handle them

# ── Non-interactive: single prompt, no session ────────────────────────
copilot -p "Write a commit message for staged changes" -s \
  --allow-tool='shell(git:*)'

copilot -p "Review src/main/java/com/example/service/UserService.java \
  for missing error handling" -s

# ── Autopilot: fully autonomous, no approval prompts ─────────────────
copilot --autopilot --yolo --max-autopilot-continues 10 \
  -p "Add @RequiredArgsConstructor and remove explicit constructors in all service classes"`

const CLI_DELEGATE_CODE = `# /delegate (& prefix) — offload to GitHub cloud agent
# Use INSIDE a copilot session — type at the prompt:

& Write integration tests for all endpoints in OrderController using Testcontainers PostgreSQL

# Equivalent slash command form:
/delegate Write integration tests for all endpoints in OrderController

# What happens:
# 1. Copilot commits your unstaged changes as a checkpoint
# 2. Creates a draft PR on a new branch
# 3. Cloud agent works asynchronously — safe to close the CLI session
# 4. When done, agent requests your review on the PR

# Note: /delegate requires GitHub authentication and does NOT work
# with custom (BYOK) model providers.`

const CLI_TOOLS_CODE = `# ── Tool permission flags ────────────────────────────────────────────
# Grant Maven and git access, block accidental pushes
copilot --allow-tool='shell(./mvnw:*)' \
        --allow-tool='shell(git:*)' \
        --deny-tool='shell(git push)'

# Allow file writes + Maven + npm test runner
copilot --allow-tool='write' \
        --allow-tool='shell(./mvnw:*)' \
        --allow-tool='shell(npm run test:*)'

# Block all file writes (read-only exploration session)
copilot --deny-tool='write'

# Grant all permissions (use with care — best for isolated environments)
copilot --allow-all

# ── Two permission layers (important distinction) ─────────────────────
# --available-tools  controls what the AI *knows exists* (availability)
# --allow-tool       controls what the AI can *actually execute* (permission)
# deny always beats allow; a tool not in --available-tools cannot run
# even if --allow-tool is set

# ── Mid-session permission commands ──────────────────────────────────
# /allow-all          grant all permissions for this session
# /yolo               alias for /allow-all
# /reset-allowed-tools  revoke session permissions granted so far`

const CLI_PLAN_MODE_CODE = `# ── Plan mode (Shift+Tab to toggle) ─────────────────────────────────
# Copilot writes plan.md before touching any file.
# Review and edit the plan, then approve to execute.

# Start directly in plan mode:
copilot --plan

# Inside a session: press Shift+Tab until "plan" shows in the status bar
# Ctrl+Y — open plan.md in your default editor to modify it before approval

# ── Recommended workflow for risky refactors ──────────────────────────
# 1. Shift+Tab → enter plan mode
# 2. Describe the change (e.g. "Migrate all services to constructor injection")
# 3. Copilot writes plan.md — review each step
# 4. Ctrl+Y to edit the plan if needed
# 5. Approve → Copilot executes step by step

# ── /fleet — parallel subtask execution ──────────────────────────────
# For large refactors, /fleet distributes work across multiple subagents.
# Example workflow:
# 1. Enter plan mode, describe the feature
# 2. Finalize the plan with Copilot
# 3. Type: /fleet implement the plan
# 4. Monitor subtasks: press Enter to inspect, k to stop one, Esc to exit list`

const CLI_SESSION_CODE = `# ── Session management ───────────────────────────────────────────────
/help                  # list all slash commands
/context               # visual token-usage overview of current context
/clear                 # clear conversation history (keep working files)
/new                   # start a fresh session
/session               # display current session ID
/resume <session-id>   # switch to a specific previous session
/compact               # manually compress history to free context space

# Resume most recent session (two equivalent forms):
copilot --continue     # resume and auto-enable remote control
copilot --resume       # open picker to choose from recent sessions

# Name a session for easy retrieval:
copilot -n "spring-auth-refactor"

# ── Model selection ───────────────────────────────────────────────────
/model auto             # Copilot chooses best model (default — reduced latency)
/model claude-opus-4-5  # Claude Opus 4.5 — complex architecture, hard debugging
/model claude-sonnet-4-5 # Claude Sonnet 4.5 — routine daily coding, fast
/model gpt-5.2-codex    # GPT-5.2 Codex — code generation and review

# ── Rollback / undo ───────────────────────────────────────────────────
/undo                  # open checkpoint picker (alias: /rewind)
# Or: press Esc twice with empty input — same checkpoint picker
# Copilot keeps up to 10 snapshots per session.
# WARNING: rollback is IRREVERSIBLE — all history after the chosen
# checkpoint is permanently deleted. Requires at least one git commit.

# Verify state after rollback:
! git status
! git log --oneline -3`

const CLI_PR_CODE = `# ── Pull request workflows (inside a copilot session) ───────────────

# View current branch PR status
/pr

# Create PR (respects your repo's PR template)
/pr create

# Create PR with a custom title prefix
/pr create prefix the PR title "JIRA-42: "

# Fix failing CI — Copilot reads CI logs, identifies root cause, applies fix
/pr fix ci

# Process review comments — Copilot applies actionable feedback from reviewers
/pr fix feedback

# Resolve merge conflicts with the base branch
/pr fix conflicts

# Run all three fix phases sequentially
/pr fix all

# Full autopilot: create PR then iterate fixes until all checks pass
/pr auto

# Open PR in browser
/pr view web

# ── Code review (before committing) ──────────────────────────────────
# Scope to a specific package:
/review src/main/java/com/example/service/

# Review all staged changes vs main:
/review

# Or non-interactively:
copilot -p "/review changes vs main" -s --allow-tool='shell(git:*)'`

// ── Tab 6: Agent Mode ─────────────────────────────────────────────────
const AGENT_PROMPT_1 = `Add a complete JWT authentication system to this Spring Boot app:

1. Create a User entity with fields: id, email, passwordHash, roles (Set<String>), createdAt
2. Create UserRepository extending JpaRepository
3. Add Spring Security config with a JWT filter (parse Bearer token, set SecurityContext)
4. Implement /api/auth/register (hash password with BCrypt, save user, return JWT)
5. Implement /api/auth/login (verify password, return JWT)
6. Write unit tests for AuthService (mock UserRepository)
7. Write an integration test for /api/auth/login using Testcontainers PostgreSQL

Follow the patterns already used in this project.
Run ./mvnw test at the end to confirm everything passes.`

const AGENT_PROMPT_2 = `Refactor UserService to improve quality:

1. Replace all methods that return null with Optional<T>
2. Add @Transactional(readOnly = true) to all read-only methods
3. Extract input validation logic into a new UserValidator class
4. Update all callers of changed method signatures
5. Run ./mvnw test to verify no regressions

Do not change the REST API contract — only internal implementation.`

const AGENT_TIPS_CODE = `# When to use each mode

Agent Mode (VS Code)
  Best for: multi-step tasks touching 5+ files, requiring terminal commands
  Example:  "Add authentication", "Set up CI pipeline", "Scaffold CRUD module"

Copilot CLI — Normal mode (interactive session)
  Best for: guided tasks with back-and-forth, piping command output, exploration
  Example:  ./mvnw test 2>&1 | copilot "fix these failures"

Copilot CLI — Autopilot mode (Shift+Tab → autopilot / --autopilot flag)
  Best for: autonomous batch tasks, no approval needed at each step
  Example:  Add @RequiredArgsConstructor to 30 service classes

Copilot CLI — /delegate (cloud agent, & prefix)
  Best for: long tasks you want to offload completely while you work on something else
  Example:  & Write integration tests for all 12 controllers using Testcontainers

Copilot Chat (IDE)
  Best for: questions, single-file fixes, /explain, /fix, /tests on a selection
  Example:  "/explain #selection — why is @EntityGraph needed here?"

Copilot Edits (IDE)
  Best for: coordinated multi-file changes with a known, bounded working set
  Example:  "Rename UserDto to UserResponse in these 4 files"`

// ── Tab 7: Copilot Edits ──────────────────────────────────────────────
const EDITS_PROMPT_1 = `Add SLF4J logging to all public methods in the service layer.

Working set: Add all *Service.java files from src/main/java/com/example/service/
Also add: pom.xml

Prompt:
"Add SLF4J logging to every public method in the service classes:
- Log method entry at DEBUG level, including parameter values
- Log method exit at DEBUG level with return value summary
- Log all caught exceptions at ERROR level with stack trace
- Add the slf4j-api dependency to pom.xml if it is not already present"

Review tip: Accept changes file-by-file. Review pom.xml last.`

const EDITS_PROMPT_2 = `Migrate from @Autowired field injection to constructor injection.

Working set: Search for files containing "@Autowired" and add them all.
Keep the working set under 15 files — split by package if larger.

Prompt:
"Replace all @Autowired field injection with constructor injection.
Where the class has only injected fields, add @RequiredArgsConstructor
from Lombok and remove the explicit constructor if present.
Do not change any @Autowired on methods or constructors."

Safety: Run ./mvnw test after accepting to catch any missed injection points.`

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

  return (
    <div className="page">
      <div className="section-label">{t('javaGuide.badge')}</div>
      <h1>{t('javaGuide.title')}</h1>
      <p className="page-desc">{t('javaGuide.description')}</p>

      <div className="jg-tabs">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            className={`jg-tab${tab === id ? ' active' : ''}`}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Overview ─────────────────────────────────────────────── */}
      <TabPanel active={tab === 'overview'}>
        <h2 className="jg-section-title">Why setup matters</h2>
        <p className="jg-section-desc">
          Out of the box, GitHub Copilot knows nothing about your project's conventions,
          architecture, or constraints. A few configuration files change that — they inject
          context into every interaction so Copilot produces suggestions that fit your codebase
          rather than generic Java code.
        </p>

        <h2 className="jg-section-title">How the pieces connect</h2>
        <p className="jg-section-desc">
          <strong>copilot-instructions.md</strong> sets standing rules (stack, style, architecture) —
          auto-loaded into every Chat session, Agent Mode run, and CLI session.{' '}
          <strong>settings.json</strong> controls which file types get completions and enables instruction files.{' '}
          <strong>AGENTS.md</strong> tells Agent Mode how to explore and verify before touching files.{' '}
          Together they turn vague suggestions into targeted, project-aware output.
        </p>

        <pre className="jg-tree">{`your-java-project/
├── .github/
│   ├── copilot-instructions.md          ← repo-level rules (Chat, CLI, Agent, Edits)
│   └── instructions/
│       └── tests.instructions.md        ← path-specific rules (e.g. for *Test.java only)
├── .vscode/
│   └── settings.json                    ← Copilot config + Java IDE settings
├── AGENTS.md                            ← instructions read by autonomous agents
└── pom.xml / build.gradle`}</pre>

        <h2 className="jg-section-title">Custom instructions load order</h2>
        <table className="jg-table">
          <thead>
            <tr><th>File</th><th>Scope</th></tr>
          </thead>
          <tbody>
            <tr><td><code>~/.copilot/copilot-instructions.md</code></td><td>Global (all your projects)</td></tr>
            <tr><td><code>.github/copilot-instructions.md</code></td><td>Repository-wide</td></tr>
            <tr><td><code>.github/instructions/*.instructions.md</code></td><td>Path-specific (YAML frontmatter with <code>applyTo</code> glob)</td></tr>
            <tr><td><code>AGENTS.md</code> at repo root</td><td>Primary — stronger effect on autonomous agents</td></tr>
          </tbody>
        </table>
        <p className="jg-section-desc" style={{ marginTop: 0 }}>
          Repository instructions override global. All matching files are applied together.
        </p>

        <div className="jg-tip">
          <strong>Start here:</strong> Create <code>.github/copilot-instructions.md</code> first.
          It is the highest-leverage file — a single commit improves completions, Chat, Edits,
          and the CLI simultaneously. No restart required; changes load immediately.
        </div>
      </TabPanel>

      {/* ── Custom Instructions ───────────────────────────────────── */}
      <TabPanel active={tab === 'instructions'}>
        <h2 className="jg-section-title">.github/copilot-instructions.md</h2>
        <p className="jg-section-desc">
          Automatically injected into every Copilot Chat session, CLI session, and Agent Mode run.
          Customize it with your actual stack, team conventions, and architecture rules.
          VS Code must have <code>"github.copilot.chat.codeGeneration.useInstructionFiles": true</code> in settings.json.
        </p>
        <CopyBlock lang="markdown" label=".github/copilot-instructions.md" code={INSTRUCTIONS_CODE} />

        <h2 className="jg-section-title">Path-specific instructions</h2>
        <p className="jg-section-desc">
          Create files in <code>.github/instructions/</code> with a YAML frontmatter <code>applyTo</code> glob
          to target specific file types. The <code>excludeAgent</code> field prevents specific agents from seeing them.
        </p>
        <CopyBlock lang="markdown" label=".github/instructions/tests.instructions.md" code={`---
applyTo: "**/*Test.java,**/*IT.java"
excludeAgent: "code-review"
---

# Test Conventions
- Use JUnit 5 — @Test, @BeforeEach, @AfterEach
- Name tests: methodName_scenario_expectedResult
- Use Mockito for unit test mocks
- Use Testcontainers for integration tests that need a real database
- Assert with AssertJ — assertThat(result).isEqualTo(expected)
- Never use Thread.sleep() in tests — use Awaitility for async assertions`} />

        <h2 className="jg-section-title">AGENTS.md</h2>
        <p className="jg-section-desc">
          Placed at the repo root, this file has stronger weight on autonomous agents than
          copilot-instructions.md. Use it for operational constraints: where files go, what
          to verify after changes, what never to touch.
        </p>
        <CopyBlock lang="markdown" label="AGENTS.md" code={AGENTS_MD_CODE} />
      </TabPanel>

      {/* ── VS Code Settings ──────────────────────────────────────── */}
      <TabPanel active={tab === 'settings'}>
        <h2 className="jg-section-title">.vscode/settings.json</h2>
        <p className="jg-section-desc">
          Commit this file to your repository so every team member gets the same Copilot
          and Java IDE configuration without manual setup.
        </p>
        <CopyBlock lang="json" label=".vscode/settings.json" code={SETTINGS_CODE} />

        <div className="jg-warn">
          <strong>Security:</strong> <code>"github.copilot.enable.dotenv": false</code> prevents
          Copilot from reading <code>.env</code> files — keep it disabled to avoid leaking
          credentials into suggestions.
        </div>

        <h2 className="jg-section-title">Key settings explained</h2>
        <table className="jg-table">
          <thead>
            <tr><th>Setting</th><th>What it does</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>useInstructionFiles</code></td>
              <td>Enables .github/copilot-instructions.md, AGENTS.md, and path-specific instruction files</td>
            </tr>
            <tr>
              <td><code>github.copilot.enable["*"]</code></td>
              <td>Enable completions globally; override per language key below</td>
            </tr>
            <tr>
              <td><code>java.format.settings.url</code></td>
              <td>Enforces Google Java Style via Eclipse formatter config (formatOnSave applies it)</td>
            </tr>
            <tr>
              <td><code>java.test.defaultConfig</code></td>
              <td>Tells the Java Test Runner to use JUnit 5 by default</td>
            </tr>
            <tr>
              <td><code>explorer.fileNesting.patterns</code></td>
              <td>Nests mvnw / gradlew under the build file to reduce sidebar noise</td>
            </tr>
          </tbody>
        </table>
      </TabPanel>

      {/* ── Prompting ─────────────────────────────────────────────── */}
      <TabPanel active={tab === 'prompting'}>
        <h2 className="jg-section-title">Prompting patterns for Java</h2>
        <p className="jg-section-desc">
          The difference between a vague prompt and an effective one is specificity: name the
          class, endpoint, constraint, and expected behaviour. Give Copilot the same context
          you would give a junior developer joining your team.
        </p>

        <table className="jg-table">
          <thead>
            <tr><th>Task</th><th>Poor prompt</th><th>Effective prompt</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>REST endpoint</td>
              <td>"add endpoint"</td>
              <td>"@workspace Add a POST /api/v1/orders endpoint to OrderController. Validate with @Valid. Return 201 Created with the saved OrderDto."</td>
            </tr>
            <tr>
              <td>Write tests</td>
              <td>"write tests"</td>
              <td>"Select getUserById → /tests. Add edge cases: user not found (expect EntityNotFoundException), null id (expect IllegalArgumentException)."</td>
            </tr>
            <tr>
              <td>Fix bug</td>
              <td>"fix this"</td>
              <td>"/fix — NullPointerException at UserService:42. The user's roles list is lazily loaded but accessed outside a transaction."</td>
            </tr>
            <tr>
              <td>Refactor</td>
              <td>"improve code"</td>
              <td>"Refactor this method to use Stream API. Keep the same return type. Prefer Java 21 features where they improve readability."</td>
            </tr>
            <tr>
              <td>Explain</td>
              <td>"explain"</td>
              <td>"/explain #selection — focus on why the @EntityGraph annotation is needed here and what N+1 problem it prevents."</td>
            </tr>
            <tr>
              <td>Add logging</td>
              <td>"add logs"</td>
              <td>"Add SLF4J logging to all public methods in UserService: DEBUG on entry with params, ERROR on exception with stack trace."</td>
            </tr>
            <tr>
              <td>Generate mock</td>
              <td>"mock this"</td>
              <td>"@workspace Generate a Mockito mock for PaymentGateway. Stub chargeCard() to return PaymentResult.success() for amounts under 1000, throw PaymentException for amounts above."</td>
            </tr>
          </tbody>
        </table>

        <div className="jg-tip">
          <strong>Pattern:</strong> Every effective prompt has three parts —
          <em> what</em> (the task), <em>where</em> (class / method / endpoint),
          and <em>constraints</em> (exceptions to throw, format to return, patterns to follow).
          If the task spans multiple files, add <code>@workspace</code>.
        </div>
      </TabPanel>

      {/* ── CLI ───────────────────────────────────────────────────── */}
      <TabPanel active={tab === 'cli'}>
        <h2 className="jg-section-title">Installation</h2>
        <p className="jg-section-desc">
          The Copilot CLI is a standalone npm package (<code>@github/copilot</code>) — separate
          from the VS Code extension. It requires Node.js 22+ for the npm install path.
          On first launch, type <code>/login</code> to authenticate via GitHub OAuth.
        </p>
        <CopyBlock lang="bash" label="Install Copilot CLI" code={CLI_INSTALL_CODE} />

        <div className="jg-warn">
          <strong>Authentication:</strong> Only <strong>fine-grained PATs</strong> work for
          programmatic/CI use — classic PATs (<code>ghp_</code> prefix) are silently rejected.
          Set <code>COPILOT_GITHUB_TOKEN</code> in your environment or CI secrets.
          For interactive use, <code>/login</code> (OAuth device flow) is recommended.
        </div>

        <h2 className="jg-section-title">Java-specific tasks</h2>
        <p className="jg-section-desc">
          Inside an interactive Copilot session, type tasks at the prompt. Pipe command output
          directly — Maven test results, compilation errors, or grep output. Use <code>-p</code>
          for non-interactive single-shot execution.
        </p>
        <CopyBlock lang="bash" label="Java CLI tasks" code={CLI_JAVA_TASKS_CODE} />

        <h2 className="jg-section-title">Tool permissions</h2>
        <p className="jg-section-desc">
          Copilot uses a two-layer permission model: <strong>availability</strong> (what the AI
          knows exists) and <strong>permission</strong> (what it can execute). Deny always beats
          allow. Grant only the tools your task needs.
        </p>
        <CopyBlock lang="bash" label="Tool permission flags" code={CLI_TOOLS_CODE} />

        <h2 className="jg-section-title">Delegating to cloud agent (/delegate)</h2>
        <p className="jg-section-desc">
          The <code>&amp;</code> prefix (alias for <code>/delegate</code>) offloads a task to
          GitHub's cloud agent. It commits your current state as a checkpoint, creates a draft PR,
          and works asynchronously — you can close the CLI session entirely.
        </p>
        <CopyBlock lang="bash" label="/delegate — cloud agent" code={CLI_DELEGATE_CODE} />

        <h2 className="jg-section-title">Plan mode, autopilot &amp; /fleet</h2>
        <CopyBlock lang="bash" label="Plan mode & parallel execution" code={CLI_PLAN_MODE_CODE} />

        <div className="jg-tip">
          <strong>Ctrl+Y</strong> opens <code>plan.md</code> in your default editor so you can
          edit the plan before Copilot executes it. This is the safest way to handle large
          refactors — review every step before any file is touched.
        </div>

        <h2 className="jg-section-title">Session management, models &amp; rollback</h2>
        <CopyBlock lang="bash" label="Session commands" code={CLI_SESSION_CODE} />

        <h2 className="jg-section-title">Pull request &amp; code review workflows</h2>
        <p className="jg-section-desc">
          The <code>/pr</code> and <code>/review</code> commands turn the CLI into a full PR
          lifecycle tool — create PRs, fix CI failures, process review feedback, and run
          pre-commit reviews, all without leaving the terminal.
        </p>
        <CopyBlock lang="bash" label="/pr and /review commands" code={CLI_PR_CODE} />

        <h2 className="jg-section-title">Keyboard shortcuts reference</h2>
        <table className="jg-table">
          <thead>
            <tr><th>Shortcut</th><th>Action</th></tr>
          </thead>
          <tbody>
            <tr><td><code>Shift+Tab</code></td><td>Toggle between Normal / Plan / Autopilot modes</td></tr>
            <tr><td><code>Ctrl+Y</code></td><td>Open plan.md in your editor before execution</td></tr>
            <tr><td><code>Ctrl+T</code></td><td>Toggle model reasoning visibility (persists across sessions)</td></tr>
            <tr><td><code>Ctrl+V</code></td><td>Paste image from clipboard as context</td></tr>
            <tr><td><code>Esc Esc</code></td><td>Open rollback checkpoint picker (empty input required)</td></tr>
            <tr><td><code>Ctrl+L</code></td><td>Clear screen</td></tr>
            <tr><td><code>Ctrl+R</code></td><td>Reverse history search</td></tr>
            <tr><td><code>@filename</code></td><td>Include file contents in current prompt</td></tr>
            <tr><td><code>!command</code></td><td>Execute shell command directly (e.g. <code>! git status</code>)</td></tr>
            <tr><td><code>Tab</code></td><td>Complete file paths</td></tr>
            <tr><td><code>Ctrl+C</code> (twice)</td><td>Exit session</td></tr>
          </tbody>
        </table>
      </TabPanel>

      {/* ── Agent Mode ────────────────────────────────────────────── */}
      <TabPanel active={tab === 'agent'}>
        <h2 className="jg-section-title">Agent Mode for Java</h2>
        <p className="jg-section-desc">
          Agent Mode is best for multi-step tasks that span several files and need terminal
          commands to verify correctness. Write prompts as numbered specifications — Copilot
          will plan, implement, and verify each step.
        </p>

        <h2 className="jg-section-title">Example 1 — Add JWT authentication</h2>
        <CopyBlock lang="text" label="Agent Mode prompt" code={AGENT_PROMPT_1} />

        <h2 className="jg-section-title">Example 2 — Refactor service quality</h2>
        <CopyBlock lang="text" label="Agent Mode prompt" code={AGENT_PROMPT_2} />

        <h2 className="jg-section-title">When to use which mode</h2>
        <CopyBlock lang="text" label="Mode selection guide" code={AGENT_TIPS_CODE} />

        <div className="jg-tip">
          <strong>Tip:</strong> Always include a verification step at the end of agent prompts
          (<code>Run ./mvnw test</code>). Without it, Copilot may stop after writing code
          without checking whether it compiles or the tests pass.
        </div>

        <div className="jg-warn">
          <strong>Steering mid-task:</strong> You can send new prompts at any time during active
          agent execution to redirect it — e.g., "stop, the UserValidator should be an interface
          not a class". Copilot processes each message as part of the current task without
          interrupting or discarding progress.
        </div>
      </TabPanel>

      {/* ── Copilot Edits ─────────────────────────────────────────── */}
      <TabPanel active={tab === 'edits'}>
        <h2 className="jg-section-title">Copilot Edits for Java</h2>
        <p className="jg-section-desc">
          Copilot Edits is ideal for coordinated changes across a known set of files — adding
          logging to all services, migrating injection patterns, or updating method signatures
          across a package. Build your working set first, then prompt.
        </p>

        <h2 className="jg-section-title">Example 1 — Add logging across the service layer</h2>
        <CopyBlock lang="text" label="Copilot Edits workflow" code={EDITS_PROMPT_1} />

        <h2 className="jg-section-title">Example 2 — Migrate to constructor injection</h2>
        <CopyBlock lang="text" label="Copilot Edits workflow" code={EDITS_PROMPT_2} />

        <div className="jg-tip">
          <strong>Working set limit:</strong> Keep working sets under 15 files. For larger
          refactors, split by package and run Edits in batches. Changes stream file-by-file —
          accept or reject each hunk independently before moving on. For 30+ files, use the
          CLI with <code>--autopilot</code> or <code>/fleet</code> instead.
        </div>

        <div className="jg-warn">
          <strong>Review pom.xml changes carefully.</strong> Copilot may add or update
          dependency versions. Always check the diff before accepting — dependency changes
          can break the build in non-obvious ways, especially with Spring Boot BOM management.
        </div>
      </TabPanel>
    </div>
  )
}
