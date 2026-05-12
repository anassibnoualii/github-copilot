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
  }
}

export default playgroundData
