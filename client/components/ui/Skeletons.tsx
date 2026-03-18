'use client'
import styles from './Skeletons.module.css'

function Sk({ w = '100%', h = 16, r = 8, delay = 0 }: { w?: string | number; h?: number; r?: number; delay?: number }) {
  return <div className={styles.skDark} style={{ width: w, height: h, borderRadius: r, animationDelay: `${delay}ms` }} />
}

export function DashboardSkeleton() {
  return (
    <div className={styles.wrap}>
      <div className={styles.welcome}>
        <Sk w={180} h={28} r={6} delay={0} />
        <Sk w={260} h={14} r={6} delay={80} />
      </div>
      <div className={styles.grid4}>
        {[0,1,2,3].map(i => (
          <div key={i} className={styles.cardSk} style={{ borderRadius: 14, padding: 20 }}>
            <Sk w={40} h={40} r={10} delay={i*40} />
            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Sk w="55%" h={11} r={4} delay={i*40+60} />
              <Sk w="80%" h={26} r={6} delay={i*40+120} />
              <Sk w="45%" h={10} r={4} delay={i*40+180} />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.cardSk} style={{ borderRadius: 14, padding: 20 }}>
        <Sk w={160} h={14} r={4} delay={0} />
        <div style={{ marginTop: 16 }}><Sk w="100%" h={220} r={8} delay={60} /></div>
      </div>
      <div className={styles.grid3}>
        <div className={styles.cardSk} style={{ borderRadius: 14, padding: 20 }}>
          <Sk w={120} h={14} r={4} delay={0} />
          <div style={{ marginTop: 12 }}><Sk w="100%" h={160} r={8} delay={60} /></div>
        </div>
        <div className={styles.cardSk} style={{ borderRadius: 14, padding: 20, gridColumn: 'span 2' }}>
          <Sk w={160} h={14} r={4} delay={40} />
          {[0,1,2,3].map(i => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:12, marginTop:16 }}>
              <Sk w={32} h={32} r={16} delay={i*60} />
              <div style={{ flex:1, display:'flex', flexDirection:'column', gap:6 }}>
                <Sk w="50%" h={12} r={4} delay={i*60+30} />
                <Sk w="70%" h={10} r={4} delay={i*60+60} />
              </div>
              <Sk w={60} h={22} r={20} delay={i*60+40} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.cardSk} style={{ borderRadius: 14, padding: 20 }}>
        <Sk w={140} h={14} r={4} delay={0} />
        {[0,1,2,3,4].map(i => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:14, marginTop:14 }}>
            <Sk w={36} h={36} r={18} delay={i*50} />
            <div style={{ flex:1, display:'flex', flexDirection:'column', gap:6 }}>
              <Sk w="40%" h={12} r={4} delay={i*50+30} />
              <Sk w="60%" h={10} r={4} delay={i*50+60} />
            </div>
            <Sk w={70} h={22} r={20} delay={i*50+40} />
          </div>
        ))}
      </div>
      <div className={styles.grid6}>
        {[0,1,2,3,4,5].map(i => (
          <div key={i} className={styles.cardSk} style={{ borderRadius:14, padding:18, display:'flex', flexDirection:'column', alignItems:'center', gap:10 }}>
            <Sk w={44} h={44} r={12} delay={i*40} />
            <Sk w="70%" h={11} r={4} delay={i*40+40} />
          </div>
        ))}
      </div>
    </div>
  )
}
