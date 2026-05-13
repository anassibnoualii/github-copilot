import { useState } from 'react'
import type { OS } from '@/types'

export function useOSPreference() {
  const [os, setOs] = useState<OS>(() => (localStorage.getItem('preferred-os') as OS) ?? 'mac')

  function switchOs(value: OS) {
    setOs(value)
    localStorage.setItem('preferred-os', value)
  }

  return { os, switchOs }
}
