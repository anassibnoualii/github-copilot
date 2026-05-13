import { ROUTES } from '@/lib/routes'

export const QUICK_LINK_KEYS = [
  { to: ROUTES.PLAYGROUND,       key: 'playground' },
  { to: ROUTES.CHEATSHEET,       key: 'cheatsheet' },
  { to: ROUTES.FEATURES,         key: 'features' },
  { to: ROUTES.QUIZ,             key: 'quiz' },
  { to: ROUTES.CONFIG_BUILDER,   key: 'configBuilder' },
  { to: ROUTES.SHORTCUT_TRAINER, key: 'shortcutTrainer' },
  { to: ROUTES.PROMPT_BUILDER,   key: 'promptBuilder' },
  { to: ROUTES.JAVA_GUIDE,       key: 'javaGuide' },
  { to: ROUTES.PROJECT_GUIDE,    key: 'projectGuide' },
] as const
