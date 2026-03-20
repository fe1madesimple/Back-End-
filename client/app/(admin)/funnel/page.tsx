'use client'
import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TrendingUp, Users, Target, CreditCard,
  Clock, ArrowDown, Mail, RefreshCw,
  CheckCircle, AlertCircle, AlertTriangle,
  Download, ChevronRight, Zap
} from 'lucide-react'
import Badge from '@/components/ui/Badge'
import { funnelData } from '@/lib/dummy-data'
import styles from './funnel.module.css'

type ToastType = { message: string; type: 'success' | 'danger' | 'warning' | 'info' }

export default function FunnelPage() {
  const [toast, setToast] = useState<ToastType | null>(null)
  const [nudgingId, setNudgingId] = useState<string | null>(null)
  const [sentNudges, setSentNudges] = useState<string[]>([])
  const [emailingId, setEmailingId] = useState<string | null>(null)
  const [stageFilter, setStageFilter] = useState('All')

  const showToast = useCallback((message: string, type: ToastType['type'] = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  const handleNudge = (id: string, label: string) => {
    setNudgingId(id)
    setTimeout(() => {
      setNudgingId(null)
      setSentNudges(prev => [...prev, id])
      showToast(`✓ Campaign sent — ${label}`, 'success')
    }, 1800)
  }

  const handleEmail = (id: string, name: string) => {
    setEmailingId(id)
    setTimeout(() => {
      setEmailingId(null)
      showToast(`✓ Nudge email sent to ${name}`, 'success')
    }, 1400)
  }

  const filteredStuck = funnelData.stuckUsers.filter(u =>
    stageFilter === 'All' || u.stage === stageFilter
  )

  const d = funnelData
  const maxCount = Math.max(...d.stages.map(s => s.count))

  const nudgeSeverityColor = (s: string) =>
    s === 'danger' ? 'var(--red)' : s === 'warning' ? 'var(--amber)' : 'var(--blue-bright)'

  const nudgeSeverityBg = (s: string) =>
    s === 'danger' ? 'var(--red-bg)' : s === 'warning' ? 'var(--amber-bg)' : 'var(--blue-muted)'

  return (
    <div className={styles.page}>

      {/* Page header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Conversion Funnel</h1>
          <p className={styles.subtitle}>Track where users drop off — from signup to paid subscriber</p>
        </div>
        <button className={styles.exportBtn} onClick={() => showToast('✓ Funnel report exported', 'info')}>
          <Download size={14} /> Export Report
        </button>
      </div>

      {/* ═══ SECTION 1 — PULSE ═══ */}
      <div className={styles.pulseGrid}>
        {[
          { label: 'Signups This Month',       value: d.totalSignupsThisMonth,            color: 'var(--blue-bright)', icon: Users,      sub: 'new registrations'              },
          { label: 'Trial → Paid Rate',         value: `${d.trialToPaidRate}%`,            color: 'var(--green)',       icon: TrendingUp, sub: 'conversion rate'                },
          { label: 'Signup → Onboarded',        value: `${d.signupToOnboardedRate}%`,      color: 'var(--purple)',      icon: CheckCircle,sub: 'complete onboarding'            },
          { label: 'Onboarded → First Lesson',  value: `${d.onboardedToFirstLessonRate}%`, color: 'var(--cyan)',        icon: Target,     sub: 'start studying'                 },
          { label: 'Avg Days to First Payment', value: `${d.avgDaysToFirstPayment}d`,      color: 'var(--amber)',       icon: Clock,      sub: 'from signup to payment'         },
          { label: 'Revenue from Conversions',  value: `€${d.revenueFromConversionsThisMonth}`, color: 'var(--green)', icon: CreditCard, sub: 'this month from new subscribers' },
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

      {/* ═══ SECTION 2 — VISUAL FUNNEL ═══ */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>Conversion Funnel</h3>
            <p className={styles.cardSub}>Each stage shows how many users reached it and how many dropped off</p>
          </div>
        </div>
        <div className={styles.funnelViz}>
          {d.stages.map((stage, i) => {
            const widthPercent = (stage.count / maxCount) * 100
            const isWorstDropOff = stage.dropOff === Math.max(...d.stages.map(s => s.dropOff))
            return (
              <div key={stage.stage} className={styles.funnelStageWrap}>
                <div className={styles.funnelStageRow}>
                  {/* Label left */}
                  <div className={styles.funnelLabel}>
                    <div className={styles.funnelStageName}>{stage.stage}</div>
                    <div className={styles.funnelCount} style={{ color: stage.color }}>
                      {stage.count.toLocaleString()} users
                    </div>
                  </div>

                  {/* Bar */}
                  <div className={styles.funnelBarTrack}>
                    <motion.div
                      className={styles.funnelBar}
                      style={{ background: stage.color + 'CC' }}
                      initial={{ width: 0 }}
                      animate={{ width: `${widthPercent}%` }}
                      transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
                    />
                    {isWorstDropOff && stage.dropOff > 0 && (
                      <span className={styles.worstDropLabel}>Biggest drop-off</span>
                    )}
                  </div>

                  {/* Percent right */}
                  <div className={styles.funnelPercent}>
                    <span style={{ color: stage.color, fontWeight: 700, fontSize: 15 }}>
                      {stage.percent}%
                    </span>
                    {i > 0 && <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>of previous</span>}
                  </div>
                </div>

                {/* Drop-off indicator */}
                {stage.dropOff > 0 && i < d.stages.length - 1 && (
                  <div className={styles.dropOffRow}>
                    <ArrowDown size={12} color={isWorstDropOff ? 'var(--red)' : 'var(--text-muted)'} />
                    <span style={{ fontSize: 11, color: isWorstDropOff ? 'var(--red)' : 'var(--text-muted)', fontWeight: isWorstDropOff ? 600 : 400 }}>
                      {stage.dropOff} users dropped off here
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* ═══ SECTION 3 — STUCK USERS TABLE ═══ */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>Users Stuck in Funnel</h3>
            <p className={styles.cardSub}>Users who have not progressed past their current stage</p>
          </div>
          <div className={styles.filterPills}>
            {['All', ...Array.from(new Set(funnelData.stuckUsers.map(u => u.stage)))].map(f => (
              <button
                key={f}
                className={`${styles.filterBtn} ${stageFilter === f ? styles.filterBtnActive : ''}`}
                onClick={() => setStageFilter(f)}
              >
                {f === 'All' ? 'All Stages' : f}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                {['User', 'Stuck At Stage', 'Days Since Signup', 'Plan', 'Action'].map(h => (
                  <th key={h} className={styles.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredStuck.map(u => {
                const stageData = d.stages.find(s => s.stage === u.stage)
                return (
                  <tr key={u.id} className={styles.tr}>
                    <td className={styles.td}>
                      <div className={styles.userCell}>
                        <div className={styles.userAvatar} style={{ background: stageData?.color ?? '#4B5563' }}>
                          {u.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <div className={styles.userName}>{u.name}</div>
                          <div className={styles.userEmail}>{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className={styles.td}>
                      <span
                        style={{
                          fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 20,
                          background: (stageData?.color ?? '#4B5563') + '20',
                          color: stageData?.color ?? '#4B5563',
                          border: `1px solid ${(stageData?.color ?? '#4B5563')}40`,
                        }}
                      >
                        {u.stage}
                      </span>
                    </td>
                    <td className={styles.td}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: u.daysSinceSignup >= 10 ? 'var(--red)' : 'var(--amber)' }}>
                        {u.daysSinceSignup}d
                      </span>
                    </td>
                    <td className={styles.td}>
                      <Badge label={u.plan} variant={u.plan === 'Trial' ? 'warning' : 'default'} />
                    </td>
                    <td className={styles.td}>
                      <button
                        className={styles.nudgeBtn}
                        onClick={() => handleEmail(u.id, u.name)}
                        disabled={emailingId === u.id}
                      >
                        {emailingId === u.id
                          ? <><RefreshCw size={12} className={styles.spinning} /> Sending...</>
                          : <><Mail size={12} /> Send Nudge</>
                        }
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ═══ SECTION 4 — NUDGE CAMPAIGNS ═══ */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>Automated Nudge Campaigns</h3>
            <p className={styles.cardSub}>Fire a targeted email campaign at each stuck segment with one click</p>
          </div>
        </div>
        <div className={styles.nudgeGrid}>
          {d.nudgeCampaigns.map(n => (
            <div
              key={n.id}
              className={styles.nudgeCard}
              style={{ borderLeftColor: nudgeSeverityColor(n.severity), background: nudgeSeverityBg(n.severity) }}
            >
              <div className={styles.nudgeTop}>
                <span className={styles.nudgeStage} style={{ color: nudgeSeverityColor(n.severity) }}>
                  Stuck at: {n.stage}
                </span>
                <span className={styles.nudgeCount} style={{ color: nudgeSeverityColor(n.severity) }}>
                  {n.count} users
                </span>
              </div>
              <button
                className={styles.nudgeCampaignBtn}
                onClick={() => handleNudge(n.id, n.label)}
                disabled={nudgingId === n.id || sentNudges.includes(n.id)}
                style={{
                  borderColor: sentNudges.includes(n.id) ? 'var(--green)' : nudgeSeverityColor(n.severity),
                  color: sentNudges.includes(n.id) ? 'var(--green)' : nudgeSeverityColor(n.severity),
                }}
              >
                {nudgingId === n.id
                  ? <><RefreshCw size={12} className={styles.spinning} /> Sending...</>
                  : sentNudges.includes(n.id)
                    ? <><CheckCircle size={12} /> Campaign Sent</>
                    : <><Mail size={12} /> {n.label}</>
                }
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div
            style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 700, background: 'var(--bg-elevated)', border: `1px solid ${toast.type === 'success' ? 'var(--green)' : toast.type === 'danger' ? 'var(--red)' : toast.type === 'warning' ? 'var(--amber)' : 'var(--blue-bright)'}`, borderRadius: 10, padding: '12px 20px', fontSize: 14, color: 'var(--text-primary)', boxShadow: '0 8px 24px rgba(0,0,0,0.4)', minWidth: 260 }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.25 }}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
