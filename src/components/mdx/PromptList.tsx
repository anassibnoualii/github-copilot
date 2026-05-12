interface Props {
  items: string[]
}

export default function PromptList({ items }: Props) {
  return (
    <div className="prompt-list">
      {items.map((item, i) => (
        <div key={i} className="prompt-item">
          <span className="prompt-chevron">›</span>
          <code className="prompt-text">{item}</code>
        </div>
      ))}
    </div>
  )
}
