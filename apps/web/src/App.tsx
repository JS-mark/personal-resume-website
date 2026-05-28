import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TerminalShell } from '@/components/layout/TerminalShell'
import { HomePage } from '@/routes/HomePage'
import { NotFoundPage } from '@/routes/NotFoundPage'
import { ProjectDetailPage } from '@/routes/ProjectDetailPage'

export function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <TerminalShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </TerminalShell>
    </BrowserRouter>
  )
}
