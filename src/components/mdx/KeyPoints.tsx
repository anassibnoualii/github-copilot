import { useTranslation } from 'react-i18next'

interface KeyPointsProps {
  heading?: string
  items: string[]
}

export default function KeyPoints({ heading, items }: KeyPointsProps) {
  const { t } = useTranslation()
  return (
    <div className="key-points">
      <h4>{heading ?? t('mdx.keyPoints.heading')}</h4>
      <ul>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
