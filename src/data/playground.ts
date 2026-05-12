import type { PlaygroundData } from '@/types'

const playgroundData: PlaygroundData = {
  examples: [
    { task: 'Fix the failing tests in the auth module', mode: 'normal' },
    { task: 'Find all files that make API calls to /users endpoint', mode: 'normal' },
    { task: 'Explain the overall architecture of this project', mode: 'normal' },
    { task: 'Add input validation to all form components', mode: 'autopilot' },
    { task: 'Set up Docker configuration for this Node.js app', mode: 'autopilot' },
    { task: 'Add unit tests for all service files', mode: 'autopilot' },
    { task: 'Refactor database queries to use async/await', mode: 'normal' },
    { task: 'Create a REST API route for user profile updates', mode: 'autopilot' },
    { task: 'Write tests for the UserService class', mode: 'normal' },
    { task: 'Add TypeScript types to this JavaScript file', mode: 'autopilot' },
    { task: 'Set up GitHub Actions CI workflow', mode: 'autopilot' },
    { task: 'Find and fix the memory leak in the event listeners', mode: 'normal' },
    { task: 'Generate API documentation from the route handlers', mode: 'normal' },
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
      steps: `<span class="cli-label">Reading auth test files...</span>
<span class="cli-result">  Found: src/auth/__tests__/auth.test.ts</span>
<span class="cli-result">  Found: src/auth/__tests__/session.test.ts</span>

<span class="cli-label">Analysing failures...</span>
<span class="cli-result">  ✗ auth.test.ts:42 — mock for hashPassword is not returning a Promise</span>
<span class="cli-result">  ✗ session.test.ts:17 — SESSION_SECRET env var not set in test environment</span>

<span class="cli-label">Applying fix to auth.test.ts...</span>
<span class="cli-cmd">  vi.mock('../utils/crypto', () => ({</span>
<span class="cli-cmd">    hashPassword: vi.fn().mockResolvedValue('hashed_pw'),</span>
<span class="cli-cmd">  }))</span>

<span class="cli-label">Applying fix to session.test.ts...</span>
<span class="cli-cmd">  beforeAll(() => { process.env.SESSION_SECRET = 'test-value' })</span>

<span class="cli-result">  ✓ auth.test.ts — 8 tests passed</span>
<span class="cli-result">  ✓ session.test.ts — 5 tests passed</span>`,
    },
    'Find all files that make API calls to /users endpoint': {
      plan: [
        'Search codebase for fetch/axios calls containing /users',
        'Check for environment-based base URL patterns',
        'List results grouped by file',
      ],
      steps: `<span class="cli-label">Searching for /users API calls...</span>

<span class="cli-result">  src/services/userService.ts:12</span>
<span class="cli-cmd">    await api.get('/users')</span>

<span class="cli-result">  src/services/userService.ts:34</span>
<span class="cli-cmd">    await api.post('/users', payload)</span>

<span class="cli-result">  src/components/UserList.tsx:28</span>
<span class="cli-cmd">    const res = await fetch(\`\${baseUrl}/users\`)</span>

<span class="cli-result">  src/pages/admin/Users.tsx:55</span>
<span class="cli-cmd">    axios.delete(\`/users/\${userId}\`)</span>

<span class="cli-label">Summary: 4 call sites in 3 files</span>`,
    },
    'Explain the overall architecture of this project': {
      plan: [
        'Read package.json and entry points',
        'Scan directory structure',
        'Identify layers: UI, services, data, config',
        'Summarise relationships',
      ],
      steps: `<span class="cli-label">Reading project structure...</span>

<span class="cli-result">  Architecture: React SPA + Express API</span>

<span class="cli-result">  Frontend (src/)</span>
<span class="cli-cmd">    pages/     → Route-level page components</span>
<span class="cli-cmd">    components/→ Reusable UI components</span>
<span class="cli-cmd">    services/  → API client functions (axios)</span>
<span class="cli-cmd">    hooks/     → Custom React hooks</span>
<span class="cli-cmd">    store/     → Zustand state management</span>

<span class="cli-result">  Backend (server/)</span>
<span class="cli-cmd">    routes/    → Express route handlers</span>
<span class="cli-cmd">    middleware/→ Auth, validation, error handling</span>
<span class="cli-cmd">    models/    → Mongoose schema definitions</span>
<span class="cli-cmd">    services/  → Business logic layer</span>

<span class="cli-label">State flows from Zustand store → hooks → components</span>`,
    },
    'Add input validation to all form components': {
      plan: [
        'Find all form components',
        'Identify unvalidated inputs',
        'Add Zod schemas and react-hook-form validation',
        'Show error messages inline',
      ],
      steps: `<span class="cli-label">Scanning for form components...</span>
<span class="cli-result">  Found 6 form components to update</span>

<span class="cli-label">Adding Zod schema to LoginForm...</span>
<span class="cli-cmd">  const loginSchema = z.object({</span>
<span class="cli-cmd">    email: z.string().email('Invalid email address'),</span>
<span class="cli-cmd">    password: z.string().min(8, 'Password must be 8+ characters'),</span>
<span class="cli-cmd">  })</span>

<span class="cli-label">Wiring react-hook-form resolver...</span>
<span class="cli-label">Updating RegisterForm, ProfileForm, PasswordForm...</span>
<span class="cli-result">  ✓ 6 forms updated with Zod validation</span>
<span class="cli-result">  ✓ Inline error messages added below each field</span>`,
    },
    'Set up Docker configuration for this Node.js app': {
      plan: [
        'Detect Node.js version from package.json engines field',
        'Write a multi-stage Dockerfile',
        'Write docker-compose.yml with app + database',
        'Add .dockerignore',
      ],
      steps: `<span class="cli-label">Detected Node.js 20, using node:20-alpine base</span>

<span class="cli-label">Writing Dockerfile...</span>
<span class="cli-cmd">  FROM node:20-alpine AS builder</span>
<span class="cli-cmd">  WORKDIR /app</span>
<span class="cli-cmd">  COPY package*.json ./</span>
<span class="cli-cmd">  RUN npm ci --only=production</span>
<span class="cli-cmd">  COPY . .</span>
<span class="cli-cmd">  RUN npm run build</span>

<span class="cli-label">Writing docker-compose.yml...</span>
<span class="cli-result">  Services: app (port 3000), mongodb (port 27017)</span>

<span class="cli-label">Writing .dockerignore...</span>
<span class="cli-result">  ✓ Dockerfile created</span>
<span class="cli-result">  ✓ docker-compose.yml created</span>
<span class="cli-result">  ✓ .dockerignore created</span>`,
    },
    'Add unit tests for all service files': {
      plan: [
        'List all files in services/',
        'Generate Vitest test files for each service',
        'Mock external dependencies',
        'Cover happy path and error cases',
      ],
      steps: `<span class="cli-label">Found 5 service files...</span>
<span class="cli-result">  userService.ts, authService.ts, emailService.ts,</span>
<span class="cli-result">  paymentService.ts, notificationService.ts</span>

<span class="cli-label">Generating userService.test.ts...</span>
<span class="cli-cmd">  describe('UserService', () => {</span>
<span class="cli-cmd">    it('should return user by id', async () => { ... })</span>
<span class="cli-cmd">    it('should throw NotFoundError for missing user', async () => { ... })</span>
<span class="cli-cmd">  })</span>

<span class="cli-label">Generating remaining 4 test files...</span>
<span class="cli-result">  ✓ 5 test files created (42 test cases)</span>
<span class="cli-result">  ✓ External APIs mocked with vi.mock()</span>`,
    },
    'Refactor database queries to use async/await': {
      plan: [
        'Find callback-style or .then()/.catch() database calls',
        'Convert each to async/await with try/catch',
        'Preserve error handling behaviour',
      ],
      steps: `<span class="cli-label">Scanning for callback/promise chains...</span>
<span class="cli-result">  Found 12 queries to refactor in 4 files</span>

<span class="cli-label">Refactoring userModel.ts...</span>
<span class="cli-cmd">  - User.findById(id).then(u => cb(null,u)).catch(cb)</span>
<span class="cli-cmd">  + const user = await User.findById(id)</span>

<span class="cli-label">Refactoring orderModel.ts, productModel.ts...</span>
<span class="cli-result">  ✓ 12 queries refactored to async/await</span>
<span class="cli-result">  ✓ Error handling preserved with try/catch</span>`,
    },
    'Create a REST API route for user profile updates': {
      plan: [
        'Define the route: PATCH /users/:id',
        'Write request validation middleware',
        'Implement the controller and service method',
        'Add integration test',
      ],
      steps: `<span class="cli-label">Creating PATCH /users/:id route...</span>

<span class="cli-label">Writing validation schema...</span>
<span class="cli-cmd">  const updateProfileSchema = z.object({</span>
<span class="cli-cmd">    name: z.string().min(2).optional(),</span>
<span class="cli-cmd">    bio:  z.string().max(500).optional(),</span>
<span class="cli-cmd">    avatar: z.string().url().optional(),</span>
<span class="cli-cmd">  })</span>

<span class="cli-label">Writing controller and service method...</span>
<span class="cli-result">  server/routes/users.ts     — route registered</span>
<span class="cli-result">  server/controllers/users.ts — updateProfile()</span>
<span class="cli-result">  server/services/userService.ts — updateUser()</span>

<span class="cli-label">Writing integration test...</span>
<span class="cli-result">  ✓ PATCH /users/:id route created and tested</span>`,
    },
    'Write tests for the UserService class': {
      plan: [
        'Read UserService to understand methods and dependencies',
        'Set up vi.mock() for database and external calls',
        'Write describe blocks for each public method',
        'Cover happy path, edge cases, and error conditions',
      ],
      steps: `<span class="cli-label">Reading UserService...</span>
<span class="cli-result">  Found 4 public methods: getById, create, update, delete</span>
<span class="cli-result">  Dependencies: db (postgres), emailService, logger</span>

<span class="cli-label">Setting up mocks...</span>
<span class="cli-cmd">  vi.mock('../db', () => ({ query: vi.fn() }))</span>
<span class="cli-cmd">  vi.mock('../emailService', () => ({ send: vi.fn() }))</span>

<span class="cli-label">Generating test suite...</span>
<span class="cli-result">  describe('UserService')</span>
<span class="cli-result">    describe('getById')</span>
<span class="cli-result">      ✓ returns user when found</span>
<span class="cli-result">      ✓ throws NotFoundError when missing</span>
<span class="cli-result">    describe('create')</span>
<span class="cli-result">      ✓ creates user and sends welcome email</span>
<span class="cli-result">      ✓ throws ValidationError for duplicate email</span>`,
    },
    'Add TypeScript types to this JavaScript file': {
      plan: [
        'Analyse function signatures and data shapes',
        'Infer types from usage patterns',
        'Add interfaces for complex objects',
        'Migrate .js to .ts with strict mode',
      ],
      steps: `<span class="cli-label">Analysing JavaScript file...</span>
<span class="cli-result">  Found 6 functions, 3 object shapes, 2 callbacks</span>

<span class="cli-label">Generating interfaces...</span>
<span class="cli-cmd">  interface User { id: string; name: string; email: string }</span>
<span class="cli-cmd">  interface ApiResponse<T> { data: T; status: number; error?: string }</span>

<span class="cli-label">Adding types to functions...</span>
<span class="cli-result">  fetchUser(id: string): Promise&lt;User&gt;          ✓</span>
<span class="cli-result">  updateUser(id: string, patch: Partial&lt;User&gt;)  ✓</span>
<span class="cli-result">  deleteUser(id: string): Promise&lt;void&gt;         ✓</span>

<span class="cli-success">✓ 0 TypeScript errors. File renamed to .ts</span>`,
    },
    'Set up GitHub Actions CI workflow': {
      plan: [
        'Detect the project type and test runner',
        'Write .github/workflows/ci.yml',
        'Add lint, type-check, and test steps',
        'Configure caching for node_modules',
      ],
      steps: `<span class="cli-label">Detecting project...</span>
<span class="cli-result">  Node.js 20 · TypeScript · Vitest · ESLint</span>

<span class="cli-label">Writing .github/workflows/ci.yml...</span>
<span class="cli-cmd">  on: [push, pull_request]</span>
<span class="cli-cmd">  jobs:</span>
<span class="cli-cmd">    ci:</span>
<span class="cli-cmd">      steps:</span>
<span class="cli-cmd">        - uses: actions/checkout@v4</span>
<span class="cli-cmd">        - uses: actions/setup-node@v4</span>
<span class="cli-cmd">          with: { node-version: 20, cache: npm }</span>
<span class="cli-cmd">        - run: npm ci</span>
<span class="cli-cmd">        - run: npm run lint</span>
<span class="cli-cmd">        - run: npm run typecheck</span>
<span class="cli-cmd">        - run: npm test</span>

<span class="cli-success">✓ CI workflow created</span>`,
    },
    'Find and fix the memory leak in the event listeners': {
      plan: [
        'Search for addEventListener calls without matching removeEventListener',
        'Check useEffect hooks for missing cleanup',
        'Identify timers not cleared on unmount',
        'Apply fixes with proper cleanup patterns',
      ],
      steps: `<span class="cli-label">Scanning for event listener leaks...</span>
<span class="cli-result">  src/hooks/useSocket.ts:18 — listener added, never removed</span>
<span class="cli-result">  src/components/Map.tsx:44 — resize handler not cleaned up</span>

<span class="cli-label">Fixing useSocket.ts...</span>
<span class="cli-cmd">  useEffect(() => {</span>
<span class="cli-cmd">    socket.on('message', handler)</span>
<span class="cli-cmd">  + return () => socket.off('message', handler)</span>
<span class="cli-cmd">  }, [])</span>

<span class="cli-label">Fixing Map.tsx...</span>
<span class="cli-cmd">  + return () => window.removeEventListener('resize', onResize)</span>

<span class="cli-success">✓ 2 memory leaks fixed</span>`,
    },
    'Generate API documentation from the route handlers': {
      plan: [
        'Read all route handler files',
        'Extract endpoint paths, methods, params, and response shapes',
        'Generate OpenAPI 3.0 spec',
        'Write docs/api.md with usage examples',
      ],
      steps: `<span class="cli-label">Reading route files...</span>
<span class="cli-result">  Found 12 routes across 4 files</span>

<span class="cli-label">Extracting endpoint metadata...</span>
<span class="cli-result">  GET    /users          → User[]</span>
<span class="cli-result">  POST   /users          → User</span>
<span class="cli-result">  GET    /users/:id      → User</span>
<span class="cli-result">  PATCH  /users/:id      → User</span>
<span class="cli-result">  DELETE /users/:id      → 204</span>

<span class="cli-label">Writing docs/api.md...</span>
<span class="cli-success">✓ API documentation generated (12 endpoints)</span>`,
    },
  }
}

export default playgroundData
