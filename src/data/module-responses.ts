const FREE_RESPONSES: Record<string, string> = {
  explain: '> Copilot: This code implements a pattern where...\n  [Copilot analyzes your selection and provides\n   a plain-English explanation with key points.]',
  fix:     '> Copilot: I found 2 potential issues:\n  Line 12: possible null reference\n  Line 27: unused variable "tmp"\n  \n  Apply fixes? [Yes] [Preview]',
  test:    '> Copilot: Generated 3 unit tests:\n  ✓ returns correct output for valid input\n  ✓ handles edge case: empty input\n  ✓ throws for invalid arguments',
  doc:     '> Copilot: Added JSDoc to 4 functions:\n  /**\n   * @param input - Description of input\n   * @returns Description of return value\n   */',
  default: '> Copilot: I can help with that.\n  Use /explain, /fix, /tests, or /doc\n  for specific tasks on selected code.',
}

export function simulateResponse(input: string): string {
  const lower = input.toLowerCase()
  if (/explain|what|how|why/.test(lower)) return FREE_RESPONSES.explain
  if (/fix|bug|error|issue|problem/.test(lower)) return FREE_RESPONSES.fix
  if (/test|spec|unit|jest|vitest/.test(lower)) return FREE_RESPONSES.test
  if (/doc|comment|jsdoc|document/.test(lower)) return FREE_RESPONSES.doc
  return FREE_RESPONSES.default
}
