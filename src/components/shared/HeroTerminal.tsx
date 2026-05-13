import { useEffect, useRef, useState } from 'react'
import { Terminal } from 'lucide-react'
import FRAMES from '@/data/hero-frames'

const CHAR_DELAY              = 22
const RESPONSE_DELAY          = 12
const PROMPT_TO_RESPONSE_DELAY = 400
const PAUSE                   = 2200
const RESET_PAUSE             = 600

export default function HeroTerminal() {
  const [frameIdx, setFrameIdx] = useState(0)
  const [promptText, setPromptText] = useState('')
  const [responseText, setResponseText] = useState('')
  const [phase, setPhase] = useState<'typing-prompt' | 'typing-response' | 'pausing'>('typing-prompt')
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    return () => { mountedRef.current = false }
  }, [])

  useEffect(() => {
    const frame = FRAMES[frameIdx]
    let charIdx = 0
    let resIdx = 0
    let timerId: ReturnType<typeof setTimeout>

    function typePrompt() {
      if (!mountedRef.current) return
      if (charIdx <= frame.prompt.length) {
        setPromptText(frame.prompt.slice(0, charIdx))
        charIdx++
        timerId = setTimeout(typePrompt, CHAR_DELAY)
      } else {
        timerId = setTimeout(typeResponse, PROMPT_TO_RESPONSE_DELAY)
      }
    }

    function typeResponse() {
      if (!mountedRef.current) return
      setPhase('typing-response')
      if (resIdx <= frame.response.length) {
        setResponseText(frame.response.slice(0, resIdx))
        resIdx++
        timerId = setTimeout(typeResponse, RESPONSE_DELAY)
      } else {
        setPhase('pausing')
        timerId = setTimeout(() => {
          if (!mountedRef.current) return
          setFrameIdx(i => (i + 1) % FRAMES.length)
        }, PAUSE)
      }
    }

    timerId = setTimeout(() => {
      if (!mountedRef.current) return
      setPromptText('')
      setResponseText('')
      setPhase('typing-prompt')
      typePrompt()
    }, RESET_PAUSE)

    return () => clearTimeout(timerId)
  }, [frameIdx])

  const frame = FRAMES[frameIdx]

  return (
    <div className="hero-terminal">
      <div className="hero-terminal-bar">
        <div className="hero-terminal-dots">
          <span /><span /><span />
        </div>
        <span className="hero-terminal-title">
          <Terminal size={12} /> GitHub Copilot — {frame.label}
        </span>
        <div className="hero-terminal-badge">
          {FRAMES.map((_, i) => (
            <span key={i} className={`hero-terminal-pip ${i === frameIdx ? 'active' : ''}`} />
          ))}
        </div>
      </div>
      <div className="hero-terminal-body">
        <div className="hero-terminal-prompt">
          <span className="ht-user">you@editor</span>
          <span className="ht-sep">›</span>
          <span className="ht-prompt-text">{promptText}<span className="ht-cursor">▋</span></span>
        </div>
        {responseText && (
          <div className="hero-terminal-response">
            <span className="ht-copilot-label">✦ Copilot</span>
            <pre className="ht-response-pre">{responseText}{phase === 'typing-response' ? <span className="ht-cursor">▋</span> : null}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
