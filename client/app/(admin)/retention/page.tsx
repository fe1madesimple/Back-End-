"use client";

import { useState, useCallback, useMemo } from "react";
import Pagination from "@/components/ui/Pagination";
import { usePagination } from "@/lib/usePagination";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import {
  TrendingUp,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Mail,
  Clock,
  Target,
  RefreshCw,
  Download,
  BarChart2,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import { retentionData } from "@/lib/dummy-data";
import styles from "./retention.module.css";

type ToastType = {
  message: string;
  type: "success" | "danger" | "warning" | "info";
};

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-IE", { day: "numeric", month: "short" });

const relativeTime = (d: string) => {
  const diff = Math.floor((Date.now() - new Date(d).getTime()) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "1d ago";
  return `${diff}d ago`;
};

const riskVariant = (r: string): "danger" | "warning" | "info" | "default" =>
  r === "Critical"
    ? "danger"
    : r === "High"
      ? "warning"
      : r === "Medium"
        ? "info"
        : "default";

const riskColor = (r: string) =>
  r === "Critical"
    ? "var(--red)"
    : r === "High"
      ? "var(--amber)"
      : r === "Medium"
        ? "var(--blue-bright)"
        : "var(--text-muted)";

export default function RetentionPage() {
  const [toast, setToast] = useState<ToastType | null>(null);
  const [riskFilter, setRiskFilter] = useState("All");
  const [sendingCampaign, setSendingCampaign] = useState<string | null>(null);
  const [sentCampaigns, setSentCampaigns] = useState<string[]>([]);
  const [emailingUser, setEmailingUser] = useState<string | null>(null);
  const AT_RISK_PER_PAGE = 20;

  const showToast = useCallback(
    (message: string, type: ToastType["type"] = "success") => {
      setToast({ message, type });
      setTimeout(() => setToast(null), 3000);
    },
    [],
  );

  const handleSendCampaign = (id: string, label: string) => {
    setSendingCampaign(id);
    setTimeout(() => {
      setSendingCampaign(null);
      setSentCampaigns((prev) => [...prev, id]);
      showToast(`✓ Campaign sent - ${label}`, "success");
    }, 1800);
  };

  const handleEmailUser = (id: string, name: string) => {
    setEmailingUser(id);
    setTimeout(() => {
      setEmailingUser(null);
      showToast(`✓ Re-engagement email sent to ${name}`, "success");
    }, 1400);
  };

  const filteredRisk = useMemo(
    () =>
      retentionData.atRiskUsers.filter(
        (u) => riskFilter === "All" || u.riskLevel === riskFilter,
      ),
    [riskFilter],
  );

  const {
    page: riskPage,
    setPage: setRiskPage,
    paginated: paginatedRisk,
    total: riskTotal,
  } = usePagination(filteredRisk, AT_RISK_PER_PAGE);

  const d = retentionData;

  const signalIcon = (severity: string) =>
    severity === "danger" ? (
      <AlertCircle size={16} color="var(--red)" />
    ) : (
      <AlertTriangle size={16} color="var(--amber)" />
    );

  const signalBorder = (severity: string) =>
    severity === "danger" ? "var(--red)" : "var(--amber)";

  const signalBg = (severity: string) =>
    severity === "danger" ? "var(--red-bg)" : "var(--amber-bg)";

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Retention Engine</h1>
          <p className={styles.subtitle}>
            Early warning system - identify at-risk users and act before they
            churn
          </p>
        </div>
        <div className={styles.headerActions}>
          <button
            className={styles.exportBtn}
            onClick={() => showToast("✓ Retention report exported", "info")}
          >
            <Download size={14} /> Export Report
          </button>
        </div>
      </div>

      <div className={styles.pulseGrid}>
        {[
          {
            label: "Active Last 7 Days",
            value: d.activeUsersLast7Days,
            color: "var(--green)",
            icon: CheckCircle,
            sub: "logged in this week",
          },
          {
            label: "Active Last 30 Days",
            value: d.activeUsersLast30Days,
            color: "var(--blue-bright)",
            icon: BarChart2,
            sub: "monthly active users",
          },
          {
            label: "7+ Day Inactive",
            value: d.inactiveUsers7Plus,
            color: "var(--amber)",
            icon: Clock,
            sub: "at risk - need attention",
          },
          {
            label: "14+ Day Inactive",
            value: d.inactiveUsers14Plus,
            color: "var(--red)",
            icon: AlertCircle,
            sub: "high churn risk",
          },
          {
            label: "Avg Daily Active",
            value: d.avgDailyActiveUsers,
            color: "var(--purple)",
            icon: TrendingUp,
            sub: "users per day this month",
          },
          {
            label: "30-Day Retention Rate",
            value: `${d.retentionRate30Day}%`,
            color: "var(--green)",
            icon: Target,
            sub: "users retained after 30 days",
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

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>
              Daily Active Users - Last 30 Days
            </h3>
            <p className={styles.cardSub}>
              Weekend dips are normal - watch for sustained downward trends
            </p>
          </div>
          <div className={styles.chartBadge}>
            <BarChart2 size={13} /> Avg {d.avgDailyActiveUsers}/day
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart
            data={d.dailyActiveUsers}
            margin={{ top: 5, right: 8, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#4B5563", fontSize: 11 }}
              interval={4}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#4B5563", fontSize: 11 }}
              width={32}
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
            <ReferenceLine
              y={d.avgDailyActiveUsers}
              stroke="#8B5CF6"
              strokeDasharray="4 4"
              label={{
                value: "Avg",
                fill: "#8B5CF6",
                fontSize: 11,
                position: "right",
              }}
            />
            <Line
              type="monotone"
              dataKey="dau"
              stroke="#3B82F6"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4, fill: "#3B82F6" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>At-Risk Users</h3>
            <p className={styles.cardSub}>
              {d.atRiskUsers.length} users inactive 6+ days - ranked by churn
              risk
            </p>
          </div>
          <div className={styles.filterPills}>
            {["All", "Critical", "High", "Medium", "Low"].map((f) => (
              <button
                key={f}
                className={`${styles.filterBtn} ${riskFilter === f ? styles.filterBtnActive : ""}`}
                onClick={() => {
                  setRiskFilter(f);
                  setRiskPage(1);
                }}
                style={
                  riskFilter === f && f !== "All"
                    ? {
                        borderColor: riskColor(f),
                        color: riskColor(f),
                        background: riskColor(f) + "15",
                      }
                    : {}
                }
              >
                {f}
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
                  "Plan",
                  "Last Active",
                  "Days Inactive",
                  "Streak",
                  "Risk",
                  "Auto Email",
                  "Actions",
                ].map((h) => (
                  <th key={h} className={styles.th}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRisk.length === 0 && (
                <tr>
                  <td colSpan={8} className={styles.emptyRow}>
                    <CheckCircle
                      size={16}
                      color="var(--green)"
                      style={{ display: "inline", marginRight: 8 }}
                    />
                    No users at this risk level
                  </td>
                </tr>
              )}
              {paginatedRisk.map((u) => (
                <tr key={u.id} className={styles.tr}>
                  <td className={styles.td}>
                    <div className={styles.userCell}>
                      <div
                        className={styles.userAvatar}
                        style={{
                          background:
                            u.riskLevel === "Critical"
                              ? "var(--red)"
                              : u.riskLevel === "High"
                                ? "#B38513"
                                : "#2563EB",
                        }}
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
                    <Badge
                      label={u.plan}
                      variant={
                        u.plan === "Pro Monthly"
                          ? "success"
                          : u.plan === "Trial"
                            ? "warning"
                            : "info"
                      }
                    />
                  </td>
                  <td className={styles.td}>
                    <span className={styles.numText}>
                      {relativeTime(u.lastActive)}
                    </span>
                  </td>
                  <td className={styles.td}>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color:
                          u.daysInactive >= 14
                            ? "var(--red)"
                            : u.daysInactive >= 10
                              ? "var(--amber)"
                              : "var(--text-secondary)",
                      }}
                    >
                      {u.daysInactive}d
                    </span>
                    {u.trialDaysLeft !== null && (
                      <div
                        style={{
                          fontSize: 10,
                          color: "var(--red)",
                          fontWeight: 600,
                          marginTop: 2,
                        }}
                      >
                        {u.trialDaysLeft}d trial left
                      </div>
                    )}
                  </td>
                  <td className={styles.td}>
                    {u.streakBroken ? (
                      <span
                        style={{
                          fontSize: 12,
                          color: "var(--red)",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        Broken
                      </span>
                    ) : (
                      <span
                        style={{
                          fontSize: 12,
                          color: "var(--amber)",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        {u.streak}d
                      </span>
                    )}
                  </td>
                  <td className={styles.td}>
                    <Badge
                      label={u.riskLevel}
                      variant={riskVariant(u.riskLevel)}
                    />
                  </td>
                  <td className={styles.td}>
                    {u.autoEmailSent ? (
                      <span
                        style={{
                          fontSize: 12,
                          color: "var(--green)",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <CheckCircle size={12} /> Sent
                      </span>
                    ) : (
                      <span
                        style={{ fontSize: 12, color: "var(--text-muted)" }}
                      >
                        Not sent
                      </span>
                    )}
                  </td>
                  <td className={styles.td}>
                    <div className={styles.rowActions}>
                      <button
                        className={styles.emailBtn}
                        onClick={() => handleEmailUser(u.id, u.name)}
                        disabled={emailingUser === u.id}
                      >
                        {emailingUser === u.id ? (
                          <RefreshCw size={12} className={styles.spinning} />
                        ) : (
                          <Mail size={12} />
                        )}
                        {emailingUser === u.id ? "Sending..." : "Email"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          page={riskPage}
          total={riskTotal}
          perPage={AT_RISK_PER_PAGE}
          onChange={setRiskPage}
        />
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>Churn Prediction Signals</h3>
            <p className={styles.cardSub}>
              Behavioural patterns that predict cancellation - act now before
              they leave
            </p>
          </div>
        </div>
        <div className={styles.signalsGrid}>
          {d.signals.map((sig) => (
            <div
              key={sig.id}
              className={styles.signalCard}
              style={{
                borderLeftColor: signalBorder(sig.severity),
                background: signalBg(sig.severity),
              }}
            >
              <div className={styles.signalTop}>
                {signalIcon(sig.severity)}
                <span className={styles.signalTitle}>{sig.title}</span>
                <span
                  className={styles.signalCount}
                  style={{
                    background: signalBorder(sig.severity) + "20",
                    color: signalBorder(sig.severity),
                    border: `1px solid ${signalBorder(sig.severity)}40`,
                  }}
                >
                  {sig.count} users
                </span>
              </div>
              <p className={styles.signalDetail}>{sig.detail}</p>
              <button
                className={styles.campaignBtn}
                onClick={() => handleSendCampaign(sig.id, sig.campaignLabel)}
                disabled={
                  sendingCampaign === sig.id || sentCampaigns.includes(sig.id)
                }
                style={{
                  borderColor: sentCampaigns.includes(sig.id)
                    ? "var(--green)"
                    : signalBorder(sig.severity),
                  color: sentCampaigns.includes(sig.id)
                    ? "var(--green)"
                    : signalBorder(sig.severity),
                }}
              >
                {sendingCampaign === sig.id ? (
                  <>
                    <RefreshCw size={12} className={styles.spinning} />{" "}
                    Sending...
                  </>
                ) : sentCampaigns.includes(sig.id) ? (
                  <>
                    <CheckCircle size={12} /> Campaign Sent
                  </>
                ) : (
                  <>
                    <Mail size={12} /> {sig.campaignLabel}
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>Re-engagement Campaign Results</h3>
            <p className={styles.cardSub}>
              How effective your automated retention emails are at bringing
              users back
            </p>
          </div>
        </div>
        <div className={styles.campaignList}>
          {d.campaigns.map((c) => (
            <div key={c.id} className={styles.campaignRow}>
              <div className={styles.campaignLeft}>
                <div className={styles.campaignName}>{c.name}</div>
                <div className={styles.campaignDate}>
                  Sent {formatDate(c.sentAt)} - {c.emailsSent} emails
                </div>
              </div>
              <div className={styles.campaignStats}>
                <div className={styles.campaignStat}>
                  <div className={styles.campaignStatLabel}>Open Rate</div>
                  <div
                    className={styles.campaignStatValue}
                    style={{
                      color: c.openRate >= 60 ? "var(--green)" : "var(--amber)",
                    }}
                  >
                    {c.openRate}%
                  </div>
                </div>
                <div className={styles.campaignStat}>
                  <div className={styles.campaignStatLabel}>Click Rate</div>
                  <div
                    className={styles.campaignStatValue}
                    style={{
                      color:
                        c.clickRate >= 30 ? "var(--green)" : "var(--amber)",
                    }}
                  >
                    {c.clickRate}%
                  </div>
                </div>
                <div className={styles.campaignStat}>
                  <div className={styles.campaignStatLabel}>Users Returned</div>
                  <div
                    className={styles.campaignStatValue}
                    style={{ color: "var(--blue-bright)" }}
                  >
                    {c.usersReturned}/{c.emailsSent}
                  </div>
                </div>
                <div className={styles.campaignStat}>
                  <div className={styles.campaignStatLabel}>Return Rate</div>
                  <div
                    className={styles.campaignStatValue}
                    style={{
                      color:
                        c.returnRate >= 35 ? "var(--green)" : "var(--amber)",
                    }}
                  >
                    {c.returnRate}%
                  </div>
                </div>
              </div>
              <div className={styles.campaignBar}>
                <div
                  className={styles.campaignBarFill}
                  style={{
                    width: `${c.returnRate}%`,
                    background:
                      c.returnRate >= 35 ? "var(--green)" : "var(--amber)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

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
