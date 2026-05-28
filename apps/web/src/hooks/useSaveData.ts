import { useEffect, useState } from 'react'

interface NetworkInformation extends EventTarget {
  saveData?: boolean
}

interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformation
}

/**
 * 检测用户是否在浏览器/系统里 **显式启用** 了省流模式（Data Saver）。
 * 只读 `navigator.connection.saveData`，不再用 downlink 推断——
 * 否则换一个 wifi 测速偏低就会切到旧的预渲染 mp4，造成数据/视觉与实时 Player 不一致。
 */
export function useSaveData(): boolean {
  const [saveData, setSaveData] = useState(false)

  useEffect(() => {
    const conn = (navigator as NavigatorWithConnection).connection
    if (!conn)
      return

    // eslint-disable-next-line react/set-state-in-effect -- 同步浏览器命令式 API 的初始值，标准用法
    const update = () => setSaveData(Boolean(conn.saveData))
    update()
    conn.addEventListener('change', update)
    return () => conn.removeEventListener('change', update)
  }, [])

  return saveData
}
