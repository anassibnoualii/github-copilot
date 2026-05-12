import { useState, useMemo } from 'react'
import type { Feature, Level, FeatureCategory } from '@/types'

export function useFeaturesFilter(features: Feature[]) {
  const [query, setQuery]                   = useState('')
  const [activeLevel, setActiveLevel]       = useState('all')
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return features.filter(f => {
      if (activeLevel !== 'all' && f.level !== (activeLevel as Level)) return false
      if (activeCategory !== 'all' && f.category !== (activeCategory as FeatureCategory)) return false
      if (q && !f.name.toLowerCase().includes(q) && !f.desc.toLowerCase().includes(q)) return false
      return true
    })
  }, [features, query, activeLevel, activeCategory])

  return { query, setQuery, activeLevel, setActiveLevel, activeCategory, setActiveCategory, filtered }
}
