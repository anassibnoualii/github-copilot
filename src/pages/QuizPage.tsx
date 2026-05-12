import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, RotateCcw } from 'lucide-react'
import quizData from '@/data/quiz'
import PageHeader from '@/components/shared/PageHeader'
import { QUIZ_TRANSITION_DELAY } from '@/lib/utils'

export default function QuizPage() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers]  = useState<number[]>([])
  const [phase, setPhase]      = useState<'question' | 'result'>('question')
  const mountedRef = useRef(true)

  useEffect(() => () => { mountedRef.current = false }, [])

  const { questions, results } = quizData

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

  if (phase === 'result') {
    const total  = answers.reduce((a, b) => a + b, 0)
    const result = [...results].reverse().find(r => total >= r.threshold) ?? results[0]

    return (
      <div className="page">
        <div className="quiz-wrap">
          <div className="quiz-result">
            <div className="quiz-result-icon">🎯</div>
            <h2>Your recommended starting point</h2>
            <p>Based on your answers (score: {total})</p>
            <div className="quiz-result-module">
              <div className="quiz-result-module-num">Module {result.module}</div>
              <div className="quiz-result-module-name">{result.name}</div>
              <p className="quiz-result-desc">{result.desc}</p>
            </div>
            <div className="quiz-result-actions">
              <button className="btn btn-primary" onClick={() => navigate(`/module/${result.module}`)}>
                Go to Module {result.module} <ArrowRight size={14} />
              </button>
              <button className="btn btn-ghost" onClick={retake}>
                <RotateCcw size={14} /> Retake Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const q        = questions[current]
  const progress = Math.round((current / questions.length) * 100)

  return (
    <div className="page">
      <PageHeader badge="Assessment" title="Find Your Level" desc="5 questions to find the best starting module for you." />
      <div className="quiz-wrap">
        <div className="quiz-progress">
          <div className="quiz-progress-label">Question {current + 1} of {questions.length}</div>
          <div className="quiz-progress-bar">
            <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="quiz-question">{q.q}</div>
        <div className="quiz-options">
          {q.opts.map((opt, i) => (
            <button
              key={i}
              className={`quiz-option${answers[current] === opt.score ? ' selected' : ''}`}
              onClick={() => selectOption(opt.score)}
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
