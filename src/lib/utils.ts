import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Level } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const LEVEL_BADGE_CLASSES: Record<Level, string> = {
  beginner:     'badge-beginner',
  intermediate: 'badge-intermediate',
  advanced:     'badge-advanced',
}

export const LEVEL_PANEL_COLORS: Record<Level, string> = {
  beginner:     'panel-level-b',
  intermediate: 'panel-level-i',
  advanced:     'panel-level-a',
}

export const FIRST_MODULE_ID = '01'
export const QUIZ_TRANSITION_DELAY = 350

export function levelLabel(level: Level): string {
  return level.charAt(0).toUpperCase() + level.slice(1)
}

export function navLinkClass(isActive: boolean): string {
  return `nav-link${isActive ? ' active' : ''}`
}

export function filterBtnClass(isActive: boolean): string {
  return `filter-btn${isActive ? ' active' : ''}`
}
