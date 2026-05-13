import { useState, useCallback } from 'react'
import { STORAGE_KEY_PROGRESS } from '@/lib/storage'

const KEY = STORAGE_KEY_PROGRESS

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
      try { localStorage.setItem(KEY, JSON.stringify(next)) } catch { /* storage unavailable */ }
      return next
    })
  }, [])

  const reset = useCallback(() => {
    try { localStorage.removeItem(KEY) } catch { /* storage unavailable */ }
    setCompleted([])
  }, [])

  return { completed, markDone, reset }
}
