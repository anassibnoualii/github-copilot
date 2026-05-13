export function assemblePrompt(
  participant: string,
  command: string,
  context: string[],
  task: string,
  constraints: string
): string {
  const parts: string[] = []
  if (participant) parts.push(participant)
  if (command) parts.push(command)
  if (context.length > 0) parts.push(context.join(' '))
  if (task.trim()) parts.push(task.trim())
  if (constraints.trim()) parts.push(`\n\nConstraints:\n${constraints.trim()}`)
  return parts.join(' ')
}
