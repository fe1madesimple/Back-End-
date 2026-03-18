'use client'
import { useMemo, useState } from 'react'
import { auditLogs } from '@/lib/dummy-data'
import styles from './audit-trail.module.css'

const ITEMS_PER_PAGE = 10

type SeverityFilter = 'ALL' | 'INFO' | 'WARNING' | 'DANGER'

export default function AuditTrailPage() {
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>('ALL')

  const stats = useMemo(() => ({
    total: auditLogs.length,
    admin: auditLogs.filter(log => log.actor === 'Super Admin').length,
    system: auditLogs.filter(log => log.actor === 'System').length,
    danger: auditLogs.filter(log => log.severity === 'DANGER').length,
  }), [])

  const filtered = auditLogs.filter(log => {
    const q = searchTerm.toLowerCase()
    const searchMatch =
      !q ||
      log.action.toLowerCase().includes(q) ||
      log.actor.toLowerCase().includes(q) ||
      log.target.toLowerCase().includes(q) ||
      log.detail.toLowerCase().includes(q)
    const severityMatch = severityFilter === 'ALL' || log.severity === severityFilter
    return searchMatch && severityMatch
  })

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const borderClass = (severity: string) => severity === 'DANGER' ? styles.danger : severity === 'WARNING' ? styles.warning : styles.info

  const formatTimestamp = (value: string) => {
    const d = new Date(value)
    const date = d.toLocaleDateString('en-IE', { month: 'short', day: 'numeric', year: 'numeric' })
    const time = d.toLocaleTimeString('en-IE', { hour: '2-digit', minute: '2-digit' })
    return `${date} at ${time}`
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Audit Trail</h1>
        <p className={styles.subtitle}>Complete log of all admin actions and system events</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}><span>Total Actions</span><strong>{stats.total}</strong></div>
        <div className={styles.statCard}><span>Admin Actions</span><strong>{stats.admin}</strong></div>
        <div className={styles.statCard}><span>System Events</span><strong>{stats.system}</strong></div>
        <div className={styles.statCard}><span>Danger Events</span><strong>{stats.danger}</strong></div>
      </div>

      <input
        className={styles.search}
        placeholder="Search by action, actor, or target"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value)
          setPage(1)
        }}
      />

      <div className={styles.filters}>
        {(['ALL', 'INFO', 'WARNING', 'DANGER'] as SeverityFilter[]).map(severity => (
          <button
            key={severity}
            className={`${styles.filterPill} ${severityFilter === severity ? styles.filterActive : ''}`}
            onClick={() => {
              setSeverityFilter(severity)
              setPage(1)
            }}
          >
            {severity === 'ALL' ? 'All' : severity.charAt(0) + severity.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      <div>
        {paginated.map(log => (
          <div key={log.id} className={`${styles.row} ${borderClass(log.severity)}`}>
            <span className={`${styles.dot} ${borderClass(log.severity)}`} />
            <div className={styles.center}>
              <span className={styles.actionBadge}>{log.action}</span>
              <p className={styles.detail}>{log.detail}</p>
              <p className={styles.actorRow}>actor: {log.actor} → target: {log.target}</p>
            </div>
            <span className={styles.time}>{formatTimestamp(log.timestamp)}</span>
          </div>
        ))}
      </div>

      {filtered.length > 0 && (
        <div className={styles.paginationWrap}>
          <span className={styles.paginationInfo}>
            Showing {Math.min((page - 1) * ITEMS_PER_PAGE + 1, filtered.length)}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} entries
          </span>
          <div className={styles.pagination}>
            <button className={styles.pageBtn} onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>← Prev</button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`${styles.pageBtn} ${page === i + 1 ? styles.pageBtnActive : ''}`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button className={styles.pageBtn} onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next →</button>
          </div>
        </div>
      )}
    </div>
  )
}
