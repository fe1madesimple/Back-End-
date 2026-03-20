'use client'
import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Globe,
  Zap,
  CreditCard,
  Shield,
  Save,
  RefreshCw,
  Plus,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react'
import { settingsData } from '@/lib/dummy-data'
import styles from './settings.module.css'

type ToastType = { message: string; type: 'success' | 'danger' | 'warning' | 'info' }

export default function SettingsPage() {
  const [toast, setToast] = useState<ToastType | null>(null)
  const [platform, setPlatform] = useState(settingsData.platform)
  const [features, setFeatures] = useState(settingsData.features)
  const [saving, setSaving] = useState<string | null>(null)
  const [showWebhook, setShowWebhook] = useState(false)

  const showToast = useCallback((message: string, type: ToastType['type'] = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  const handleSave = (section: string) => {
    setSaving(section)
    setTimeout(() => {
      setSaving(null)
      showToast(`✓ ${section} settings saved`, 'success')
    }, 1200)
  }

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-IE', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })

  return (
    <div className={styles.page}>

      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>System & Settings</h1>
          <p className={styles.subtitle}>Platform configuration, feature flags, integrations and admin access</p>
        </div>
      </div>

      {/* Platform Settings */}
      <div className={styles.card}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIconWrap} style={{ background: '#3B82F620' }}>
            <Globe size={16} color='var(--blue-bright)' />
          </div>
          <div>
            <div className={styles.sectionTitle}>Platform Settings</div>
            <div className={styles.sectionSub}>Core platform configuration</div>
          </div>
        </div>
        <div className={styles.fieldsGrid}>
          {[
            { label: 'Platform Name', key: 'platformName', type: 'text' },
            { label: 'Support Email', key: 'supportEmail', type: 'email' },
            { label: 'Admin Email', key: 'adminEmail', type: 'email' },
            { label: 'Timezone', key: 'timezone', type: 'text' },
          ].map((f) => (
            <div key={f.key} className={styles.fieldWrap}>
              <label className={styles.fieldLabel}>{f.label}</label>
              <input
                type={f.type}
                className={styles.fieldInput}
                value={platform[f.key as keyof typeof platform] as string}
                onChange={(e) => setPlatform((prev) => ({ ...prev, [f.key]: e.target.value }))}
              />
            </div>
          ))}
        </div>
        <div className={styles.toggleRow}>
          <div>
            <div className={styles.toggleLabel}>Maintenance Mode</div>
            <div className={styles.toggleSub}>Disables student access and shows maintenance page</div>
          </div>
          <button
            className={`${styles.toggle} ${platform.maintenanceMode ? styles.toggleOn : ''}`}
            style={platform.maintenanceMode ? { background: 'var(--red)', borderColor: 'var(--red)' } : {}}
            onClick={() => setPlatform((prev) => ({ ...prev, maintenanceMode: !prev.maintenanceMode }))}
          />
        </div>
        {platform.maintenanceMode && (
          <div className={styles.warningBox}>
            Maintenance mode is ON - students cannot access the platform
          </div>
        )}
        <div className={styles.saveRow}>
          <button className={styles.saveBtn} onClick={() => handleSave('Platform')} disabled={saving === 'Platform'}>
            {saving === 'Platform' ? <><RefreshCw size={13} className={styles.spinning} /> Saving...</> : <><Save size={13} /> Save Platform Settings</>}
          </button>
        </div>
      </div>

      {/* Feature Flags */}
      <div className={styles.card}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIconWrap} style={{ background: '#8B5CF620' }}>
            <Zap size={16} color='var(--purple)' />
          </div>
          <div>
            <div className={styles.sectionTitle}>Feature Flags</div>
            <div className={styles.sectionSub}>Enable or disable platform features in real time</div>
          </div>
        </div>
        <div className={styles.featuresGrid}>
          {[
            { key: 'aiEssayGrading', label: 'AI Essay Grading', sub: 'Claude AI grades student essay submissions automatically' },
            { key: 'aiPredictor', label: 'AI Predictor', sub: 'AI churn prediction and user intelligence features' },
            { key: 'streakAlerts', label: 'Streak Alerts', sub: 'Send automated emails when students break their study streak' },
            { key: 'podcastRecommendations', label: 'Podcast Recommendations', sub: 'Show relevant podcast episodes alongside lessons' },
            { key: 'simulationExams', label: 'Simulation Exams', sub: 'Full exam simulation mode with timed sessions' },
            { key: 'trialEnabled', label: 'Free Trial', sub: `${features.trialDurationDays}-day free trial for new users` },
          ].map((f) => (
            <div key={f.key} className={styles.featureRow}>
              <div className={styles.featureInfo}>
                <div className={styles.featureName}>{f.label}</div>
                <div className={styles.featureSub}>{f.sub}</div>
              </div>
              <button
                className={`${styles.toggle} ${features[f.key as keyof typeof features] ? styles.toggleOn : ''}`}
                onClick={() => setFeatures((prev) => ({ ...prev, [f.key]: !prev[f.key as keyof typeof prev] }))}
              />
            </div>
          ))}
        </div>
        <div className={styles.saveRow}>
          <button className={styles.saveBtn} onClick={() => handleSave('Features')} disabled={saving === 'Features'}>
            {saving === 'Features' ? <><RefreshCw size={13} className={styles.spinning} /> Saving...</> : <><Save size={13} /> Save Feature Flags</>}
          </button>
        </div>
      </div>

      {/* Stripe Config */}
      <div className={styles.card}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIconWrap} style={{ background: '#10B98120' }}>
            <CreditCard size={16} color='var(--green)' />
          </div>
          <div>
            <div className={styles.sectionTitle}>Stripe Configuration</div>
            <div className={styles.sectionSub}>Price IDs and webhook endpoint</div>
          </div>
        </div>
        <div className={styles.fieldsGrid}>
          <div className={styles.fieldWrap} style={{ gridColumn: 'span 2' }}>
            <label className={styles.fieldLabel}>Webhook Endpoint</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type={showWebhook ? 'text' : 'password'}
                className={styles.fieldInput}
                defaultValue={settingsData.stripe.webhookEndpoint}
                style={{ paddingRight: 40 }}
              />
              <button
                type='button'
                onClick={() => setShowWebhook((v) => !v)}
                style={{ position: 'absolute', right: 12, background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                {showWebhook ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>
          {[
            { label: 'Standard Monthly Price ID', value: settingsData.stripe.standardMonthlyPriceId },
            { label: 'Standard Annual Price ID', value: settingsData.stripe.standardAnnualPriceId },
            { label: 'Pro Monthly Price ID', value: settingsData.stripe.proMonthlyPriceId },
            { label: 'Pro Annual Price ID', value: settingsData.stripe.proAnnualPriceId },
          ].map((f, i) => (
            <div key={i} className={styles.fieldWrap}>
              <label className={styles.fieldLabel}>{f.label}</label>
              <input className={styles.fieldInput} defaultValue={f.value} style={{ fontFamily: 'monospace', fontSize: 13 }} />
            </div>
          ))}
        </div>
        <div className={styles.saveRow}>
          <button className={styles.saveBtn} onClick={() => handleSave('Stripe')} disabled={saving === 'Stripe'}>
            {saving === 'Stripe' ? <><RefreshCw size={13} className={styles.spinning} /> Saving...</> : <><Save size={13} /> Save Stripe Config</>}
          </button>
        </div>
      </div>

      {/* Admin Users */}
      <div className={styles.card}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIconWrap} style={{ background: '#EF444420' }}>
            <Shield size={16} color='var(--red)' />
          </div>
          <div>
            <div className={styles.sectionTitle}>Admin Users</div>
            <div className={styles.sectionSub}>Manage who has access to this dashboard</div>
          </div>
          <button className={styles.addAdminBtn} style={{ marginLeft: 'auto' }}>
            <Plus size={13} /> Add Admin
          </button>
        </div>
        <div className={styles.adminList}>
          {settingsData.admins.map((admin) => (
            <div key={admin.id} className={styles.adminRow}>
              <div className={styles.adminAvatar}>
                {admin.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </div>
              <div className={styles.adminInfo}>
                <div className={styles.adminName}>{admin.name}</div>
                <div className={styles.adminEmail}>{admin.email}</div>
              </div>
              <div className={styles.adminRole}>{admin.role}</div>
              <div className={styles.adminLastLogin}>Last login {formatDate(admin.lastLogin)}</div>
              <button className={styles.removeBtn} onClick={() => showToast(`✓ Admin access revoked for ${admin.name}`, 'warning')}>
                <Trash2 size={13} />
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
