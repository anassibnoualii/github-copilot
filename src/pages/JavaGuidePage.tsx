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
- Test: ./mvnw test
- Single test: ./mvnw test -Dtest=UserServiceTest
- Run: ./mvnw spring-boot:run

## Git Commit Format
<type>(<scope>): <summary>

Types: feat, fix, refactor, test, docs, chore
Example: feat(orders): add POST /api/v1/orders endpoint`

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

const AGENTS_MD_CODE = `# Agent Instructions — Spring Boot Project

## Before Making Changes
1. Read the relevant service/controller files to understand existing patterns
2. Check if a similar implementation already exists before creating new files
3. Verify the database schema by reading existing entity classes

## Build & Test After Changes
- Always run ./mvnw test after modifying service or repository classes
- For controller changes, run integration tests: ./mvnw test -Dtest="*IT"

## File Creation Rules
- New entities go in src/main/java/com/example/domain/
- New DTOs go in src/main/java/com/example/dto/
- New services go in src/main/java/com/example/service/
- Tests mirror source: src/test/java/...

## Do Not
- Modify src/main/resources/application.properties directly
- Add dependencies to pom.xml without explaining why
- Change existing database migration files in src/main/resources/db/migration/`

const CLI_CODE = `# Fix failing tests — pipe Maven output to Copilot
./mvnw test 2>&1 | copilot "analyse these test failures and fix the root causes"

# Add error handling to a whole package
copilot "Add try/catch with SLF4J logging to all public methods in \\
  src/main/java/com/example/service/ — log entry at DEBUG, exceptions at ERROR"

# Write a production Dockerfile
copilot "Write a multi-stage Dockerfile for this Spring Boot app. \\
  Use eclipse-temurin:21-jre-alpine as runtime. Run as non-root user."

# Find unhandled checked exceptions
copilot "Find all methods in src/ that declare throws but callers don't handle them"

# Generate Testcontainers integration test (background — runs in cloud)
copilot "& Write integration tests for all endpoints in OrderController \\
  using Testcontainers PostgreSQL. Follow existing test patterns."

# Switch to plan mode before a risky refactor (Shift+Tab to toggle)
# copilot will write plan.md first, then ask for approval

# Explore → Plan → Code workflow
copilot "Explore the UserService and its dependencies, then plan how to \\
  add pagination to getAllUsers(). Show the plan before writing any code."

# Select model for complex tasks
# /model auto      — Copilot picks the best model
# /model opus      — Opus 4.5 for complex multi-step reasoning
# /model sonnet    — Sonnet 4.5 for balanced speed + quality`

const CLI_TIPS_CODE = `# Session management commands
/help              # List available slash commands
/context           # Show what files are in Copilot's current context
/clear             # Clear conversation history (keep context)
/new               # Start a fresh session
/resume <id>       # Resume a previous session by ID

# Model selection
/model auto        # Let Copilot choose (default)
/model opus        # Claude Opus 4.5 — best for complex reasoning
/model sonnet      # Claude Sonnet 4.5 — fast, balanced

# Delegate long tasks to cloud agent
copilot "& Refactor all service classes to use constructor injection \\
  instead of @Autowired. Run ./mvnw test after each file."

# Plan mode — toggle with Shift+Tab
# Copilot writes plan.md and waits for your approval before executing`

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

const AGENT_TIPS_CODE = `# When to use Agent Mode vs Chat vs Edits

Agent Mode  — multi-step tasks that touch 5+ files, need terminal commands,
              or require exploring the codebase before making changes.
              Example: "Add authentication", "Set up CI pipeline"

Copilot Chat — questions, explanations, short code snippets, single-file fixes.
              Example: "/explain #selection", "/fix", "@workspace find usages of X"

Copilot Edits — targeted multi-file edits with a known working set.
                Example: "Rename UserDto to UserResponse in these 4 files"`

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

      <TabPanel active={tab === 'overview'}>
        <h2 className="jg-section-title">Why setup matters</h2>
        <p className="jg-section-desc">
          Out of the box, GitHub Copilot knows nothing about your project's conventions,
          architecture, or constraints. A few configuration files change that — they feed
          Copilot the context it needs to produce suggestions that actually fit your codebase
          rather than generic Java code.
        </p>

        <h2 className="jg-section-title">How the pieces connect</h2>
        <p className="jg-section-desc">
          <strong>copilot-instructions.md</strong> sets standing rules (stack, style, architecture).{' '}
          <strong>settings.json</strong> controls which languages get completions and enables instruction files.{' '}
          <strong>AGENTS.md</strong> tells Agent Mode how to explore and build before modifying files.{' '}
          Together they turn vague completions into targeted, project-aware suggestions.
        </p>

        <pre className="jg-tree">{`your-java-project/
├── .github/
│   └── copilot-instructions.md   ← repo-level instructions for all Copilot interactions
├── .vscode/
│   └── settings.json             ← Copilot config + Java IDE settings
├── AGENTS.md                     ← instructions read by Agent Mode before acting
└── pom.xml / build.gradle`}</pre>

        <div className="jg-tip">
          <strong>Start here:</strong> Create <code>.github/copilot-instructions.md</code> first.
          It is the highest-leverage file — it improves completions, Chat, Edits, and Agent Mode simultaneously.
        </div>
      </TabPanel>

      <TabPanel active={tab === 'instructions'}>
        <h2 className="jg-section-title">.github/copilot-instructions.md</h2>
        <p className="jg-section-desc">
          This file is automatically injected into every Copilot Chat session and Agent Mode run.
          Customize it with your actual stack, team conventions, and architecture rules.
        </p>
        <CopyBlock lang="markdown" label=".github/copilot-instructions.md" code={INSTRUCTIONS_CODE} />

        <h2 className="jg-section-title">AGENTS.md</h2>
        <p className="jg-section-desc">
          Placed at the repo root, this file gives Agent Mode additional context: where to put
          new files, what to verify after changes, and what to avoid touching.
        </p>
        <CopyBlock lang="markdown" label="AGENTS.md" code={AGENTS_MD_CODE} />

        <div className="jg-tip">
          <strong>Tip:</strong> VS Code must have{' '}
          <code>"github.copilot.chat.codeGeneration.useInstructionFiles": true</code>{' '}
          in settings.json for these files to take effect.
        </div>
      </TabPanel>

      <TabPanel active={tab === 'settings'}>
        <h2 className="jg-section-title">.vscode/settings.json</h2>
        <p className="jg-section-desc">
          Commit this file to your repository so every team member gets the same Copilot
          and Java IDE configuration without manual setup.
        </p>
        <CopyBlock lang="json" label=".vscode/settings.json" code={SETTINGS_CODE} />

        <div className="jg-warn">
          <strong>Note:</strong> <code>github.copilot.enable.dotenv: false</code> prevents
          Copilot from reading <code>.env</code> files. This is a security best practice —
          keep it disabled to avoid leaking secrets into suggestions.
        </div>

        <h2 className="jg-section-title">Key settings explained</h2>
        <table className="jg-table">
          <thead>
            <tr><th>Setting</th><th>What it does</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>useInstructionFiles</code></td>
              <td>Enables .github/copilot-instructions.md and AGENTS.md</td>
            </tr>
            <tr>
              <td><code>github.copilot.enable["*"]</code></td>
              <td>Enable completions globally (override per language below)</td>
            </tr>
            <tr>
              <td><code>java.format.settings.url</code></td>
              <td>Enforces Google Java Style via Eclipse formatter config</td>
            </tr>
            <tr>
              <td><code>java.test.defaultConfig</code></td>
              <td>Tells the Java Test Runner to use JUnit 5 by default</td>
            </tr>
          </tbody>
        </table>
      </TabPanel>

      <TabPanel active={tab === 'prompting'}>
        <h2 className="jg-section-title">Prompting patterns for Java</h2>
        <p className="jg-section-desc">
          The difference between a vague prompt and an effective one is specificity: name the
          endpoint, the class, the constraint, the expected behaviour. Give Copilot the same
          context you would give a junior developer joining your team.
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
          </tbody>
        </table>

        <div className="jg-tip">
          <strong>Pattern:</strong> Every effective prompt has three parts —
          <em> what</em> (the task), <em>where</em> (specific class/method/endpoint),
          and <em>constraints</em> (exceptions to throw, format to return, patterns to follow).
        </div>
      </TabPanel>

      <TabPanel active={tab === 'cli'}>
        <h2 className="jg-section-title">Copilot CLI for Java</h2>
        <p className="jg-section-desc">
          The Copilot CLI runs as an agentic terminal session. Pipe command output directly
          to Copilot, delegate long tasks to a cloud agent with <code>&amp;</code>, and use
          plan mode (Shift+Tab) before risky operations.
        </p>

        <CopyBlock lang="bash" label="Java-specific CLI tasks" code={CLI_CODE} />

        <h2 className="jg-section-title">Session commands &amp; model selection</h2>
        <CopyBlock lang="bash" label="CLI session management" code={CLI_TIPS_CODE} />

        <div className="jg-tip">
          <strong>Best practice:</strong> Use <strong>plan mode</strong> (Shift+Tab) before
          any refactor that touches more than 5 files. Copilot writes a <code>plan.md</code>{' '}
          file you can review and edit before it executes — this prevents surprises on large
          codebases.
        </div>

        <div className="jg-warn">
          <strong>Security:</strong> The Copilot CLI only reads files in your current working
          directory and shows you every change before applying it. Never run it with elevated
          privileges or outside your project root.
        </div>
      </TabPanel>

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
          without checking if it compiles or the tests pass.
        </div>
      </TabPanel>

      <TabPanel active={tab === 'edits'}>
        <h2 className="jg-section-title">Copilot Edits for Java</h2>
        <p className="jg-section-desc">
          Copilot Edits is ideal for coordinated changes across a known set of files — things
          like adding logging to all services, migrating injection patterns, or updating method
          signatures across a package. Build your working set first, then prompt.
        </p>

        <h2 className="jg-section-title">Example 1 — Add logging across the service layer</h2>
        <CopyBlock lang="text" label="Copilot Edits workflow" code={EDITS_PROMPT_1} />

        <h2 className="jg-section-title">Example 2 — Migrate to constructor injection</h2>
        <CopyBlock lang="text" label="Copilot Edits workflow" code={EDITS_PROMPT_2} />

        <div className="jg-tip">
          <strong>Working set limit:</strong> Keep working sets under 15 files. For larger
          refactors, split by package and run Edits in batches. Copilot Edits streams changes
          file-by-file — you can accept or reject each hunk independently before moving on.
        </div>

        <div className="jg-warn">
          <strong>Review pom.xml changes carefully.</strong> Copilot may add or update
          dependency versions. Always check the diff before accepting — dependency changes
          can break the build in non-obvious ways.
        </div>
      </TabPanel>
    </div>
  )
}
