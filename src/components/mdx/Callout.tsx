import { useTranslation } from 'react-i18next'
import type { CalloutVariant } from '@/types'

interface CalloutProps {
  variant?: CalloutVariant
  label?: string
  children: React.ReactNode
}

export default function Callout({ variant = 'tip', label, children }: CalloutProps) {
  const { t } = useTranslation()
  const displayLabel = label ?? t(`mdx.callout.${variant}`)
  return (
    <div className={`callout ${variant}`}>
      <div className="callout-label">{displayLabel}</div>
      <div>{children}</div>
    </div>
  )
}
