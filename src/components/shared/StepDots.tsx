interface Props {
  current: number
  total: number
  label: string
}

export default function StepDots({ current, total, label }: Props) {
  return (
    <div className="mt-step-header">
      <span className="mt-step-num">{label}</span>
      <div className="mt-step-dots">
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className={`mt-dot${i === current ? ' active' : i < current ? ' done' : ''}`} />
        ))}
      </div>
    </div>
  )
}
