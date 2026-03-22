'use client'
import { useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, X, Search } from 'lucide-react'
import { useSidebar } from '@/lib/sidebar-context'
import { notificationLogs } from '@/lib/dummy-data'
import styles from './Header.module.css'

const pageTitles: Record<string, string> = {
  '/dashboard':           'Command Center',
  '/users':               'User Management',
  '/content':             'Content Management',
  '/ai-monitor':          'AI Monitor',
  '/revenue':             'Subscription & Revenue',
  '/retention':           'Retention Engine',
  '/recovery':            'Revenue Recovery',
  '/funnel':              'Conversion Funnel',
  '/exam-calendar':       'Exam Calendar',
  '/content-performance': 'Content Performance',
  '/essay-monitor':       'Essay Grading Monitor',
  '/audit-trail':         'Audit Trail',
  '/ai-predictor':        'AI User Predictor',
  '/notifications':       'Notification Logs',
  '/settings':            'System & Settings',
}

const today = new Date().toLocaleDateString('en-IE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

const typeLabel = (type: string) =>
  type.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())

type DetailRow = {
  label: string
  value: string
  isStatus?: boolean
  isError?: boolean
}

export default function Header() {
  const pathname = usePathname()
  const { isCollapsed } = useSidebar()
  const title = pageTitles[pathname] ?? 'Dashboard'

  const [showNotif, setShowNotif] = useState(false)
  const [notifList, setNotifList] = useState(notificationLogs.slice(0, 8))
  const [selectedNotif, setSelectedNotif] = useState<typeof notificationLogs[0] | null>(null)

  const renderBell = () => (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setShowNotif(prev => !prev)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', padding: 4 }}
      >
        <Bell size={20} color="var(--text-secondary)" />
        {notifList.length > 0 && (
          <span style={{
            position: 'absolute', top: -4, right: -4,
            width: 16, height: 16, borderRadius: '50%',
            background: 'var(--red)', fontSize: 9, fontWeight: 700,
            color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {notifList.length}
          </span>
        )}
      </button>

      {/* Click outside backdrop */}
      {showNotif && !selectedNotif && (
        <div
          onClick={() => setShowNotif(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 198 }}
        />
      )}

      {/* Dropdown panel */}
      <AnimatePresence>
        {showNotif && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: 40,
              right: 0,
              width: 360,
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-focus)',
              borderRadius: 12,
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              zIndex: 199,
              display: 'flex',
              flexDirection: 'column',
              maxHeight: 460,
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: '1px solid var(--border-default)', flexShrink: 0 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>Notifications</span>
              <button
                onClick={() => {
                  setNotifList([])
                  setShowNotif(false)
                }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: 'var(--blue-bright)', fontWeight: 500 }}
              >
                Mark all read
              </button>
            </div>

            {/* Scrollable list */}
            <div style={{ overflowY: 'auto', flex: 1 }}>
              {notifList.length === 0 && (
                <div style={{ padding: 32, textAlign: 'center', color: 'var(--text-muted)', fontSize: 14 }}>
                  No new notifications
                </div>
              )}
              {notifList.map(log => (
                <div
                  key={log.id}
                  onClick={() => { setSelectedNotif(log); setShowNotif(false); }}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 12,
                    padding: '12px 16px',
                    borderBottom: '1px solid var(--border-default)',
                    cursor: 'pointer',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-hover)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <div style={{
                    width: 8, height: 8, borderRadius: '50%', flexShrink: 0, marginTop: 5,
                    background: log.status === 'SENT' ? 'var(--green)' : log.status === 'FAILED' ? 'var(--red)' : 'var(--amber)',
                  }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 3 }}>
                      {typeLabel(log.type)}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>
                      {log.email}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{
                        fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20,
                        background: log.status === 'SENT' ? '#05231626' : log.status === 'FAILED' ? '#45000A26' : '#42200626',
                        color: log.status === 'SENT' ? 'var(--green)' : log.status === 'FAILED' ? 'var(--red)' : 'var(--amber)',
                        border: `1px solid ${log.status === 'SENT' ? '#10B98133' : log.status === 'FAILED' ? '#EF444433' : '#F59E0B33'}`,
                      }}>
                        {log.status}
                      </span>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                        {log.sentAt ? (() => {
                          const diff = Math.floor((Date.now() - new Date(log.sentAt).getTime()) / 60000)
                          if (diff < 60) return `${diff}m ago`
                          if (diff < 1440) return `${Math.floor(diff / 60)}h ago`
                          return `${Math.floor(diff / 1440)}d ago`
                        })() : 'Not sent yet'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border-default)', textAlign: 'center', flexShrink: 0 }}>
              <a href="/notifications" style={{ fontSize: 13, color: 'var(--blue-bright)', textDecoration: 'none' }}>
                View all notification logs →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  return (
    <>
      <header
        className={styles.desktopHeader}
        style={{ left: isCollapsed ? 'var(--sidebar-width-collapsed)' : 'var(--sidebar-width-expanded)' }}
      >
        <div className={styles.titleGroup}>
          <h1 className={styles.title}>{title}</h1>
          <span className={styles.date}>{today}</span>
        </div>
        <div className={styles.rightGroup}>
          <div className={styles.searchWrap}>
            <Search size={14} className={styles.searchIcon} />
            <input className={styles.searchInput} placeholder="Search anything..." />
          </div>
          {renderBell()}
          <div className={styles.separator} />
          <div className={styles.avatar}>SA</div>
        </div>
      </header>

      <header className={styles.mobileHeader}>
        <Image
          src="https://res.cloudinary.com/dkrjrfqpy/image/upload/v1773753081/Frame_23_1_thcowx.svg"
          alt="FE-1 Admin"
          width={40}
          height={28}
          style={{ objectFit: 'contain' }}
        />
        <div className={styles.mobileRight}>
          {renderBell()}
          <div className={styles.avatar}>SA</div>
        </div>
      </header>

      <AnimatePresence>
        {selectedNotif && (
          <>
            <div
              onClick={() => setSelectedNotif(null)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 500 }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              style={{
                position: 'fixed' as const,
                top: '50%',
                left: '50%',
                x: '-50%',
                y: '-50%',
                width: '440px',
                maxWidth: 'calc(100vw - 32px)',
                maxHeight: 'calc(100vh - 80px)',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-focus)',
                borderRadius: '14px',
                boxShadow: '0 24px 64px rgba(0,0,0,0.7)',
                zIndex: 501,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column' as const,
              }}
            >
              {/* Overlay header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', borderBottom: '1px solid var(--border-default)' }}>
                <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>
                  {typeLabel(selectedNotif.type)}
                </span>
                <button
                  onClick={() => setSelectedNotif(null)}
                  style={{
                    width: 30, height: 30, borderRadius: '50%',
                    background: 'var(--bg-hover)', border: '1px solid var(--border-default)',
                    color: 'var(--text-secondary)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', cursor: 'pointer',
                  }}
                >
                  <X size={14} />
                </button>
              </div>

              {/* Overlay body */}
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {([
                  { label: 'Recipient', value: selectedNotif.userName },
                  { label: 'Email', value: selectedNotif.email },
                  { label: 'Type', value: typeLabel(selectedNotif.type) },
                  { label: 'Status', value: selectedNotif.status, isStatus: true },
                  { label: 'Sent At', value: selectedNotif.sentAt ? new Date(selectedNotif.sentAt).toLocaleString('en-IE') : 'Not sent yet' },
                  ...(selectedNotif.errorMessage ? [{ label: 'Error', value: selectedNotif.errorMessage, isError: true }] : []),
                  { label: 'Retry Count', value: String(selectedNotif.retryCount) },
                ] as DetailRow[]).map((row, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                    <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', minWidth: 100, flexShrink: 0 }}>
                      {row.label}
                    </span>
                    <span style={{
                      fontSize: 14,
                      wordBreak: 'break-all',
                      color: row.isError ? 'var(--red)'
                        : row.isStatus
                          ? selectedNotif.status === 'SENT' ? 'var(--green)'
                            : selectedNotif.status === 'FAILED' ? 'var(--red)' : 'var(--amber)'
                          : 'var(--text-primary)',
                      fontWeight: row.isStatus ? 600 : 400,
                    }}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Overlay footer */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px 20px', borderTop: '1px solid var(--border-default)' }}>
                <button   
                  onClick={() => setSelectedNotif(null)}
                  style={{
                    background: 'var(--bg-card)', border: '1px solid var(--border-default)',
                    borderRadius: 8, padding: '8px 20px', fontSize: 14,
                    color: 'var(--text-secondary)', cursor: 'pointer',
                  }}
                >
                  Close
                </button>
              </div>    
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
