import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CheckCircle, XCircle, RotateCcw, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { ModuleQuizQuestion } from '@/types'

interface Props {
  questions: ModuleQuizQuestion[]
  heading?: string
}

export default function ModuleQuiz({ questions, heading }: Props) {
  const { t } = useTranslation()
  const resolvedHeading = heading ?? t('moduleQuiz.heading')
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [phase, setPhase] = useState<'question' | 'explain' | 'done'>('question')

  const q = questions[current] ?? questions[0]
  const score = answers.filter(Boolean).length

  if (!q) return null

  function pick(idx: number) {
    if (phase !== 'question') return
    setSelected(idx)
    setPhase('explain')
    setAnswers(prev => [...prev, idx === q.correct])
  }

  function next() {
    if (current + 1 < questions.length) {
      setCurrent(c => c + 1)
      setSelected(null)
      setPhase('question')
    } else {
      setPhase('done')
    }
  }

  function restart() {
    setCurrent(0)
    setSelected(null)
    setAnswers([])
    setPhase('question')
  }

  return (
    <div className="mq-wrap">
      <div className="mq-header">
        <span className="mq-label">{resolvedHeading}</span>
        {phase !== 'done' && (
          <span className="mq-counter">{current + 1} / {questions.length}</span>
        )}
      </div>

      {phase !== 'done' ? (
        <>
          <p className="mq-question">{q.q}</p>
          <div className="mq-options">
            {q.opts.map((opt, i) => {
              let cls = 'mq-option'
              if (phase === 'explain') {
                if (i === q.correct) cls += ' mq-correct'
                else if (i === selected) cls += ' mq-wrong'
              }
              return (
                <button type="button" key={i} className={cls} onClick={() => pick(i)} disabled={phase === 'explain'}>
                  {phase === 'explain' && i === q.correct && <CheckCircle size={14} className="mq-icon-ok" />}
                  {phase === 'explain' && i === selected && i !== q.correct && <XCircle size={14} className="mq-icon-err" />}
                  {opt}
                </button>
              )
            })}
          </div>

          {phase === 'explain' && (
            <div className="mq-explanation">
              <div className="mq-explanation-label">
                {selected === q.correct ? t('moduleQuiz.correct') : t('moduleQuiz.incorrect')}
              </div>
              <p>{q.explanation}</p>
              <Button variant="ghost" className="mq-next-btn" onClick={next}>
                {current + 1 < questions.length ? (
                  <><ChevronRight size={14} /> {t('moduleQuiz.nextQuestion')}</>
                ) : (
                  <><ChevronRight size={14} /> {t('moduleQuiz.seeResults')}</>
                )}
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="mq-result">
          <div className="mq-result-score">
            {score}/{questions.length}
          </div>
          <p className="mq-result-label">
            {score === questions.length
              ? t('moduleQuiz.scorePerfect')
              : score >= questions.length / 2
              ? t('moduleQuiz.scoreGood')
              : t('moduleQuiz.scoreRetry')}
          </p>
          <Button variant="ghost" className="mq-restart-btn" onClick={restart}>
            <RotateCcw size={13} /> {t('moduleQuiz.tryAgain')}
          </Button>
        </div>
      )}
    </div>
  )
}
