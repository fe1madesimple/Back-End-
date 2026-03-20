'use client'
import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText, CheckCircle, Flag, TrendingUp,
  Clock, Star, Download, X,
  RefreshCw
} from 'lucide-react'
import Badge from '@/components/ui/Badge'
import { essayMonitorData } from '@/lib/dummy-data'
import styles from './essay-monitor.module.css'

type ToastType = { message: string; type: 'success' | 'danger' | 'warning' | 'info' }

const bandVariant = (band: string): 'success' | 'info' | 'warning' | 'danger' | 'default' =>
  band === 'A' ? 'success' : band === 'B' ? 'info' : band === 'C' ? 'warning' : band === 'D' || band === 'F' ? 'danger' : 'default'

const scoreColor = (score: number) =>
  score >= 80 ? 'var(--green)' : score >= 65 ? 'var(--blue-bright)' : score >= 50 ? 'var(--amber)' : 'var(--red)'

const relativeTime = (d: string) => {
  const diff = Math.floor((Date.now() - new Date(d).getTime()) / 60000)
  if (diff < 60) return `${diff}m ago`
  if (diff < 1440) return `${Math.floor(diff / 60)}h ago`
  return `${Math.floor(diff / 1440)}d ago`
}

export default function EssayMonitorPage() {
  const [toast, setToast] = useState<ToastType | null>(null)
  const [filterBand, setFilterBand] = useState('All')
  const [filterFlagged, setFilterFlagged] = useState(false)
  const [selectedEssay, setSelectedEssay] = useState<typeof essayMonitorData.recentEssays[0] | null>(null)
  const [flaggingId, setFlaggingId] = useState<string | null>(null)

  const showToast = useCallback((message: string, type: ToastType['type'] = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  const handleFlag = (id: string, name: string) => {
    setFlaggingId(id)
    setTimeout(() => {
      setFlaggingId(null)
      showToast(`✓ Essay by ${name} flagged for human review`, 'warning')
    }, 1200)
  }

  const d = essayMonitorData
  const totalGraded = d.gradeDistribution.reduce((s, g) => s + g.count, 0)

  const filtered = d.recentEssays.filter((e) => {
    const matchBand = filterBand === 'All' || e.band === filterBand
    const matchFlagged = !filterFlagged || e.flagged
    return matchBand && matchFlagged
  })

  return (
    <div className={styles.page}>

      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Essay Grading Monitor</h1>
          <p className={styles.subtitle}>AI-graded essay submissions - quality control and human review queue</p>
        </div>
        <button className={styles.exportBtn} onClick={() => showToast('✓ Essay report exported', 'info')}>
          <Download size={14} /> Export Report
        </button>
      </div>

      {/* Pulse */}
      <div className={styles.pulseGrid}>
        {[
          { label: 'Total Submissions', value: d.stats.totalSubmissions, color: 'var(--blue-bright)', icon: FileText,    sub: 'all time'              },
          { label: 'AI Graded',         value: d.stats.gradedByAI,       color: 'var(--green)',       icon: CheckCircle, sub: 'graded automatically'  },
          { label: 'Flagged for Review',value: d.stats.flaggedForReview, color: 'var(--red)',         icon: Flag,        sub: 'need human review'     },
          { label: 'Avg AI Score',      value: `${d.stats.avgScore}%`,   color: 'var(--amber)',       icon: Star,        sub: 'across all submissions'},
          { label: 'Avg Grading Time',  value: `${d.stats.avgGradingTimeSeconds}s`, color: 'var(--purple)', icon: Clock, sub: 'per essay'            },
          { label: 'Pass Rate',         value: `${d.stats.passRate}%`,   color: 'var(--green)',       icon: TrendingUp,  sub: 'scored 50% or above'   },
        ].map((s, i) => {
          const Icon = s.icon
          return (
            <div key={i} className={styles.pulseCard}>
              <div className={styles.pulseTop}>
                <div className={styles.pulseLabel}>{s.label}</div>
                <div className={styles.pulseIconWrap} style={{ background: s.color + '20' }}>
                  <Icon size={15} color={s.color} />
                </div>
              </div>
              <div className={styles.pulseValue} style={{ color: s.color }}>{s.value}</div>
              <div className={styles.pulseSub}>{s.sub}</div>
            </div>
          )
        })}
      </div>

      {/* Grade distribution */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle} style={{ marginBottom: 16 }}>Grade Distribution</h3>
        <div className={styles.gradeDistrib}>
          {d.gradeDistribution.map((g, i) => (
            <div key={i} className={styles.gradeBar}>
              <div className={styles.gradeBarLabel}>{g.band}</div>
              <div className={styles.gradeBarTrack}>
                <motion.div
                  className={styles.gradeBarFill}
                  style={{ background: g.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(g.count / totalGraded) * 100}%` }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
                />
              </div>
              <div className={styles.gradeBarCount} style={{ color: g.color }}>{g.count}</div>
              <div className={styles.gradeBarPercent}>{Math.round((g.count / totalGraded) * 100)}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Essays table */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>Recent Submissions</h3>
            <p className={styles.cardSub}>{filtered.length} essays</p>
          </div>
          <div className={styles.filterRow}>
            <div className={styles.filterPills}>
              {['All', 'A', 'B', 'C', 'D', 'F'].map((b) => (
                <button
                  key={b}
                  className={`${styles.filterBtn} ${filterBand === b ? styles.filterBtnActive : ''}`}
                  onClick={() => setFilterBand(b)}
                >
                  {b === 'All' ? 'All Grades' : `Grade ${b}`}
                </button>
              ))}
            </div>
            <button
              className={`${styles.filterBtn} ${filterFlagged ? styles.filterBtnDanger : ''}`}
              onClick={() => setFilterFlagged((f) => !f)}
            >
              <Flag size={11} /> {filterFlagged ? 'Showing Flagged' : 'Show Flagged'}
            </button>
          </div>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                {['Student', 'Subject', 'Score', 'Band', 'Words', 'AI Time', 'Graded', 'Actions'].map((h) => (
                  <th key={h} className={styles.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => (
                <tr
                  key={e.id}
                  className={`${styles.tr} ${e.flagged ? styles.trFlagged : ''}`}
                  onClick={() => setSelectedEssay(e)}
                  style={{ cursor: 'pointer' }}
                >
                  <td className={styles.td}>
                    <div className={styles.userCell}>
                      <div className={styles.userAvatar} style={{ background: scoreColor(e.score) }}>
                        {e.userName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <div className={styles.userName}>{e.userName}</div>
                        <div className={styles.userEmail}>{e.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className={styles.td}><span className={styles.subjectTag}>{e.subject}</span></td>
                  <td className={styles.td}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: scoreColor(e.score) }}>{e.score}%</span>
                  </td>
                  <td className={styles.td}><Badge label={`Grade ${e.band}`} variant={bandVariant(e.band)} /></td>
                  <td className={styles.td}><span className={styles.numText}>{e.wordCount}w</span></td>
                  <td className={styles.td}><span className={styles.numText}>{e.timeTaken}s</span></td>
                  <td className={styles.td}><span className={styles.numText}>{relativeTime(e.gradedAt)}</span></td>
                  <td className={styles.td} onClick={(ev) => ev.stopPropagation()}>
                    <div className={styles.rowActions}>
                      {e.flagged && (
                        <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--red)', background: 'var(--red-bg)', border: '1px solid var(--red)', borderRadius: 20, padding: '2px 6px' }}>
                          FLAGGED
                        </span>
                      )}
                      <button
                        className={styles.flagBtn}
                        onClick={() => handleFlag(e.id, e.userName)}
                        disabled={flaggingId === e.id || e.flagged}
                      >
                        {flaggingId === e.id ? <RefreshCw size={11} className={styles.spinning} /> : <Flag size={11} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Essay detail overlay */}
      <AnimatePresence>
        {selectedEssay && (
          <>
            <motion.div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 500 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedEssay(null)} />
            <motion.div
              style={{ position: 'fixed', top: '50%', left: '50%', x: '-50%', y: '-50%', width: 580, maxWidth: 'calc(100vw - 32px)', maxHeight: 'calc(100vh - 48px)', background: 'var(--bg-elevated)', border: '1px solid var(--border-focus)', borderRadius: 14, zIndex: 501, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 64px rgba(0,0,0,0.7)' }}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.22 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', borderBottom: '1px solid var(--border-default)', flexShrink: 0 }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>{selectedEssay.userName}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{selectedEssay.subject} · {relativeTime(selectedEssay.gradedAt)}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: scoreColor(selectedEssay.score) }}>{selectedEssay.score}%</div>
                  <Badge label={`Grade ${selectedEssay.band}`} variant={bandVariant(selectedEssay.band)} />
                  <button onClick={() => setSelectedEssay(null)} style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--bg-hover)', border: '1px solid var(--border-default)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><X size={14} /></button>
                </div>
              </div>
              <div style={{ overflowY: 'auto', flex: 1, padding: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: 8, padding: '14px 18px' }}>
                  <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Question</div>
                  <div style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.7 }}>{selectedEssay.question}</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                  {[
                    { label: 'AI Score',    value: `${selectedEssay.aiScore}%`,     color: scoreColor(selectedEssay.score) },
                    { label: 'Word Count',  value: `${selectedEssay.wordCount}w`,   color: 'var(--text-primary)' },
                    { label: 'AI Time',     value: `${selectedEssay.timeTaken}s`,   color: 'var(--purple)' },
                    { label: 'Status',      value: selectedEssay.flagged ? 'Flagged' : 'Auto-graded', color: selectedEssay.flagged ? 'var(--red)' : 'var(--green)' },
                  ].map((s, i) => (
                    <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: 8, padding: '10px 14px', textAlign: 'center' }}>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{s.label}</div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: s.color }}>{s.value}</div>
                    </div>
                  ))}
                </div>
                {selectedEssay.flagged && (
                  <div style={{ background: 'var(--red-bg)', border: '1px solid var(--red)', borderRadius: 8, padding: '12px 16px', fontSize: 13, color: 'var(--red)' }}>
                    This essay has been flagged for human review - AI score may not reflect actual quality
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', gap: 10, padding: '16px 24px', borderTop: '1px solid var(--border-default)', flexShrink: 0 }}>
                {!selectedEssay.flagged && (
                  <button onClick={() => { handleFlag(selectedEssay.id, selectedEssay.userName); setSelectedEssay(null) }} style={{ background: 'var(--amber-bg)', border: '1px solid var(--amber)', color: 'var(--amber)', borderRadius: 8, padding: '9px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Flag size={13} /> Flag for Review
                  </button>
                )}
                <button onClick={() => setSelectedEssay(null)} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: 8, padding: '9px 16px', fontSize: 13, color: 'var(--text-secondary)', cursor: 'pointer' }}>Close</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 700, background: 'var(--bg-elevated)', border: `1px solid ${toast.type === 'success' ? 'var(--green)' : toast.type === 'danger' ? 'var(--red)' : toast.type === 'warning' ? 'var(--amber)' : 'var(--blue-bright)'}`, borderRadius: 10, padding: '12px 20px', fontSize: 14, color: 'var(--text-primary)', boxShadow: '0 8px 24px rgba(0,0,0,0.4)', minWidth: 260 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.25 }}>
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
