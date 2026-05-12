import { useTranslation } from 'react-i18next'
import type { Level } from '@/types'
import { LEVEL_BADGE_CLASSES } from '@/lib/utils'

interface LevelBadgeProps {
  level: Level
  className?: string
}

export default function LevelBadge({ level, className }: LevelBadgeProps) {
  const { t } = useTranslation()
  return (
    <span className={`badge ${LEVEL_BADGE_CLASSES[level]}${className ? ` ${className}` : ''}`}>
      {t(`levels.${level}`)}
    </span>
  )
}
