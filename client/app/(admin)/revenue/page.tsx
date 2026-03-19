"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  Euro,
  Users,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  FileText,
  RefreshCw,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Target,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import { revenueData } from "@/lib/dummy-data";
import styles from "./revenue.module.css";

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

const relativeTime = (d: string) => {
  const diff = Math.floor((Date.now() - new Date(d).getTime()) / 60000);
  if (diff < 60) return `${diff}m ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
  return `${Math.floor(diff / 1440)}d ago`;
};

export default function RevenuePage() {
  const [toast, setToast] = useState<ToastType | null>(null);
  const [targetMRR, setTargetMRR] = useState(6000);
  const [paymentPage, setPaymentPage] = useState(1);
  const [retryingId, setRetryingId] = useState<string | null>(null);
  const PAYMENTS_PER_PAGE = 6;

  const showToast = useCallback(
    (message: string, type: ToastType["type"] = "success") => {
      setToast({ message, type });
      setTimeout(() => setToast(null), 3000);
    },
    [],
  );

  const handleExport = (format: string) =>
    showToast(`✓ Exporting revenue report as ${format}...`, "info");

  const handleRetry = (id: string, name: string) => {
    setRetryingId(id);
    setTimeout(() => {
      setRetryingId(null);
      showToast(`✓ Payment retried for ${name}`, "success");
    }, 1800);
  };

  const mrrGrowth = revenueData.mrrGrowthPercent;
  const mrrTrend = revenueData.mrrTrend;

  const paginatedPayments = revenueData.recentPayments.slice(
    (paymentPage - 1) * PAYMENTS_PER_PAGE,
    paymentPage * PAYMENTS_PER_PAGE,
  );
  const paymentTotalPages = Math.ceil(
    revenueData.recentPayments.length / PAYMENTS_PER_PAGE,
  );

  // Subscribers needed to hit target
  const subscribersNeeded = Math.ceil(
    (targetMRR - revenueData.mrr) / revenueData.arpu,
  );

  return (
    <div className={styles.page}>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Subscription & Revenue</h1>
          <p className={styles.subtitle}>
            Complete financial intelligence - MRR, churn, payments and
            forecasting
          </p>
        </div>
        <div className={styles.headerActions}>
          <button
            className={styles.exportBtn}
            onClick={() => handleExport("CSV")}
          >
            <Download size={14} /> Export CSV
          </button>
          <button
            className={styles.exportBtn}
            onClick={() => handleExport("PDF")}
          >
            <FileText size={14} /> Export PDF
          </button>
        </div>
      </div>

      {/* SECTION 1 - FINANCIAL PULSE */}
      <div className={styles.pulseGrid}>
        {[
          {
            label: "Monthly Revenue",
            value: `EUR${revenueData.mrr.toLocaleString()}`,
            sub: `vs EUR${revenueData.mrrLastMonth.toLocaleString()} last month`,
            trend: `+${mrrGrowth}%`,
            up: true,
            color: "var(--green)",
            icon: Euro,
          },
          {
            label: "Annual Run Rate",
            value: `EUR${revenueData.arr.toLocaleString()}`,
            sub: "MRR x 12",
            trend: "projected",
            up: true,
            color: "var(--blue-bright)",
            icon: TrendingUp,
          },
          {
            label: "All-Time Revenue",
            value: `EUR${revenueData.totalRevenueAllTime.toLocaleString()}`,
            sub: "since platform launch",
            trend: "cumulative",
            up: true,
            color: "var(--purple)",
            icon: Target,
          },
          {
            label: "Avg Revenue / User",
            value: `EUR${revenueData.arpu.toFixed(2)}`,
            sub: "per paying subscriber",
            trend: "ARPU",
            up: true,
            color: "var(--cyan)",
            icon: Users,
          },
          {
            label: "Net Revenue This Month",
            value: `EUR${revenueData.netRevenueThisMonth.toLocaleString()}`,
            sub: `after EUR${revenueData.refundsThisMonth} in refunds`,
            trend: `-EUR${revenueData.refundsThisMonth} refunds`,
            up: false,
            color: "var(--amber)",
            icon: CreditCard,
          },
          {
            label: "Paying Subscribers",
            value: revenueData.activePayingSubscribers,
            sub: `+ ${revenueData.trialUsers} on trial`,
            trend: "+18 this week",
            up: true,
            color: "var(--green)",
            icon: Users,
          },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className={styles.pulseCard}>
              <div className={styles.pulseTop}>
                <div className={styles.pulseLabel}>{s.label}</div>
                <div
                  className={styles.pulseIconWrap}
                  style={{ background: `${s.color}20` }}
                >
                  <Icon size={15} color={s.color} />
                </div>
              </div>
              <div className={styles.pulseValue} style={{ color: s.color }}>
                {s.value}
              </div>
              <div className={styles.pulseSub}>{s.sub}</div>
              <div
                className={styles.pulseTrend}
                style={{ color: s.up ? "var(--green)" : "var(--red)" }}
              >
                {s.up ? (
                  <ArrowUpRight size={12} />
                ) : (
                  <ArrowDownRight size={12} />
                )}
                {s.trend}
              </div>
            </div>
          );
        })}
      </div>

      {/* SECTION 2 - MRR TREND CHART */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>MRR Growth vs Churn Loss</h3>
            <p className={styles.cardSub}>
              14-month revenue trend - green is growth, red is revenue lost to
              cancellations
            </p>
          </div>
          <div className={styles.chartLegend}>
            <span
              className={styles.legendDot}
              style={{ background: "#10B981" }}
            />{" "}
            MRR
            <span
              className={styles.legendDot}
              style={{ background: "#EF4444", marginLeft: 12 }}
            />{" "}
            Churn Loss
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart
            data={mrrTrend}
            margin={{ top: 5, right: 8, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="churnGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EF4444" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#EF4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#4B5563", fontSize: 11 }}
              interval={1}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#4B5563", fontSize: 11 }}
              width={52}
              tickFormatter={(v) => `EUR${v}`}
            />
            <Tooltip
              contentStyle={{
                background: "#141B2D",
                border: "1px solid #1C2540",
                borderRadius: 8,
                color: "#F1F5F9",
                fontSize: 12,
              }}
              formatter={(v, name) => [
                `EUR${Number(v).toLocaleString()}`,
                name === "mrr" ? "MRR" : "Churn Loss",
              ]}
              labelStyle={{ color: "#94A3B8" }}
            />
            <Area
              type="monotone"
              dataKey="mrr"
              stroke="#10B981"
              strokeWidth={2.5}
              fill="url(#mrrGrad)"
              dot={false}
              activeDot={{ r: 4, fill: "#10B981" }}
            />
            <Area
              type="monotone"
              dataKey="churnLoss"
              stroke="#EF4444"
              strokeWidth={2}
              fill="url(#churnGrad)"
              dot={false}
              activeDot={{ r: 4, fill: "#EF4444" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* SECTION 3 - PLAN BREAKDOWN */}
      <div className={styles.twoCol}>
        {/* Plan revenue cards */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle} style={{ marginBottom: 16 }}>
            Revenue by Plan
          </h3>
          <div className={styles.planList}>
            {revenueData.planBreakdown.map((p, i) => (
              <div key={i} className={styles.planRow}>
                <div
                  className={styles.planDot}
                  style={{ background: p.color }}
                />
                <div className={styles.planInfo}>
                  <div className={styles.planName}>{p.plan}</div>
                  <div className={styles.planMeta}>
                    {p.subscribers} subscribers
                  </div>
                </div>
                <div className={styles.planRight}>
                  <div className={styles.planMRR} style={{ color: p.color }}>
                    EUR{p.mrr.toLocaleString()}
                  </div>
                  <div
                    className={styles.planChange}
                    style={{
                      color: p.momChange >= 0 ? "var(--green)" : "var(--red)",
                    }}
                  >
                    {p.momChange >= 0 ? (
                      <ArrowUp size={10} />
                    ) : (
                      <ArrowDown size={10} />
                    )}
                    {Math.abs(p.momChange)} subs MoM
                  </div>
                </div>
                <div className={styles.planBarWrap}>
                  <div
                    className={styles.planBar}
                    style={{ width: `${p.percent}%`, background: p.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Donut chart */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle} style={{ marginBottom: 8 }}>
            Plan Mix Distribution
          </h3>
          <p className={styles.cardSub} style={{ marginBottom: 16 }}>
            Revenue contribution by subscription type
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={revenueData.planBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="mrr"
                nameKey="plan"
              >
                {revenueData.planBreakdown.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#141B2D",
                  border: "1px solid #1C2540",
                  borderRadius: 8,
                  color: "#F1F5F9",
                  fontSize: 12,
                }}
                formatter={(v, name) => [
                  `EUR${Number(v).toLocaleString()}`,
                  name as string,
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className={styles.donutLegend}>
            {revenueData.planBreakdown.map((p, i) => (
              <div key={i} className={styles.donutLegendItem}>
                <div
                  className={styles.donutDot}
                  style={{ background: p.color }}
                />
                <span className={styles.donutLabel}>
                  {p.plan.replace(" Monthly", " Mo").replace(" Annual", " Yr")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 4 - CHURN ANALYSIS */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>Churn Analysis This Month</h3>
            <p className={styles.cardSub}>
              Users who cancelled - revenue impact and reasons
            </p>
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {[
              {
                label: "Churn Rate",
                value: `${revenueData.churnRateThisMonth}%`,
                sub: `was ${revenueData.churnRateLastMonth}% last month`,
                color:
                  revenueData.churnRateThisMonth >
                  revenueData.churnRateLastMonth
                    ? "var(--red)"
                    : "var(--green)",
              },
              {
                label: "Revenue Lost",
                value: `EUR${revenueData.revenueFromChurnThisMonth}`,
                sub: `vs EUR${revenueData.revenueFromChurnLastMonth} last month`,
                color: "var(--red)",
              },
              {
                label: "Avg Lifetime",
                value: `${revenueData.avgSubscriptionLifetimeDays}d`,
                sub: "before cancellation",
                color: "var(--amber)",
              },
            ].map((s, i) => (
              <div key={i} className={styles.churnStat}>
                <div className={styles.churnStatLabel}>{s.label}</div>
                <div
                  className={styles.churnStatValue}
                  style={{ color: s.color }}
                >
                  {s.value}
                </div>
                <div className={styles.churnStatSub}>{s.sub}</div>
              </div>
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
                  "Total Revenue",
                  "Days Subscribed",
                  "Cancellation Reason",
                  "Cancelled",
                ].map((h) => (
                  <th key={h} className={styles.th}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {revenueData.churnedThisMonth.map((c) => (
                <tr key={c.id} className={styles.tr}>
                  <td className={styles.td}>
                    <div className={styles.userCell}>
                      <div
                        className={styles.userAvatar}
                        style={{ background: "#4B5563" }}
                      >
                        {c.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <div>
                        <div className={styles.userName}>{c.name}</div>
                        <div className={styles.userEmail}>{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className={styles.td}>
                    <Badge
                      label={c.plan.includes("Pro") ? "Pro" : "Standard"}
                      variant={c.plan.includes("Pro") ? "success" : "info"}
                    />
                  </td>
                  <td className={styles.td}>
                    <span style={{ color: "var(--green)", fontWeight: 600 }}>
                      EUR{c.revenue}
                    </span>
                  </td>
                  <td className={styles.td}>
                    <span className={styles.numText}>{c.daysSubscribed}d</span>
                  </td>
                  <td className={styles.td}>
                    <span className={styles.reasonText}>{c.reason ?? "—"}</span>
                  </td>
                  <td className={styles.td}>
                    <span className={styles.numText}>
                      {formatDate(c.cancelledAt)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 5 - UPGRADES & DOWNGRADES */}
      <div className={styles.twoCol}>
        {/* Upgrades */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h3 className={styles.cardTitle}>Upgrades This Month</h3>
              <p className={styles.cardSub}>Users who moved to a higher plan</p>
            </div>
            <div
              style={{ fontSize: 20, fontWeight: 700, color: "var(--green)" }}
            >
              +EUR{revenueData.upgrades.reduce((s, u) => s + u.revenueGain, 0)}
              /mo
            </div>
          </div>
          <div className={styles.moveList}>
            {revenueData.upgrades.map((u) => (
              <div key={u.id} className={styles.moveRow}>
                <div
                  className={styles.moveAvatar}
                  style={{ background: "var(--green)" }}
                >
                  {u.userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div className={styles.moveInfo}>
                  <div className={styles.moveName}>{u.userName}</div>
                  <div className={styles.movePlans}>
                    <span className={styles.moveFrom}>{u.from}</span>
                    <ArrowUpRight size={12} color="var(--green)" />
                    <span className={styles.moveTo}>{u.to}</span>
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "var(--green)",
                    }}
                  >
                    +EUR{u.revenueGain}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                    {formatDate(u.date)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Downgrades */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h3 className={styles.cardTitle}>Downgrades This Month</h3>
              <p className={styles.cardSub}>Users who moved to a lower plan</p>
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "var(--red)" }}>
              -EUR
              {revenueData.downgrades.reduce((s, d) => s + d.revenueLoss, 0)}/mo
            </div>
          </div>
          {revenueData.downgrades.length === 0 ? (
            <div className={styles.emptyState}>
              <CheckCircle size={24} color="var(--green)" />
              <span>No downgrades this month</span>
            </div>
          ) : (
            <div className={styles.moveList}>
              {revenueData.downgrades.map((d) => (
                <div key={d.id} className={styles.moveRow}>
                  <div
                    className={styles.moveAvatar}
                    style={{ background: "var(--red)" }}
                  >
                    {d.userName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div className={styles.moveInfo}>
                    <div className={styles.moveName}>{d.userName}</div>
                    <div className={styles.movePlans}>
                      <span className={styles.moveFrom}>{d.from}</span>
                      <ArrowDownRight size={12} color="var(--red)" />
                      <span className={styles.moveTo}>{d.to}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "var(--red)",
                      }}
                    >
                      -EUR{d.revenueLoss}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                      {formatDate(d.date)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SECTION 6 - PAYMENT INTELLIGENCE */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>Payment History</h3>
            <p className={styles.cardSub}>
              Recent transactions across all subscribers
            </p>
          </div>
          <button
            className={styles.exportBtn}
            onClick={() => handleExport("CSV")}
          >
            <Download size={13} /> Export
          </button>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                {["User", "Amount", "Plan", "Method", "Status", "Date"].map(
                  (h) => (
                    <th key={h} className={styles.th}>
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {paginatedPayments.map((p) => (
                <tr key={p.id} className={styles.tr}>
                  <td className={styles.td}>
                    <div className={styles.userCell}>
                      <div
                        className={styles.userAvatar}
                        style={{
                          background: p.plan.includes("Pro")
                            ? "#10B981"
                            : "#2563EB",
                        }}
                      >
                        {p.userName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <div>
                        <div className={styles.userName}>{p.userName}</div>
                        <div className={styles.userEmail}>{p.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className={styles.td}>
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color:
                          p.status === "SUCCESS"
                            ? "var(--green)"
                            : "var(--red)",
                      }}
                    >
                      EUR{p.amount}
                    </span>
                  </td>
                  <td className={styles.td}>
                    <Badge
                      label={p.plan.includes("Pro") ? "Pro" : "Standard"}
                      variant={p.plan.includes("Pro") ? "success" : "info"}
                    />
                  </td>
                  <td className={styles.td}>
                    <span className={styles.numText}>{p.method}</span>
                  </td>
                  <td className={styles.td}>
                    <Badge
                      label={p.status}
                      variant={p.status === "SUCCESS" ? "success" : "danger"}
                    />
                  </td>
                  <td className={styles.td}>
                    <span className={styles.numText}>
                      {relativeTime(p.date)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.paginationRow}>
          <span className={styles.paginationInfo}>
            Showing {(paymentPage - 1) * PAYMENTS_PER_PAGE + 1}-
            {Math.min(
              paymentPage * PAYMENTS_PER_PAGE,
              revenueData.recentPayments.length,
            )}{" "}
            of {revenueData.recentPayments.length}
          </span>
          <div className={styles.pagination}>
            <button
              className={styles.pageBtn}
              onClick={() => setPaymentPage((p) => Math.max(1, p - 1))}
              disabled={paymentPage === 1}
            >
              ← Prev
            </button>
            {Array.from({ length: paymentTotalPages }, (_, i) => (
              <button
                key={i}
                className={`${styles.pageBtn} ${paymentPage === i + 1 ? styles.pageBtnActive : ""}`}
                onClick={() => setPaymentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className={styles.pageBtn}
              onClick={() =>
                setPaymentPage((p) => Math.min(paymentTotalPages, p + 1))
              }
              disabled={paymentPage === paymentTotalPages}
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 7 - FAILED PAYMENTS RECOVERY */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>
              Failed Payments - Recovery Queue
            </h3>
            <p className={styles.cardSub}>
              EUR{revenueData.failedPayments.reduce((s, f) => s + f.amount, 0)}{" "}
              at risk across {revenueData.failedPayments.length} failed payments
            </p>
          </div>
          <div
            style={{
              background: "var(--red-bg)",
              border: "1px solid var(--red)",
              borderRadius: 20,
              padding: "4px 12px",
              fontSize: 12,
              fontWeight: 600,
              color: "var(--red)",
            }}
          >
            {revenueData.failedPayments.length} pending
          </div>
        </div>

        <div className={styles.failedList}>
          {revenueData.failedPayments.map((f) => (
            <div key={f.id} className={styles.failedRow}>
              <div className={styles.userCell} style={{ flex: 1 }}>
                <div
                  className={styles.userAvatar}
                  style={{ background: "#4B5563" }}
                >
                  {f.userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <div className={styles.userName}>{f.userName}</div>
                  <div className={styles.userEmail}>{f.email}</div>
                </div>
              </div>
              <div className={styles.failedMid}>
                <div
                  style={{ fontSize: 14, fontWeight: 700, color: "var(--red)" }}
                >
                  EUR{f.amount}
                </div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                  {f.plan}
                </div>
              </div>
              <div className={styles.failedMid}>
                <div style={{ fontSize: 12, color: "var(--red)" }}>
                  {f.reason}
                </div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                  {f.retries} retries - {formatDate(f.failDate)}
                </div>
              </div>
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
                    <RefreshCw size={13} /> Retry
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 8 - REVENUE FORECAST */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>Revenue Forecast & Break-Even</h3>
            <p className={styles.cardSub}>
              Projections based on current growth rate and running costs
            </p>
          </div>
        </div>

        <div className={styles.forecastGrid}>
          {/* Projections */}
          <div
            className={styles.forecastCard}
            style={{ borderColor: "var(--blue-bright)" }}
          >
            <div className={styles.forecastLabel}>MRR in 3 Months</div>
            <div
              className={styles.forecastValue}
              style={{ color: "var(--blue-bright)" }}
            >
              EUR{revenueData.projectedMRR3Months.toLocaleString()}
            </div>
            <div className={styles.forecastSub}>
              at current {mrrGrowth}% monthly growth
            </div>
          </div>
          <div
            className={styles.forecastCard}
            style={{ borderColor: "var(--purple)" }}
          >
            <div className={styles.forecastLabel}>MRR in 6 Months</div>
            <div
              className={styles.forecastValue}
              style={{ color: "var(--purple)" }}
            >
              EUR{revenueData.projectedMRR6Months.toLocaleString()}
            </div>
            <div className={styles.forecastSub}>if growth rate holds</div>
          </div>
          <div
            className={styles.forecastCard}
            style={{ borderColor: "var(--green)" }}
          >
            <div className={styles.forecastLabel}>Break-Even Point</div>
            <div
              className={styles.forecastValue}
              style={{ color: "var(--green)" }}
            >
              {revenueData.breakEvenSubscribers} subscribers
            </div>
            <div className={styles.forecastSub}>
              covers EUR{revenueData.monthlyRunningCost}/mo running costs
            </div>
          </div>

          {/* Target MRR calculator */}
          <div
            className={styles.forecastCard}
            style={{ borderColor: "var(--amber)", gridColumn: "span 1" }}
          >
            <div className={styles.forecastLabel}>Target MRR Calculator</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                margin: "8px 0",
              }}
            >
              <span style={{ fontSize: 16, color: "var(--text-muted)" }}>
                EUR
              </span>
              <input
                type="number"
                value={targetMRR}
                onChange={(e) => setTargetMRR(Number(e.target.value))}
                className={styles.targetInput}
              />
            </div>
            <div className={styles.forecastSub}>
              {subscribersNeeded > 0
                ? `Need ${subscribersNeeded} more subscribers at current ARPU (EUR${revenueData.arpu.toFixed(2)})`
                : "✓ Already above target"}
            </div>
          </div>
        </div>
      </div>

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
