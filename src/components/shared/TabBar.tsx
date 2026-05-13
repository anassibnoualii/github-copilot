import type { ReactNode } from 'react'

interface Tab {
  value: string
  label: ReactNode
}

interface Props {
  tabs: Tab[]
  active: string
  onChange: (value: string) => void
  wrapClass: string
  btnClass: string
}

export default function TabBar({ tabs, active, onChange, wrapClass, btnClass }: Props) {
  return (
    <div className={wrapClass}>
      {tabs.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          className={`${btnClass}${active === value ? ' active' : ''}`}
          onClick={() => onChange(value)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
