"use client";
import { useState, useEffect } from "react";
import { SkStatStrip, SkCard } from "@/components/ui/Skeletons";
import StatCard from "@/components/ui/StatCard";
import Badge from "@/components/ui/Badge";
import RevenueChart from "@/components/charts/RevenueChart";
import UserGrowthChart from "@/components/charts/UserGrowthChart";
import {
  mrrData,
  userGrowthData,
  users,
  platformHealth,
} from "@/lib/dummy-data";
import styles from "./dashboard.module.css";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          padding: "24px 0",
        }}
      >
        <SkStatStrip count={6} />
        <SkCard count={4} />
      </div>
    );

  const recentUsers = users.slice(0, 5);
  const todayIso = "2026-03-17";

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-IE", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const relativeTime = (d: string) => {
    const diff = Math.floor(
      (new Date(todayIso).getTime() - new Date(d).getTime()) / 86400000,
    );
    if (diff === 0) return "Today";
    if (diff === 1) return "1d ago";
    if (diff < 7) return `${diff}d ago`;
    return formatDate(d);
  };

  const avatarColor = (plan: string) =>
    plan === "Pro" ? "#10B981" : plan === "Standard" ? "#2563EB" : "#4B5563";
  const planVariant = (plan: string): "success" | "info" | "default" =>
    plan === "Pro" ? "success" : plan === "Standard" ? "info" : "default";
  const initials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <div className={styles.page}>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Command Center</h1>
        <p className={styles.pageSubtitle}>
          Welcome back, Super Admin — here is what is happening today.
        </p>
      </div>

      {/* Stat cards */}
      <div className={styles.statGrid}>
        <StatCard
          label="Monthly Revenue"
          value="€4,280"
          trend="+12% vs last month"
          trendDirection="up"
          color="green"
        />
        <StatCard
          label="Active Subscribers"
          value="247"
          trend="+18 this week"
          trendDirection="up"
          color="blue"
        />
        <StatCard
          label="Churn Rate"
          value="3.2%"
          trend="+0.4% this month"
          trendDirection="down"
          color="red"
        />
        <StatCard
          label="AI Cost This Month"
          value="€187"
          trend="18 days remaining"
          trendDirection="up"
          color="purple"
        />
      </div>

      {/* Revenue chart */}
      <div className={styles.chartCard}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.cardTitle}>Monthly Recurring Revenue</h3>
            <p className={styles.cardSubtitle}>6-month growth trend</p>
          </div>
          <span className={styles.growthBadge}>+256% growth</span>
        </div>
        <RevenueChart data={mrrData} />
      </div>

      {/* Two column row */}
      <div className={styles.twoCol}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>User Growth</h3>
          <p className={styles.cardSubtitle} style={{ marginBottom: 16 }}>
            Monthly active users
          </p>
          <UserGrowthChart data={userGrowthData} />
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Action Required</h3>
          <p className={styles.cardSubtitle} style={{ marginBottom: 16 }}>
            Items needing your attention
          </p>
          <div className={styles.alertList}>
            {[
              {
                border: "var(--red)",
                dot: "var(--red)",
                title: "2 failed payments",
                sub: "€58 at risk — click to review",
                badge: "URGENT",
                variant: "danger" as const,
              },
              {
                border: "var(--amber)",
                dot: "var(--amber)",
                title: "4 trials expiring tomorrow",
                sub: "Convert before they lose access",
                badge: "ACTION",
                variant: "warning" as const,
              },
              {
                border: "var(--purple)",
                dot: "var(--purple)",
                title: "AI budget at 62%",
                sub: "18 days remaining at current rate",
                badge: "WATCH",
                variant: "purple" as const,
              },
              {
                border: "var(--green)",
                dot: "var(--green)",
                title: "3 new signups today",
                sub: "Standard: 2 · Pro: 1",
                badge: "INFO",
                variant: "success" as const,
              },
            ].map((a, i) => (
              <div
                key={i}
                className={styles.alertRow}
                style={{ borderLeftColor: a.border }}
              >
                <div
                  className={styles.alertDot}
                  style={{ background: a.dot }}
                />
                <div className={styles.alertBody}>
                  <strong className={styles.alertTitle}>{a.title}</strong>
                  <p className={styles.alertSub}>{a.sub}</p>
                </div>
                <Badge label={a.badge} variant={a.variant} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Signups */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>Recent Signups</h3>
          <span className={styles.viewAll}>View all →</span>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                {[
                  "User",
                  "Email",
                  "Plan",
                  "Joined",
                  "Last Active",
                  "Revenue",
                ].map((col) => (
                  <th key={col} className={styles.th}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((u) => (
                <tr key={u.id} className={styles.tr}>
                  <td className={styles.td}>
                    <div className={styles.userCell}>
                      <div
                        className={styles.userAvatar}
                        style={{ background: avatarColor(u.plan) }}
                      >
                        {initials(u.name)}
                      </div>
                      <span className={styles.userName}>{u.name}</span>
                    </div>
                  </td>
                  <td className={styles.td}>
                    <span className={styles.emailText}>{u.email}</span>
                  </td>
                  <td className={styles.td}>
                    <Badge label={u.plan} variant={planVariant(u.plan)} />
                  </td>
                  <td className={styles.td}>
                    <span className={styles.dateText}>
                      {formatDate(u.joinDate)}
                    </span>
                  </td>
                  <td className={styles.td}>
                    <span className={styles.dateText}>
                      {relativeTime(u.lastActive)}
                    </span>
                  </td>
                  <td className={styles.td}>
                    <span className={styles.revenueText}>€{u.revenue}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Platform Health */}
      <div className={styles.healthGrid}>
        {[
          {
            emoji: "📚",
            bg: "#F59E0B26",
            count: platformHealth.subjects,
            label: "Subjects",
          },
          {
            emoji: "🎬",
            bg: "#3B82F626",
            count: platformHealth.totalLessons,
            label: "Lessons",
          },
          {
            emoji: "❓",
            bg: "#10B98126",
            count: platformHealth.mcqQuestions,
            label: "MCQ Questions",
          },
          {
            emoji: "📝",
            bg: "#8B5CF626",
            count: platformHealth.essayQuestions,
            label: "Essay Questions",
          },
          {
            emoji: "🎙️",
            bg: "#06B6D426",
            count: platformHealth.podcasts,
            label: "Podcasts",
          },
          {
            emoji: "⚖️",
            bg: "#EF444426",
            count: platformHealth.caseLaw,
            label: "Case Law",
          },
        ].map((item, i) => (
          <div key={i} className={styles.healthCard}>
            <div className={styles.healthIcon} style={{ background: item.bg }}>
              {item.emoji}
            </div>
            <div className={styles.healthCount}>{item.count}</div>
            <div className={styles.healthLabel}>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
