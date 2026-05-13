export interface HeroFrame {
  label: string
  prompt: string
  response: string
}

const heroFrames: HeroFrame[] = [
  {
    label: 'Inline Completion',
    prompt: '// Function to debounce user input',
    response: 'function debounce<T extends (...args: unknown[]) => void>(\n  fn: T,\n  delay: number\n): (...args: Parameters<T>) => void {\n  let timer: ReturnType<typeof setTimeout>;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n}',
  },
  {
    label: 'Chat /explain',
    prompt: '/explain #selection',
    response: 'This is a debounce utility that delays function\nexecution until a specified time has passed since\nthe last call. Common uses:\n  • Search inputs — wait for user to stop typing\n  • Window resize handlers — batch resize events\n  • Auto-save — avoid saving on every keystroke',
  },
  {
    label: 'Copilot CLI',
    prompt: '$ copilot\n> find all TODO comments in the codebase',
    response: '→ Running: grep -rn "TODO" src/ --include="*.ts"\n\nsrc/api/users.ts:14   // TODO: add rate limiting\nsrc/auth/jwt.ts:38    // TODO: rotate signing key\nsrc/utils/cache.ts:71 // TODO: implement TTL\n\n3 TODOs found. Generate tasks? (y/n)',
  },
]

export default heroFrames
