interface KeyPointsProps {
  heading?: string
  items: string[]
}

export default function KeyPoints({ heading = 'Key Takeaways', items }: KeyPointsProps) {
  return (
    <div className="key-points">
      <h4>{heading}</h4>
      <ul>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
