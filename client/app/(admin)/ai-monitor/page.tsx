"use client";
import { useState, useCallback, useEffect, useMemo } from "react";
import { SkStatStrip, SkTable } from "@/components/ui/Skeletons";
import Pagination from "@/components/ui/Pagination";
import { usePagination } from "@/lib/usePagination";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import {
  Zap,
  Euro,
  TrendingUp,
  Clock,
  AlertCircle,
  AlertTriangle,
  Info,
  Calculator,
  Bell,
  Mail,
  Phone,
  Settings,
  RefreshCw,
  Download,
  Target,
  Flame,
  Shield,
  X,
} from "lucide-react";
import { aiMonitorData, subjects, users } from "@/lib/dummy-data";
import styles from "./ai-monitor.module.css";

type ToastType = {
  message: string;
  type: "success" | "danger" | "warning" | "info";
};

function AIMonitorPage() {
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<ToastType | null>(null);
  const [modelPage, setModelPage] = useState(1);
  const [alertPage, setAlertPage] = useState(1);
  const [calcStudents, setCalcStudents] = useState(50);
  const [calcPlanMix, setCalcPlanMix] = useState<
    "all-standard" | "all-pro" | "mixed"
  >("mixed");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);
  const [alertSettings, setAlertSettings] = useState(
    aiMonitorData.alertSettings,
  );
  const [isSavingAlerts, setIsSavingAlerts] = useState(false);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [showBalanceValue, setShowBalanceValue] = useState(true);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [allUsersPage, setAllUsersPage] = useState(1);
  const ALL_USERS_PER_PAGE = 8;

  const d = aiMonitorData.currentMonth;

  const showToast = useCallback(
    (message: string, type: ToastType["type"] = "success") => {
      setToast({ message, type });
      setTimeout(() => setToast(null), 3500);
    },
    [],
  );

  const refreshBalance = () => {
    setBalanceLoading(true);
    setTimeout(() => {
      setBalanceLoading(false);
      showToast("✓ Balance refreshed from Anthropic API", "success");
    }, 1800);
  };

  const handleSaveAlerts = () => {
    setIsSavingAlerts(true);
    setTimeout(() => {
      setIsSavingAlerts(false);
      showToast("✓ Alert settings saved successfully", "success");
    }, 1200);
  };

  // Calculator logic
  const currentCostPerUser = d.costEurUsed / 247;
  const calcAdditionalCost = (() => {
    const multiplier =
      calcPlanMix === "all-pro"
        ? 1.6
        : calcPlanMix === "all-standard"
          ? 0.9
          : 1.2;
    return calcStudents * currentCostPerUser * multiplier;
  })();
  const calcAdditionalRevenue =
    calcStudents *
    (calcPlanMix === "all-pro" ? 49 : calcPlanMix === "all-standard" ? 29 : 37);
  const calcNetGain = calcAdditionalRevenue - calcAdditionalCost;
  const calcNewTotal = d.costEurUsed + calcAdditionalCost;
  const calcExceedsBudget = calcNewTotal > d.costEurBudget;

  // Projected data for chart
  const projectedData = aiMonitorData.dailyBurn.map((d, i) => ({
    ...d,
    date: d.date.slice(5), // MM-DD
    projected: i >= 17 ? d.costEur * 1.08 : null,
  }));

  const utilisationColor =
    d.budgetUtilisationPercent >= 90
      ? "var(--red)"
      : d.budgetUtilisationPercent >= 75
        ? "var(--amber)"
        : "var(--green)";

  const surgeIcon = (severity: string) => {
    if (severity === "danger") {
      return <AlertCircle size={16} color="var(--red)" />;
    }
    if (severity === "warning") {
      return <AlertTriangle size={16} color="var(--amber)" />;
    }
    return <Info size={16} color="var(--blue-bright)" />;
  };

  const surgeBorder = (severity: string) =>
    severity === "danger"
      ? "var(--red)"
      : severity === "warning"
        ? "var(--amber)"
        : "var(--blue-bright)";

  const surgeBg = (severity: string) =>
    severity === "danger"
      ? "var(--red-bg)"
      : severity === "warning"
        ? "var(--amber-bg)"
        : "var(--blue-muted)";

  const seededRand = (seed: string) => {
    let hash = 0;
    for (let i = 0; i < seed.length; i += 1) {
      hash = (hash << 5) - hash + seed.charCodeAt(i);
      hash |= 0;
    }
    const x = Math.sin(hash) * 10000;
    return x - Math.floor(x);
  };

  const allAIUsers = [
    ...aiMonitorData.topUsers,
    ...users
      .filter((u) => !aiMonitorData.topUsers.find((t) => t.userId === u.id))
      .map((u) => {
        const base = seededRand(`${u.id}-base`);
        const cost = seededRand(`${u.id}-cost`);
        const essay = seededRand(`${u.id}-essay`);
        const session = seededRand(`${u.id}-session`);

        return {
          userId: u.id,
          name: u.name,
          email: u.email,
          plan: u.plan,
          tokensUsed: Math.floor(base * 60000) + 5000,
          costEur: parseFloat((cost * 4 + 0.3).toFixed(2)),
          essayCount: Math.floor(essay * 8),
          sessionCount: Math.floor(session * 20) + 2,
        };
      }),
  ].sort((a, b) => b.tokensUsed - a.tokensUsed);

  const allUsersTotalPages = Math.ceil(allAIUsers.length / ALL_USERS_PER_PAGE);
  const paginatedAllUsers = allAIUsers.slice(
    (allUsersPage - 1) * ALL_USERS_PER_PAGE,
    allUsersPage * ALL_USERS_PER_PAGE,
  );

  return (
    <div className={styles.page}>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>AI Monitor</h1>
          <p className={styles.subtitle}>
            Full visibility into AI token usage, costs, burn rate and
            intelligent forecasting
          </p>
        </div>
        <div className={styles.headerActions}>
          <button
            className={styles.refreshBtn}
            onClick={refreshBalance}
            disabled={balanceLoading}
          >
            <RefreshCw
              size={14}
              className={balanceLoading ? styles.spinning : ""}
            />
            {balanceLoading ? "Refreshing..." : "Refresh Balance"}
          </button>
          <button
            className={styles.exportBtn}
            onClick={() => showToast("✓ AI report exported", "info")}
          >
            <Download size={14} /> Export Report
          </button>
        </div>
      </div>

      {/* ═══ SECTION 1 — LIVE PULSE STAT CARDS ═══ */}
      <div className={styles.pulseGrid}>
        {/* Anthropic Balance — the real money left */}
        <div className={`${styles.pulseCard} ${styles.pulseCardBalance}`}>
          <div className={styles.pulseCardTopRow}>
            <div className={styles.pulseCardLabel}>Anthropic API Balance</div>
            <div
              className={styles.pulseCardIcon}
              style={{ background: "#10B98120" }}
            >
              <Shield size={16} color="var(--green)" />
            </div>
          </div>
          <div className={styles.pulseCardValueRow}>
            <div
              className={styles.pulseCardValue}
              style={{ color: "var(--green)" }}
            >
              {showBalanceValue
                ? `€${d.anthropicBalance.toFixed(2)}`
                : "€ ••••"}
            </div>
            <button
              className={styles.eyeBtn}
              onClick={() => setShowBalanceValue((v) => !v)}
            >
              {showBalanceValue ? "👁" : "👁‍🗨"}
            </button>
          </div>
          <div className={styles.pulseCardSub}>
            Last checked{" "}
            {new Date(d.lastBalanceCheck).toLocaleTimeString("en-IE", {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            today
          </div>
          <button
            className={styles.balanceRefreshLink}
            onClick={refreshBalance}
          >
            <RefreshCw size={11} /> Sync from Anthropic
          </button>
        </div>

        {/* Cost this month */}
        <div className={styles.pulseCard}>
          <div className={styles.pulseCardTopRow}>
            <div className={styles.pulseCardLabel}>Cost This Month</div>
            <div
              className={styles.pulseCardIcon}
              style={{ background: "#3B82F620" }}
            >
              <Euro size={16} color="var(--blue-bright)" />
            </div>
          </div>
          <div
            className={styles.pulseCardValue}
            style={{ color: "var(--blue-bright)" }}
          >
            €{d.costEurUsed.toFixed(2)}
          </div>
          <div className={styles.pulseCardSub}>
            of €{d.costEurBudget.toFixed(2)} budget
          </div>
          <div className={styles.miniBar}>
            <div
              className={styles.miniBarFill}
              style={{
                width: `${d.budgetUtilisationPercent}%`,
                background: utilisationColor,
              }}
            />
          </div>
          <div
            className={styles.pulseCardFooter}
            style={{ color: utilisationColor }}
          >
            {d.budgetUtilisationPercent}% used
          </div>
        </div>

        {/* Tokens used */}
        <div className={styles.pulseCard}>
          <div className={styles.pulseCardTopRow}>
            <div className={styles.pulseCardLabel}>Tokens Used</div>
            <div
              className={styles.pulseCardIcon}
              style={{ background: "#8B5CF620" }}
            >
              <Zap size={16} color="var(--purple)" />
            </div>
          </div>
          <div
            className={styles.pulseCardValue}
            style={{ color: "var(--purple)" }}
          >
            {(d.tokensUsed / 1000000).toFixed(2)}M
          </div>
          <div className={styles.pulseCardSub}>
            of {(d.tokensTotal / 1000000).toFixed(1)}M limit
          </div>
          <div className={styles.miniBar}>
            <div
              className={styles.miniBarFill}
              style={{
                width: `${(d.tokensUsed / d.tokensTotal) * 100}%`,
                background: "var(--purple)",
              }}
            />
          </div>
          <div
            className={styles.pulseCardFooter}
            style={{ color: "var(--text-muted)" }}
          >
            {((d.tokensUsed / d.tokensTotal) * 100).toFixed(1)}% of limit
          </div>
        </div>

        {/* Burn rate */}
        <div className={styles.pulseCard}>
          <div className={styles.pulseCardTopRow}>
            <div className={styles.pulseCardLabel}>Daily Burn Rate</div>
            <div
              className={styles.pulseCardIcon}
              style={{ background: "#F59E0B20" }}
            >
              <Flame size={16} color="var(--amber)" />
            </div>
          </div>
          <div
            className={styles.pulseCardValue}
            style={{ color: "var(--amber)" }}
          >
            €{d.burnRateDaily.toFixed(2)}
          </div>
          <div className={styles.pulseCardSub}>7-day rolling average</div>
          <div
            className={styles.pulseCardFooter}
            style={{ color: "var(--text-muted)" }}
          >
            €{(d.burnRateDaily * 30).toFixed(0)} projected this month
          </div>
        </div>

        {/* Days remaining */}
        <div
          className={`${styles.pulseCard} ${d.daysRemaining <= 7 ? styles.pulseCardDanger : d.daysRemaining <= 14 ? styles.pulseCardWarning : ""}`}
        >
          <div className={styles.pulseCardTopRow}>
            <div className={styles.pulseCardLabel}>Budget Days Left</div>
            <div
              className={styles.pulseCardIcon}
              style={{ background: `${utilisationColor}20` }}
            >
              <Clock size={16} color={utilisationColor} />
            </div>
          </div>
          <div
            className={styles.pulseCardValue}
            style={{ color: utilisationColor }}
          >
            {d.daysRemaining}d
          </div>
          <div className={styles.pulseCardSub}>at current burn rate</div>
          <div
            className={styles.pulseCardFooter}
            style={{
              color:
                d.daysRemaining < d.daysInMonth - d.daysPassed
                  ? "var(--red)"
                  : "var(--green)",
            }}
          >
            {d.daysRemaining < d.daysInMonth - d.daysPassed
              ? "⚠ Budget runs out before month end"
              : "✓ Budget covers rest of month"}
          </div>
        </div>

        {/* Projected EOM */}
        <div className={styles.pulseCard}>
          <div className={styles.pulseCardTopRow}>
            <div className={styles.pulseCardLabel}>Projected Month Total</div>
            <div
              className={styles.pulseCardIcon}
              style={{ background: "#EF444420" }}
            >
              <TrendingUp size={16} color="var(--red)" />
            </div>
          </div>
          <div
            className={styles.pulseCardValue}
            style={{
              color:
                d.projectedEndOfMonth > d.costEurBudget
                  ? "var(--red)"
                  : "var(--green)",
            }}
          >
            €{d.projectedEndOfMonth.toFixed(2)}
          </div>
          <div className={styles.pulseCardSub}>end-of-month estimate</div>
          <div
            className={styles.pulseCardFooter}
            style={{
              color:
                d.projectedEndOfMonth > d.costEurBudget
                  ? "var(--red)"
                  : "var(--green)",
            }}
          >
            {d.projectedEndOfMonth > d.costEurBudget
              ? `€${(d.projectedEndOfMonth - d.costEurBudget).toFixed(2)} over budget`
              : `€${(d.costEurBudget - d.projectedEndOfMonth).toFixed(2)} under budget`}
          </div>
        </div>
      </div>

      {/* ═══ SECTION 2 — BURN RATE CHART ═══ */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>Daily AI Spend — Last 30 Days</h3>
            <p className={styles.cardSub}>
              Actual spend per day with projected trend line
            </p>
          </div>
          <div className={styles.chartLegend}>
            <span
              className={styles.legendDot}
              style={{ background: "var(--blue-bright)" }}
            />{" "}
            Actual
            <span
              className={styles.legendDot}
              style={{ background: "var(--purple)", marginLeft: 12 }}
            />{" "}
            Projected
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart
            data={projectedData}
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="projGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
            </defs>
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
            <ReferenceLine
              y={d.costEurBudget / d.daysInMonth}
              stroke="#EF4444"
              strokeDasharray="4 4"
              label={{
                value: "Daily limit",
                fill: "#EF4444",
                fontSize: 11,
                position: "right",
              }}
            />
            <Area
              type="monotone"
              dataKey="costEur"
              stroke="#3B82F6"
              strokeWidth={2}
              fill="url(#actualGrad)"
              dot={false}
              activeDot={{ r: 4, fill: "#3B82F6" }}
            />
            <Area
              type="monotone"
              dataKey="projected"
              stroke="#8B5CF6"
              strokeWidth={2}
              strokeDasharray="5 4"
              fill="url(#projGrad)"
              dot={false}
              activeDot={{ r: 4, fill: "#8B5CF6" }}
              connectNulls={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* ═══ SECTION 3 — COST BREAKDOWN ═══ */}
      <div className={styles.twoCol}>
        {/* By Feature */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle} style={{ marginBottom: 16 }}>
            Cost by Feature
          </h3>
          <div className={styles.featureList}>
            {aiMonitorData.byFeature.map((f, i) => (
              <div key={i} className={styles.featureRow}>
                <div className={styles.featureTop}>
                  <span className={styles.featureName}>{f.feature}</span>
                  <span className={styles.featureCost}>
                    €{f.costEur.toFixed(2)}
                  </span>
                </div>
                <div className={styles.featureBar}>
                  <div
                    className={styles.featureBarFill}
                    style={{
                      width: `${f.percent}%`,
                      background: [
                        "#3B82F6",
                        "#8B5CF6",
                        "#EC4899",
                        "#10B981",
                        "#F59E0B",
                      ][i],
                    }}
                  />
                </div>
                <div className={styles.featureMeta}>
                  {f.sessions} sessions · avg €{f.avgPerSession.toFixed(2)}
                  /session · {f.percent}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* By Subject */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle} style={{ marginBottom: 16 }}>
            Cost by Subject
          </h3>
          <div className={styles.featureList}>
            {aiMonitorData.bySubject.map((s, i) => {
              const subj = subjects.find((sub) => sub.id === s.subjectId);
              return (
                <div key={i} className={styles.featureRow}>
                  <div className={styles.featureTop}>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          background: subj?.color ?? "#888",
                          flexShrink: 0,
                        }}
                      />
                      <span className={styles.featureName}>{s.subject}</span>
                    </div>
                    <span className={styles.featureCost}>
                      €{s.costEur.toFixed(2)}
                    </span>
                  </div>
                  <div className={styles.featureBar}>
                    <div
                      className={styles.featureBarFill}
                      style={{
                        width: `${s.percent}%`,
                        background: subj?.color ?? "#888",
                      }}
                    />
                  </div>
                  <div className={styles.featureMeta}>
                    {(s.tokens / 1000).toFixed(0)}k tokens · {s.percent}% of
                    total
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ═══ SECTION 4 — TOP USERS + SURGE WARNINGS ═══ */}
      <div className={styles.twoCol}>
        {/* Top users by consumption */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h3 className={styles.cardTitle}>Top AI Users This Month</h3>
              <p className={styles.cardSub}>Users consuming the most tokens</p>
            </div>
          </div>
          <div className={styles.topUserList}>
            {aiMonitorData.topUsers.map((u, i) => (
              <div key={u.userId} className={styles.topUserRow}>
                <div className={styles.topUserRank}>{i + 1}</div>
                <div
                  className={styles.topUserAvatar}
                  style={{
                    background: u.plan === "Pro" ? "#10B981" : "#2563EB",
                  }}
                >
                  {u.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div className={styles.topUserInfo}>
                  <div className={styles.topUserName}>{u.name}</div>
                  <div className={styles.topUserMeta}>
                    {u.essayCount} essays · {u.sessionCount} sessions
                  </div>
                </div>
                <div className={styles.topUserCost}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "var(--red)",
                    }}
                  >
                    €{u.costEur.toFixed(2)}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                    {(u.tokensUsed / 1000).toFixed(0)}k tokens
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            className={styles.showAllLink}
            onClick={() => {
              setShowAllUsers(true);
              setAllUsersPage(1);
            }}
          >
            Show all users →
          </button>
        </div>

        {/* Surge warnings */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h3 className={styles.cardTitle}>Surge Warnings & Forecasts</h3>
              <p className={styles.cardSub}>
                Anticipated cost increases based on usage patterns
              </p>
            </div>
          </div>
          <div className={styles.surgeList}>
            {aiMonitorData.surgeWarnings.map((w) => (
              <div
                key={w.id}
                className={styles.surgeCard}
                style={{
                  borderLeftColor: surgeBorder(w.severity),
                  background: surgeBg(w.severity),
                }}
              >
                <div className={styles.surgeCardTop}>
                  {surgeIcon(w.severity)}
                  <span className={styles.surgeTitle}>{w.title}</span>
                  {w.expectedAdditionalCost > 0 && (
                    <span className={styles.surgeCost}>
                      +€{w.expectedAdditionalCost.toFixed(2)}
                    </span>
                  )}
                </div>
                <p className={styles.surgeDetail}>{w.detail}</p>
                {w.expectedIncrease > 0 && (
                  <div className={styles.surgeMeta}>
                    Expected in {w.expectedMonth} · {w.daysUntil} days away · +
                    {w.expectedIncrease}% usage
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ SECTION 5 — STUDENT IMPACT CALCULATOR ═══ */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>
              Student Growth Impact Calculator
            </h3>
            <p className={styles.cardSub}>
              See exactly what adding more students does to your AI bill and
              revenue
            </p>
          </div>
          <div className={styles.calcBadge}>
            <Calculator size={14} /> Interactive
          </div>
        </div>

        <div className={styles.calcLayout}>
          {/* Inputs */}
          <div className={styles.calcInputs}>
            <div className={styles.calcField}>
              <label className={styles.calcLabel}>
                Number of Additional Students
              </label>
              <div className={styles.calcSliderWrap}>
                <input
                  type="range"
                  min={1}
                  max={200}
                  value={calcStudents}
                  onChange={(e) => setCalcStudents(Number(e.target.value))}
                  className={styles.calcSlider}
                />
                <div className={styles.calcSliderValue}>
                  {calcStudents} students
                </div>
              </div>
            </div>

            <div className={styles.calcField}>
              <label className={styles.calcLabel}>Plan Mix</label>
              <div className={styles.calcPlanBtns}>
                {[
                  {
                    key: "mixed",
                    label: "Mixed (realistic)",
                    sub: "70% Standard · 30% Pro",
                  },
                  {
                    key: "all-standard",
                    label: "All Standard",
                    sub: "€29/mo each",
                  },
                  { key: "all-pro", label: "All Pro", sub: "€49/mo each" },
                ].map((p) => (
                  <button
                    key={p.key}
                    className={`${styles.calcPlanBtn} ${calcPlanMix === p.key ? styles.calcPlanBtnActive : ""}`}
                    onClick={() => setCalcPlanMix(p.key as typeof calcPlanMix)}
                  >
                    <span className={styles.calcPlanLabel}>{p.label}</span>
                    <span className={styles.calcPlanSub}>{p.sub}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className={styles.calcResults}>
            <div
              className={styles.calcResultCard}
              style={{ borderColor: "var(--red)" }}
            >
              <div className={styles.calcResultLabel}>Additional AI Cost</div>
              <div
                className={styles.calcResultValue}
                style={{ color: "var(--red)" }}
              >
                +€{calcAdditionalCost.toFixed(2)}/mo
              </div>
              <div className={styles.calcResultSub}>
                at €{currentCostPerUser.toFixed(3)}/user/month
              </div>
            </div>
            <div
              className={styles.calcResultCard}
              style={{ borderColor: "var(--green)" }}
            >
              <div className={styles.calcResultLabel}>Additional Revenue</div>
              <div
                className={styles.calcResultValue}
                style={{ color: "var(--green)" }}
              >
                +€{calcAdditionalRevenue.toFixed(2)}/mo
              </div>
              <div className={styles.calcResultSub}>
                {calcStudents} × avg plan price
              </div>
            </div>
            <div
              className={styles.calcResultCard}
              style={{
                borderColor: calcNetGain >= 0 ? "var(--green)" : "var(--red)",
              }}
            >
              <div className={styles.calcResultLabel}>Net Gain</div>
              <div
                className={styles.calcResultValue}
                style={{
                  color: calcNetGain >= 0 ? "var(--green)" : "var(--red)",
                }}
              >
                {calcNetGain >= 0 ? "+" : ""}€{calcNetGain.toFixed(2)}/mo
              </div>
              <div className={styles.calcResultSub}>revenue minus AI cost</div>
            </div>
            <div
              className={`${styles.calcResultCard} ${calcExceedsBudget ? styles.calcResultCardDanger : styles.calcResultCardSuccess}`}
            >
              <div className={styles.calcResultLabel}>New Monthly AI Total</div>
              <div
                className={styles.calcResultValue}
                style={{
                  color: calcExceedsBudget ? "var(--red)" : "var(--green)",
                }}
              >
                €{calcNewTotal.toFixed(2)}
              </div>
              <div className={styles.calcResultSub}>
                {calcExceedsBudget
                  ? `⚠ €${(calcNewTotal - d.costEurBudget).toFixed(2)} over current budget — increase budget to €${Math.ceil(calcNewTotal / 50) * 50}`
                  : "✓ Within current budget"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ SECTION 6 — ALERT SETTINGS ═══ */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>Alert & Notification Settings</h3>
            <p className={styles.cardSub}>
              Configure how and when you are notified about AI cost events
            </p>
          </div>
          <Settings size={18} color="var(--text-muted)" />
        </div>

        <div className={styles.alertSettingsGrid}>
          {/* Email alerts */}
          <div className={styles.alertSection}>
            <div className={styles.alertSectionTitle}>
              <Mail size={15} color="var(--blue-bright)" /> Email Alerts
            </div>
            <div className={styles.toggleRow}>
              <div>
                <div className={styles.toggleLabel}>
                  Enable email notifications
                </div>
                <div className={styles.toggleSub}>
                  Receive budget alerts by email
                </div>
              </div>
              <button
                className={`${styles.toggle} ${alertSettings.emailAlerts ? styles.toggleOn : ""}`}
                onClick={() =>
                  setAlertSettings((s) => ({
                    ...s,
                    emailAlerts: !s.emailAlerts,
                  }))
                }
              />
            </div>
            {alertSettings.emailAlerts && (
              <input
                className={styles.alertInput}
                value={alertSettings.emailAddress}
                onChange={(e) =>
                  setAlertSettings((s) => ({
                    ...s,
                    emailAddress: e.target.value,
                  }))
                }
                placeholder="admin@example.com"
              />
            )}
          </div>

          {/* SMS alerts */}
          <div className={styles.alertSection}>
            <div className={styles.alertSectionTitle}>
              <Phone size={15} color="var(--green)" /> SMS / Text Alerts
            </div>
            <div className={styles.toggleRow}>
              <div>
                <div className={styles.toggleLabel}>
                  Enable SMS notifications
                </div>
                <div className={styles.toggleSub}>
                  Receive critical alerts by text
                </div>
              </div>
              <button
                className={`${styles.toggle} ${alertSettings.smsAlerts ? styles.toggleOn : ""}`}
                onClick={() =>
                  setAlertSettings((s) => ({ ...s, smsAlerts: !s.smsAlerts }))
                }
              />
            </div>
            {alertSettings.smsAlerts && (
              <input
                className={styles.alertInput}
                value={alertSettings.phoneNumber}
                onChange={(e) =>
                  setAlertSettings((s) => ({
                    ...s,
                    phoneNumber: e.target.value,
                  }))
                }
                placeholder="+353 87 000 0000"
              />
            )}
          </div>

          {/* Budget thresholds */}
          <div className={styles.alertSection}>
            <div className={styles.alertSectionTitle}>
              <Target size={15} color="var(--amber)" /> Budget Thresholds
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                {
                  key: "threshold50",
                  label: "Alert at 50%",
                  sub: `€${(d.costEurBudget * 0.5).toFixed(2)}`,
                },
                {
                  key: "threshold75",
                  label: "Alert at 75%",
                  sub: `€${(d.costEurBudget * 0.75).toFixed(2)}`,
                },
                {
                  key: "threshold90",
                  label: "Alert at 90%",
                  sub: `€${(d.costEurBudget * 0.9).toFixed(2)}`,
                },
              ].map((t) => (
                <div key={t.key} className={styles.toggleRow}>
                  <div>
                    <div className={styles.toggleLabel}>
                      {t.label}{" "}
                      <span
                        style={{ color: "var(--text-muted)", fontSize: 12 }}
                      >
                        ({t.sub})
                      </span>
                    </div>
                  </div>
                  <button
                    className={`${styles.toggle} ${alertSettings[t.key as keyof typeof alertSettings] ? styles.toggleOn : ""}`}
                    onClick={() =>
                      setAlertSettings((s) => ({
                        ...s,
                        [t.key]: !s[t.key as keyof typeof s],
                      }))
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Report cadence */}
          <div className={styles.alertSection}>
            <div className={styles.alertSectionTitle}>
              <Bell size={15} color="var(--purple)" /> Report Cadence
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div className={styles.toggleRow}>
                <div>
                  <div className={styles.toggleLabel}>
                    Weekly AI cost report
                  </div>
                  <div className={styles.toggleSub}>Every Monday morning</div>
                </div>
                <button
                  className={`${styles.toggle} ${alertSettings.weeklyReport ? styles.toggleOn : ""}`}
                  onClick={() =>
                    setAlertSettings((s) => ({
                      ...s,
                      weeklyReport: !s.weeklyReport,
                    }))
                  }
                />
              </div>
              <div className={styles.toggleRow}>
                <div>
                  <div className={styles.toggleLabel}>Daily digest</div>
                  <div className={styles.toggleSub}>
                    Yesterday&apos;s AI spend summary
                  </div>
                </div>
                <button
                  className={`${styles.toggle} ${alertSettings.dailyDigest ? styles.toggleOn : ""}`}
                  onClick={() =>
                    setAlertSettings((s) => ({
                      ...s,
                      dailyDigest: !s.dailyDigest,
                    }))
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div
          style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}
        >
          <button
            className={styles.saveBtn}
            onClick={handleSaveAlerts}
            disabled={isSavingAlerts}
          >
            {isSavingAlerts ? "Saving..." : "Save Alert Settings"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showAllUsers && (
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
              onClick={() => setShowAllUsers(false)}
            />
            <motion.div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                x: "-50%",
                y: "-50%",
                width: "560px",
                maxWidth: "calc(100vw - 32px)",
                maxHeight: "calc(100vh - 64px)",
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-focus)",
                borderRadius: "14px",
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
                  padding: "18px 20px",
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
                    All Users - AI Usage This Month
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "var(--text-muted)",
                      marginTop: 2,
                    }}
                  >
                    {allAIUsers.length} users ranked by token consumption
                  </div>
                </div>
                <button
                  onClick={() => setShowAllUsers(false)}
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
                  display: "grid",
                  gridTemplateColumns: "32px 1fr 80px 80px 70px",
                  gap: 12,
                  padding: "10px 20px",
                  borderBottom: "1px solid var(--border-default)",
                  flexShrink: 0,
                }}
              >
                {["#", "User", "Tokens", "Cost", "Plan"].map((h) => (
                  <div
                    key={h}
                    style={{
                      fontSize: 11,
                      fontWeight: 500,
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {h}
                  </div>
                ))}
              </div>

              <div style={{ overflowY: "auto", flex: 1 }}>
                {paginatedAllUsers.map((u, i) => {
                  const globalRank =
                    (allUsersPage - 1) * ALL_USERS_PER_PAGE + i + 1;
                  return (
                    <div
                      key={u.userId}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "32px 1fr 80px 80px 70px",
                        gap: 12,
                        padding: "12px 20px",
                        borderBottom: "1px solid var(--border-default)",
                        alignItems: "center",
                        transition: "background 0.15s",
                        cursor: "default",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "var(--bg-hover)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color:
                            globalRank <= 3
                              ? "var(--amber)"
                              : "var(--text-muted)",
                          textAlign: "center",
                        }}
                      >
                        {globalRank}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          minWidth: 0,
                        }}
                      >
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            background:
                              u.plan === "Pro"
                                ? "#10B981"
                                : u.plan === "Standard"
                                  ? "#2563EB"
                                  : "#4B5563",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 11,
                            fontWeight: 700,
                            color: "white",
                            flexShrink: 0,
                          }}
                        >
                          {u.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div
                            style={{
                              fontSize: 13,
                              fontWeight: 500,
                              color: "var(--text-primary)",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {u.name}
                          </div>
                          <div
                            style={{
                              fontSize: 11,
                              color: "var(--text-muted)",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {u.email}
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: "var(--text-secondary)",
                          fontFeatureSettings: '"tnum"',
                        }}
                      >
                        {(u.tokensUsed / 1000).toFixed(0)}k
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "var(--red)",
                        }}
                      >
                        €{u.costEur.toFixed(2)}
                      </div>
                      <div>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            padding: "2px 8px",
                            borderRadius: 20,
                            background:
                              u.plan === "Pro"
                                ? "#05231626"
                                : u.plan === "Standard"
                                  ? "#1E3A5F"
                                  : "var(--bg-hover)",
                            color:
                              u.plan === "Pro"
                                ? "var(--green)"
                                : u.plan === "Standard"
                                  ? "var(--blue-bright)"
                                  : "var(--text-secondary)",
                            border: `1px solid ${u.plan === "Pro" ? "#10B98133" : u.plan === "Standard" ? "#3B82F633" : "var(--border-default)"}`,
                          }}
                        >
                          {u.plan}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 20px",
                  borderTop: "1px solid var(--border-default)",
                  flexShrink: 0,
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
                  Showing {(allUsersPage - 1) * ALL_USERS_PER_PAGE + 1}-
                  {Math.min(
                    allUsersPage * ALL_USERS_PER_PAGE,
                    allAIUsers.length,
                  )}{" "}
                  of {allAIUsers.length} users
                </span>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <button
                    onClick={() => setAllUsersPage((p) => Math.max(1, p - 1))}
                    disabled={allUsersPage === 1}
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-default)",
                      borderRadius: 6,
                      padding: "6px 12px",
                      fontSize: 13,
                      color: "var(--text-secondary)",
                      cursor: "pointer",
                      opacity: allUsersPage === 1 ? 0.4 : 1,
                      fontFamily: "inherit",
                    }}
                  >
                    ← Prev
                  </button>
                  {Array.from(
                    { length: Math.min(allUsersTotalPages, 6) },
                    (_, i) => (
                      <button
                        key={i}
                        onClick={() => setAllUsersPage(i + 1)}
                        style={{
                          background:
                            allUsersPage === i + 1
                              ? "var(--blue-muted)"
                              : "var(--bg-card)",
                          border: `1px solid ${allUsersPage === i + 1 ? "var(--blue-primary)" : "var(--border-default)"}`,
                          borderRadius: 6,
                          padding: "6px 12px",
                          fontSize: 13,
                          color:
                            allUsersPage === i + 1
                              ? "var(--blue-bright)"
                              : "var(--text-secondary)",
                          cursor: "pointer",
                          fontWeight: allUsersPage === i + 1 ? 600 : 400,
                          fontFamily: "inherit",
                        }}
                      >
                        {i + 1}
                      </button>
                    ),
                  )}
                  <button
                    onClick={() =>
                      setAllUsersPage((p) =>
                        Math.min(allUsersTotalPages, p + 1),
                      )
                    }
                    disabled={allUsersPage === allUsersTotalPages}
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-default)",
                      borderRadius: 6,
                      padding: "6px 12px",
                      fontSize: 13,
                      color: "var(--text-secondary)",
                      cursor: "pointer",
                      opacity: allUsersPage === allUsersTotalPages ? 0.4 : 1,
                      fontFamily: "inherit",
                    }}
                  >
                    Next →
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

export default AIMonitorPage
