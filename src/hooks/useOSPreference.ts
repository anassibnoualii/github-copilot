import { useState } from 'react'
import type { OS } from '@/types'

export function useOSPreference() {
  const [os, setOs] = useState<OS>(() => {
    const stored = localStorage.getItem('preferred-os')
    return stored === 'mac' || stored === 'win' || stored === 'linux' ? stored : 'mac'
  })

  function switchOs(value: OS) {
    setOs(value)
    localStorage.setItem('preferred-os', value)
  }

  return { os, switchOs }
}
