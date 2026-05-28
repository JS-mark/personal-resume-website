import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TerminalShell } from '@/components/layout/TerminalShell'
import { HomePage } from '@/routes/HomePage'
import { NotFoundPage } from '@/routes/NotFoundPage'
import { ProjectDetailPage } from '@/routes/ProjectDetailPage'

// 由 vite.config.ts 的 `base` 注入。GitHub Pages 子路径部署时，例如
// '/personal-resume-website/'，让 React Router 知道这个前缀以便正确匹配路由。
// BrowserRouter basename 不能以 '/' 结尾，因此 strip。
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined

export function App() {
  return (
    <BrowserRouter
      basename={basename}
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
