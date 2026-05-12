import { useTranslation } from 'react-i18next'
import modulesMeta from '@/data/modules-meta'
import features from '@/data/features'
import cheatsheetGroups from '@/data/cheatsheet'
import references from '@/data/references'
import quizData from '@/data/quiz'
import playgroundData from '@/data/playground'
import type { ModuleMeta, Feature, CheatsheetGroup, ReferenceSection, QuizData, PlaygroundData } from '@/types'

export function useLocalisedModules(): ModuleMeta[] {
  const { t } = useTranslation()
  return modulesMeta.map((m, i) => ({
    ...m,
    title:       t(`data.modules.${i}.title`,       { defaultValue: m.title }),
    description: t(`data.modules.${i}.description`, { defaultValue: m.description }),
    outcomes:    m.outcomes.map((o, j) => t(`data.modules.${i}.outcomes.${j}`, { defaultValue: o })),
    tryIt:       t(`data.modules.${i}.tryIt`,       { defaultValue: m.tryIt }),
  }))
}

export function useLocalisedFeatures(): Feature[] {
  const { t } = useTranslation()
  return features.map((f, i) => ({
    ...f,
    name: t(`data.features.${i}.name`, { defaultValue: f.name }),
    desc: t(`data.features.${i}.desc`, { defaultValue: f.desc }),
  }))
}

export function useLocalisedCheatsheet(): CheatsheetGroup[] {
  const { t } = useTranslation()
  return cheatsheetGroups.map((g, gi) => ({
    ...g,
    title: t(`data.cheatsheet.groups.${gi}.title`, { defaultValue: g.title }),
    items: g.items.map((item, ii) => ({
      ...item,
      desc: t(`data.cheatsheet.groups.${gi}.items.${ii}.desc`, { defaultValue: item.desc }),
    })),
  }))
}

export function useLocalisedReferences(): ReferenceSection[] {
  const { t } = useTranslation()
  return references.map((section, si) => ({
    ...section,
    label: t(`data.references.sections.${si}.label`, { defaultValue: section.label }),
    links: section.links.map((link, li) => ({
      ...link,
      title: t(`data.references.sections.${si}.links.${li}.title`, { defaultValue: link.title }),
      desc:  t(`data.references.sections.${si}.links.${li}.desc`,  { defaultValue: link.desc }),
    })),
  }))
}

export function useLocalisedQuiz(): QuizData {
  const { t } = useTranslation()
  return {
    questions: quizData.questions.map((q, qi) => ({
      q:    t(`data.quiz.questions.${qi}.q`, { defaultValue: q.q }),
      opts: q.opts.map((opt, oi) => ({
        ...opt,
        text: t(`data.quiz.questions.${qi}.opts.${oi}.text`, { defaultValue: opt.text }),
      })),
    })),
    results: quizData.results.map((r, ri) => ({
      ...r,
      name:  t(`data.quiz.results.${ri}.name`,  { defaultValue: r.name }),
      label: t(`data.quiz.results.${ri}.label`, { defaultValue: r.label }),
      desc:  t(`data.quiz.results.${ri}.desc`,  { defaultValue: r.desc }),
    })),
  }
}

export function useLocalisedPlayground(): PlaygroundData {
  const { t } = useTranslation()
  return {
    examples: playgroundData.examples.map((ex, i) => ({
      ...ex,
      task: t(`data.playground.examples.${i}.task`, { defaultValue: ex.task }),
    })),
    responseDb: Object.fromEntries(
      playgroundData.examples.map((ex, i) => {
        const response = playgroundData.responseDb[ex.task]
        return [
          ex.task,
          {
            ...response,
            plan: response.plan.map((step, j) =>
              t(`data.playground.responses.${i}.plan.${j}`, { defaultValue: step })
            ),
          },
        ]
      })
    ),
  }
}
