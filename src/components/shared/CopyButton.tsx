import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { COPY_SUCCESS_DURATION } from '@/lib/utils'

interface Props {
  text: string
  className?: string
  disabled?: boolean
  iconSize?: number
}

export default function CopyButton({ text, className = 'copy-btn', disabled, iconSize = 12 }: Props) {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  function copy() {
    if (!text.trim()) return
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), COPY_SUCCESS_DURATION)
    }).catch(() => {})
  }

  return (
    <button type="button" className={className} onClick={copy} disabled={disabled || !text.trim()}>
      {copied
        ? <><Check size={iconSize} /> {t('common.copied')}</>
        : <><Copy size={iconSize} /> {t('common.copy')}</>
      }
    </button>
  )
}
