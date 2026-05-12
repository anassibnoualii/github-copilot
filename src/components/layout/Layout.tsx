import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div id="app">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div id="main">
        <Topbar onMenuClick={() => setSidebarOpen(o => !o)} />
        <div id="content-area">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
