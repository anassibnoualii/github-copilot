import type { Level } from '@/types'
import { LEVEL_BADGE_CLASSES, levelLabel } from '@/lib/utils'

interface LevelBadgeProps {
  level: Level
  className?: string
}

export default function LevelBadge({ level, className }: LevelBadgeProps) {
  return (
    <span className={`badge ${LEVEL_BADGE_CLASSES[level]}${className ? ` ${className}` : ''}`}>
      {levelLabel(level)}
    </span>
  )
}
