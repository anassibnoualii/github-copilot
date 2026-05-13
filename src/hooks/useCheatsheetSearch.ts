import { useState, useMemo } from 'react'
import type { CheatsheetGroup } from '@/types'
import { splitHighlight, type TextSegment } from '@/lib/utils'

export function useCheatsheetSearch(groups: CheatsheetGroup[]) {
  const [query, setQuery] = useState('')

  const q = query.trim().toLowerCase()

  const filtered = useMemo(() =>
    groups
      .map(g => ({
        ...g,
        items: g.items.filter(
          item => !q || item.cmd.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q)
        ),
      }))
      .filter(g => g.items.length > 0),
    [groups, q]
  )

  const highlight = (text: string): TextSegment[] => splitHighlight(text, q)

  return { query, setQuery, filtered, highlight }
}
