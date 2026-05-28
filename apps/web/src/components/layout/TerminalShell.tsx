import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { MatrixRainCanvas } from '@/components/effects/MatrixRainCanvas'
import { ScanlineOverlay } from '@/components/effects/ScanlineOverlay'
import { NavCommands } from './NavCommands'
import { SiteFooter } from './SiteFooter'
import { StatusBar } from './StatusBar'

interface TerminalShellProps {
  children: ReactNode
}

/**
 * 全站外壳：顶部状态栏 + 导航栏 + 内容区，叠加扫描线和矩阵雨背景。
 */
export function TerminalShell({ children }: TerminalShellProps) {
  const { t } = useTranslation()
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="relative min-h-screen bg-terminal-bg">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.06]">
        <MatrixRainCanvas opacity={1} />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-grid-faint bg-grid-32 opacity-30"
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        <div className="sticky top-0 z-30">
          <StatusBar />
          <header className="flex h-12 items-center justify-between border-b border-terminal-border bg-terminal-bg/85 px-4 backdrop-blur-md">
            <Link
              to="/"
              className="font-mono text-sm text-neon-cyan text-glow-cyan transition hover:opacity-80"
            >
              <span className="text-terminal-fgDim">$</span>
              {' '}
              cd ~
            </Link>
            {isHome
              ? <NavCommands />
              : (
                  <Link
                    to="/"
                    className="font-mono text-xs text-terminal-fgDim transition hover:text-neon-cyan"
                  >
                    ←
                    {' '}
                    {t('common.back')}
                  </Link>
                )}
          </header>
        </div>

        <main className="relative flex-1">{children}</main>

        <SiteFooter />
      </div>

      <ScanlineOverlay />
    </div>
  )
}
