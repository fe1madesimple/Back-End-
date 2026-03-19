"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Mail,
  XCircle,
  Clock,
  TrendingUp,
  CreditCard,
  Download,
  Settings,
  ChevronRight,
  Shield,
  AlertTriangle,
  Ban,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import { recoveryData } from "@/lib/dummy-data";
import styles from "./recovery.module.css";

type ToastType = {
  message: string;
  type: "success" | "danger" | "warning" | "info";
};

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-IE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const formatDateTime = (d: string) =>
  new Date(d).toLocaleDateString("en-IE", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

export default function RecoveryPage() {
  const [toast, setToast] = useState<ToastType | null>(null);
  const [retryingId, setRetryingId] = useState<string | null>(null);
  const [emailingId, setEmailingId] = useState<string | null>(null);
  const [markingId, setMarkingId] = useState<string | null>(null);
  const [recoveredIds, setRecoveredIds] = useState<string[]>([]);
  const [unrecovarableIds, setUnrecoverableIds] = useState<string[]>([]);
  const [settings, setSettings] = useState(recoveryData.settings);
  const [savingSettings, setSavingSettings] = useState(false);
  const [confirmUnrecoverable, setConfirmUnrecoverable] = useState<
    (typeof recoveryData.failedQueue)[0] | null
  >(null);

  const showToast = useCallback(
    (message: string, type: ToastType["type"] = "success") => {
      setToast({ message, type });
      setTimeout(() => setToast(null), 3000);
    },
    [],
  );

  const handleRetry = (id: string, name: string) => {
    setRetryingId(id);
    setTimeout(() => {
      setRetryingId(null);
      // 70% chance of success for demo
      const success = Math.random() > 0.3;
      if (success) {
        setRecoveredIds((prev) => [...prev, id]);
        showToast(`✓ Payment recovered for ${name} — €29 collected`, "success");
      } else {
        showToast(
          `✗ Retry failed for ${name} — card still declining`,
          "danger",
        );
      }
    }, 2000);
  };

  const handleEmail = (id: string, name: string) => {
    setEmailingId(id);
    setTimeout(() => {
      setEmailingId(null);
      showToast(`✓ Recovery email sent to ${name}`, "success");
    }, 1400);
  };

  const handleMarkUnrecoverable = (
    item: (typeof recoveryData.failedQueue)[0],
  ) => {
    setConfirmUnrecoverable(item);
  };

  const confirmMarkUnrecoverable = () => {
    if (!confirmUnrecoverable) return;
    setUnrecoverableIds((prev) => [...prev, confirmUnrecoverable.id]);
    showToast(
      `${confirmUnrecoverable.userName} marked as unrecoverable — €${confirmUnrecoverable.amount} written off`,
      "warning",
    );
    setConfirmUnrecoverable(null);
  };

  const handleSaveSettings = () => {
    setSavingSettings(true);
    setTimeout(() => {
      setSavingSettings(false);
      showToast("✓ Recovery settings saved", "success");
    }, 1200);
  };

  const activeQueue = recoveryData.failedQueue.filter(
    (f) => !recoveredIds.includes(f.id) && !unrecovarableIds.includes(f.id),
  );

  const stageStatusVariant = (
    status: string,
  ): "info" | "warning" | "danger" | "default" =>
    status === "Pending Retry"
      ? "info"
      : status === "Escalated"
        ? "warning"
        : status === "Final Notice"
          ? "danger"
          : "default";

  const stageColor = (stage: string) =>
    stage === "Day 0"
      ? "var(--blue-bright)"
      : stage === "Day 3"
        ? "var(--amber)"
        : stage === "Day 7"
          ? "var(--red)"
          : "var(--text-muted)";

  const d = recoveryData;

  return (
    <div className={styles.page}>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Revenue Recovery</h1>
          <p className={styles.subtitle}>
            Automated failed payment escalation — recover stuck revenue before
            it is lost
          </p>
        </div>
        <div className={styles.headerActions}>
          <button
            className={styles.exportBtn}
            onClick={() => showToast("✓ Recovery report exported", "info")}
          >
            <Download size={14} /> Export Report
          </button>
        </div>
      </div>

      {/* ═══ SECTION 1 — RECOVERY PULSE ═══ */}
      <div className={styles.pulseGrid}>
        {[
          {
            label: "Revenue at Risk",
            value: `€${d.totalAtRisk}`,
            color: "var(--red)",
            icon: AlertCircle,
            sub: "in failed payment queue",
          },
          {
            label: "Recovered This Month",
            value: `€${d.recoveredThisMonth}`,
            color: "var(--green)",
            icon: CheckCircle,
            sub: "successfully retried",
          },
          {
            label: "Recovery Rate",
            value: `${d.recoveryRate}%`,
            color: "var(--blue-bright)",
            icon: TrendingUp,
            sub: "of all failed payments",
          },
          {
            label: "Avg Days to Recover",
            value: `${d.avgDaysToRecover}d`,
            color: "var(--amber)",
            icon: Clock,
            sub: "from first failure to payment",
          },
          {
            label: "In Queue Now",
            value: activeQueue.length,
            color: "var(--amber)",
            icon: CreditCard,
            sub: "payments awaiting retry",
          },
          {
            label: "Written Off",
            value: `€${d.lostUnrecoverable}`,
            color: "var(--text-muted)",
            icon: XCircle,
            sub: "unrecoverable this month",
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

      {/* ═══ SECTION 2 — FAILED PAYMENT QUEUE ═══ */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>Failed Payment Queue</h3>
            <p className={styles.cardSub}>
              {activeQueue.length} active · €
              {activeQueue.reduce((s, f) => s + f.amount, 0)} at risk
            </p>
          </div>
          {activeQueue.length === 0 && (
            <div className={styles.allClearBadge}>
              <CheckCircle size={13} /> All clear
            </div>
          )}
        </div>

        {activeQueue.length === 0 ? (
          <div className={styles.emptyQueue}>
            <CheckCircle size={32} color="var(--green)" />
            <div className={styles.emptyQueueTitle}>No failed payments</div>
            <div className={styles.emptyQueueSub}>
              All payments are processing normally
            </div>
          </div>
        ) : (
          <div className={styles.queueList}>
            {activeQueue.map((f) => (
              <div
                key={f.id}
                className={`${styles.queueCard} ${f.status === "Final Notice" ? styles.queueCardDanger : f.status === "Escalated" ? styles.queueCardWarning : styles.queueCardDefault}`}
              >
                {/* Stage indicator */}
                <div
                  className={styles.stageIndicator}
                  style={{ background: stageColor(f.escalationStage) }}
                >
                  {f.escalationStage}
                </div>

                {/* User info */}
                <div className={styles.queueUserSection}>
                  <div
                    className={styles.queueAvatar}
                    style={{ background: "#4B5563" }}
                  >
                    {f.userName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <div className={styles.queueUserName}>{f.userName}</div>
                    <div className={styles.queueUserEmail}>{f.email}</div>
                    <div className={styles.queuePlan}>{f.plan}</div>
                  </div>
                </div>

                {/* Payment details */}
                <div className={styles.queueDetails}>
                  <div className={styles.queueDetailRow}>
                    <span className={styles.queueDetailLabel}>Amount</span>
                    <span
                      className={styles.queueDetailValue}
                      style={{ color: "var(--red)", fontWeight: 700 }}
                    >
                      €{f.amount}
                    </span>
                  </div>
                  <div className={styles.queueDetailRow}>
                    <span className={styles.queueDetailLabel}>Reason</span>
                    <span
                      className={styles.queueDetailValue}
                      style={{ color: "var(--red)" }}
                    >
                      {f.failReason}
                    </span>
                  </div>
                  <div className={styles.queueDetailRow}>
                    <span className={styles.queueDetailLabel}>
                      First Failed
                    </span>
                    <span className={styles.queueDetailValue}>
                      {formatDate(f.firstFailedAt)}
                    </span>
                  </div>
                  <div className={styles.queueDetailRow}>
                    <span className={styles.queueDetailLabel}>Retries</span>
                    <span
                      className={styles.queueDetailValue}
                      style={{ color: "var(--amber)" }}
                    >
                      {f.retryCount} attempts
                    </span>
                  </div>
                  <div className={styles.queueDetailRow}>
                    <span className={styles.queueDetailLabel}>Next Retry</span>
                    <span className={styles.queueDetailValue}>
                      {f.nextRetryAt ? (
                        formatDate(f.nextRetryAt)
                      ) : (
                        <span style={{ color: "var(--red)" }}>
                          No retry scheduled
                        </span>
                      )}
                    </span>
                  </div>
                  <div className={styles.queueDetailRow}>
                    <span className={styles.queueDetailLabel}>Status</span>
                    <Badge
                      label={f.status}
                      variant={stageStatusVariant(f.status)}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className={styles.queueActions}>
                  <button
                    className={styles.retryBtn}
                    onClick={() => handleRetry(f.id, f.userName)}
                    disabled={retryingId === f.id}
                  >
                    {retryingId === f.id ? (
                      <>
                        <RefreshCw size={13} className={styles.spinning} />{" "}
                        Retrying...
                      </>
                    ) : (
                      <>
                        <RefreshCw size={13} /> Retry Now
                      </>
                    )}
                  </button>
                  <button
                    className={styles.emailBtn}
                    onClick={() => handleEmail(f.id, f.userName)}
                    disabled={emailingId === f.id}
                  >
                    {emailingId === f.id ? (
                      <>
                        <RefreshCw size={12} className={styles.spinning} />{" "}
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail size={12} /> Send Email
                      </>
                    )}
                  </button>
                  <button
                    className={styles.writeOffBtn}
                    onClick={() => handleMarkUnrecoverable(f)}
                  >
                    <Ban size={12} /> Write Off
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ═══ SECTION 3 — RECOVERY CHART ═══ */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>
              Failed vs Recovered — Last 8 Weeks
            </h3>
            <p className={styles.cardSub}>
              Weekly comparison of revenue at risk vs revenue successfully
              recovered
            </p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart
            data={d.weeklyRecovery}
            margin={{ top: 5, right: 8, left: 0, bottom: 5 }}
            barCategoryGap="30%"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
              vertical={false}
            />
            <XAxis
              dataKey="week"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#4B5563", fontSize: 10 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#4B5563", fontSize: 11 }}
              width={44}
              tickFormatter={(v) => `€${v}`}
            />
            <Tooltip
              contentStyle={{
                background: "#141B2D",
                border: "1px solid #1C2540",
                borderRadius: 8,
                color: "#F1F5F9",
                fontSize: 12,
              }}
              labelStyle={{ color: "#94A3B8" }}
            />
            <Legend
              formatter={(v) => (v === "failed" ? "Failed" : "Recovered")}
              wrapperStyle={{ fontSize: 12, color: "#94A3B8" }}
            />
            <Bar
              dataKey="failed"
              fill="#EF4444"
              radius={[4, 4, 0, 0]}
              fillOpacity={0.85}
            />
            <Bar
              dataKey="recovered"
              fill="#10B981"
              radius={[4, 4, 0, 0]}
              fillOpacity={0.85}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ═══ SECTION 4 — ESCALATION PIPELINE ═══ */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>Automated Escalation Sequence</h3>
            <p className={styles.cardSub}>
              How the system handles failed payments without any manual
              intervention
            </p>
          </div>
        </div>

        <div className={styles.pipeline}>
          {d.escalationStages.map((stage, i) => (
            <div key={stage.stage} className={styles.pipelineStep}>
              {/* Connector line */}
              {i < d.escalationStages.length - 1 && (
                <div className={styles.pipelineConnector} />
              )}

              {/* Stage node */}
              <div
                className={styles.pipelineNode}
                style={{
                  borderColor: stage.color,
                  background: stage.color + "15",
                }}
              >
                <div
                  className={styles.pipelineStageLabel}
                  style={{ color: stage.color }}
                >
                  {stage.stage}
                </div>
                <div className={styles.pipelineTitle}>{stage.label}</div>
                <div className={styles.pipelineDesc}>{stage.description}</div>
                <div
                  className={styles.pipelineUsers}
                  style={{
                    color:
                      stage.usersAtStage > 0
                        ? stage.color
                        : "var(--text-muted)",
                  }}
                >
                  {stage.usersAtStage > 0
                    ? `${stage.usersAtStage} user${stage.usersAtStage > 1 ? "s" : ""} here now`
                    : "No users at this stage"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ SECTION 5 — RECOVERY SETTINGS ═══ */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>Recovery Settings</h3>
            <p className={styles.cardSub}>
              Configure how the automated recovery system behaves
            </p>
          </div>
          <Settings size={18} color="var(--text-muted)" />
        </div>

        <div className={styles.settingsGrid}>
          <div className={styles.settingSection}>
            <div className={styles.settingSectionTitle}>
              <RefreshCw size={15} color="var(--blue-bright)" /> Auto-Retry
            </div>
            <div className={styles.toggleRow}>
              <div>
                <div className={styles.toggleLabel}>
                  Enable automatic retries
                </div>
                <div className={styles.toggleSub}>
                  System retries failed payments automatically on a schedule
                </div>
              </div>
              <button
                className={`${styles.toggle} ${settings.autoRetryEnabled ? styles.toggleOn : ""}`}
                onClick={() =>
                  setSettings((s) => ({
                    ...s,
                    autoRetryEnabled: !s.autoRetryEnabled,
                  }))
                }
              />
            </div>
            <div className={styles.settingField}>
              <label className={styles.settingLabel}>Retry Interval</label>
              <select
                className={styles.settingSelect}
                value={settings.retryInterval}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, retryInterval: e.target.value }))
                }
                disabled={!settings.autoRetryEnabled}
              >
                <option value="3days">Every 3 days</option>
                <option value="5days">Every 5 days</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
            <div className={styles.settingField}>
              <label className={styles.settingLabel}>Max Retry Attempts</label>
              <select
                className={styles.settingSelect}
                value={settings.maxRetryAttempts}
                onChange={(e) =>
                  setSettings((s) => ({
                    ...s,
                    maxRetryAttempts: e.target.value,
                  }))
                }
                disabled={!settings.autoRetryEnabled}
              >
                <option value="2">2 attempts</option>
                <option value="3">3 attempts</option>
                <option value="5">5 attempts</option>
              </select>
            </div>
          </div>

          <div className={styles.settingSection}>
            <div className={styles.settingSectionTitle}>
              <Shield size={15} color="var(--amber)" /> Auto-Suspend
            </div>
            <div className={styles.toggleRow}>
              <div>
                <div className={styles.toggleLabel}>
                  Auto-suspend after final failure
                </div>
                <div className={styles.toggleSub}>
                  Automatically suspend account after all retries are exhausted
                </div>
              </div>
              <button
                className={`${styles.toggle} ${settings.autoSuspendEnabled ? styles.toggleOn : ""}`}
                onClick={() =>
                  setSettings((s) => ({
                    ...s,
                    autoSuspendEnabled: !s.autoSuspendEnabled,
                  }))
                }
              />
            </div>
          </div>

          <div className={styles.settingSection}>
            <div className={styles.settingSectionTitle}>
              <Mail size={15} color="var(--green)" /> Email Notifications
            </div>
            <div className={styles.toggleRow}>
              <div>
                <div className={styles.toggleLabel}>
                  Email on payment failure
                </div>
                <div className={styles.toggleSub}>
                  Send automated email when a payment fails
                </div>
              </div>
              <button
                className={`${styles.toggle} ${settings.sendEmailOnFailure ? styles.toggleOn : ""}`}
                onClick={() =>
                  setSettings((s) => ({
                    ...s,
                    sendEmailOnFailure: !s.sendEmailOnFailure,
                  }))
                }
              />
            </div>
            <div className={styles.toggleRow} style={{ marginTop: 10 }}>
              <div>
                <div className={styles.toggleLabel}>
                  Email on successful recovery
                </div>
                <div className={styles.toggleSub}>
                  Send confirmation when payment is recovered
                </div>
              </div>
              <button
                className={`${styles.toggle} ${settings.sendEmailOnRecovery ? styles.toggleOn : ""}`}
                onClick={() =>
                  setSettings((s) => ({
                    ...s,
                    sendEmailOnRecovery: !s.sendEmailOnRecovery,
                  }))
                }
              />
            </div>
          </div>
        </div>

        <div
          style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}
        >
          <button
            className={styles.saveBtn}
            onClick={handleSaveSettings}
            disabled={savingSettings}
          >
            {savingSettings ? "Saving..." : "Save Recovery Settings"}
          </button>
        </div>
      </div>

      {/* ═══ CONFIRM WRITE OFF DIALOG ═══ */}
      <AnimatePresence>
        {confirmUnrecoverable && (
          <>
            <motion.div
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.7)",
                zIndex: 600,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmUnrecoverable(null)}
            />
            <motion.div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                x: "-50%",
                y: "-50%",
                width: 380,
                maxWidth: "calc(100vw - 32px)",
                background: "var(--bg-elevated)",
                border: "1px solid var(--amber)",
                borderRadius: 14,
                zIndex: 601,
                overflow: "hidden",
                boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div style={{ padding: 24 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "var(--amber-bg)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  <Ban size={20} color="var(--amber)" />
                </div>
                <div
                  style={{
                    fontSize: 17,
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    marginBottom: 8,
                  }}
                >
                  Write Off Payment
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                    marginBottom: 20,
                  }}
                >
                  Mark{" "}
                  <strong style={{ color: "var(--text-primary)" }}>
                    {confirmUnrecoverable.userName}
                  </strong>
                  's €{confirmUnrecoverable.amount} payment as unrecoverable?
                  This will stop all retry attempts and write off the amount.
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    onClick={confirmMarkUnrecoverable}
                    style={{
                      flex: 1,
                      background: "var(--amber)",
                      border: "none",
                      borderRadius: 8,
                      padding: "10px",
                      fontSize: 14,
                      fontWeight: 600,
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    Yes, Write Off
                  </button>
                  <button
                    onClick={() => setConfirmUnrecoverable(null)}
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
