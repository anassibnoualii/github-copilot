import { useState } from 'react'
import { CheckCircle, XCircle, RotateCcw, ChevronRight } from 'lucide-react'
import type { ModuleQuizQuestion } from '@/types'

interface Props {
  questions: ModuleQuizQuestion[]
  heading?: string
}

export default function ModuleQuiz({ questions, heading = 'Knowledge Check' }: Props) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [phase, setPhase] = useState<'question' | 'explain' | 'done'>('question')

  const q = questions[current]
  const score = answers.filter(Boolean).length

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
        <span className="mq-label">{heading}</span>
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
                <button key={i} className={cls} onClick={() => pick(i)} disabled={phase === 'explain'}>
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
                {selected === q.correct ? '✓ Correct' : '✗ Incorrect'}
              </div>
              <p>{q.explanation}</p>
              <button className="mq-next-btn" onClick={next}>
                {current + 1 < questions.length ? (
                  <><ChevronRight size={14} /> Next Question</>
                ) : (
                  <><ChevronRight size={14} /> See Results</>
                )}
              </button>
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
              ? 'Perfect score! Ready for the next module.'
              : score >= questions.length / 2
              ? 'Good work — review the explanations above if needed.'
              : 'Review this module before moving on.'}
          </p>
          <button className="mq-restart-btn" onClick={restart}>
            <RotateCcw size={13} /> Try Again
          </button>
        </div>
      )}
    </div>
  )
}
