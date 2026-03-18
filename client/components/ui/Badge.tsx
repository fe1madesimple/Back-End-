import styles from './Badge.module.css'

type BadgeVariant = 'success' | 'danger' | 'warning' | 'info' | 'purple' | 'default'

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
  success: { background: '#05231626', color: '#10B981', border: '1px solid #10B98133' },
  danger:  { background: '#45000A26', color: '#EF4444', border: '1px solid #EF444433' },
  warning: { background: '#42200626', color: '#F59E0B', border: '1px solid #F59E0B33' },
  info:    { background: '#1E3A5F',   color: '#3B82F6', border: '1px solid #3B82F633' },
  purple:  { background: '#2E106526', color: '#8B5CF6', border: '1px solid #8B5CF633' },
  default: { background: 'var(--bg-elevated)', color: 'var(--text-secondary)', border: '1px solid var(--border-default)' },
}

export default function Badge({ label, variant = 'default' }: { label: string; variant?: BadgeVariant }) {
  return (
    <span className={styles.badge} style={variantStyles[variant]}>
      {label}
    </span>
  )
}
