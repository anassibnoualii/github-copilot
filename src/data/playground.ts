import type { PlaygroundData, TerminalLine } from '@/types'

const l = (text: string): TerminalLine => ({ kind: 'label',   text })
const r = (text: string): TerminalLine => ({ kind: 'result',  text })
const c = (text: string): TerminalLine => ({ kind: 'cmd',     text })
const s = (text: string): TerminalLine => ({ kind: 'success', text })

const playgroundData: PlaygroundData = {
  examples: [
    { task: 'Fix the failing tests in the auth module',              mode: 'normal'    },
    { task: 'Find all files that make API calls to /users endpoint', mode: 'normal'    },
    { task: 'Explain the overall architecture of this project',      mode: 'normal'    },
    { task: 'Add input validation to all form components',           mode: 'autopilot' },
    { task: 'Set up Docker configuration for this Node.js app',      mode: 'autopilot' },
    { task: 'Add unit tests for all service files',                  mode: 'autopilot' },
    { task: 'Refactor database queries to use async/await',          mode: 'normal'    },
    { task: 'Create a REST API route for user profile updates',      mode: 'autopilot' },
    { task: 'Write tests for the UserService class',                 mode: 'normal'    },
    { task: 'Add TypeScript types to this JavaScript file',          mode: 'autopilot' },
    { task: 'Set up GitHub Actions CI workflow',                     mode: 'autopilot' },
    { task: 'Find and fix the memory leak in the event listeners',   mode: 'normal'    },
    { task: 'Generate API documentation from the route handlers',    mode: 'normal'    },
  ],
  responseDb: {
    'Fix the failing tests in the auth module': {
      plan: [
        'Read the test files in the auth module',
        'Run the test suite to see current failures',
        'Identify root causes — missing mocks, wrong assertions, API changes',
        'Apply fixes to the test files',
        'Run tests again to confirm they pass',
      ],
      steps: [
        l('Reading auth test files...'),
        r('  Found: src/auth/__tests__/auth.test.ts'),
        r('  Found: src/auth/__tests__/session.test.ts'),
        l('Analysing failures...'),
        r('  ✗ auth.test.ts:42 — mock for hashPassword is not returning a Promise'),
        r('  ✗ session.test.ts:17 — SESSION_SECRET env var not set in test environment'),
        l('Applying fix to auth.test.ts...'),
        c("  vi.mock('../utils/crypto', () => ({"),
        c("    hashPassword: vi.fn().mockResolvedValue('hashed_pw'),"),
        c('  }))'),
        l('Applying fix to session.test.ts...'),
        c("  beforeAll(() => { process.env.SESSION_SECRET = 'test-value' })"),
        r('  ✓ auth.test.ts — 8 tests passed'),
        r('  ✓ session.test.ts — 5 tests passed'),
      ],
    },

    'Find all files that make API calls to /users endpoint': {
      plan: [
        'Search codebase for fetch/axios calls containing /users',
        'Check for environment-based base URL patterns',
        'List results grouped by file',
      ],
      steps: [
        l('Searching for /users API calls...'),
        r('  src/services/userService.ts:12'),
        c("    await api.get('/users')"),
        r('  src/services/userService.ts:34'),
        c("    await api.post('/users', payload)"),
        r('  src/components/UserList.tsx:28'),
        c('    const res = await fetch(`${baseUrl}/users`)'),
        r('  src/pages/admin/Users.tsx:55'),
        c('    axios.delete(`/users/${userId}`)'),
        l('Summary: 4 call sites in 3 files'),
      ],
    },

    'Explain the overall architecture of this project': {
      plan: [
        'Read package.json and entry points',
        'Scan directory structure',
        'Identify layers: UI, services, data, config',
        'Summarise relationships',
      ],
      steps: [
        l('Reading project structure...'),
        r('  Architecture: React SPA + Express API'),
        r('  Frontend (src/)'),
        c('    pages/     → Route-level page components'),
        c('    components/→ Reusable UI components'),
        c('    services/  → API client functions (axios)'),
        c('    hooks/     → Custom React hooks'),
        c('    store/     → Zustand state management'),
        r('  Backend (server/)'),
        c('    routes/    → Express route handlers'),
        c('    middleware/→ Auth, validation, error handling'),
        c('    models/    → Mongoose schema definitions'),
        c('    services/  → Business logic layer'),
        l('State flows from Zustand store → hooks → components'),
      ],
    },

    'Add input validation to all form components': {
      plan: [
        'Find all form components',
        'Identify unvalidated inputs',
        'Add Zod schemas and react-hook-form validation',
        'Show error messages inline',
      ],
      steps: [
        l('Scanning for form components...'),
        r('  Found 6 form components to update'),
        l('Adding Zod schema to LoginForm...'),
        c('  const loginSchema = z.object({'),
        c("    email: z.string().email('Invalid email address'),"),
        c("    password: z.string().min(8, 'Password must be 8+ characters'),"),
        c('  })'),
        l('Wiring react-hook-form resolver...'),
        l('Updating RegisterForm, ProfileForm, PasswordForm...'),
        r('  ✓ 6 forms updated with Zod validation'),
        r('  ✓ Inline error messages added below each field'),
      ],
    },

    'Set up Docker configuration for this Node.js app': {
      plan: [
        'Detect Node.js version from package.json engines field',
        'Write a multi-stage Dockerfile',
        'Write docker-compose.yml with app + database',
        'Add .dockerignore',
      ],
      steps: [
        l('Detected Node.js 20, using node:20-alpine base'),
        l('Writing Dockerfile...'),
        c('  FROM node:20-alpine AS builder'),
        c('  WORKDIR /app'),
        c('  COPY package*.json ./'),
        c('  RUN npm ci --only=production'),
        c('  COPY . .'),
        c('  RUN npm run build'),
        l('Writing docker-compose.yml...'),
        r('  Services: app (port 3000), mongodb (port 27017)'),
        l('Writing .dockerignore...'),
        r('  ✓ Dockerfile created'),
        r('  ✓ docker-compose.yml created'),
        r('  ✓ .dockerignore created'),
      ],
    },

    'Add unit tests for all service files': {
      plan: [
        'List all files in services/',
        'Generate Vitest test files for each service',
        'Mock external dependencies',
        'Cover happy path and error cases',
      ],
      steps: [
        l('Found 5 service files...'),
        r('  userService.ts, authService.ts, emailService.ts,'),
        r('  paymentService.ts, notificationService.ts'),
        l('Generating userService.test.ts...'),
        c("  describe('UserService', () => {"),
        c('    it(\'should return user by id\', async () => { ... })'),
        c('    it(\'should throw NotFoundError for missing user\', async () => { ... })'),
        c('  })'),
        l('Generating remaining 4 test files...'),
        r('  ✓ 5 test files created (42 test cases)'),
        r('  ✓ External APIs mocked with vi.mock()'),
      ],
    },

    'Refactor database queries to use async/await': {
      plan: [
        'Find callback-style or .then()/.catch() database calls',
        'Convert each to async/await with try/catch',
        'Preserve error handling behaviour',
      ],
      steps: [
        l('Scanning for callback/promise chains...'),
        r('  Found 12 queries to refactor in 4 files'),
        l('Refactoring userModel.ts...'),
        c('  - User.findById(id).then(u => cb(null,u)).catch(cb)'),
        c('  + const user = await User.findById(id)'),
        l('Refactoring orderModel.ts, productModel.ts...'),
        r('  ✓ 12 queries refactored to async/await'),
        r('  ✓ Error handling preserved with try/catch'),
      ],
    },

    'Create a REST API route for user profile updates': {
      plan: [
        'Define the route: PATCH /users/:id',
        'Write request validation middleware',
        'Implement the controller and service method',
        'Add integration test',
      ],
      steps: [
        l('Creating PATCH /users/:id route...'),
        l('Writing validation schema...'),
        c('  const updateProfileSchema = z.object({'),
        c('    name: z.string().min(2).optional(),'),
        c('    bio:  z.string().max(500).optional(),'),
        c('    avatar: z.string().url().optional(),'),
        c('  })'),
        l('Writing controller and service method...'),
        r('  server/routes/users.ts     — route registered'),
        r('  server/controllers/users.ts — updateProfile()'),
        r('  server/services/userService.ts — updateUser()'),
        l('Writing integration test...'),
        r('  ✓ PATCH /users/:id route created and tested'),
      ],
    },

    'Write tests for the UserService class': {
      plan: [
        'Read UserService to understand methods and dependencies',
        'Set up vi.mock() for database and external calls',
        'Write describe blocks for each public method',
        'Cover happy path, edge cases, and error conditions',
      ],
      steps: [
        l('Reading UserService...'),
        r('  Found 4 public methods: getById, create, update, delete'),
        r('  Dependencies: db (postgres), emailService, logger'),
        l('Setting up mocks...'),
        c("  vi.mock('../db', () => ({ query: vi.fn() }))"),
        c("  vi.mock('../emailService', () => ({ send: vi.fn() }))"),
        l('Generating test suite...'),
        r("  describe('UserService')"),
        r("    describe('getById')"),
        r('      ✓ returns user when found'),
        r('      ✓ throws NotFoundError when missing'),
        r("    describe('create')"),
        r('      ✓ creates user and sends welcome email'),
        r('      ✓ throws ValidationError for duplicate email'),
      ],
    },

    'Add TypeScript types to this JavaScript file': {
      plan: [
        'Analyse function signatures and data shapes',
        'Infer types from usage patterns',
        'Add interfaces for complex objects',
        'Migrate .js to .ts with strict mode',
      ],
      steps: [
        l('Analysing JavaScript file...'),
        r('  Found 6 functions, 3 object shapes, 2 callbacks'),
        l('Generating interfaces...'),
        c('  interface User { id: string; name: string; email: string }'),
        c('  interface ApiResponse<T> { data: T; status: number; error?: string }'),
        l('Adding types to functions...'),
        r('  fetchUser(id: string): Promise<User>          ✓'),
        r('  updateUser(id: string, patch: Partial<User>)  ✓'),
        r('  deleteUser(id: string): Promise<void>         ✓'),
        s('✓ 0 TypeScript errors. File renamed to .ts'),
      ],
    },

    'Set up GitHub Actions CI workflow': {
      plan: [
        'Detect the project type and test runner',
        'Write .github/workflows/ci.yml',
        'Add lint, type-check, and test steps',
        'Configure caching for node_modules',
      ],
      steps: [
        l('Detecting project...'),
        r('  Node.js 20 · TypeScript · Vitest · ESLint'),
        l('Writing .github/workflows/ci.yml...'),
        c('  on: [push, pull_request]'),
        c('  jobs:'),
        c('    ci:'),
        c('      steps:'),
        c('        - uses: actions/checkout@v4'),
        c('        - uses: actions/setup-node@v4'),
        c('          with: { node-version: 20, cache: npm }'),
        c('        - run: npm ci'),
        c('        - run: npm run lint'),
        c('        - run: npm run typecheck'),
        c('        - run: npm test'),
        s('✓ CI workflow created'),
      ],
    },

    'Find and fix the memory leak in the event listeners': {
      plan: [
        'Search for addEventListener calls without matching removeEventListener',
        'Check useEffect hooks for missing cleanup',
        'Identify timers not cleared on unmount',
        'Apply fixes with proper cleanup patterns',
      ],
      steps: [
        l('Scanning for event listener leaks...'),
        r('  src/hooks/useSocket.ts:18 — listener added, never removed'),
        r('  src/components/Map.tsx:44 — resize handler not cleaned up'),
        l('Fixing useSocket.ts...'),
        c('  useEffect(() => {'),
        c("    socket.on('message', handler)"),
        c("  + return () => socket.off('message', handler)"),
        c('  }, [])'),
        l('Fixing Map.tsx...'),
        c("  + return () => window.removeEventListener('resize', onResize)"),
        s('✓ 2 memory leaks fixed'),
      ],
    },

    'Generate API documentation from the route handlers': {
      plan: [
        'Read all route handler files',
        'Extract endpoint paths, methods, params, and response shapes',
        'Generate OpenAPI 3.0 spec',
        'Write docs/api.md with usage examples',
      ],
      steps: [
        l('Reading route files...'),
        r('  Found 12 routes across 4 files'),
        l('Extracting endpoint metadata...'),
        r('  GET    /users          → User[]'),
        r('  POST   /users          → User'),
        r('  GET    /users/:id      → User'),
        r('  PATCH  /users/:id      → User'),
        r('  DELETE /users/:id      → 204'),
        l('Writing docs/api.md...'),
        s('✓ API documentation generated (12 endpoints)'),
      ],
    },
  },
}

export default playgroundData
