import { useState } from 'react'
import type { OS } from '@/types'
import { STORAGE_KEY_OS } from '@/lib/storage'

export function useOSPreference() {
  const [os, setOs] = useState<OS>(() => {
    const stored = localStorage.getItem(STORAGE_KEY_OS)
    return stored === 'mac' || stored === 'win' || stored === 'linux' ? stored : 'mac'
  })

  function switchOs(value: OS) {
    setOs(value)
    localStorage.setItem(STORAGE_KEY_OS, value)
  }

  return { os, switchOs }
}
