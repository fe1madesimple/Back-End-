'use client'
import { useSidebar } from '@/lib/sidebar-context'
import { SidebarProvider } from '@/lib/sidebar-context'
import Sidebar from './Sidebar'
import Header from './Header'
import MobileDrawer from './MobileDrawer'
import styles from './AdminLayout.module.css'

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar()
  return (
    <div className={styles.root}>
      <Sidebar />
      <Header />
      <main
        className={styles.main}
        style={{
          marginLeft: isCollapsed
            ? 'var(--sidebar-width-collapsed)'
            : 'var(--sidebar-width-expanded)',
        }}
      >
        <div className={styles.content}>{children}</div>
      </main>
      <MobileDrawer />
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </SidebarProvider>
  )
}
