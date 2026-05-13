import { BookOpen, FileText, GitBranch, Video } from 'lucide-react'
import type { ReferenceType } from '@/types'

export const REFERENCE_TYPE_ICONS: Record<ReferenceType, React.ReactNode> = {
  doc:   <BookOpen size={11} />,
  blog:  <FileText size={11} />,
  repo:  <GitBranch size={11} />,
  video: <Video size={11} />,
}

export const REFERENCE_TYPE_CLASSES: Record<ReferenceType, string> = {
  doc:   'ref-type-doc',
  blog:  'ref-type-blog',
  repo:  'ref-type-repo',
  video: 'ref-type-video',
}

export const REFERENCE_TYPE_KEYS: ReferenceType[] = ['doc', 'blog', 'repo', 'video']
