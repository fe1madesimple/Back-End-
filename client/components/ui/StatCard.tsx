import styles from './StatCard.module.css'

type CardColor = 'green' | 'blue' | 'red' | 'purple' | 'amber'

const colorMap: Record<CardColor, { value: string; border: string }> = {
  green:  { value: '#10B981', border: '#10B981' },
  blue:   { value: '#3B82F6', border: '#3B82F6' },
  red:    { value: '#EF4444', border: '#EF4444' },
  purple: { value: '#8B5CF6', border: '#8B5CF6' },
  amber:  { value: '#F59E0B', border: '#F59E0B' },
}

export default function StatCard({
  label, value, trend, trendDirection, color,
}: {
  label: string; value: string; trend: string; trendDirection: 'up' | 'down'; color: CardColor
}) {
  const c = colorMap[color]
  return (
    <div className={styles.card}>
      <div className={styles.topBar} style={{ background: c.border }} />
      <div className={styles.cardInner}>
        <div className={styles.topRow}>
          <span className={styles.label}>{label}</span>
          <div
            className={styles.trendPill}
            style={{
              color: trendDirection === 'up' ? '#10B981' : '#EF4444',
              background: trendDirection === 'up' ? '#10B98115' : '#EF444415',
            }}
          >
            <span>{trendDirection === 'up' ? '↑' : '↓'}</span>
            <span>{trend}</span>
          </div>
        </div>
        <div className={styles.value} style={{ color: c.value }}>{value}</div>
      </div>
    </div>
  )
}
