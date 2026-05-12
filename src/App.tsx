import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import HomePage from '@/pages/HomePage'
import ModulePage from '@/pages/ModulePage'
import PlaygroundPage from '@/pages/PlaygroundPage'
import CheatSheetPage from '@/pages/CheatSheetPage'
import FeaturesPage from '@/pages/FeaturesPage'
import QuizPage from '@/pages/QuizPage'
import ReferencesPage from '@/pages/ReferencesPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="module/:id" element={<ModulePage />} />
        <Route path="playground" element={<PlaygroundPage />} />
        <Route path="cheatsheet" element={<CheatSheetPage />} />
        <Route path="features" element={<FeaturesPage />} />
        <Route path="quiz" element={<QuizPage />} />
        <Route path="references" element={<ReferencesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
