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

export const FIRST_MODULE_ID       = '01'
export const QUIZ_TRANSITION_DELAY = 350
export const COPY_SUCCESS_DURATION = 2000
export const GOOD_SCORE_THRESHOLD  = 0.7

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

export function resolveCmd(cmd: string, platforms: { mac: string; win: string } | undefined, os: import('@/types').OS): string {
  if (!platforms) return cmd
  return os === 'mac' ? platforms.mac : platforms.win
}

export interface TextSegment {
  text: string
  match: boolean
}

export function splitHighlight(text: string, query: string): TextSegment[] {
  if (!query) return [{ text, match: false }]
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'))
  const lq = query.toLowerCase()
  return parts.filter(p => p.length > 0).map(p => ({ text: p, match: p.toLowerCase() === lq }))
}
