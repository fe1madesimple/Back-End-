'use client'
import { useState, useRef, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail, Inbox, Pencil, X, Minus, Search,
  Bold, Italic, List, ListOrdered, Heading2,
  Paperclip, Send, ChevronDown, AlertCircle,
  Clock, TrendingUp, Zap, Calendar
} from 'lucide-react'
import Badge from '@/components/ui/Badge'
import { notificationLogs } from '@/lib/dummy-data'
import styles from './notifications.module.css'

const ITEMS_PER_PAGE = 12
const MAILS_PER_PAGE = 10

const typeLabel = (type: string) =>
  type.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())

const relativeTime = (sentAt: string | null) => {
  if (!sentAt) return 'Not sent'
  const diff = Math.floor((Date.now() - new Date(sentAt).getTime()) / 60000)
  if (diff < 60) return `${diff}m ago`
  if (diff < 1440) return `${Math.floor(diff / 60)}h ago`
  return `${Math.floor(diff / 1440)}d ago`
}

const actionAlerts = [
  {
    id: 'a1',
    icon: AlertCircle,
    iconColor: '#EF4444',
    bgColor: '#EF444415',
    borderColor: '#EF4444',
    title: '2 failed payment emails',
    sub: 'seamus.con@example.com and roisin.gal@example.com - retry queued',
    badge: 'URGENT',
    variant: 'danger' as const,
  },
  {
    id: 'a2',
    icon: Clock,
    iconColor: '#F59E0B',
    bgColor: '#F59E0B15',
    borderColor: '#F59E0B',
    title: '4 trial expiry emails pending',
    sub: 'Scheduled to send in next 2 hours via cron job',
    badge: 'PENDING',
    variant: 'warning' as const,
  },
  {
    id: 'a3',
    icon: TrendingUp,
    iconColor: '#8B5CF6',
    bgColor: '#8B5CF615',
    borderColor: '#8B5CF6',
    title: 'Weekly progress batch ready',
    sub: '247 emails queued for Sunday 09:00 delivery',
    badge: 'QUEUED',
    variant: 'purple' as const,
  },
  {
    id: 'a4',
    icon: Zap,
    iconColor: '#10B981',
    bgColor: '#10B98115',
    borderColor: '#10B981',
    title: '3 subscription activated emails sent today',
    sub: 'Cormac Burke, Aoibheann Daly, Oluwaseun Abiodun',
    badge: 'INFO',
    variant: 'success' as const,
  },
]

const allMails = [
  { id: 'm1',  from: 'FE-1 System',  to: 'niamh.obrien@example.com',    subject: 'Your Trial Is Ending Soon',         date: '2026-03-16T10:00:00Z', body: 'Hi Niamh, your 7-day free trial ends in 2 days. Upgrade now to keep access to all your study materials before your October exam.' },
  { id: 'm2',  from: 'FE-1 System',  to: 'padraig.hen@example.com',     subject: 'Payment Failed',                    date: '2026-03-15T14:00:00Z', body: 'Hi Padraig, we could not process your payment. Please update your payment method to continue your subscription.' },
  { id: 'm3',  from: 'FE-1 System',  to: 'ciaran.walsh@example.com',    subject: 'Weekly Progress Report',            date: '2026-03-11T09:00:00Z', body: 'Hi Ciaran, here is your weekly study summary. You completed 3 lessons and scored 78% on your quizzes this week.' },
  { id: 'm4',  from: 'FE-1 System',  to: 'seamus.con@example.com',      subject: 'Your Trial Has Ended',              date: '2026-03-10T08:00:00Z', body: 'Hi Seamus, your free trial has expired. Subscribe to Standard or Pro to continue your FE-1 exam preparation.' },
  { id: 'm5',  from: 'FE-1 System',  to: 'tunde.adeyemi@example.com',   subject: 'Subscription Activated - Pro Plan', date: '2026-03-09T11:00:00Z', body: 'Hi Tunde, your Pro subscription is now active. You have 40 AI feedback sessions per month and full access to all subjects.' },
  { id: 'm6',  from: 'FE-1 System',  to: 'grainne.fitz@example.com',    subject: 'Keep Your Streak Going!',           date: '2026-03-08T20:00:00Z', body: 'Hi Grainne, do not break your 18-day streak! Log in today to keep your momentum going before your October exam.' },
  { id: 'm7',  from: 'Super Admin',  to: 'aoife.murphy@example.com',    subject: 'Payment Received - Thank You',      date: '2026-03-07T10:00:00Z', body: 'Hi Aoife, your payment of EUR49 for the Pro monthly plan was received successfully. Your subscription is now active.' },
  { id: 'm8',  from: 'FE-1 System',  to: 'biodun.afo@example.com',      subject: 'Your Weekly Summary',               date: '2026-03-04T09:00:00Z', body: 'Hi Biodun, great progress this week! You completed 2 lessons in Criminal Law with an average quiz score of 72%.' },
  { id: 'm9',  from: 'FE-1 System',  to: 'ifeoma.obi@example.com',      subject: 'Trial Ending in 2 Days',            date: '2026-03-03T08:00:00Z', body: 'Hi Ifeoma, your free trial ends in 2 days. Your October exam is approaching - do not lose access to your study materials.' },
  { id: 'm10', from: 'FE-1 System',  to: 'emeka.okafor@example.com',    subject: 'Streak Alert - Study Today',        date: '2026-03-02T20:00:00Z', body: 'Hi Emeka, you have not studied today. Your 6-day streak is at risk - log in now to maintain your momentum.' },
  { id: 'm11', from: 'FE-1 System',  to: 'siobhan.kelly@example.com',   subject: 'Welcome to Standard Plan',          date: '2026-03-01T14:00:00Z', body: 'Hi Siobhan, welcome to the Standard plan. You now have full access to all 8 subjects and 15 AI feedback sessions per month.' },
  { id: 'm12', from: 'FE-1 System',  to: 'adaeze.nwa@example.com',      subject: 'Payment Reminder',                  date: '2026-02-28T10:00:00Z', body: 'Hi Adaeze, your payment did not go through. Please update your card details to avoid losing access to your account.' },
  { id: 'm13', from: 'FE-1 System',  to: 'cormac.burke@example.com',    subject: 'Great Work This Week',              date: '2026-02-25T09:00:00Z', body: 'Hi Cormac, you had an excellent week - 4 lessons completed and a 91% quiz average. Keep up the great work!' },
  { id: 'm14', from: 'FE-1 System',  to: 'sorcha.mu@example.com',       subject: 'Trial Expired',                    date: '2026-02-24T08:00:00Z', body: 'Hi Sorcha, your free trial has ended. Upgrade to Standard for EUR29/month to continue your FE-1 preparation.' },
  { id: 'm15', from: 'FE-1 System',  to: 'diarmuid.healy@example.com',  subject: 'Come Back - We Miss You',          date: '2026-02-23T20:00:00Z', body: 'Hi Diarmuid, you have not logged in for 10 days. Your October exam is approaching - get back on track today.' },
  { id: 'm16', from: 'Super Admin',  to: 'rotimi.ade@example.com',      subject: 'Invoice - FE-1 Made Simple Pro',   date: '2026-02-22T10:00:00Z', body: 'Hi Rotimi, attached is your invoice for the Pro annual plan. Thank you for your continued support of FE-1 Made Simple.' },
  { id: 'm17', from: 'FE-1 System',  to: 'maeve.quinn@example.com',     subject: 'Trial Ending Tomorrow',            date: '2026-02-21T08:00:00Z', body: 'Hi Maeve, your free trial ends tomorrow. Subscribe now so you do not lose access to your study materials.' },
  { id: 'm18', from: 'FE-1 System',  to: 'babatunde.ok@example.com',    subject: 'Subscription Activated - Pro',     date: '2026-02-20T14:00:00Z', body: 'Hi Babatunde, your Pro plan is now active. Enjoy 40 AI feedback sessions per month and priority support.' },
  { id: 'm19', from: 'FE-1 System',  to: 'tobenna.eze@example.com',     subject: 'Weekly Progress Report',           date: '2026-02-18T09:00:00Z', body: 'Hi Tobenna, this week you completed Tort Law Module 1 and scored 83% on the recall quiz. Well done!' },
  { id: 'm20', from: 'FE-1 System',  to: 'ngozi.okonkwo@example.com',   subject: 'Streak Alert - 8 Days Strong',     date: '2026-02-17T20:00:00Z', body: 'Hi Ngozi, you have an 8-day streak! Log in today to keep it going and stay on track for your October exam.' },
  { id: 'm21', from: 'Super Admin',  to: 'aisling.flan@example.com',    subject: 'Special Offer - Save 20%',         date: '2026-02-15T10:00:00Z', body: 'Hi Aisling, as a valued member we are offering you 20% off your next subscription renewal. Use code LOYAL20 at checkout.' },
  { id: 'm22', from: 'FE-1 System',  to: 'clodagh.byrne@example.com',   subject: 'Your Subscription Has Ended',      date: '2026-02-10T14:00:00Z', body: 'Hi Clodagh, your Standard subscription has ended. We hope to see you back - subscribe again to continue your preparation.' },
  { id: 'm23', from: 'FE-1 System',  to: 'ifeanyi.ch@example.com',      subject: 'Welcome - Account Confirmed',      date: '2026-01-06T09:00:00Z', body: 'Hi Ifeanyi, your account is now confirmed. Start with Criminal Law - it is the most popular subject among FE-1 students.' },
  { id: 'm24', from: 'FE-1 System',  to: 'chinonso.ob@example.com',     subject: 'Weekly Progress Report',           date: '2026-02-25T09:00:00Z', body: 'Hi Chinonso, you completed 2 lessons in Contract Law this week with a quiz average of 69%. Keep pushing!' },
]

type DetailRow = {
  label: string
  value: string
  isStatus?: boolean
  isError?: boolean
}

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<'logs' | 'mymails'>('logs')
  const [statusFilter, setStatusFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const [logsPage, setLogsPage] = useState(1)
  const [mailsPage, setMailsPage] = useState(1)
  const [showCompose, setShowCompose] = useState(false)
  const [composeMinimized, setComposeMinimized] = useState(false)
  const [composeTo, setComposeTo] = useState('')
  const [composeSubject, setComposeSubject] = useState('')
  const [composeSent, setComposeSent] = useState(false)
  const [selectedLog, setSelectedLog] = useState<typeof notificationLogs[0] | null>(null)
  const [selectedMail, setSelectedMail] = useState<typeof allMails[0] | null>(null)
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const datePickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (showMobileSearch) {
      setTimeout(() => searchInputRef.current?.focus(), 100)
    }
  }, [showMobileSearch])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(e.target as Node)) {
        setShowDatePicker(false)
      }
    }
    if (showDatePicker) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showDatePicker])

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: 'Write your message here...' }),
    ],
    content: '',
    immediatelyRender: false,
    editorProps: {
      attributes: { class: styles.tiptapEditor },
    },
  })

  const filteredLogs = notificationLogs
    .filter(log => {
      const matchStatus = statusFilter === 'All' || log.status === statusFilter
      const matchType = typeFilter === 'All' || log.type === typeFilter
      const matchSearch = searchQuery === '' ||
        log.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        typeLabel(log.type).toLowerCase().includes(searchQuery.toLowerCase()) ||
        (log.errorMessage?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)

      let matchDate = true
      if (dateFrom || dateTo) {
        const logDate = log.sentAt ? new Date(log.sentAt) : null
        if (!logDate) {
          matchDate = false
        } else {
          if (dateFrom) {
            const from = new Date(dateFrom)
            from.setHours(0, 0, 0, 0)
            if (logDate < from) matchDate = false
          }
          if (dateTo) {
            const to = new Date(dateTo)
            to.setHours(23, 59, 59, 999)
            if (logDate > to) matchDate = false
          }
        }
      }

      return matchStatus && matchType && matchSearch && matchDate
    })
    .sort((a, b) => {
      const aTime = a.sentAt ? new Date(a.sentAt).getTime() : 0
      const bTime = b.sentAt ? new Date(b.sentAt).getTime() : 0
      return sortOrder === 'newest' ? bTime - aTime : aTime - bTime
    })

  const logsTotalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE)
  const paginatedLogs = filteredLogs.slice((logsPage - 1) * ITEMS_PER_PAGE, logsPage * ITEMS_PER_PAGE)

  const mailsTotalPages = Math.ceil(allMails.length / MAILS_PER_PAGE)
  const paginatedMails = allMails.slice((mailsPage - 1) * MAILS_PER_PAGE, mailsPage * MAILS_PER_PAGE)

  const statusCounts = {
    total: notificationLogs.length,
    sent: notificationLogs.filter(l => l.status === 'SENT').length,
    failed: notificationLogs.filter(l => l.status === 'FAILED').length,
    pending: notificationLogs.filter(l => l.status === 'PENDING').length,
  }

  const types = ['All', ...Array.from(new Set(notificationLogs.map(l => l.type)))]

  const handleSend = () => {
    if (!composeTo || !composeSubject) return
    setComposeSent(true)
    setTimeout(() => {
      setComposeSent(false)
      setComposeTo('')
      setComposeSubject('')
      editor?.commands.setContent('')
      setShowCompose(false)
    }, 1800)
  }

  return (
    <div className={styles.page}>

      {/* Page header row */}
      <div className={styles.pageHeaderRow}>
        <div>
          <h1 className={styles.title}>Notification Logs</h1>
          <p className={styles.subtitle}>Track all emails sent by automated cron jobs and compose manual emails</p>
        </div>
        <div className={styles.headerActions}>
          {/* Desktop search */}
          <div className={styles.desktopSearch}>
            <Search size={14} className={styles.searchIcon} />
            <input
              className={styles.searchInput}
              placeholder="Search by name, email, type, or error..."
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setLogsPage(1) }}
            />
          </div>
          {/* Mobile search icon */}
          <button className={styles.mobileSearchBtn} onClick={() => setShowMobileSearch(true)}>
            <Search size={18} />
          </button>
          <button className={styles.composeBtn} onClick={() => { setShowCompose(true); setComposeMinimized(false) }}>
            <Pencil size={15} />
            <span className={styles.composeBtnText}>Compose</span>
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className={styles.statsRow}>
        {[
          { label: 'Total',   value: statusCounts.total,   color: 'var(--text-primary)' },
          { label: 'Sent',    value: statusCounts.sent,    color: 'var(--green)'        },
          { label: 'Failed',  value: statusCounts.failed,  color: 'var(--red)'          },
          { label: 'Pending', value: statusCounts.pending, color: 'var(--amber)'        },
        ].map((s, i) => (
          <div key={i} className={styles.statCard}>
            <div className={styles.statLabel}>{s.label}</div>
            <div className={styles.statValue} style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className={styles.tabRow}>
        <button className={`${styles.tab} ${activeTab === 'logs' ? styles.tabActive : ''}`} onClick={() => setActiveTab('logs')}>
          <Mail size={15} />
          Email Logs
        </button>
        <button className={`${styles.tab} ${activeTab === 'mymails' ? styles.tabActive : ''}`} onClick={() => setActiveTab('mymails')}>
          <Inbox size={15} />
          My Mails
        </button>
      </div>

      {/* EMAIL LOGS TAB */}
      {activeTab === 'logs' && (
        <>
          {/* Action Alerts */}
          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>
              <AlertCircle size={16} style={{ color: 'var(--amber)' }} />
              Action Alerts
            </h3>
            <p className={styles.sectionSubtitle}>Email system events that need your attention</p>
            <div className={styles.alertList}>
              {actionAlerts.map(alert => {
                const Icon = alert.icon
                return (
                  <div key={alert.id} className={styles.alertRow} style={{ borderLeftColor: alert.borderColor }}>
                    <div className={styles.alertIconWrap} style={{ background: alert.bgColor }}>
                      <Icon size={16} color={alert.iconColor} />
                    </div>
                    <div className={styles.alertBody}>
                      <strong className={styles.alertTitle}>{alert.title}</strong>
                      <p className={styles.alertSub}>{alert.sub}</p>
                    </div>
                    <Badge label={alert.badge} variant={alert.variant} />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Logs table */}
          <div className={styles.card}>
            <div className={styles.filterRow}>
              <div className={styles.filterPills}>
                {['All', 'SENT', 'FAILED', 'PENDING'].map(s => (
                  <button key={s} className={`${styles.filterBtn} ${statusFilter === s ? styles.filterBtnActive : ''}`} onClick={() => { setStatusFilter(s); setLogsPage(1) }}>
                    {s === 'All' ? 'All Status' : s}
                  </button>
                ))}
              </div>
              <div className={styles.filterRight}>
                <select className={styles.typeSelect} value={typeFilter} onChange={e => { setTypeFilter(e.target.value); setLogsPage(1) }}>
                  {types.map(t => <option key={t} value={t}>{t === 'All' ? 'All Types' : typeLabel(t)}</option>)}
                </select>

                {/* Date filter button + picker */}
                <div className={styles.datePickerWrap} ref={datePickerRef}>
                  <button
                    className={`${styles.sortBtn} ${(dateFrom || dateTo) ? styles.sortBtnActive : ''}`}
                    onClick={() => setShowDatePicker(prev => !prev)}
                  >
                    <Calendar size={14} />
                    {dateFrom || dateTo
                      ? `${dateFrom ? new Date(dateFrom).toLocaleDateString('en-IE', { day: 'numeric', month: 'short' }) : 'Any'} → ${dateTo ? new Date(dateTo).toLocaleDateString('en-IE', { day: 'numeric', month: 'short' }) : 'Any'}`
                      : 'Filter by date'
                    }
                  </button>

                  <AnimatePresence>
                    {showDatePicker && (
                      <motion.div
                        className={styles.datePickerPanel}
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.97 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                      >
                        <div className={styles.datePickerHeader}>
                          <span className={styles.datePickerTitle}>Filter by date</span>
                          <button
                            className={styles.datePickerClear}
                            onClick={() => { setDateFrom(''); setDateTo(''); setLogsPage(1) }}
                          >
                            Clear
                          </button>
                        </div>

                        <div className={styles.datePickerFields}>
                          <div className={styles.dateField}>
                            <label className={styles.dateFieldLabel}>From</label>
                            <input
                              type="date"
                              className={styles.dateInput}
                              value={dateFrom}
                              max={dateTo || undefined}
                              onChange={e => { setDateFrom(e.target.value); setLogsPage(1) }}
                            />
                          </div>
                          <div className={styles.dateFieldDivider}>→</div>
                          <div className={styles.dateField}>
                            <label className={styles.dateFieldLabel}>To</label>
                            <input
                              type="date"
                              className={styles.dateInput}
                              value={dateTo}
                              min={dateFrom || undefined}
                              onChange={e => { setDateTo(e.target.value); setLogsPage(1) }}
                            />
                          </div>
                        </div>

                        <button
                          className={styles.dateApplyBtn}
                          onClick={() => setShowDatePicker(false)}
                        >
                          Apply Filter
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Sort order button */}
                <button
                  className={styles.sortBtn}
                  onClick={() => setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest')}
                >
                  <ChevronDown size={14} style={{ transform: sortOrder === 'oldest' ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                  {sortOrder === 'newest' ? 'Newest first' : 'Oldest first'}
                </button>
              </div>
            </div>

            {searchQuery && (
              <div className={styles.searchResultsBanner}>
                <Search size={13} />
                Showing {filteredLogs.length} result{filteredLogs.length !== 1 ? 's' : ''} for &ldquo;{searchQuery}&rdquo;
                <button className={styles.clearSearch} onClick={() => setSearchQuery('')}>Clear ✕</button>
              </div>
            )}

            {(dateFrom || dateTo) && (
              <div className={styles.searchResultsBanner} style={{ borderColor: 'var(--amber)', background: 'var(--amber-bg)' }}>
                <Calendar size={13} style={{ color: 'var(--amber)' }} />
                <span style={{ color: 'var(--amber)' }}>
                  Date filter active:
                  {dateFrom ? ` from ${new Date(dateFrom).toLocaleDateString('en-IE', { day: 'numeric', month: 'short', year: 'numeric' })}` : ''}
                  {dateTo ? ` to ${new Date(dateTo).toLocaleDateString('en-IE', { day: 'numeric', month: 'short', year: 'numeric' })}` : ''}
                  {' '}— {filteredLogs.length} result{filteredLogs.length !== 1 ? 's' : ''}
                </span>
                <button className={styles.clearSearch} onClick={() => { setDateFrom(''); setDateTo(''); setLogsPage(1) }} style={{ color: 'var(--amber)' }}>
                  Clear ✕
                </button>
              </div>
            )}

            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {['Type', 'Recipient', 'Status', 'Sent At', 'Retries', 'Actions'].map(h => (
                      <th key={h} className={styles.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginatedLogs.length === 0 && (
                    <tr>
                      <td colSpan={6} className={styles.emptyRow}>No results found</td>
                    </tr>
                  )}
                  {paginatedLogs.map(log => (
                    <tr key={log.id} className={styles.tr} onClick={() => setSelectedLog(log)} style={{ cursor: 'pointer' }}>
                      <td className={styles.td}><span className={styles.typeBadge}>{typeLabel(log.type)}</span></td>
                      <td className={styles.td}>
                        <div className={styles.recipientName}>{log.userName}</div>
                        <div className={styles.recipientEmail}>{log.email}</div>
                      </td>
                      <td className={styles.td}>
                        <Badge label={log.status} variant={log.status === 'SENT' ? 'success' : log.status === 'FAILED' ? 'danger' : 'warning'} />
                      </td>
                      <td className={styles.td}>
                        <span className={styles.dateText}>{relativeTime(log.sentAt)}</span>
                        {log.errorMessage && <div className={styles.errorText}>{log.errorMessage}</div>}
                      </td>
                      <td className={styles.td}>
                        <span style={{ color: log.retryCount > 0 ? 'var(--amber)' : 'var(--text-muted)', fontSize: 13 }}>{log.retryCount}</span>
                      </td>
                      <td className={styles.td}>
                        <div className={styles.actionBtns}>
                          {log.status === 'FAILED' && <button className={styles.retryBtn}>Retry</button>}
                          <button className={styles.viewBtn} onClick={() => setSelectedLog(log)}>View</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.paginationRow}>
              <span className={styles.paginationInfo}>
                Showing {filteredLogs.length === 0 ? 0 : Math.min((logsPage - 1) * ITEMS_PER_PAGE + 1, filteredLogs.length)}–{Math.min(logsPage * ITEMS_PER_PAGE, filteredLogs.length)} of {filteredLogs.length} entries
              </span>
              <div className={styles.pagination}>
                <button className={styles.pageBtn} onClick={() => setLogsPage(p => Math.max(1, p - 1))} disabled={logsPage === 1}>← Prev</button>
                {Array.from({ length: Math.min(logsTotalPages, 7) }, (_, i) => (
                  <button key={i} className={`${styles.pageBtn} ${logsPage === i + 1 ? styles.pageBtnActive : ''}`} onClick={() => setLogsPage(i + 1)}>{i + 1}</button>
                ))}
                <button className={styles.pageBtn} onClick={() => setLogsPage(p => Math.min(logsTotalPages, p + 1))} disabled={logsPage === logsTotalPages}>Next →</button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* MY MAILS TAB */}
      {activeTab === 'mymails' && (
        <div className={styles.card}>
          <div className={styles.mailList}>
            {paginatedMails.map(mail => (
              <div
                key={mail.id}
                className={`${styles.mailItem} ${selectedMail?.id === mail.id ? styles.mailItemActive : ''}`}
                onClick={() => setSelectedMail(mail)}
                style={{ cursor: 'pointer' }}
              >
                <div className={styles.mailAvatar}>
                  {mail.from === 'Super Admin' ? 'SA' : 'FE'}
                </div>
                <div className={styles.mailContent}>
                  <div className={styles.mailTopRow}>
                    <span className={styles.mailFrom}>{mail.from}</span>
                    <span className={styles.mailDate}>{relativeTime(mail.date)}</span>
                  </div>
                  <div className={styles.mailSubject}>{mail.subject}</div>
                  <div className={styles.mailPreview}>{mail.body.slice(0, 80)}...</div>
                  <div className={styles.mailTo}>To: {mail.to}</div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.paginationRow}>
            <span className={styles.paginationInfo}>
              Showing {Math.min((mailsPage - 1) * MAILS_PER_PAGE + 1, allMails.length)}–{Math.min(mailsPage * MAILS_PER_PAGE, allMails.length)} of {allMails.length} messages
            </span>
            <div className={styles.pagination}>
              <button className={styles.pageBtn} onClick={() => setMailsPage(p => Math.max(1, p - 1))} disabled={mailsPage === 1}>← Prev</button>
              {Array.from({ length: mailsTotalPages }, (_, i) => (
                <button key={i} className={`${styles.pageBtn} ${mailsPage === i + 1 ? styles.pageBtnActive : ''}`} onClick={() => setMailsPage(i + 1)}>{i + 1}</button>
              ))}
              <button className={styles.pageBtn} onClick={() => setMailsPage(p => Math.min(mailsTotalPages, p + 1))} disabled={mailsPage === mailsTotalPages}>Next →</button>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE SEARCH OVERLAY */}
      <AnimatePresence>
        {showMobileSearch && (
          <>
            <motion.div
              className={styles.mobileSearchBackdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileSearch(false)}
            />
            <motion.div
              className={styles.mobileSearchOverlay}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              onClick={e => e.stopPropagation()}
            >
              <div className={styles.mobileSearchHeader}>
                <Search size={16} color="var(--text-muted)" />
                <input
                  ref={searchInputRef}
                  className={styles.mobileSearchInput}
                  placeholder="Search by name, email, type, or error..."
                  value={searchQuery}
                  onChange={e => { setSearchQuery(e.target.value); setLogsPage(1) }}
                  autoFocus
                />
                <button className={styles.mobileSearchClose} onClick={() => setShowMobileSearch(false)}>
                  <X size={16} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* LOG DETAIL OVERLAY - centered */}
      <AnimatePresence>
        {selectedLog && (
          <>
            <motion.div
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 500 }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedLog(null)}
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
                width: '480px',
                maxWidth: 'calc(100vw - 32px)',
                maxHeight: 'calc(100vh - 64px)',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-focus)',
                borderRadius: '14px',
                zIndex: 501,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column' as const,
                boxShadow: '0 24px 64px rgba(0,0,0,0.7)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', borderBottom: '1px solid var(--border-default)', flexShrink: 0 }}>
                <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>{typeLabel(selectedLog.type)}</span>
                <button onClick={() => setSelectedLog(null)} style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--bg-hover)', border: '1px solid var(--border-default)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <X size={14} />
                </button>
              </div>
              <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14, overflowY: 'auto', flex: 1 }}>
                {([
                  { label: 'Recipient', value: selectedLog.userName },
                  { label: 'Email', value: selectedLog.email },
                  { label: 'Type', value: typeLabel(selectedLog.type) },
                  { label: 'Status', value: selectedLog.status, isStatus: true },
                  { label: 'Sent At', value: selectedLog.sentAt ? new Date(selectedLog.sentAt).toLocaleString('en-IE') : 'Not sent yet' },
                  ...(selectedLog.errorMessage ? [{ label: 'Error', value: selectedLog.errorMessage, isError: true }] : []),
                  { label: 'Retry Count', value: String(selectedLog.retryCount) },
                ] as DetailRow[]).map((row, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', minWidth: 100, flexShrink: 0 }}>{row.label}</span>
                    <span style={{
                      fontSize: 14, wordBreak: 'break-all',
                      color: row.isError ? 'var(--red)' : row.isStatus
                        ? selectedLog.status === 'SENT' ? 'var(--green)' : selectedLog.status === 'FAILED' ? 'var(--red)' : 'var(--amber)'
                        : 'var(--text-primary)',
                      fontWeight: row.isStatus ? 600 : 400,
                    }}>{row.value}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, padding: '16px 20px', borderTop: '1px solid var(--border-default)', flexShrink: 0 }}>
                {selectedLog.status === 'FAILED' && (
                  <button style={{ background: 'var(--blue-muted)', border: '1px solid var(--blue-primary)', color: 'var(--blue-bright)', borderRadius: 8, padding: '8px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Retry Send</button>
                )}
                <button onClick={() => setSelectedLog(null)} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: 8, padding: '8px 20px', fontSize: 14, color: 'var(--text-secondary)', cursor: 'pointer' }}>Close</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MAIL DETAIL OVERLAY - centered */}
      <AnimatePresence>
        {selectedMail && (
          <>
            <motion.div
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 500 }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedMail(null)}
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
                width: '520px',
                maxWidth: 'calc(100vw - 32px)',
                maxHeight: 'calc(100vh - 64px)',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-focus)',
                borderRadius: '14px',
                zIndex: 501,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column' as const,
                boxShadow: '0 24px 64px rgba(0,0,0,0.7)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '18px 20px', borderBottom: '1px solid var(--border-default)', flexShrink: 0 }}>
                <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.4, flex: 1, marginRight: 16 }}>{selectedMail.subject}</span>
                <button onClick={() => setSelectedMail(null)} style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--bg-hover)', border: '1px solid var(--border-default)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                  <X size={14} />
                </button>
              </div>
              <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-default)', display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
                {[
                  { label: 'From', value: selectedMail.from },
                  { label: 'To', value: selectedMail.to },
                  { label: 'Sent', value: new Date(selectedMail.date).toLocaleString('en-IE') },
                ].map((row, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', minWidth: 48, flexShrink: 0 }}>{row.label}</span>
                    <span style={{ fontSize: 13, color: 'var(--text-secondary)', wordBreak: 'break-all' }}>{row.value}</span>
                  </div>
                ))}
              </div>
              <div style={{ padding: 20, overflowY: 'auto', flex: 1 }}>
                <p style={{ fontSize: 15, color: 'var(--text-primary)', lineHeight: 1.8 }}>{selectedMail.body}</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px 20px', borderTop: '1px solid var(--border-default)', flexShrink: 0 }}>
                <button onClick={() => setSelectedMail(null)} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: 8, padding: '8px 20px', fontSize: 14, color: 'var(--text-secondary)', cursor: 'pointer' }}>Close</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* GMAIL-STYLE COMPOSE MODAL */}
      <AnimatePresence>
        {showCompose && (
          <motion.div
            className={`${styles.composeModal} ${composeMinimized ? styles.composeModalMin : ''}`}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className={styles.composeModalHeader} onClick={() => setComposeMinimized(!composeMinimized)}>
              <span className={styles.composeModalTitle}>New Message</span>
              <div className={styles.composeModalControls} onClick={e => e.stopPropagation()}>
                <button className={styles.composeCtrlBtn} onClick={() => setComposeMinimized(!composeMinimized)} title={composeMinimized ? 'Expand' : 'Minimize'}><Minus size={13} /></button>
                <button className={styles.composeCtrlBtn} onClick={() => setShowCompose(false)} title="Close"><X size={13} /></button>
              </div>
            </div>

            {!composeMinimized && (
              <>
                <div className={styles.composeFields}>
                  <div className={styles.composeFieldRow}>
                    <span className={styles.composeFieldLabel}>To</span>
                    <input className={styles.composeFieldInput} placeholder="recipient@example.com" value={composeTo} onChange={e => setComposeTo(e.target.value)} />
                  </div>
                  <div className={styles.composeDivider} />
                  <div className={styles.composeFieldRow}>
                    <span className={styles.composeFieldLabel}>Subject</span>
                    <input className={styles.composeFieldInput} placeholder="Email subject..." value={composeSubject} onChange={e => setComposeSubject(e.target.value)} />
                  </div>
                  <div className={styles.composeDivider} />
                </div>

                <div className={styles.composeEditorArea}>
                  <EditorContent editor={editor} />
                </div>

                <div className={styles.composeToolbar}>
                  <div className={styles.composeToolbarLeft}>
                    <button className={styles.sendBtnGmail} onClick={handleSend} disabled={composeSent || !composeTo || !composeSubject}>
                      {composeSent ? 'Sent!' : 'Send'}
                      {!composeSent && <Send size={13} style={{ marginLeft: 6 }} />}
                    </button>
                    <div className={styles.toolbarDivider} />
                    <button className={styles.toolbarIconBtn} onClick={() => editor?.chain().focus().toggleBold().run()} title="Bold"><Bold size={15} /></button>
                    <button className={styles.toolbarIconBtn} onClick={() => editor?.chain().focus().toggleItalic().run()} title="Italic"><Italic size={15} /></button>
                    <button className={styles.toolbarIconBtn} onClick={() => editor?.chain().focus().toggleBulletList().run()} title="Bullet list"><List size={15} /></button>
                    <button className={styles.toolbarIconBtn} onClick={() => editor?.chain().focus().toggleOrderedList().run()} title="Numbered list"><ListOrdered size={15} /></button>
                    <button className={styles.toolbarIconBtn} onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} title="Heading"><Heading2 size={15} /></button>
                  </div>
                  <div className={styles.composeToolbarRight}>
                    <label className={styles.toolbarIconBtn} title="Attach file">
                      <Paperclip size={15} />
                      <input type="file" style={{ display: 'none' }} />
                    </label>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
