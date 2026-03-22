"use client";
import { useState, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  Users,
  Target,
  CreditCard,
  Clock,
  ArrowDown,
  Mail,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Download,
  ChevronRight,
  Zap,
  Send,
  Radio,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import Pagination from "@/components/ui/Pagination";
import { usePagination } from "@/lib/usePagination";
import { funnelData } from "@/lib/dummy-data";
import styles from "./funnel.module.css";

type ToastType = {
  message: string;
  type: "success" | "danger" | "warning" | "info";
};

const nudgeCampaigns = [
  {
    id: "n1",
    name: "Welcome & Orientation",
    target: "Registered but never logged in",
    trigger: "24 hours after registration with no login",
    subject: "Your FE-1 journey starts here — here's how to begin",
    status: "Active",
    sentCount: 847,
    openRate: 61,
  },
  {
    id: "n2",
    name: "Email Verification Nudge",
    target: "Registered but email not verified",
    trigger: "2 hours after registration",
    subject: "Please verify your email to access your study materials",
    status: "Active",
    sentCount: 312,
    openRate: 74,
  },
  {
    id: "n3",
    name: "Onboarding Incomplete",
    target: "Logged in but never completed onboarding",
    trigger: "48 hours after first login with no onboarding completion",
    subject: "You're almost in — finish setting up your study profile",
    status: "Active",
    sentCount: 529,
    openRate: 55,
  },
  {
    id: "n4",
    name: "First Lesson Push",
    target: "Onboarded but never started a lesson",
    trigger: "3 days after onboarding with no lesson started",
    subject: "Your first FE-1 lesson is waiting — it takes just 20 minutes",
    status: "Active",
    sentCount: 418,
    openRate: 49,
  },
  {
    id: "n5",
    name: "Trial Conversion",
    target: "On free trial, not yet subscribed",
    trigger: "5 days before trial expiry",
    subject: "Your trial ends in 5 days — lock in your progress today",
    status: "Active",
    sentCount: 1203,
    openRate: 68,
  },
  {
    id: "n6",
    name: "Trial Expiry Final Warning",
    target: "Trial expiring in 24 hours",
    trigger: "24 hours before trial end",
    subject: "Last chance — your free trial ends tomorrow",
    status: "Active",
    sentCount: 876,
    openRate: 71,
  },
  {
    id: "n7",
    name: "Streak Recovery",
    target: "Had a 3+ day streak, now 2 days inactive",
    trigger: "2 days of inactivity after a streak of 3+",
    subject: "Don't break your streak — your FE-1 exam won't wait",
    status: "Active",
    sentCount: 2341,
    openRate: 58,
  },
  {
    id: "n8",
    name: "Re-engagement (7 Days)",
    target: "Subscribed users inactive for 7 days",
    trigger: "7 days since last login",
    subject: "We miss you — here's what's new in your study plan",
    status: "Active",
    sentCount: 1087,
    openRate: 42,
  },
  {
    id: "n9",
    name: "Re-engagement (30 Days)",
    target: "Subscribed users inactive for 30 days",
    trigger: "30 days since last login",
    subject: "Your FE-1 exam is closer than you think — come back",
    status: "Paused",
    sentCount: 234,
    openRate: 31,
  },
  {
    id: "n10",
    name: "Exam Countdown — 90 Days",
    target: "Students with exam date set, 90 days out",
    trigger: "Exactly 90 days before their selected exam sitting",
    subject: "90 days to your FE-1 — here's your study roadmap",
    status: "Active",
    sentCount: 445,
    openRate: 77,
  },
  {
    id: "n11",
    name: "Exam Countdown — 30 Days",
    target: "Students with exam date set, 30 days out",
    trigger: "Exactly 30 days before their selected exam sitting",
    subject: "30 days left — intensive FE-1 revision starts now",
    status: "Active",
    sentCount: 389,
    openRate: 82,
  },
  {
    id: "n12",
    name: "Post-Exam Follow Up",
    target: "Students whose exam date has passed",
    trigger: "3 days after their selected exam sitting date",
    subject: "How did your FE-1 go? Tell us and get 1 month free",
    status: "Draft",
    sentCount: 0,
    openRate: 0,
  },
];

export default function FunnelPage() {
  const [toast, setToast] = useState<ToastType | null>(null);
  const [nudgingId, setNudgingId] = useState<string | null>(null);
  const [sentNudges, setSentNudges] = useState<string[]>([]);
  const [emailingId, setEmailingId] = useState<string | null>(null);
  const [stageFilter, setStageFilter] = useState("All");
  const [showSendAllConfirm, setShowSendAllConfirm] = useState(false);
  const [sendingAllNudges, setSendingAllNudges] = useState(false);
  const STUCK_PER_PAGE = 20;

  const showToast = useCallback(
    (message: string, type: ToastType["type"] = "success") => {
      setToast({ message, type });
      setTimeout(() => setToast(null), 3000);
    },
    [],
  );

  const handleNudge = (id: string, name: string) => {
    setNudgingId(id);
    setTimeout(() => {
      setNudgingId(null);
      setSentNudges((prev) => [...prev, id]);
      showToast(`✓ Nudge sent to ${name}`, "success");
    }, 1800);
  };

  const handleSendAllActive = () => {
    setSendingAllNudges(true);
    setTimeout(() => {
      setSendingAllNudges(false);
      setShowSendAllConfirm(false);
      const activeCount = nudgeCampaigns.filter(
        (n) => n.status === "Active",
      ).length;
      showToast(`✓ All ${activeCount} active nudges dispatched`, "success");
    }, 1800);
  };

  const handleEmail = (id: string, name: string) => {
    setEmailingId(id);
    setTimeout(() => {
      setEmailingId(null);
      showToast(`✓ Nudge sent to ${name}`, "success");
    }, 1400);
  };

  const filteredStuck = useMemo(
    () =>
      funnelData.stuckUsers.filter(
        (u) => stageFilter === "All" || u.stage === stageFilter,
      ),
    [stageFilter],
  );

  const {
    page: stuckPage,
    setPage: setStuckPage,
    paginated: paginatedStuck,
    total: stuckTotal,
  } = usePagination(filteredStuck, STUCK_PER_PAGE);

  const d = funnelData;
  const maxCount = Math.max(...d.stages.map((s) => s.count));

  const nudgeSeverityColor = (s: string) =>
    s === "danger"
      ? "var(--red)"
      : s === "warning"
        ? "var(--amber)"
        : "var(--blue-bright)";

  const nudgeSeverityBg = (s: string) =>
    s === "danger"
      ? "var(--red-bg)"
      : s === "warning"
        ? "var(--amber-bg)"
        : "var(--blue-muted)";

  const statusColor = (status: string) =>
    status === "Active"
      ? "var(--green)"
      : status === "Paused"
        ? "var(--amber)"
        : "var(--text-muted)";

  const statusBg = (status: string) =>
    status === "Active"
      ? "var(--green-bg)"
      : status === "Paused"
        ? "var(--amber-bg)"
        : "var(--bg-elevated)";

  return (
    <div className={styles.page}>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Conversion Funnel</h1>
          <p className={styles.subtitle}>
            Track where users drop off — from signup to paid subscriber
          </p>
        </div>
        <button
          className={styles.exportBtn}
          onClick={() => showToast("✓ Funnel report exported", "info")}
        >
          <Download size={14} /> Export Report
        </button>
      </div>

      {/* ═══ SECTION 1 — PULSE ═══ */}
      <div className={styles.pulseGrid}>
        {[
          {
            label: "Signups This Month",
            value: d.totalSignupsThisMonth,
            color: "var(--blue-bright)",
            icon: Users,
            sub: "new registrations",
          },
          {
            label: "Trial → Paid Rate",
            value: `${d.trialToPaidRate}%`,
            color: "var(--green)",
            icon: TrendingUp,
            sub: "conversion rate",
          },
          {
            label: "Signup → Onboarded",
            value: `${d.signupToOnboardedRate}%`,
            color: "var(--purple)",
            icon: CheckCircle,
            sub: "complete onboarding",
          },
          {
            label: "Onboarded → First Lesson",
            value: `${d.onboardedToFirstLessonRate}%`,
            color: "var(--cyan)",
            icon: Target,
            sub: "start studying",
          },
          {
            label: "Avg Days to First Payment",
            value: `${d.avgDaysToFirstPayment}d`,
            color: "var(--amber)",
            icon: Clock,
            sub: "from signup to payment",
          },
          {
            label: "Revenue from Conversions",
            value: `€${d.revenueFromConversionsThisMonth}`,
            color: "var(--green)",
            icon: CreditCard,
            sub: "this month from new subscribers",
          },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className={styles.pulseCard}>
              <div className={styles.pulseTop}>
                <div className={styles.pulseLabel}>{s.label}</div>
                <div
                  className={styles.pulseIconWrap}
                  style={{ background: s.color + "20" }}
                >
                  <Icon size={15} color={s.color} />
                </div>
              </div>
              <div className={styles.pulseValue} style={{ color: s.color }}>
                {s.value}
              </div>
              <div className={styles.pulseSub}>{s.sub}</div>
            </div>
          );
        })}
      </div>

      {/* ═══ SECTION 2 — VISUAL FUNNEL ═══ */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>Conversion Funnel</h3>
            <p className={styles.cardSub}>
              Each stage shows how many users reached it and how many dropped
              off
            </p>
          </div>
        </div>
        <div className={styles.funnelViz}>
          {d.stages.map((stage, i) => {
            const widthPercent = (stage.count / maxCount) * 100;
            const isWorstDropOff =
              stage.dropOff === Math.max(...d.stages.map((s) => s.dropOff));
            return (
              <div key={stage.stage} className={styles.funnelStageWrap}>
                <div className={styles.funnelStageRow}>
                  {/* Label left */}
                  <div className={styles.funnelLabel}>
                    <div className={styles.funnelStageName}>{stage.stage}</div>
                    <div
                      className={styles.funnelCount}
                      style={{ color: stage.color }}
                    >
                      {stage.count.toLocaleString()} users
                    </div>
                  </div>

                  {/* Bar */}
                  <div className={styles.funnelBarTrack}>
                    <motion.div
                      className={styles.funnelBar}
                      style={{ background: stage.color + "CC" }}
                      initial={{ width: 0 }}
                      animate={{ width: `${widthPercent}%` }}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.1,
                        ease: "easeOut",
                      }}
                    />
                    {isWorstDropOff && stage.dropOff > 0 && (
                      <span className={styles.worstDropLabel}>
                        Biggest drop-off
                      </span>
                    )}
                  </div>

                  {/* Percent right */}
                  <div className={styles.funnelPercent}>
                    <span
                      style={{
                        color: stage.color,
                        fontWeight: 700,
                        fontSize: 15,
                      }}
                    >
                      {stage.percent}%
                    </span>
                    {i > 0 && (
                      <span
                        style={{ fontSize: 11, color: "var(--text-muted)" }}
                      >
                        of previous
                      </span>
                    )}
                  </div>
                </div>

                {/* Drop-off indicator */}
                {stage.dropOff > 0 && i < d.stages.length - 1 && (
                  <div className={styles.dropOffRow}>
                    <ArrowDown
                      size={12}
                      color={
                        isWorstDropOff ? "var(--red)" : "var(--text-muted)"
                      }
                    />
                    <span
                      style={{
                        fontSize: 11,
                        color: isWorstDropOff
                          ? "var(--red)"
                          : "var(--text-muted)",
                        fontWeight: isWorstDropOff ? 600 : 400,
                      }}
                    >
                      {stage.dropOff} users dropped off here
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ═══ SECTION 3 — STUCK USERS TABLE ═══ */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>Users Stuck in Funnel</h3>
            <p className={styles.cardSub}>
              Users who have not progressed past their current stage
            </p>
          </div>
          <div className={styles.filterPills}>
            {[
              "All",
              ...Array.from(new Set(funnelData.stuckUsers.map((u) => u.stage))),
            ].map((f) => (
              <button
                key={f}
                className={`${styles.filterBtn} ${stageFilter === f ? styles.filterBtnActive : ""}`}
                onClick={() => {
                  setStageFilter(f);
                  setStuckPage(1);
                }}
              >
                {f === "All" ? "All Stages" : f}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                {[
                  "User",
                  "Stuck At Stage",
                  "Days Since Signup",
                  "Plan",
                  "Action",
                ].map((h) => (
                  <th key={h} className={styles.th}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedStuck.map((u) => {
                const stageData = d.stages.find((s) => s.stage === u.stage);
                return (
                  <tr key={u.id} className={styles.tr}>
                    <td className={styles.td}>
                      <div className={styles.userCell}>
                        <div
                          className={styles.userAvatar}
                          style={{ background: stageData?.color ?? "#4B5563" }}
                        >
                          {u.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
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
                          fontSize: 12,
                          fontWeight: 600,
                          padding: "3px 10px",
                          borderRadius: 20,
                          background: (stageData?.color ?? "#4B5563") + "20",
                          color: stageData?.color ?? "#4B5563",
                          border: `1px solid ${stageData?.color ?? "#4B5563"}40`,
                        }}
                      >
                        {u.stage}
                      </span>
                    </td>
                    <td className={styles.td}>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color:
                            u.daysSinceSignup >= 10
                              ? "var(--red)"
                              : "var(--amber)",
                        }}
                      >
                        {u.daysSinceSignup}d
                      </span>
                    </td>
                    <td className={styles.td}>
                      <Badge
                        label={u.plan}
                        variant={u.plan === "Trial" ? "warning" : "default"}
                      />
                    </td>
                    <td className={styles.td}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button
                          onClick={() => handleEmail(u.id, u.name)}
                          disabled={emailingId === u.id}
                          title="Send nudge to user"
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: 6,
                            background: "var(--bg-card)",
                            border: "1px solid var(--border-default)",
                            color: "var(--text-secondary)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            transition: "all 0.15s",
                          }}
                        >
                          {emailingId === u.id ? (
                            <RefreshCw
                              size={12}
                              style={{ animation: "spin 1s linear infinite" }}
                            />
                          ) : (
                            <Mail size={12} />
                          )}
                        </button>
                        <button
                          onClick={() =>
                            handleNudge(
                              u.id.split("-")[0] + "-specific",
                              u.name,
                            )
                          }
                          title="Send campaign nudge"
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: 6,
                            background: "var(--bg-card)",
                            border: "1px solid var(--border-default)",
                            color: "var(--text-secondary)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            transition: "all 0.15s",
                          }}
                        >
                          <Send size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Pagination page={stuckPage} total={stuckTotal} perPage={STUCK_PER_PAGE} onChange={setStuckPage} />
      </div>

      {/* ═══ SECTION 4 — NUDGE CAMPAIGNS ═══ */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>Automated Nudge Campaigns</h3>
            <p className={styles.cardSub}>
              {nudgeCampaigns.length} campaigns •{" "}
              {nudgeCampaigns.filter((n) => n.status === "Active").length}{" "}
              active
            </p>
          </div>
          <button
            onClick={() => setShowSendAllConfirm(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "var(--blue-primary)",
              color: "white",
              border: "none",
              borderRadius: 8,
              padding: "10px 16px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <Radio size={14} /> Send All Active
          </button>
        </div>
        <div className={styles.nudgeGrid}>
          {nudgeCampaigns.map((n) => (
            <div
              key={n.id}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-default)",
                borderRadius: 10,
                borderLeft: `4px solid ${statusColor(n.status)}`,
                padding: 16,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  gap: 8,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      marginBottom: 2,
                    }}
                  >
                    {n.name}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {n.target}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "3px 8px",
                    borderRadius: 4,
                    background: statusBg(n.status),
                    color: statusColor(n.status),
                  }}
                >
                  {n.status}
                </div>
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--text-muted)",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Clock size={12} /> {n.trigger}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--text-muted)",
                  fontStyle: "italic",
                  padding: "8px 12px",
                  background: "var(--bg-elevated)",
                  borderRadius: 6,
                  borderLeft: "2px solid var(--border-default)",
                }}
              >
                "{n.subject}"
              </div>
              {n.sentCount > 0 && (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 4 }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 11,
                      color: "var(--text-muted)",
                    }}
                  >
                    <span>Open rate</span>
                    <span
                      style={{ fontWeight: 600, color: "var(--text-primary)" }}
                    >
                      {n.openRate}%
                    </span>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: 6,
                      background: "var(--bg-elevated)",
                      borderRadius: 3,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${n.openRate}%`,
                        height: "100%",
                        background: "var(--green)",
                        transition: "width 0.3s ease",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: "var(--text-muted)",
                      marginTop: 2,
                    }}
                  >
                    {n.sentCount.toLocaleString()} sent
                  </div>
                </div>
              )}
              <button
                onClick={() => handleNudge(n.id, n.name)}
                disabled={nudgingId === n.id || sentNudges.includes(n.id)}
                style={{
                  width: "100%",
                  padding: "9px 12px",
                  borderRadius: 6,
                  background: sentNudges.includes(n.id)
                    ? "var(--green-bg)"
                    : "var(--bg-elevated)",
                  border: `1px solid ${sentNudges.includes(n.id) ? "var(--green)" : "var(--border-default)"}`,
                  color: sentNudges.includes(n.id)
                    ? "var(--green)"
                    : "var(--text-secondary)",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                }}
              >
                {nudgingId === n.id ? (
                  <>
                    <RefreshCw
                      size={12}
                      style={{ animation: "spin 1s linear infinite" }}
                    />{" "}
                    Sending...
                  </>
                ) : sentNudges.includes(n.id) ? (
                  <>
                    <CheckCircle size={12} /> Sent
                  </>
                ) : (
                  <>
                    <Send size={12} /> Send Nudge
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SEND ALL CONFIRMATION MODAL */}
      <AnimatePresence>
        {showSendAllConfirm && (
          <>
            <motion.div
              onClick={() => !sendingAllNudges && setShowSendAllConfirm(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.5)",
                zIndex: 600,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                x: "-50%",
                y: "-50%",
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-default)",
                borderRadius: 12,
                zIndex: 601,
                maxWidth: 400,
                width: "90%",
                boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div style={{ padding: 24 }}>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: 8,
                  }}
                >
                  Send All Active Campaigns?
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "var(--text-muted)",
                    marginBottom: 24,
                  }}
                >
                  This will send{" "}
                  {nudgeCampaigns.filter((n) => n.status === "Active").length}{" "}
                  active nudge campaigns to their target segments now.
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    onClick={() => setShowSendAllConfirm(false)}
                    disabled={sendingAllNudges}
                    style={{
                      padding: "9px 16px",
                      borderRadius: 6,
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-default)",
                      color: "var(--text-secondary)",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendAllActive}
                    disabled={sendingAllNudges}
                    style={{
                      padding: "9px 16px",
                      borderRadius: 6,
                      background: "var(--green)",
                      color: "white",
                      border: "none",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    {sendingAllNudges ? (
                      <>
                        <RefreshCw
                          size={12}
                          style={{ animation: "spin 1s linear infinite" }}
                        />{" "}
                        Sending...
                      </>
                    ) : (
                      <>Confirm</>
                    )}
                  </button>
                </div>
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
