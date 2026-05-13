import type { ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
  onPrev: () => void
  onNext: () => void
  prevDisabled?: boolean
  nextDisabled?: boolean
  prevLabel: string
  nextLabel: string
  wrapClass: string
  btnClass: string
  children?: ReactNode
  iconSize?: number
}

export default function NavPair({
  onPrev, onNext, prevDisabled, nextDisabled,
  prevLabel, nextLabel, wrapClass, btnClass,
  children, iconSize = 14,
}: Props) {
  return (
    <div className={wrapClass}>
      <button className={btnClass} onClick={onPrev} disabled={prevDisabled}>
        <ChevronLeft size={iconSize} /> {prevLabel}
      </button>
      {children}
      <button className={btnClass} onClick={onNext} disabled={nextDisabled}>
        {nextLabel} <ChevronRight size={iconSize} />
      </button>
    </div>
  )
}
