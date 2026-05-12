import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Level, PlaygroundMode } from '@/types'

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

export const LEVEL_SHORT_LABEL: Record<Level, string> = {
  beginner:     'B',
  intermediate: 'I',
  advanced:     'A',
}

export const LEVEL_NAV_BADGE: Record<Level, string> = {
  beginner:     'badge-b',
  intermediate: 'badge-i',
  advanced:     'badge-a',
}

export const MODE_BADGE_CLASSES: Record<PlaygroundMode, string> = {
  normal:    'badge-green',
  autopilot: 'badge-purple',
}

export const FIRST_MODULE_ID = '01'
export const QUIZ_TRANSITION_DELAY = 350

export function levelLabel(level: Level): string {
  return level.charAt(0).toUpperCase() + level.slice(1)
}

export function navLinkClass(isActive: boolean): string {
  return cn('nav-link', isActive && 'active')
}

export function filterBtnClass(isActive: boolean): string {
  return cn('filter-btn', isActive && 'active')
}

export function calculateProgress(current: number, total: number): number {
  return total > 0 ? Math.round((current / total) * 100) : 0
}

export function highlight(text: string, query: string): string {
  if (!query) return text
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return text.replace(new RegExp(`(${escaped})`, 'gi'), '<mark>$1</mark>')
}
