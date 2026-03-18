'use client'
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Badge from '@/components/ui/Badge'
import { users } from '@/lib/dummy-data'
import styles from './ai-predictor.module.css'

const USERS_PER_PAGE = 8

type AnalysisResult = {
  churnRisk: string
  riskScore: number
  riskFactors: string[]
  campaignType: string
  campaignMessage: string
  suggestedActions: string[]
}

export default function AIPredictorPage() {
  const [search, setSearch] = useState('')
  const [selectedUser, setSelectedUser] = useState<typeof users[0] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState('')
  const [toast, setToast] = useState('')
  const [page, setPage] = useState(1)
  const topRef = useRef<HTMLDivElement>(null)

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(filtered.length / USERS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * USERS_PER_PAGE, page * USERS_PER_PAGE)

  const handleSelectUser = (user: typeof users[0]) => {
    setSelectedUser(user)
    setResults(null)
    setError('')
    topRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    showToast('✓ Copied to clipboard')
  }

  const analyzeUser = async () => {
    if (!selectedUser) return
    setIsLoading(true)
    setResults(null)
    setError('')

    const daysInactive = Math.floor(
      (Date.now() - new Date(selectedUser.lastActive).getTime()) / 86400000
    )

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `You are an AI analyst for FE-1 Made Simple, an Irish law exam prep platform. Analyse this user and provide a structured assessment.

User data:
- Name: ${selectedUser.name}
- Plan: ${selectedUser.plan}
- Status: ${selectedUser.status}
- Days since last active: ${daysInactive}
- Current streak: ${selectedUser.streak} days
- Total revenue generated: €${selectedUser.revenue}
- Join date: ${selectedUser.joinDate}

Respond ONLY in this exact JSON format with no other text:
{
  "churnRisk": "HIGH or MEDIUM or LOW",
  "riskScore": 75,
  "riskFactors": ["factor 1", "factor 2", "factor 3"],
  "campaignType": "short campaign type name",
  "campaignMessage": "a 2-3 sentence personalised email to send to this user",
  "suggestedActions": ["action 1", "action 2", "action 3"]
}`
          }]
        })
      })

      const data = await response.json()
      const text = data.content?.[0]?.text ?? ''
      const clean = text.replace(/```json|```/g, '').trim()
      const parsed = JSON.parse(clean)
      setResults(parsed)
    } catch {
      setError('Analysis failed — please try again')
    } finally {
      setIsLoading(false)
    }
  }

  const riskColor = (risk: string) => {
    if (risk === 'HIGH') return '#EF4444'
    if (risk === 'MEDIUM') return '#F59E0B'
    return '#10B981'
  }

  const avatarColor = (plan: string) =>
    plan === 'Pro' ? '#10B981' : plan === 'Standard' ? '#2563EB' : '#4B5563'

  const initials = (name: string) =>
    name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  const planVariant = (plan: string): 'success' | 'info' | 'default' =>
    plan === 'Pro' ? 'success' : plan === 'Standard' ? 'info' : 'default'

  return (
    <div className={styles.page} ref={topRef}>

      {/* Header */}
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>AI User Predictor</h1>
        <p className={styles.subtitle}>Select a user to generate an AI-powered analysis, churn prediction, and recommended campaign actions.</p>
      </div>

      {/* ANALYSIS CARD - always at top */}
      <div className={styles.analysisCard}>
        {!selectedUser && (
          <div className={styles.emptyState}>
            <span style={{ fontSize: 32 }}>🔍</span>
            <p>Select a user below to begin analysis</p>
          </div>
        )}

        {selectedUser && (
          <div className={styles.selectedPanel}>
            <div className={styles.selectedHeader}>
              <div className={styles.selectedUser}>
                <div className={styles.avatar} style={{ background: avatarColor(selectedUser.plan) }}>
                  {initials(selectedUser.name)}
                </div>
                <div>
                  <div className={styles.selectedName}>{selectedUser.name}</div>
                  <div className={styles.selectedEmail}>{selectedUser.email}</div>
                </div>
              </div>
              <div className={styles.userPills}>
                <span className={styles.pill}>Plan: {selectedUser.plan}</span>
                <span className={styles.pill}>Status: {selectedUser.status}</span>
                <span className={styles.pill}>Streak: {selectedUser.streak} days</span>
                <span className={styles.pill}>Revenue: €{selectedUser.revenue}</span>
              </div>
            </div>

            <button
              className={styles.analyseBtn}
              onClick={analyzeUser}
              disabled={isLoading}
            >
              {isLoading ? 'Analysing...' : 'Analyse User →'}
            </button>

            {error && <p className={styles.error}>{error}</p>}

            {isLoading && (
              <div className={styles.loadingState}>
                <div className={styles.pulseBar} />
                <div className={styles.pulseBar} style={{ width: '70%', animationDelay: '0.15s' }} />
                <div className={styles.pulseBar} style={{ width: '85%', animationDelay: '0.3s' }} />
                <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 12 }}>AI is analysing this user&apos;s behaviour patterns...</p>
              </div>
            )}

            {results && (
              <div className={styles.resultsGrid}>

                {/* Churn Risk */}
                <div className={styles.resultCard}>
                  <h4 className={styles.resultTitle}>Churn Risk Assessment</h4>
                  <div className={styles.riskLevel} style={{ color: riskColor(results.churnRisk) }}>
                    {results.churnRisk}
                  </div>
                  <div className={styles.riskBarWrap}>
                    <div
                      className={styles.riskBar}
                      style={{ width: `${results.riskScore}%`, background: riskColor(results.churnRisk) }}
                    />
                  </div>
                  <div className={styles.riskScore} style={{ color: riskColor(results.churnRisk) }}>
                    Risk Score: {results.riskScore}%
                  </div>
                  <ul className={styles.factorList}>
                    {results.riskFactors.map((f: string, i: number) => (
                      <li key={i} className={styles.factorItem}>• {f}</li>
                    ))}
                  </ul>
                </div>

                {/* Campaign */}
                <div className={styles.resultCard}>
                  <h4 className={styles.resultTitle}>Recommended Campaign</h4>
                  <div className={styles.campaignType}>{results.campaignType}</div>
                  <p className={styles.campaignMsg}>{results.campaignMessage}</p>
                  <button
                    className={styles.copyBtn}
                    onClick={() => copyToClipboard(results.campaignMessage)}
                  >
                    📋 Copy Campaign Text
                  </button>
                </div>

                {/* Actions */}
                <div className={styles.resultCard}>
                  <h4 className={styles.resultTitle}>Suggested Actions</h4>
                  {[
                    { label: 'Send Re-engagement Email', color: 'var(--blue-primary)' },
                    { label: 'Change Plan',               color: 'var(--amber)'        },
                    { label: 'Add to Watch List',         color: 'var(--purple)'       },
                    { label: 'Mark as At-Risk',           color: 'var(--red)'          },
                  ].map((action, i) => (
                    <button
                      key={i}
                      className={styles.actionBtn}
                      style={{ borderColor: action.color, color: action.color }}
                      onClick={() => showToast(`✓ ${action.label} — recorded`)}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Search */}
      <div className={styles.searchWrap}>
        <input
          className={styles.searchInput}
          placeholder="Search user by name or email..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1) }}
        />
      </div>

      {/* User grid */}
      <div className={styles.userGrid}>
        {paginated.map(user => (
          <div
            key={user.id}
            className={`${styles.userCard} ${selectedUser?.id === user.id ? styles.userCardActive : ''}`}
            onClick={() => handleSelectUser(user)}
          >
            <div className={styles.userAvatar} style={{ background: avatarColor(user.plan) }}>
              {initials(user.name)}
            </div>
            <div className={styles.userInfo}>
              <div className={styles.userName}>{user.name}</div>
              <div className={styles.userEmail}>{user.email}</div>
            </div>
            <div className={styles.userBadges}>
              <Badge label={user.plan} variant={planVariant(user.plan)} />
              <Badge label={user.status} variant={user.status === 'Active' ? 'success' : user.status === 'Trial' ? 'warning' : 'default'} />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
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
      )}

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className={styles.toast}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
