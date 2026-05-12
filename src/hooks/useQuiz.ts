import { useState, useRef, useEffect } from 'react'
import { useLocalisedQuiz } from '@/hooks/useLocalisedData'
import { QUIZ_TRANSITION_DELAY } from '@/lib/utils'

export function useQuiz() {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers]  = useState<number[]>([])
  const [phase, setPhase]      = useState<'question' | 'result'>('question')
  const mountedRef = useRef(true)

  useEffect(() => () => { mountedRef.current = false }, [])

  const { questions, results } = useLocalisedQuiz()

  function selectOption(score: number) {
    const next = [...answers, score]
    setAnswers(next)
    setTimeout(() => {
      if (!mountedRef.current) return
      if (current + 1 >= questions.length) {
        setPhase('result')
      } else {
        setCurrent(c => c + 1)
      }
    }, QUIZ_TRANSITION_DELAY)
  }

  function retake() {
    setCurrent(0)
    setAnswers([])
    setPhase('question')
  }

  const total  = answers.reduce((a, b) => a + b, 0)
  const result = [...results].reverse().find(r => total >= r.threshold) ?? results[0]

  return { questions, current, answers, phase, total, result, selectOption, retake }
}
