import { useState, useCallback } from 'react'

const KEY = 'copilot-workshop-progress'

function load(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]')
  } catch {
    return []
  }
}

export function useProgress() {
  const [completed, setCompleted] = useState<string[]>(load)

  const markDone = useCallback((id: string) => {
    setCompleted(prev => {
      if (prev.includes(id)) return prev
      const next = [...prev, id]
      localStorage.setItem(KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const reset = useCallback(() => {
    localStorage.removeItem(KEY)
    setCompleted([])
  }, [])

  return { completed, markDone, reset }
}
