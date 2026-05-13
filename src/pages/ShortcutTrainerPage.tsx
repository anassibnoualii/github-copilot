import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { CheckCircle, XCircle, RotateCcw, Brain } from 'lucide-react'
import PageHeader from '@/components/shared/PageHeader'
import NavPair from '@/components/shared/NavPair'
import { useLocalisedCheatsheet } from '@/hooks/useLocalisedData'
import { calculateProgress, GOOD_SCORE_THRESHOLD } from '@/lib/utils'

interface Card {
  groupTitle: string
  cmd: string
  desc: string
}

type CardResult = 'got-it' | 'missed'

export default function ShortcutTrainerPage() {
  const { t } = useTranslation()
  const groups = useLocalisedCheatsheet()

  const allCards: Card[] = groups.flatMap(g =>
    g.items.map(item => ({ groupTitle: g.title, cmd: item.cmd, desc: item.desc }))
  )

  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [results, setResults] = useState<CardResult[]>([])
  const [phase, setPhase] = useState<'quiz' | 'done'>('quiz')

  const card = allCards[idx]
  const gotIt  = results.filter(r => r === 'got-it').length
  const missed = results.filter(r => r === 'missed').length

  const advance = useCallback((result: CardResult) => {
    const next = [...results, result]
    setResults(next)
    if (idx + 1 >= allCards.length) {
      setPhase('done')
    } else {
      setIdx(i => i + 1)
      setFlipped(false)
    }
  }, [idx, results, allCards.length])

  function restart() {
    setIdx(0)
    setFlipped(false)
    setResults([])
    setPhase('quiz')
  }

  const pct = calculateProgress(idx, allCards.length)

  return (
    <div className="page">
      <PageHeader
        badge={t('shortcutTrainer.badge')}
        title={t('shortcutTrainer.title')}
        desc={t('shortcutTrainer.description')}
      />

      {phase === 'quiz' ? (
        <>
          <div className="st-progress-row">
            <div className="st-progress-bar">
              <div className="st-progress-fill" style={{ width: `${pct}%` }} />
            </div>
            <span className="st-progress-label">{idx} / {allCards.length}</span>
          </div>

          <div className="st-card-wrap">
            <div className={`st-card ${flipped ? 'st-card-flipped' : ''}`} onClick={() => setFlipped(f => !f)}>
              <div className="st-card-front">
                <div className="st-card-group">{card.groupTitle}</div>
                <div className="st-card-cmd">{card.cmd}</div>
                <div className="st-card-hint">{t('shortcutTrainer.clickToReveal')}</div>
              </div>
              <div className="st-card-back">
                <div className="st-card-group">{card.groupTitle}</div>
                <div className="st-card-cmd">{card.cmd}</div>
                <div className="st-card-desc">{card.desc}</div>
              </div>
            </div>
          </div>

          {flipped ? (
            <div className="st-actions">
              <button className="st-btn st-btn-missed" onClick={() => advance('missed')}>
                <XCircle size={16} /> {t('shortcutTrainer.missed')}
              </button>
              <button className="st-btn st-btn-gotit" onClick={() => advance('got-it')}>
                <CheckCircle size={16} /> {t('shortcutTrainer.gotIt')}
              </button>
            </div>
          ) : (
            <NavPair
              wrapClass="st-nav"
              btnClass="st-nav-btn"
              onPrev={() => { setIdx(i => Math.max(0, i - 1)); setFlipped(false) }}
              prevDisabled={idx === 0}
              prevLabel={t('shortcutTrainer.prev')}
              onNext={() => { setIdx(i => Math.min(allCards.length - 1, i + 1)); setFlipped(false) }}
              nextDisabled={idx === allCards.length - 1}
              nextLabel={t('shortcutTrainer.next')}
            >
              <span className="st-nav-label">{t('shortcutTrainer.flipHint')}</span>
            </NavPair>
          )}

          <div className="st-score-row">
            <span className="st-score st-score-green"><CheckCircle size={12} /> {gotIt} {t('shortcutTrainer.gotItLabel')}</span>
            <span className="st-score st-score-red"><XCircle size={12} /> {missed} {t('shortcutTrainer.missedLabel')}</span>
          </div>
        </>
      ) : (
        <div className="st-done">
          <Brain size={40} className="st-done-icon" />
          <h2 className="st-done-score">{gotIt} / {allCards.length}</h2>
          <p className="st-done-label">
            {gotIt === allCards.length
              ? t('shortcutTrainer.perfect')
              : gotIt >= allCards.length * GOOD_SCORE_THRESHOLD
              ? t('shortcutTrainer.good')
              : t('shortcutTrainer.keepPractising')}
          </p>
          <div className="st-done-breakdown">
            <span className="st-score st-score-green"><CheckCircle size={13} /> {gotIt} {t('shortcutTrainer.gotItLabel')}</span>
            <span className="st-score st-score-red"><XCircle size={13} /> {missed} {t('shortcutTrainer.missedLabel')}</span>
          </div>
          <button className="st-restart-btn" onClick={restart}>
            <RotateCcw size={14} /> {t('shortcutTrainer.restart')}
          </button>
        </div>
      )}
    </div>
  )
}
