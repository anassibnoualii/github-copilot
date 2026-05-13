import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PageHeader from '@/components/shared/PageHeader'
import ProgressBar from '@/components/shared/ProgressBar'
import { useQuiz } from '@/hooks/useQuiz'
import { calculateProgress } from '@/lib/utils'
import { ROUTES } from '@/lib/routes'

export default function QuizPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { questions, current, answers, phase, total, result, selectOption, retake } = useQuiz()

  if (phase === 'result') {
    return (
      <div className="page">
        <div className="quiz-wrap">
          <div className="quiz-result">
            <div className="quiz-result-icon">🎯</div>
            <h2>{t('quiz.result.heading')}</h2>
            <p>{t('quiz.result.basedOn', { score: total })}</p>
            <div className="quiz-result-module">
              <div className="quiz-result-module-num">{t('quiz.result.moduleNum', { id: result.module })}</div>
              <div className="quiz-result-module-name">{result.name}</div>
              <p className="quiz-result-desc">{result.desc}</p>
            </div>
            <div className="quiz-result-actions">
              <Button onClick={() => navigate(ROUTES.module(result.module))}>
                {t('quiz.result.goToModule', { id: result.module })} <ArrowRight size={14} />
              </Button>
              <Button variant="outline" onClick={retake}>
                <RotateCcw size={14} /> {t('quiz.result.retake')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const q = questions[current]
  const progress = calculateProgress(current, questions.length)

  return (
    <div className="page">
      <PageHeader
        badge={t('quiz.badge')}
        title={t('quiz.title')}
        desc={t('quiz.description')}
      />
      <div className="quiz-wrap">
        <div className="quiz-progress">
          <ProgressBar
            value={progress}
            label={t('quiz.questionOf', { current: current + 1, total: questions.length })}
          />
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
