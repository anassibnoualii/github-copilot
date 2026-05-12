export type Level = 'beginner' | 'intermediate' | 'advanced'
export type CalloutVariant = 'tip' | 'warning' | 'info' | 'success'
export type PlaygroundMode = 'normal' | 'autopilot'
export type FeatureCategory = 'IDE' | 'CLI' | 'GitHub.com' | 'Extensions' | 'Enterprise'

export interface ModuleMeta {
  id: string
  title: string
  level: Level
  duration: string
  description: string
  outcomes: string[]
  tryIt: string
}

export interface Feature {
  icon: string
  name: string
  desc: string
  level: Level
  category: FeatureCategory
}

export interface CheatsheetItem {
  cmd: string
  desc: string
}

export interface CheatsheetGroup {
  title: string
  icon: string
  items: CheatsheetItem[]
}

export interface PlaygroundExample {
  task: string
  mode: PlaygroundMode
}

export interface PlaygroundResponse {
  plan: string[]
  steps: string
}

export interface PlaygroundData {
  examples: PlaygroundExample[]
  responseDb: Record<string, PlaygroundResponse>
}

export interface QuizOption {
  text: string
  score: number
}

export interface QuizQuestion {
  q: string
  opts: QuizOption[]
}

export interface QuizResult {
  threshold: number
  module: string
  name: string
  label: string
  desc: string
}

export interface QuizData {
  questions: QuizQuestion[]
  results: QuizResult[]
}

export interface ReferenceLink {
  title: string
  url: string
  desc: string
}

export interface ReferenceSection {
  label: string
  icon: string
  links: ReferenceLink[]
}
