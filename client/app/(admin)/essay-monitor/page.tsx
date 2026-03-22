"use client";
import { useState, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  CheckCircle,
  Flag,
  TrendingUp,
  Clock,
  Star,
  Download,
  X,
  RefreshCw,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import Pagination from "@/components/ui/Pagination";
import { usePagination } from "@/lib/usePagination";
import { essayAttempts, practiceSessions, simulations } from "@/lib/dummy-data";
import styles from "./essay-monitor.module.css";

type ToastType = {
  message: string;
  type: "success" | "danger" | "warning" | "info";
};

const bandVariant = (
  band: string,
): "success" | "info" | "warning" | "danger" | "default" =>
  band === "A"
    ? "success"
    : band === "B"
      ? "info"
      : band === "C"
        ? "warning"
        : band === "D" || band === "F"
          ? "danger"
          : "default";

const scoreColor = (score: number) =>
  score >= 80
    ? "var(--green)"
    : score >= 65
      ? "var(--blue-bright)"
      : score >= 50
        ? "var(--amber)"
        : "var(--red)";

const relativeTime = (d: string) => {
  const diff = Math.floor((Date.now() - new Date(d).getTime()) / 60000);
  if (diff < 60) return `${diff}m ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
  return `${Math.floor(diff / 1440)}d ago`;
};


  const [toast, setToast] = useState<ToastType | null>(null);
  const [tab, setTab] = useState<'lesson' | 'practice' | 'simulation'>('lesson');
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [selectedEssay, setSelectedEssay] = useState<any>(null);
  const [expandedSession, setExpandedSession] = useState<string | null>(null);
  const [expandedSim, setExpandedSim] = useState<string | null>(null);

  // Filter helpers
  const lessonEssays = essayAttempts.filter(e => e.source === 'LESSON' || e.essayQuestionId);
  const filteredLessonEssays = lessonEssays.filter(e =>
    (!search || e.userName.toLowerCase().includes(search.toLowerCase()) || e.userEmail.toLowerCase().includes(search.toLowerCase())) &&
    (subjectFilter === 'All' || e.subject === subjectFilter)
  );
  const {
    page: lessonPage,
    setPage: setLessonPage,
    paginated: paginatedLessonEssays,
    total: lessonTotal,
    reset: resetLessonPage,
  } = usePagination(filteredLessonEssays, 15);

  useEffect(() => { resetLessonPage(); }, [search, subjectFilter, resetLessonPage]);

  // Practice Sessions
  const filteredPracticeSessions = practiceSessions.filter(s =>
    subjectFilter === 'All' || s.subject === subjectFilter
  );
  const {
    page: practicePage,
    setPage: setPracticePage,
    paginated: paginatedPracticeSessions,
    total: practiceTotal,
    reset: resetPracticePage,
  } = usePagination(filteredPracticeSessions, 10);
  useEffect(() => { resetPracticePage(); }, [subjectFilter, resetPracticePage]);

  // Simulations
  const filteredSimulations = simulations.filter(s =>
    subjectFilter === 'All' || s.subject === subjectFilter
  );
  const {
    page: simPage,
    setPage: setSimPage,
    paginated: paginatedSimulations,
    total: simTotal,
    reset: resetSimPage,
  } = usePagination(filteredSimulations, 10);
  useEffect(() => { resetSimPage(); }, [subjectFilter, resetSimPage]);

  const showToast = useCallback(
    (message: string, type: ToastType["type"] = "success") => {
      setToast({ message, type });
      setTimeout(() => setToast(null), 3000);
    },
    return (
      <div className={styles.page}>
        {/* Header */}
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.title}>Essay Grading Monitor</h1>
            <p className={styles.subtitle}>Monitor and review all essay submissions, practice sessions, and simulations.</p>
          </div>
        </div>

        {/* Sub-tab navigation */}
        <div className={styles.tabNav}>
          {[
            { key: 'lesson', label: 'Lesson Essays' },
            { key: 'practice', label: 'Practice Sessions' },
            { key: 'simulation', label: 'Simulations' },
          ].map(t => (
            <button
              key={t.key}
              className={tab === t.key ? styles.tabActive : styles.tabBtn}
              onClick={() => setTab(t.key as any)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Sub-tab content */}
        {tab === 'lesson' && (
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Lesson Essays</h3>
              <div className={styles.filterRow}>
                <input
                  className={styles.searchInput}
                  placeholder="Search student..."
                  value={search}
                  onChange={e => { setSearch(e.target.value); setLessonPage(1); }}
                />
                <div className={styles.filterPills}>
                  {["All", ...Array.from(new Set(lessonEssays.map(e => e.subject)))].map(s => (
                    <button
                      key={s}
                      className={subjectFilter === s ? styles.filterBtnActive : styles.filterBtn}
                      onClick={() => { setSubjectFilter(s); setLessonPage(1); }}
                    >
                      {s === "All" ? "All Subjects" : s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Subject</th>
                    <th>Lesson</th>
                    <th>Word Count</th>
                    <th>Time Taken</th>
                    <th>AI Score</th>
                    <th>Band</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedLessonEssays.map(e => (
                    <tr key={e.id} className={styles.tr}>
                      <td>
                        <div className={styles.userCell}>
                          <div className={styles.userAvatar} style={{ background: scoreColor(e.aiScore) }}>
                            {e.userName.split(" ").map(n => n[0]).join("").slice(0, 2)}
                          </div>
                          <div>
                            <div className={styles.userName}>{e.userName}</div>
                            <div className={styles.userEmail}>{e.userEmail}</div>
                          </div>
                        </div>
                      </td>
                      <td><span className={styles.subjectTag} style={{ background: e.subjectColor }}>{e.subject}</span></td>
                      <td><span className={styles.lessonTitleCell}>{e.lessonTitle ? e.lessonTitle.slice(0, 32) : "—"}</span></td>
                      <td>{e.wordCount}</td>
                      <td>{Math.floor(e.timeTakenSeconds / 60)}m {e.timeTakenSeconds % 60}s</td>
                      <td><span style={{ color: scoreColor(e.aiScore) }}>{e.aiScore ?? 'Pending'}{e.aiScore == null ? '' : '%'}</span></td>
                      <td><Badge label={e.band ?? 'Pending'} variant={bandVariant(e.band ?? '')} /></td>
                      <td>{relativeTime(e.date)}</td>
                      <td><button className={styles.viewBtn} onClick={ev => { ev.stopPropagation(); setSelectedEssay(e); }}>View Review</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination page={lessonPage} total={lessonTotal} perPage={15} onChange={setLessonPage} />
          </div>
        )}

        {tab === 'practice' && (
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Practice Sessions</h3>
              <div className={styles.filterRow}>
                <div className={styles.filterPills}>
                  {["All", ...Array.from(new Set(practiceSessions.map(s => s.subject)))].map(s => (
                    <button
                      key={s}
                      className={subjectFilter === s ? styles.filterBtnActive : styles.filterBtn}
                      onClick={() => { setSubjectFilter(s); setPracticePage(1); }}
                    >
                      {s === "All" ? "All Subjects" : s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* Stats strip */}
            <div className={styles.statsRow3} style={{ marginBottom: 16 }}>
              <div className={styles.statsCard}>Total Sessions<br /><b>{practiceSessions.length}</b></div>
              <div className={styles.statsCard}>Completed<br /><b>{practiceSessions.filter(s => s.completed).length}</b></div>
              <div className={styles.statsCard}>Avg Completion Rate %<br /><b>{Math.round((practiceSessions.filter(s => s.completed).length / practiceSessions.length) * 100)}</b></div>
              <div className={styles.statsCard}>Avg Time<br /><b>{Math.round(practiceSessions.reduce((a, s) => a + (s.totalTimeSeconds || 0), 0) / practiceSessions.length / 60)}m</b></div>
            </div>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Subject</th>
                    <th>Year</th>
                    <th>Questions</th>
                    <th>Answers</th>
                    <th>Time</th>
                    <th>Completed</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedPracticeSessions.map(s => (
                    <>
                      <tr key={s.id} className={styles.tr} onClick={() => setExpandedSession(expandedSession === s.id ? null : s.id)} style={{ cursor: 'pointer' }}>
                        <td><div className={styles.userCell}><div className={styles.userAvatar}>{s.userName.split(" ").map(n => n[0]).join("").slice(0, 2)}</div><div><div className={styles.userName}>{s.userName}</div><div className={styles.userEmail}>{s.userEmail}</div></div></div></td>
                        <td><span className={styles.subjectTag} style={{ background: s.subjectColor }}>{s.subject}</span></td>
                        <td>{s.year}</td>
                        <td>{s.questionIds.length}</td>
                        <td>{s.essayAttemptIds.length}</td>
                        <td>{s.totalTimeSeconds ? `${Math.floor(s.totalTimeSeconds / 60)}m ${s.totalTimeSeconds % 60}s` : 'In progress'}</td>
                        <td>{s.completed ? <Badge label="Completed" variant="success" /> : <Badge label="Incomplete" variant="warning" />}</td>
                        <td>{relativeTime(s.startedAt)}</td>
                      </tr>
                      {expandedSession === s.id && (
                        <tr className={styles.trAccordion}><td colSpan={8}>
                          <table className={styles.innerTable}><thead><tr><th>Student</th><th>Subject</th><th>Word Count</th><th>Time Taken</th><th>AI Score</th><th>Band</th><th>Date</th><th>Actions</th></tr></thead><tbody>
                            {essayAttempts.filter(ea => s.essayAttemptIds.includes(ea.id)).map(ea => (
                              <tr key={ea.id}>
                                <td>{ea.userName}</td>
                                <td>{ea.subject}</td>
                                <td>{ea.wordCount}</td>
                                <td>{Math.floor(ea.timeTakenSeconds / 60)}m {ea.timeTakenSeconds % 60}s</td>
                                <td><span style={{ color: scoreColor(ea.aiScore) }}>{ea.aiScore ?? 'Pending'}{ea.aiScore == null ? '' : '%'}</span></td>
                                <td><Badge label={ea.band ?? 'Pending'} variant={bandVariant(ea.band ?? '')} /></td>
                                <td>{relativeTime(ea.date)}</td>
                                <td><button className={styles.viewBtn} onClick={ev => { ev.stopPropagation(); setSelectedEssay(ea); }}>View Review</button></td>
                              </tr>
                            ))}
                          </tbody></table>
                        </td></tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination page={practicePage} total={practiceTotal} perPage={10} onChange={setPracticePage} />
          </div>
        )}

        {tab === 'simulation' && (
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Simulations</h3>
              <div className={styles.filterRow}>
                <div className={styles.filterPills}>
                  {["All", ...Array.from(new Set(simulations.map(s => s.subject)))].map(s => (
                    <button
                      key={s}
                      className={subjectFilter === s ? styles.filterBtnActive : styles.filterBtn}
                      onClick={() => { setSubjectFilter(s); setSimPage(1); }}
                    >
                      {s === "All" ? "All Subjects" : s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* Stats strip */}
            <div className={styles.statsRow3} style={{ marginBottom: 16 }}>
              <div className={styles.statsCard}>Total Simulations<br /><b>{simulations.length}</b></div>
              <div className={styles.statsCard}>Pass Rate %<br /><b>{Math.round(simulations.filter(s => s.passed).length / simulations.length * 100)}</b></div>
              <div className={styles.statsCard}>Avg Score<br /><b>{Math.round(simulations.reduce((a, s) => a + (s.score || 0), 0) / simulations.length)}</b></div>
              <div className={styles.statsCard}>Time Expired %<br /><b>{Math.round(simulations.filter(s => s.failReason === 'TIME_EXPIRED').length / simulations.length * 100)}</b></div>
              <div className={styles.statsCard}>Tab Switch %<br /><b>{Math.round(simulations.filter(s => s.failReason === 'WINDOW_BLUR').length / simulations.length * 100)}</b></div>
            </div>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Subject</th>
                    <th>Year</th>
                    <th>Questions</th>
                    <th>Score</th>
                    <th>Passed</th>
                    <th>Fail Reason</th>
                    <th>Time</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedSimulations.map(s => (
                    <>
                      <tr key={s.id} className={styles.tr} onClick={() => setExpandedSim(expandedSim === s.id ? null : s.id)} style={{ cursor: 'pointer' }}>
                        <td><div className={styles.userCell}><div className={styles.userAvatar}>{s.userName.split(" ").map(n => n[0]).join("").slice(0, 2)}</div><div><div className={styles.userName}>{s.userName}</div><div className={styles.userEmail}>{s.userEmail}</div></div></div></td>
                        <td><span className={styles.subjectTag} style={{ background: s.subjectColor }}>{s.subject}</span></td>
                        <td>{s.year}</td>
                        <td>{s.questionIds.length}</td>
                        <td><span style={{ color: scoreColor(s.score) }}>{s.score}%</span></td>
                        <td>{s.passed ? <Badge label="PASSED" variant="success" /> : <Badge label="FAILED" variant="danger" />}</td>
                        <td>{s.failReason === 'TIME_EXPIRED' ? <Badge label="Time Expired" variant="warning" /> : s.failReason === 'WINDOW_BLUR' ? <Badge label="Tab Switch" variant="danger" /> : null}</td>
                        <td>{s.totalTimeSeconds ? `${Math.floor(s.totalTimeSeconds / 60)}m ${s.totalTimeSeconds % 60}s` : '—'}</td>
                        <td>{relativeTime(s.startedAt)}</td>
                      </tr>
                      {expandedSim === s.id && (
                        <tr className={styles.trAccordion}><td colSpan={9}>
                          <table className={styles.innerTable}><thead><tr><th>Student</th><th>Subject</th><th>Word Count</th><th>Time Taken</th><th>AI Score</th><th>Band</th><th>Date</th><th>Actions</th></tr></thead><tbody>
                            {essayAttempts.filter(ea => s.essayAttemptIds.includes(ea.id)).map(ea => (
                              <tr key={ea.id}>
                                <td>{ea.userName}</td>
                                <td>{ea.subject}</td>
                                <td>{ea.wordCount}</td>
                                <td>{Math.floor(ea.timeTakenSeconds / 60)}m {ea.timeTakenSeconds % 60}s</td>
                                <td><span style={{ color: scoreColor(ea.aiScore) }}>{ea.aiScore ?? 'Pending'}{ea.aiScore == null ? '' : '%'}</span></td>
                                <td><Badge label={ea.band ?? 'Pending'} variant={bandVariant(ea.band ?? '')} /></td>
                                <td>{relativeTime(ea.date)}</td>
                                <td><button className={styles.viewBtn} onClick={ev => { ev.stopPropagation(); setSelectedEssay(ea); }}>View Review</button></td>
                              </tr>
                            ))}
                          </tbody></table>
                        </td></tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination page={simPage} total={simTotal} perPage={10} onChange={setSimPage} />
          </div>
        )}

        {/* Review Panel */}
        <AnimatePresence>
          {selectedEssay && (
            <motion.div className={styles.reviewPanel} initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.25 }}>
              <div className={styles.reviewPanelHeader}>
                <h3>Essay Review</h3>
                <button className={styles.closeBtn} onClick={() => setSelectedEssay(null)}><X size={16} /></button>
              </div>
              <div className={styles.reviewPanelBody}>
                <div className={styles.reviewStudent}><b>{selectedEssay.userName}</b><br /><span>{selectedEssay.userEmail}</span></div>
                <div className={styles.reviewSection}><b>Question:</b><br />{selectedEssay.questionText}</div>
                <div className={styles.reviewSection}><b>Answer:</b><div className={styles.reviewAnswer}>{selectedEssay.answerText}</div></div>
                <div className={styles.reviewScoreBand}><span className={styles.reviewScore} style={{ color: scoreColor(selectedEssay.aiScore) }}>{selectedEssay.aiScore ?? 'Pending'}{selectedEssay.aiScore == null ? '' : '%'}</span> <Badge label={selectedEssay.band ?? 'Pending'} variant={bandVariant(selectedEssay.band ?? '')} /></div>
                <div className={styles.reviewSection}><b>Feedback:</b><br />{selectedEssay.feedback?.summary}</div>
                {selectedEssay.strengths?.length > 0 && <div className={styles.reviewSection}><b>Strengths:</b><ul>{selectedEssay.strengths.map((s: string, i: number) => <li key={i} style={{ color: 'var(--green)' }}>{s}</li>)}</ul></div>}
                {selectedEssay.improvements?.length > 0 && <div className={styles.reviewSection}><b>Improvements:</b><ul>{selectedEssay.improvements.map((s: string, i: number) => <li key={i} style={{ color: 'var(--amber)' }}>{s}</li>)}</ul></div>}
                {selectedEssay.sampleAnswer && <div className={styles.reviewSection}><details><summary>Show Sample Answer</summary><div className={styles.reviewSample}>{selectedEssay.sampleAnswer}</div></details></div>}
                <div className={styles.reviewMeta}>Tokens: {selectedEssay.tokensUsed} · Model: {selectedEssay.aiModel}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
                      )}
                      <button
                        className={styles.flagBtn}
                        onClick={() => handleFlag(e.id, e.userName)}
                        disabled={flaggingId === e.id || e.flagged}
                      >
                        {flaggingId === e.id ? (
                          <RefreshCw size={11} className={styles.spinning} />
                        ) : (
                          <Flag size={11} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          page={essayPage}
          total={essayTotal}
          perPage={ESSAYS_PER_PAGE}
          onChange={setEssayPage}
        />
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>Pending / Flagged Queue</h3>
            <p className={styles.cardSub}>{pendingTotal} essays</p>
          </div>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                {["Student", "Subject", "Status", "Words", "Submitted"].map(
                  (h) => (
                    <th key={h} className={styles.th}>
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {paginatedPending.map((e) => (
                <tr key={`p-${e.id}`} className={styles.tr}>
                  <td className={styles.td}>{e.studentName}</td>
                  <td className={styles.td}>{e.subject}</td>
                  <td className={styles.td}>
                    <Badge
                      label={e.status === "flagged" ? "flagged" : "pending"}
                      variant={e.status === "flagged" ? "danger" : "warning"}
                    />
                  </td>
                  <td className={styles.td}>{e.wordCount}</td>
                  <td className={styles.td}>{relativeTime(e.submittedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          page={pendingPage}
          total={pendingTotal}
          perPage={PENDING_PER_PAGE}
          onChange={setPendingPage}
        />
      </div>

      {/* Essay detail overlay */}
      <AnimatePresence>
        {selectedEssay && (
          <>
            <motion.div
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.7)",
                zIndex: 500,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEssay(null)}
            />
            <motion.div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                x: "-50%",
                y: "-50%",
                width: 580,
                maxWidth: "calc(100vw - 32px)",
                maxHeight: "calc(100vh - 48px)",
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-focus)",
                borderRadius: 14,
                zIndex: 501,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.22 }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "18px 24px",
                  borderBottom: "1px solid var(--border-default)",
                  flexShrink: 0,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: "var(--text-primary)",
                    }}
                  >
                    {selectedEssay.userName}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "var(--text-muted)",
                      marginTop: 2,
                    }}
                  >
                    {selectedEssay.subject} ·{" "}
                    {relativeTime(selectedEssay.gradedAt)}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: 800,
                      color: scoreColor(selectedEssay.score),
                    }}
                  >
                    {selectedEssay.score}%
                  </div>
                  <Badge
                    label={`Grade ${selectedEssay.band}`}
                    variant={bandVariant(selectedEssay.band)}
                  />
                  <button
                    onClick={() => setSelectedEssay(null)}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      background: "var(--bg-hover)",
                      border: "1px solid var(--border-default)",
                      color: "var(--text-secondary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
              <div
                style={{
                  overflowY: "auto",
                  flex: 1,
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                }}
              >
                <div
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-default)",
                    borderRadius: 8,
                    padding: "14px 18px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 500,
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      marginBottom: 6,
                    }}
                  >
                    Question
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: "var(--text-primary)",
                      lineHeight: 1.7,
                    }}
                  >
                    {selectedEssay.question}
                  </div>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 10,
                  }}
                >
                  {[
                    {
                      label: "AI Score",
                      value: `${selectedEssay.aiScore}%`,
                      color: scoreColor(selectedEssay.score),
                    },
                    {
                      label: "Word Count",
                      value: `${selectedEssay.wordCount}w`,
                      color: "var(--text-primary)",
                    },
                    {
                      label: "AI Time",
                      value: `${selectedEssay.timeTaken}s`,
                      color: "var(--purple)",
                    },
                    {
                      label: "Status",
                      value: selectedEssay.flagged ? "Flagged" : "Auto-graded",
                      color: selectedEssay.flagged
                        ? "var(--red)"
                        : "var(--green)",
                    },
                  ].map((s, i) => (
                    <div
                      key={i}
                      style={{
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-default)",
                        borderRadius: 8,
                        padding: "10px 14px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 11,
                          color: "var(--text-muted)",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          marginBottom: 4,
                        }}
                      >
                        {s.label}
                      </div>
                      <div
                        style={{
                          fontSize: 18,
                          fontWeight: 700,
                          color: s.color,
                        }}
                      >
                        {s.value}
                      </div>
                    </div>
                  ))}
                </div>
                {selectedEssay.flagged && (
                  <div
                    style={{
                      background: "var(--red-bg)",
                      border: "1px solid var(--red)",
                      borderRadius: 8,
                      padding: "12px 16px",
                      fontSize: 13,
                      color: "var(--red)",
                    }}
                  >
                    This essay has been flagged for human review - AI score may
                    not reflect actual quality
                  </div>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  padding: "16px 24px",
                  borderTop: "1px solid var(--border-default)",
                  flexShrink: 0,
                }}
              >
                {!selectedEssay.flagged && (
                  <button
                    onClick={() => {
                      handleFlag(selectedEssay.id, selectedEssay.userName);
                      setSelectedEssay(null);
                    }}
                    style={{
                      background: "var(--amber-bg)",
                      border: "1px solid var(--amber)",
                      color: "var(--amber)",
                      borderRadius: 8,
                      padding: "9px 18px",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <Flag size={13} /> Flag for Review
                  </button>
                )}
                <button
                  onClick={() => setSelectedEssay(null)}
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-default)",
                    borderRadius: 8,
                    padding: "9px 16px",
                    fontSize: 13,
                    color: "var(--text-secondary)",
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            style={{
              position: "fixed",
              bottom: 24,
              right: 24,
              zIndex: 700,
              background: "var(--bg-elevated)",
              border: `1px solid ${toast.type === "success" ? "var(--green)" : toast.type === "danger" ? "var(--red)" : toast.type === "warning" ? "var(--amber)" : "var(--blue-bright)"}`,
              borderRadius: 10,
              padding: "12px 20px",
              fontSize: 14,
              color: "var(--text-primary)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
              minWidth: 260,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
