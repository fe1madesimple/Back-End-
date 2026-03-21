"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Users,
  Mail,
  CheckCircle,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
  Download,
  Bell,
  X,
  Save,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import { examCalendarData } from "@/lib/dummy-data";
import styles from "./exam-calendar.module.css";

type ToastType = {
  message: string;
  type: "success" | "danger" | "warning" | "info";
};

const formatShortDate = (d: string) =>
  new Date(d).toLocaleDateString("en-IE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const daysUntil = (d: string) =>
  Math.ceil((new Date(d).getTime() - Date.now()) / 86400000);

export default function ExamCalendarPage() {
  const [toast, setToast] = useState<ToastType | null>(null);
  const [selectedExam, setSelectedExam] = useState(
    examCalendarData.upcomingExams[1],
  );
  const [showAddExam, setShowAddExam] = useState(false);
  const [editingExam, setEditingExam] = useState<
    (typeof examCalendarData.upcomingExams)[0] | null
  >(null);
  const [emailingCohort, setEmailingCohort] = useState<string | null>(null);
  const [emailingStudent, setEmailingStudent] = useState<string | null>(null);
  const [newExam, setNewExam] = useState({
    name: "",
    date: "",
    campaignActive: true,
  });
  const [exams, setExams] = useState(examCalendarData.upcomingExams);

  const showToast = useCallback(
    (message: string, type: ToastType["type"] = "success") => {
      setToast({ message, type });
      setTimeout(() => setToast(null), 3000);
    },
    [],
  );

  const handleEmailCohort = (examId: string, examName: string) => {
    setEmailingCohort(examId);
    setTimeout(() => {
      setEmailingCohort(null);
      const count = examCalendarData.cohortStudents.filter(
        (s) => s.examId === examId,
      ).length;
      showToast(
        `✓ Email sent to ${count} students targeting ${examName}`,
        "success",
      );
    }, 2000);
  };

  const handleEmailStudent = (id: string, name: string) => {
    setEmailingStudent(id);
    setTimeout(() => {
      setEmailingStudent(null);
      showToast(`✓ Email sent to ${name}`, "success");
    }, 1400);
  };

  const handleSaveExam = () => {
    if (!newExam.name || !newExam.date) return;
    const exam = {
      id: `ex${exams.length + 1}`,
      name: newExam.name,
      date: new Date(newExam.date).toISOString(),
      studentsTargeting: 0,
      campaignActive: newExam.campaignActive,
      color: "#8B5CF6",
    };
    setExams((prev) => [...prev, exam]);
    setShowAddExam(false);
    setNewExam({ name: "", date: "", campaignActive: true });
    showToast(`✓ Exam "${exam.name}" added to calendar`, "success");
  };

  const handleDeleteExam = (id: string, name: string) => {
    setExams((prev) => prev.filter((e) => e.id !== id));
    showToast(`✓ "${name}" removed from calendar`, "warning");
  };

  const handleToggleCampaign = (id: string) => {
    setExams((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, campaignActive: !e.campaignActive } : e,
      ),
    );
    const exam = exams.find((e) => e.id === id);
    showToast(
      exam?.campaignActive
        ? `Campaign paused for ${exam.name}`
        : `Campaign activated for ${exam?.name}`,
      "info",
    );
  };

  const cohortForSelected = examCalendarData.cohortStudents.filter(
    (s) => s.examId === selectedExam.id,
  );

  return (
    <div className={styles.page}>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Exam Calendar</h1>
          <p className={styles.subtitle}>
            Set FE-1 exam dates, manage student cohorts and automate pre-exam
            campaigns
          </p>
        </div>
        <div className={styles.headerActions}>
          <button
            className={styles.exportBtn}
            onClick={() => showToast("✓ Calendar exported", "info")}
          >
            <Download size={14} /> Export
          </button>
          <button
            className={styles.addBtn}
            onClick={() => setShowAddExam(true)}
          >
            <Plus size={14} /> Add Exam Date
          </button>
        </div>
      </div>

      {/* ═══ SECTION 1 — EXAM CARDS ═══ */}
      <div className={styles.examGrid}>
        {exams.map((exam) => {
          const days = daysUntil(exam.date);
          const isUrgent = days <= 14;
          const isPast = days < 0;
          return (
            <div
              key={exam.id}
              className={`${styles.examCard} ${selectedExam.id === exam.id ? styles.examCardActive : ""}`}
              style={{
                borderColor:
                  selectedExam.id === exam.id ? exam.color : undefined,
              }}
              onClick={() => setSelectedExam(exam)}
            >
              <div className={styles.examCardTop}>
                <div
                  className={styles.examColorDot}
                  style={{ background: exam.color }}
                />
                <div className={styles.examName}>{exam.name}</div>
                <div
                  className={styles.examCardActions}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className={styles.iconBtn}
                    onClick={() => setEditingExam(exam)}
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    className={styles.iconBtnDanger}
                    onClick={() => handleDeleteExam(exam.id, exam.name)}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
              <div className={styles.examDate} style={{ color: exam.color }}>
                {formatShortDate(exam.date)}
              </div>
              <div className={styles.examCountdown}>
                {isPast ? (
                  <span style={{ color: "var(--text-muted)" }}>
                    Exam passed
                  </span>
                ) : (
                  <span
                    style={{
                      color: isUrgent ? "var(--red)" : "var(--text-primary)",
                      fontWeight: isUrgent ? 700 : 400,
                    }}
                  >
                    {days} days away
                  </span>
                )}
              </div>
              <div className={styles.examMeta}>
                <Users size={12} color="var(--text-muted)" />
                <span>
                  {exam.studentsTargeting} students targeting this sitting
                </span>
              </div>
              <div className={styles.countdownTrack}>
                <div
                  className={styles.countdownFill}
                  style={{
                    width: `${Math.max(0, Math.min(100, 100 - (days / 365) * 100))}%`,
                    background: isUrgent ? "var(--red)" : exam.color,
                  }}
                />
              </div>
              <div
                className={styles.campaignToggleRow}
                onClick={(e) => e.stopPropagation()}
              >
                <span className={styles.campaignToggleLabel}>
                  <Bell size={12} /> Auto campaign
                </span>
                <button
                  className={`${styles.toggle} ${exam.campaignActive ? styles.toggleOn : ""}`}
                  onClick={() => handleToggleCampaign(exam.id)}
                />
              </div>
            </div>
          );
        })}
        <button
          className={styles.addExamCard}
          onClick={() => setShowAddExam(true)}
        >
          <Plus size={24} color="var(--text-muted)" />
          <span>Add Exam Date</span>
        </button>
      </div>

      {/* ═══ SECTION 2 — COHORT TABLE ═══ */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>
              <span style={{ color: selectedExam.color }}>
                {selectedExam.name}
              </span>{" "}
              — Student Cohort
            </h3>
            <p className={styles.cardSub}>
              {cohortForSelected.length} students targeting this sitting
            </p>
          </div>
          <button
            className={styles.cohortEmailBtn}
            style={{
              borderColor: selectedExam.color,
              color: selectedExam.color,
            }}
            onClick={() =>
              handleEmailCohort(selectedExam.id, selectedExam.name)
            }
            disabled={emailingCohort === selectedExam.id}
          >
            {emailingCohort === selectedExam.id ? (
              <>
                <RefreshCw size={13} className={styles.spinning} /> Sending...
              </>
            ) : (
              <>
                <Mail size={13} /> Email Entire Cohort
              </>
            )}
          </button>
        </div>

        {cohortForSelected.length === 0 ? (
          <div className={styles.emptyState}>
            <Users size={28} color="var(--text-muted)" />
            <span>No students have selected this sitting yet</span>
          </div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  {[
                    "Student",
                    "Plan",
                    "Progress",
                    "Streak",
                    "Days Until Exam",
                    "Action",
                  ].map((h) => (
                    <th key={h} className={styles.th}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cohortForSelected.map((s) => (
                  <tr key={s.id} className={styles.tr}>
                    <td className={styles.td}>
                      <div className={styles.userCell}>
                        <div
                          className={styles.userAvatar}
                          style={{
                            background:
                              s.plan === "Pro" ? "#10B981" : "#2563EB",
                          }}
                        >
                          {s.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                        <div>
                          <div className={styles.userName}>{s.name}</div>
                          <div className={styles.userEmail}>{s.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className={styles.td}>
                      <Badge
                        label={s.plan}
                        variant={s.plan === "Pro" ? "success" : "info"}
                      />
                    </td>
                    <td className={styles.td}>
                      <div className={styles.progressWrap}>
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color:
                              s.progressPercent >= 60
                                ? "var(--green)"
                                : s.progressPercent >= 30
                                  ? "var(--amber)"
                                  : "var(--red)",
                          }}
                        >
                          {s.progressPercent}%
                        </span>
                        <div className={styles.progressBar}>
                          <div
                            className={styles.progressFill}
                            style={{
                              width: `${s.progressPercent}%`,
                              background:
                                s.progressPercent >= 60
                                  ? "var(--green)"
                                  : s.progressPercent >= 30
                                    ? "var(--amber)"
                                    : "var(--red)",
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className={styles.td}>
                      <span
                        style={{
                          fontSize: 13,
                          color: s.streak > 0 ? "var(--amber)" : "var(--red)",
                        }}
                      >
                        {s.streak > 0 ? `🔥 ${s.streak}d` : "💔 Broken"}
                      </span>
                    </td>
                    <td className={styles.td}>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color:
                            s.daysUntilExam <= 14
                              ? "var(--red)"
                              : s.daysUntilExam <= 30
                                ? "var(--amber)"
                                : "var(--text-primary)",
                        }}
                      >
                        {s.daysUntilExam}d
                      </span>
                    </td>
                    <td className={styles.td}>
                      <button
                        className={styles.nudgeBtn}
                        onClick={() => handleEmailStudent(s.id, s.name)}
                        disabled={emailingStudent === s.id}
                      >
                        {emailingStudent === s.id ? (
                          <>
                            <RefreshCw size={11} className={styles.spinning} />{" "}
                            Sending...
                          </>
                        ) : (
                          <>
                            <Mail size={11} /> Email
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ═══ SECTION 3 — CAMPAIGN TIMELINE ═══ */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>Automated Campaign Timeline</h3>
            <p className={styles.cardSub}>
              Emails that fire automatically for{" "}
              <span style={{ color: selectedExam.color }}>
                {selectedExam.name}
              </span>
            </p>
          </div>
          {!selectedExam.campaignActive && (
            <div className={styles.campaignPausedBadge}>
              <Bell size={12} /> Campaign Paused
            </div>
          )}
        </div>
        <div className={styles.timeline}>
          {examCalendarData.campaignTimeline.map((step, i) => (
            <div key={i} className={styles.timelineStep}>
              <div
                className={styles.timelineDot}
                style={{
                  background: step.fired ? step.color : "var(--bg-hover)",
                  borderColor: step.color,
                }}
              >
                {step.fired && <CheckCircle size={10} color="white" />}
              </div>
              {i < examCalendarData.campaignTimeline.length - 1 && (
                <div className={styles.timelineLine} />
              )}
              <div
                className={`${styles.timelineContent} ${step.fired ? styles.timelineContentFired : ""}`}
              >
                <div
                  className={styles.timelineTrigger}
                  style={{ color: step.color }}
                >
                  {step.trigger}
                </div>
                <div className={styles.timelineLabel}>{step.label}</div>
                <div className={styles.timelineDesc}>{step.description}</div>
                {step.fired && (
                  <span className={styles.firedBadge}>
                    <CheckCircle size={10} /> Sent
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ ADD / EDIT EXAM MODAL ═══ */}
      <AnimatePresence>
        {(showAddExam || editingExam) && (
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
              onClick={() => {
                setShowAddExam(false);
                setEditingExam(null);
              }}
            />
            <motion.div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                x: "-50%",
                y: "-50%",
                width: 460,
                maxWidth: "calc(100vw - 32px)",
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-focus)",
                borderRadius: 14,
                zIndex: 501,
                overflow: "hidden",
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
                }}
              >
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  {editingExam ? "Edit Exam Date" : "Add New Exam Date"}
                </h3>
                <button
                  onClick={() => {
                    setShowAddExam(false);
                    setEditingExam(null);
                  }}
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
              <div
                style={{
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                }}
              >
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 6 }}
                >
                  <label
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    Exam Name *
                  </label>
                  <input
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-default)",
                      borderRadius: 8,
                      padding: "10px 14px",
                      fontSize: 14,
                      color: "var(--text-primary)",
                      outline: "none",
                      fontFamily: "inherit",
                    }}
                    placeholder="e.g. FE-1 October 2026"
                    defaultValue={editingExam?.name ?? newExam.name}
                    onChange={(e) => {
                      if (editingExam)
                        setEditingExam((prev) =>
                          prev ? { ...prev, name: e.target.value } : null,
                        );
                      else
                        setNewExam((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }));
                    }}
                  />
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 6 }}
                >
                  <label
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    Exam Date *
                  </label>
                  <input
                    type="date"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-default)",
                      borderRadius: 8,
                      padding: "10px 14px",
                      fontSize: 14,
                      color: "var(--text-primary)",
                      outline: "none",
                      fontFamily: "inherit",
                      colorScheme: "dark",
                      cursor: "pointer",
                    }}
                    defaultValue={
                      editingExam ? editingExam.date.slice(0, 10) : newExam.date
                    }
                    onChange={(e) => {
                      if (editingExam)
                        setEditingExam((prev) =>
                          prev ? { ...prev, date: e.target.value } : null,
                        );
                      else
                        setNewExam((prev) => ({
                          ...prev,
                          date: e.target.value,
                        }));
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: "var(--text-primary)",
                      }}
                    >
                      Activate automated campaign
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--text-muted)",
                        marginTop: 2,
                      }}
                    >
                      Send scheduled emails at 90, 30, 14, 7 days before and on
                      exam day
                    </div>
                  </div>
                  <button
                    className={`${styles.toggle} ${(editingExam?.campaignActive ?? newExam.campaignActive) ? styles.toggleOn : ""}`}
                    onClick={() => {
                      if (editingExam)
                        setEditingExam((prev) =>
                          prev
                            ? { ...prev, campaignActive: !prev.campaignActive }
                            : null,
                        );
                      else
                        setNewExam((prev) => ({
                          ...prev,
                          campaignActive: !prev.campaignActive,
                        }));
                    }}
                  />
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, padding: "0 24px 24px" }}>
                <button
                  onClick={() => {
                    if (editingExam) {
                      setExams((prev) =>
                        prev.map((e) =>
                          e.id === editingExam.id ? editingExam : e,
                        ),
                      );
                      showToast(`✓ ${editingExam.name} updated`, "success");
                      setEditingExam(null);
                    } else {
                      handleSaveExam();
                    }
                  }}
                  style={{
                    flex: 1,
                    background: "var(--blue-primary)",
                    color: "white",
                    border: "none",
                    borderRadius: 8,
                    padding: "10px",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                  }}
                >
                  <Save size={14} />{" "}
                  {editingExam ? "Save Changes" : "Add Exam Date"}
                </button>
                <button
                  onClick={() => {
                    setShowAddExam(false);
                    setEditingExam(null);
                  }}
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-default)",
                    borderRadius: 8,
                    padding: "10px 16px",
                    fontSize: 14,
                    color: "var(--text-secondary)",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* TOAST */}
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
