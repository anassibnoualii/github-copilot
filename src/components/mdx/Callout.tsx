import type { CalloutVariant } from '@/types'

interface CalloutProps {
  variant?: CalloutVariant
  label?: string
  children: React.ReactNode
}

const VARIANT_LABELS: Record<CalloutVariant, string> = {
  tip:     'Pro Tip',
  warning: 'Warning',
  info:    'Note',
  success: 'Best Practice',
}

export default function Callout({ variant = 'tip', label, children }: CalloutProps) {
  const displayLabel = label ?? VARIANT_LABELS[variant]
  return (
    <div className={`callout ${variant}`}>
      <div className="callout-label">{displayLabel}</div>
      <div>{children}</div>
    </div>
  )
}
