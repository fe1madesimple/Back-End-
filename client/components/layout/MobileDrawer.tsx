'use client'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ChevronUp, LayoutDashboard, Users, Filter, Settings, TrendingUp, Cpu, Shield, Sparkles, Bell } from 'lucide-react'
import { navItems } from '@/lib/nav-items'
import styles from './MobileDrawer.module.css'

function renderIcon(item: typeof navItems[0], color: string) {
  if (item.type === 'emoji') {
    return <span style={{ fontSize: '18px', lineHeight: 1 }}>{item.emoji}</span>
  }
  const props = { size: 18, color, strokeWidth: 2 }
  switch (item.icon) {
    case 'LayoutDashboard': return <LayoutDashboard {...props} />
    case 'Users':           return <Users {...props} />
    case 'Filter':          return <Filter {...props} />
    case 'TrendingUp':      return <TrendingUp {...props} />
    case 'Cpu':             return <Cpu {...props} />
    case 'Shield':          return <Shield {...props} />
    case 'Sparkles':        return <Sparkles {...props} />
    case 'Bell':            return <Bell {...props} />
    case 'Settings':        return <Settings {...props} />
    default:                return null
  }
}

export default function MobileDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleNavigate = (route: string) => {
    router.push(route)
    setIsOpen(false)
  }

  return (
    <div className={styles.mobileOnly}>

      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropVisible : ''}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}>

        {/* Peek strip — always visible, acts as the handle */}
        <div className={styles.peekStrip} onClick={() => setIsOpen(!isOpen)}>
          <span className={styles.menuText}>Menu</span>
          <ChevronUp
            size={18}
            className={isOpen ? styles.arrowDown : styles.arrowUp}
          />
        </div>

        {/* Full drawer content */}
        <div className={styles.drawerContent}>
          <h3 className={styles.drawerTitle}>Navigation</h3>
          <div className={styles.navGrid}>
            {navItems.map(item => {
              const isActive = pathname === item.route || pathname.startsWith(item.route + '/')
              return (
                <div
                  key={item.route}
                  className={`${styles.gridItem} ${isActive ? styles.gridItemActive : ''}`}
                  onClick={() => handleNavigate(item.route)}
                >
                  <div
                    className={styles.iconBox}
                    style={{ background: item.itemColor + '26' }}
                  >
                    {renderIcon(item, item.itemColor)}
                  </div>
                  <span className={`${styles.gridLabel} ${isActive ? styles.gridLabelActive : ''}`}>
                    {item.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
