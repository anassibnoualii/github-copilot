import { filterBtnClass } from '@/lib/utils'

interface FilterOption {
  value: string
  label: string
}

interface FilterBarProps {
  options: FilterOption[]
  active: string
  onChange: (value: string) => void
}

export default function FilterBar({ options, active, onChange }: FilterBarProps) {
  return (
    <div className="feature-filters">
      {options.map(o => (
        <button type="button" key={o.value} className={filterBtnClass(active === o.value)} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  )
}
