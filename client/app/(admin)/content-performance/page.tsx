'use client'
import { useMemo, useState } from 'react'
import { TrendingUp, TrendingDown, Clock, BookOpen, HelpCircle, Download } from 'lucide-react'
import Pagination from '@/components/ui/Pagination'
import { usePagination } from '@/lib/usePagination'
import { contentPerformanceData, lessonPerformance } from '@/lib/dummy-data'
import styles from './content-performance.module.css'

const passRateColor = (r: number) =>
  r >= 75 ? 'var(--green)' : r >= 55 ? 'var(--amber)' : 'var(--red)'

export default function ContentPerformancePage() {
  const d = contentPerformanceData
  const [subjectFilter, setSubjectFilter] = useState('All')
  const LESSONS_PER_PAGE = 15

  const filteredLessons = useMemo(
    () => lessonPerformance.filter((l) => subjectFilter === 'All' || l.subjectName === subjectFilter),
    [subjectFilter],
  )

  const {
    page: lessonPage,
    setPage: setLessonPage,
    paginated: paginatedLessons,
    total: lessonTotal,
  } = usePagination(filteredLessons, LESSONS_PER_PAGE)

  return (
    <div className={styles.page}>

      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Content Performance</h1>
          <p className={styles.subtitle}>Lesson completion rates, MCQ performance and engagement by subject</p>
        </div>
        <button className={styles.exportBtn} onClick={() => {}}><Download size={14} /> Export</button>
      </div>

      {/* Pulse */}
      <div className={styles.pulseGrid}>
        {[
          { label: 'Avg Completion Rate',   value: `${d.stats.avgCompletionRate}%`,  color: 'var(--green)',       icon: TrendingUp  },
          { label: 'Avg MCQ Pass Rate',     value: `${d.stats.avgMCQPassRate}%`,     color: 'var(--blue-bright)', icon: HelpCircle  },
          { label: 'Video Watch Hours',     value: `${d.stats.totalVideoWatchHours.toLocaleString()}h`, color: 'var(--purple)', icon: Clock },
          { label: 'Most Engaged Subject',  value: d.stats.mostEngagedSubject,       color: 'var(--amber)',       icon: BookOpen    },
          { label: 'Avg Time Per Lesson',   value: `${d.stats.avgTimePerLesson}min`, color: 'var(--cyan)',        icon: Clock       },
          { label: 'Highest Drop-Off',      value: d.stats.highDropOffLesson,        color: 'var(--red)',         icon: TrendingDown},
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
              <div className={styles.pulseValue} style={{ color: s.color, fontSize: typeof s.value === 'string' && s.value.length > 12 ? 13 : 20 }}>{s.value}</div>
            </div>
          )
        })}
      </div>

      {/* Subject engagement */}
      <div className={styles.card}>
        <div className={styles.cardHeader} style={{ marginBottom: 16 }}>
          <h3 className={styles.cardTitle}>Lesson Performance</h3>
          <div className={styles.filterPills}>
            {['All', ...Array.from(new Set(lessonPerformance.map((l) => l.subjectName)))].map((s) => (
              <button
                key={s}
                className={`${styles.filterBtn} ${subjectFilter === s ? styles.filterBtnActive : ''}`}
                onClick={() => {
                  setSubjectFilter(s)
                  setLessonPage(1)
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                {['Lesson', 'Subject', 'Attempts', 'Avg Score', 'Completion', 'Avg Time', 'Difficulty', 'Flags'].map((h) => (
                  <th key={h} className={styles.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedLessons.map((s) => (
                <tr key={s.id} className={styles.tr}>
                  <td className={styles.td}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{s.lessonTitle}</span>
                  </td>
                  <td className={styles.td}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.subjectColor, flexShrink: 0 }} />
                      <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{s.subjectName}</span>
                    </div>
                  </td>
                  <td className={styles.td}><span className={styles.numText}>{s.attempts}</span></td>
                  <td className={styles.td}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: passRateColor(s.avgScore) }}>{s.avgScore}%</span>
                  </td>
                  <td className={styles.td}>
                    <div className={styles.rateWrap}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: passRateColor(s.completionRate) }}>{s.completionRate}%</span>
                      <div className={styles.rateBar}><div className={styles.rateFill} style={{ width: `${s.completionRate}%`, background: passRateColor(s.completionRate) }} /></div>
                    </div>
                  </td>
                  <td className={styles.td}><span className={styles.numText}>{s.avgTimeMinutes}min</span></td>
                  <td className={styles.td}><span className={styles.numText}>{s.difficulty}</span></td>
                  <td className={styles.td}><span className={styles.numText}>{s.flagCount}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={lessonPage} total={lessonTotal} perPage={LESSONS_PER_PAGE} onChange={setLessonPage} />
      </div>

      {/* Top and drop-off lessons */}
      <div className={styles.twoCol}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle} style={{ marginBottom: 16 }}>Top Performing Lessons</h3>
          <div className={styles.lessonList}>
            {d.topLessons.map((l, i) => (
              <div key={i} className={styles.lessonRow}>
                <div className={styles.lessonRank} style={{ color: i < 3 ? 'var(--amber)' : 'var(--text-muted)' }}>{i + 1}</div>
                <div className={styles.lessonInfo}>
                  <div className={styles.lessonTitle}>{l.title}</div>
                  <div className={styles.lessonMeta}>{l.subject} · {l.views} views</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--green)' }}>{l.completionRate}%</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>completion</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle} style={{ marginBottom: 16 }}>High Drop-Off Lessons</h3>
          <div className={styles.lessonList}>
            {d.dropOffLessons.map((l, i) => (
              <div key={i} className={styles.lessonRow}>
                <div className={styles.lessonRank} style={{ color: 'var(--red)' }}>{i + 1}</div>
                <div className={styles.lessonInfo}>
                  <div className={styles.lessonTitle}>{l.title}</div>
                  <div className={styles.lessonMeta}>{l.subject} · {l.views} views</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--red)' }}>{l.dropOffRate}%</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>drop-off</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
