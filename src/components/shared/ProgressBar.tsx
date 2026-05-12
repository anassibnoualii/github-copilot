interface ProgressBarProps {
  value: number
  label?: string
}

export default function ProgressBar({ value, label }: ProgressBarProps) {
  return (
    <div className="progress-bar-wrap">
      {label && <span className="progress-label">{label}</span>}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}
