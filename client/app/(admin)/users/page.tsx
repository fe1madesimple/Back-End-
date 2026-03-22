"use client";
import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Download,
  RefreshCw,
  CreditCard,
  Ban,
  Trash2,
  Eye,
  Calendar,
  TrendingUp,
  Clock,
  BookOpen,
  AlertCircle,
  Mail,
  MoreVertical,
  FileText,
  Users,
  Send,
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Paperclip,
  Minus,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import Pagination from "@/components/ui/Pagination";
import { usePagination } from "@/lib/usePagination";
import {
  users,
  deletedUsers,
  userPaymentHistory,
  userAuditTrail,
} from "@/lib/dummy-data";
import styles from "./users.module.css";

const USERS_PER_PAGE = 20;
const DELETED_PER_PAGE = 9;

const planVariant = (plan: string): "success" | "info" | "default" =>
  plan === "Pro" ? "success" : plan === "Standard" ? "info" : "default";

const statusVariant = (
  status: string,
): "success" | "warning" | "danger" | "default" =>
  status === "Active"
    ? "success"
    : status === "Trial"
      ? "warning"
      : status === "Cancelled"
        ? "danger"
        : "default";

const avatarColor = (plan: string) =>
  plan === "Pro" ? "#10B981" : plan === "Standard" ? "#2563EB" : "#4B5563";

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-IE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const relativeTime = (d: string) => {
  const diff = Math.floor((Date.now() - new Date(d).getTime()) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "1d ago";
  if (diff < 7) return `${diff}d ago`;
  return formatDate(d);
};

const formatStudyTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
};

type ToastType = {
  message: string;
  type: "success" | "danger" | "warning" | "info";
};

type ConfirmAction = {
  action: string;
  user: (typeof users)[0];
  label: string;
  variant: "danger" | "warning";
};

type DeletedAnalyticsRow = {
  label: string;
  value: string;
  color?: string;
};

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState<"active" | "deleted">("active");
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [sortField, setSortField] = useState<
    "name" | "revenue" | "joinDate" | "lastActive" | "streak"
  >("joinDate");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [selectedUser, setSelectedUser] = useState<(typeof users)[0] | null>(
    null,
  );
  const [selectedDeleted, setSelectedDeleted] = useState<
    (typeof deletedUsers)[0] | null
  >(null);
  const [userDetailTab, setUserDetailTab] = useState<
    "overview" | "payments" | "audit" | "preferences"
  >("overview");
  const [toast, setToast] = useState<ToastType | null>(null);
  const [confirmAction, setConfirmAction] = useState<ConfirmAction | null>(
    null,
  );
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [openMenuFor, setOpenMenuFor] = useState<string | null>(null);
  const [showEmailCompose, setShowEmailCompose] = useState(false);
  const [emailTarget, setEmailTarget] = useState<(typeof users)[0] | null>(
    null,
  );
  const [emailTo, setEmailTo] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [showChangePlan, setShowChangePlan] = useState(false);
  const [changePlanUser, setChangePlanUser] = useState<
    (typeof users)[0] | null
  >(null);
  const [selectedNewPlan, setSelectedNewPlan] = useState("");
  const datePickerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const emailEditor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Write your email here..." }),
    ],
    content: "",
    immediatelyRender: false,
  });

  useEffect(() => {
    const onMouseDown = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  useEffect(() => {
    if (showMobileSearch) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [showMobileSearch]);

  const activeFiltered = useMemo(
    () =>
      users.filter((u) => {
        const matchSearch =
          !search ||
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase());
        const matchPlan = planFilter === "All" || u.plan === planFilter;
        const matchStatus = statusFilter === "All" || u.status === statusFilter;
        return matchSearch && matchPlan && matchStatus;
      }),
    [search, planFilter, statusFilter],
  );

  const activeFilteredWithSort = useMemo(
    () =>
      activeFiltered.slice().sort((a, b) => {
        let aVal: number | string = 0;
        let bVal: number | string = 0;
        switch (sortField) {
          case "name":
            aVal = a.name;
            bVal = b.name;
            break;
          case "revenue":
            aVal = a.revenue;
            bVal = b.revenue;
            break;
          case "joinDate":
            aVal = new Date(a.joinDate).getTime();
            bVal = new Date(b.joinDate).getTime();
            break;
          case "lastActive":
            aVal = new Date(a.lastActive).getTime();
            bVal = new Date(b.lastActive).getTime();
            break;
          case "streak":
            aVal = a.streak;
            bVal = b.streak;
            break;
        }
        if (typeof aVal === "string")
          return sortDir === "asc"
            ? aVal.localeCompare(bVal as string)
            : (bVal as string).localeCompare(aVal);
        return sortDir === "asc"
          ? (aVal as number) - (bVal as number)
          : (bVal as number) - (aVal as number);
      }),

    [activeFiltered, sortField, sortDir],
  );

  const {
    page: activePage,
    setPage: setActivePage,
    paginated: paginatedActive,
    total: activeTotal,
  } = usePagination(activeFilteredWithSort, USERS_PER_PAGE);

  useEffect(() => {
    setActivePage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, planFilter, statusFilter, dateFrom, dateTo, sortField, sortDir]);

  const deletedFiltered = useMemo(() => deletedUsers, []);
  const {
    page: deletedPageNum,
    setPage: setDeletedPageNum,
    paginated: paginatedDeleted,
  } = usePagination(deletedFiltered, DELETED_PER_PAGE);

  const showToast = useCallback(
    (message: string, type: ToastType["type"] = "success") => {
      setToast({ message, type });
      setTimeout(() => setToast(null), 3000);
    },
    [],
  );

  const handleAction = (action: string, user: (typeof users)[0]) => {
    setConfirmAction(null);
    switch (action) {
      case "suspend":
        showToast(`✓ ${user.name}'s account has been suspended`, "warning");
        break;
      case "resume":
        showToast(`✓ ${user.name}'s subscription has been resumed`, "success");
        break;
      case "cancel":
        showToast(
          `✓ ${user.name}'s subscription has been cancelled`,
          "warning",
        );
        break;
      case "delete":
        showToast(`✓ ${user.name}'s account has been deleted`, "danger");
        break;
      case "email":
        showToast(`✓ Email sent to ${user.email}`, "info");
        break;
      case "changePlan":
        showToast(`✓ Plan change request recorded for ${user.name}`, "info");
        break;
      case "export":
        showToast("✓ User data exported as CSV", "success");
        break;
    }
  };

  const handleExport = (format: "csv" | "pdf") => {
    showToast(`✓ Exporting all users as ${format.toUpperCase()}...`, "info");
  };

  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "Active").length,
    trial: users.filter((u) => u.status === "Trial").length,
    revenue: users.reduce((sum, u) => sum + u.revenue, 0),
  };

  return (
    <div className={styles.page}>
      <>
          {/* Page header */}
          <div className={styles.pageHeader}>
            <div>
              <h1 className={styles.title}>User Management</h1>
              <p className={styles.subtitle}>
                Complete visibility and control over all platform users
              </p>
            </div>
            <div className={styles.headerActions}>
              <button
                className={styles.mobileSearchBtn}
                onClick={() => setShowMobileSearch(true)}
              >
                <Search size={17} />
              </button>
              <div className={styles.desktopSearch}>
                <Search size={14} className={styles.searchIconInput} />
                <input
                  className={styles.searchInput}
                  placeholder="Search by name, email, plan, status..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setActivePage(1);
                  }}
                />
                {search && (
                  <button
                    className={styles.searchClear}
                    onClick={() => setSearch("")}
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
              <div className={styles.exportGroup}>
                <button
                  className={styles.exportBtn}
                  onClick={() => handleExport("csv")}
                >
                  <Download size={14} /> Export CSV
                </button>
                <button
                  className={styles.exportBtn}
                  onClick={() => handleExport("pdf")}
                >
                  <FileText size={14} /> Export PDF
                </button>
              </div>
            </div>
          </div>

          {/* Stat cards */}
          <div className={styles.statsGrid}>
            {[
              {
                label: "Total Users",
                value: stats.total,
                color: "var(--text-primary)",
                iconType: "lucide",
                emoji: "",
              },
              {
                label: "Active",
                value: stats.active,
                color: "var(--green)",
                iconType: "emoji",
                emoji: "✅",
              },
              {
                label: "On Trial",
                value: stats.trial,
                color: "var(--amber)",
                iconType: "emoji",
                emoji: "⏳",
              },
              {
                label: "Total Revenue",
                value: `€${stats.revenue.toLocaleString()}`,
                color: "var(--blue-bright)",
                iconType: "emoji",
                emoji: "💰",
              },
              {
                label: "Deleted (all time)",
                value: deletedUsers.length,
                color: "var(--red)",
                iconType: "emoji",
                emoji: "🗑️",
              },
            ].map((s, i) => (
              <div key={i} className={styles.statCard}>
                <div className={styles.statIcon}>
                  {s.iconType === "lucide" ? (
                    <Users size={22} color="var(--purple)" />
                  ) : (
                    s.emoji
                  )}
                </div>
                <div>
                  <div className={styles.statLabel}>{s.label}</div>
                  <div className={styles.statValue} style={{ color: s.color }}>
                    {s.value}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className={styles.tabBar}>
            <div className={styles.tabGroup}>
              <button
                className={`${styles.tab} ${activeTab === "active" ? styles.tabActive : ""}`}
                onClick={() => setActiveTab("active")}
              >
                Active Users{" "}
                <span className={styles.tabCount}>{users.length}</span>
              </button>
              <button
                className={`${styles.tab} ${activeTab === "deleted" ? styles.tabActive : ""}`}
                onClick={() => setActiveTab("deleted")}
              >
                Deleted Accounts{" "}
                <span className={styles.tabCount}>{deletedUsers.length}</span>
              </button>
            </div>
          </div>

          {/* ACTIVE USERS TAB */}
          {activeTab === "active" && (
            <div className={styles.card}>
              {/* Filters row */}
              <div className={styles.filtersRow}>
                <div className={styles.filterPills}>
                  {["All", "Active", "Trial", "Freemium", "Cancelled"].map(
                    (s) => (
                      <button
                        key={s}
                        className={`${styles.filterBtn} ${statusFilter === s ? styles.filterBtnActive : ""}`}
                        onClick={() => {
                          setStatusFilter(s);
                          setActivePage(1);
                        }}
                      >
                        {s}
                      </button>
                    ),
                  )}
                </div>
                <div className={styles.filterActions}>
                  {/* Plan filter */}
                  <select
                    className={styles.selectInput}
                    value={planFilter}
                    onChange={(e) => {
                      setPlanFilter(e.target.value);
                      setActivePage(1);
                    }}
                  >
                    <option value="All">All Plans</option>
                    <option value="Pro">Pro</option>
                    <option value="Standard">Standard</option>
                    <option value="Free">Free</option>
                  </select>

                  {/* Date picker */}
                  <div className={styles.dateWrap} ref={datePickerRef}>
                    <button
                      className={`${styles.iconBtn} ${dateFrom || dateTo ? styles.iconBtnActive : ""}`}
                      onClick={() => setShowDatePicker((p) => !p)}
                    >
                      <Calendar size={15} />
                      <span className={styles.iconBtnLabel}>
                        {dateFrom || dateTo ? "Date ●" : "Date"}
                      </span>
                    </button>
                    <AnimatePresence>
                      {showDatePicker && (
                        <motion.div
                          className={styles.datePanel}
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.18 }}
                        >
                          <div className={styles.datePanelHeader}>
                            <span className={styles.datePanelTitle}>
                              Join date range
                            </span>
                            <button
                              className={styles.dateClear}
                              onClick={() => {
                                setDateFrom("");
                                setDateTo("");
                                setActivePage(1);
                              }}
                            >
                              Clear
                            </button>
                          </div>
                          <div className={styles.datePanelFields}>
                            <div className={styles.dateFieldWrap}>
                              <label className={styles.dateFieldLabel}>
                                From
                              </label>
                              <input
                                type="date"
                                className={styles.dateInput}
                                value={dateFrom}
                                onChange={(e) => {
                                  setDateFrom(e.target.value);
                                  setActivePage(1);
                                }}
                              />
                            </div>
                            <span className={styles.dateArrow}>→</span>
                            <div className={styles.dateFieldWrap}>
                              <label className={styles.dateFieldLabel}>
                                To
                              </label>
                              <input
                                type="date"
                                className={styles.dateInput}
                                value={dateTo}
                                onChange={(e) => {
                                  setDateTo(e.target.value);
                                  setActivePage(1);
                                }}
                              />
                            </div>
                          </div>
                          <button
                            className={styles.dateApply}
                            onClick={() => setShowDatePicker(false)}
                          >
                            Apply
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Sort */}
                  <div className={styles.sortGroup}>
                    <span className={styles.sortLabel}>Sort:</span>
                    {(
                      [
                        { field: "joinDate", label: "Join Date" },
                        { field: "revenue", label: "Revenue" },
                        { field: "streak", label: "Streak" },
                        { field: "lastActive", label: "Activity" },
                      ] as Array<{ field: typeof sortField; label: string }>
                    ).map((item) => (
                      <button
                        key={item.field}
                        className={`${styles.sortBtn} ${sortField === item.field ? styles.sortBtnActive : ""}`}
                        onClick={() => {
                          if (sortField === item.field)
                            setSortDir((d) => (d === "asc" ? "desc" : "asc"));
                          else {
                            setSortField(item.field);
                            setSortDir("desc");
                          }
                        }}
                      >
                        {item.label}
                        {sortField === item.field && (
                          <span>{sortDir === "desc" ? " ↓" : " ↑"}</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results count + export row */}
              <div className={styles.resultsRow}>
                <span className={styles.resultsCount}>
                  Showing {paginatedActive.length} of {activeFiltered.length}{" "}
                  users
                  {(search ||
                    planFilter !== "All" ||
                    statusFilter !== "All" ||
                    dateFrom ||
                    dateTo) &&
                    " (filtered)"}
                </span>
                <div className={styles.inlineExport}>
                  <button
                    className={styles.inlineExportBtn}
                    onClick={() => handleExport("csv")}
                  >
                    <Download size={12} /> CSV
                  </button>
                  <button
                    className={styles.inlineExportBtn}
                    onClick={() => handleExport("pdf")}
                  >
                    <FileText size={12} /> PDF
                  </button>
                </div>
              </div>

              {/* Users table */}
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      {[
                        "User",
                        "Plan",
                        "Status",
                        "Joined",
                        "Last Active",
                        "Streak",
                        "Revenue",
                        "Actions",
                      ].map((h) => (
                        <th key={h} className={styles.th}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedActive.length === 0 && (
                      <tr>
                        <td colSpan={8} className={styles.emptyRow}>
                          No users match your filters
                        </td>
                      </tr>
                    )}
                    {paginatedActive.map((user) => (
                      <tr
                        key={user.id}
                        className={styles.tr}
                        onClick={() => {
                          setSelectedUser(user);
                          setUserDetailTab("overview");
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <td className={styles.td}>
                          <div className={styles.userCell}>
                            <div
                              className={styles.avatar}
                              style={{ background: avatarColor(user.plan) }}
                            >
                              {initials(user.name)}
                            </div>
                            <div>
                              <div className={styles.userName}>{user.name}</div>
                              <div className={styles.userEmail}>
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className={styles.td}>
                          <Badge
                            label={user.plan}
                            variant={planVariant(user.plan)}
                          />
                        </td>
                        <td className={styles.td}>
                          <Badge
                            label={user.status}
                            variant={statusVariant(user.status)}
                          />
                        </td>
                        <td className={styles.td}>
                          <span className={styles.dateText}>
                            {formatDate(user.joinDate)}
                          </span>
                        </td>
                        <td className={styles.td}>
                          <span className={styles.dateText}>
                            {relativeTime(user.lastActive)}
                          </span>
                        </td>
                        <td className={styles.td}>
                          <div className={styles.streakCell}>
                            <span className={styles.streakFire}>
                              {user.streak > 7 ? "🔥" : "📅"}
                            </span>
                            <span className={styles.streakCount}>
                              {user.streak}d
                            </span>
                          </div>
                        </td>
                        <td className={styles.td}>
                          <span className={styles.revenueText}>
                            €{user.revenue}
                          </span>
                        </td>
                        <td
                          className={styles.td}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className={styles.actionGroup}>
                            <button
                              className={styles.viewBtn}
                              onClick={() => {
                                setSelectedUser(user);
                                setUserDetailTab("overview");
                              }}
                            >
                              <Eye size={13} /> View
                            </button>
                            <div className={styles.moreWrap}>
                              <button
                                className={styles.moreBtn}
                                onClick={() => {
                                  setOpenMenuFor((prev) =>
                                    prev === user.id ? null : user.id,
                                  );
                                }}
                              >
                                <MoreVertical size={15} />
                              </button>
                              <div
                                className={styles.moreMenu}
                                style={{
                                  display:
                                    openMenuFor === user.id ? "flex" : "none",
                                }}
                              >
                                <button
                                  className={styles.moreMenuItem}
                                  onClick={() => {
                                    setEmailTarget(user);
                                    setEmailTo(user.email);
                                    setEmailSubject("");
                                    emailEditor?.commands.setContent("");
                                    setEmailSent(false);
                                    setShowEmailCompose(true);
                                    setOpenMenuFor(null);
                                  }}
                                >
                                  <Mail size={13} /> Send Email
                                </button>
                                <button
                                  className={styles.moreMenuItem}
                                  onClick={() => {
                                    setChangePlanUser(user);
                                    setSelectedNewPlan(user.plan);
                                    setShowChangePlan(true);
                                    setOpenMenuFor(null);
                                  }}
                                >
                                  <CreditCard size={13} /> Change Plan
                                </button>
                                <button
                                  className={styles.moreMenuItem}
                                  onClick={() => {
                                    setConfirmAction({
                                      action: "suspend",
                                      user,
                                      label: "Suspend Account",
                                      variant: "warning",
                                    });
                                    setOpenMenuFor(null);
                                  }}
                                >
                                  <Ban size={13} /> Suspend
                                </button>
                                <button
                                  className={styles.moreMenuItem}
                                  onClick={() => {
                                    setConfirmAction({
                                      action: "resume",
                                      user,
                                      label: "Resume Subscription",
                                      variant: "warning",
                                    });
                                    setOpenMenuFor(null);
                                  }}
                                >
                                  <RefreshCw size={13} /> Resume Sub
                                </button>
                                <button
                                  className={styles.moreMenuItemDanger}
                                  onClick={() => {
                                    setConfirmAction({
                                      action: "delete",
                                      user,
                                      label: "Delete Account",
                                      variant: "danger",
                                    });
                                    setOpenMenuFor(null);
                                  }}
                                >
                                  <Trash2 size={13} /> Delete Account
                                </button>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className={styles.paginationRow}>
                <span className={styles.paginationInfo}>
                  Showing{" "}
                  {activeTotal === 0
                    ? 0
                    : (activePage - 1) * USERS_PER_PAGE + 1}
                  –{Math.min(activePage * USERS_PER_PAGE, activeTotal)} of{" "}
                  {activeTotal} users
                </span>
                <Pagination
                  page={activePage}
                  total={activeTotal}
                  perPage={USERS_PER_PAGE}
                  onChange={setActivePage}
                />
              </div>
            </div>
          )}

          {/* DELETED ACCOUNTS TAB */}
          {activeTab === "deleted" && (
            <div className={styles.card}>
              <div className={styles.deletedHeader}>
                <div>
                  <h3 className={styles.sectionTitle}>Deleted Accounts</h3>
                  <p className={styles.sectionSub}>
                    User analytics preserved after account deletion
                  </p>
                </div>
                <div className={styles.inlineExport}>
                  <button
                    className={styles.inlineExportBtn}
                    onClick={() => handleExport("csv")}
                  >
                    <Download size={12} /> Export CSV
                  </button>
                  <button
                    className={styles.inlineExportBtn}
                    onClick={() => handleExport("pdf")}
                  >
                    <FileText size={12} /> Export PDF
                  </button>
                </div>
              </div>

              <div className={styles.deletedGrid}>
                {paginatedDeleted.map((du) => (
                  <div
                    key={du.id}
                    className={styles.deletedCard}
                    onClick={() => setSelectedDeleted(du)}
                  >
                    <div className={styles.deletedCardHeader}>
                      <div className={styles.deletedAvatar}>
                        {initials(du.fullName ?? "UK")}
                      </div>
                      <div className={styles.deletedInfo}>
                        <div className={styles.deletedName}>{du.fullName}</div>
                        <div className={styles.deletedEmail}>{du.email}</div>
                      </div>
                      <Badge
                        label={
                          du.hadSubscription
                            ? (du.subscriptionPlan?.replace("_", " ") ?? "Paid")
                            : "Free"
                        }
                        variant={du.hadSubscription ? "info" : "default"}
                      />
                    </div>
                    <div className={styles.deletedStats}>
                      <div className={styles.deletedStat}>
                        <Clock size={12} color="var(--text-muted)" />
                        <span>{du.daysActive} days active</span>
                      </div>
                      <div className={styles.deletedStat}>
                        <BookOpen size={12} color="var(--text-muted)" />
                        <span>{du.lessonsCompleted} lessons</span>
                      </div>
                      <div className={styles.deletedStat}>
                        <TrendingUp size={12} color="var(--text-muted)" />
                        <span>Avg {du.averageQuizScore}%</span>
                      </div>
                      <div className={styles.deletedStat}>
                        <CreditCard size={12} color="var(--green)" />
                        <span style={{ color: "var(--green)" }}>
                          €{du.totalRevenue}
                        </span>
                      </div>
                    </div>
                    {du.deletionReason && (
                      <div className={styles.deletedReason}>
                        <span className={styles.deletedReasonLabel}>
                          Reason:
                        </span>{" "}
                        {du.deletionReason}
                      </div>
                    )}
                    <div className={styles.deletedDates}>
                      <span>Deleted {formatDate(du.accountDeletedAt)}</span>
                      <button
                        className={styles.viewBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDeleted(du);
                        }}
                      >
                        <Eye size={12} /> View
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.paginationRow}>
                <span className={styles.paginationInfo}>
                  Showing {(deletedPageNum - 1) * DELETED_PER_PAGE + 1}–
                  {Math.min(
                    deletedPageNum * DELETED_PER_PAGE,
                    deletedUsers.length,
                  )}{" "}
                  of {deletedUsers.length}
                </span>
                <Pagination
                  page={deletedPageNum}
                  total={deletedUsers.length}
                  perPage={DELETED_PER_PAGE}
                  onChange={setDeletedPageNum}
                />
              </div>
            </div>
          )}

          {/* USER DETAIL OVERLAY */}
          <AnimatePresence>
            {selectedUser && (
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
                  onClick={() => setSelectedUser(null)}
                />
                <motion.div
                  className={styles.detailPanel}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                >
                  {/* Detail header */}
                  <div className={styles.detailPanelHeader}>
                    <div className={styles.detailPanelUser}>
                      <div
                        className={styles.detailAvatar}
                        style={{ background: avatarColor(selectedUser.plan) }}
                      >
                        {initials(selectedUser.name)}
                      </div>
                      <div>
                        <div className={styles.detailName}>
                          {selectedUser.name}
                        </div>
                        <div className={styles.detailEmail}>
                          {selectedUser.email}
                        </div>
                        <div className={styles.detailBadges}>
                          <Badge
                            label={selectedUser.plan}
                            variant={planVariant(selectedUser.plan)}
                          />
                          <Badge
                            label={selectedUser.status}
                            variant={statusVariant(selectedUser.status)}
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      className={styles.detailClose}
                      onClick={() => setSelectedUser(null)}
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Detail quick stats */}
                  <div className={styles.detailQuickStats}>
                    {[
                      {
                        label: "Revenue",
                        value: `€${selectedUser.revenue}`,
                        color: "var(--green)",
                      },
                      {
                        label: "Streak",
                        value: `${selectedUser.streak}d`,
                        color: "var(--amber)",
                      },
                      {
                        label: "Joined",
                        value: formatDate(selectedUser.joinDate),
                        color: "var(--text-primary)",
                      },
                      {
                        label: "Last Active",
                        value: relativeTime(selectedUser.lastActive),
                        color: "var(--blue-bright)",
                      },
                    ].map((s, i) => (
                      <div key={i} className={styles.quickStat}>
                        <div className={styles.quickStatLabel}>{s.label}</div>
                        <div
                          className={styles.quickStatValue}
                          style={{ color: s.color }}
                        >
                          {s.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Detail tabs */}
                  <div className={styles.detailTabs}>
                    {(
                      ["overview", "payments", "audit", "preferences"] as const
                    ).map((t) => (
                      <button
                        key={t}
                        className={`${styles.detailTab} ${userDetailTab === t ? styles.detailTabActive : ""}`}
                        onClick={() => setUserDetailTab(t)}
                      >
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </button>
                    ))}
                  </div>

                  {/* Detail body */}
                  <div className={styles.detailBody}>
                    {/* OVERVIEW */}
                    {userDetailTab === "overview" && (
                      <div className={styles.overviewGrid}>
                        {[
                          { label: "Full Name", value: selectedUser.name },
                          { label: "Email", value: selectedUser.email },
                          { label: "Plan", value: selectedUser.plan },
                          { label: "Status", value: selectedUser.status },
                          {
                            label: "Join Date",
                            value: formatDate(selectedUser.joinDate),
                          },
                          {
                            label: "Last Active",
                            value: relativeTime(selectedUser.lastActive),
                          },
                          {
                            label: "Current Streak",
                            value: `${selectedUser.streak} days`,
                          },
                          {
                            label: "Total Revenue",
                            value: `€${selectedUser.revenue}`,
                          },
                        ].map((row, i) => (
                          <div key={i} className={styles.overviewRow}>
                            <span className={styles.overviewLabel}>
                              {row.label}
                            </span>
                            <span className={styles.overviewValue}>
                              {row.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* PAYMENTS */}
                    {userDetailTab === "payments" && (
                      <div>
                        <div className={styles.detailSectionHeader}>
                          <h4 className={styles.detailSectionTitle}>
                            Payment History
                          </h4>
                          <button
                            className={styles.inlineExportBtn}
                            onClick={() =>
                              showToast("✓ Payment history exported", "success")
                            }
                          >
                            <Download size={12} /> Export
                          </button>
                        </div>
                        {(userPaymentHistory[selectedUser.id] ?? []).length ===
                        0 ? (
                          <div className={styles.emptyState}>
                            No payment records found
                          </div>
                        ) : (
                          <div className={styles.paymentList}>
                            {(userPaymentHistory[selectedUser.id] ?? []).map(
                              (p) => (
                                <div key={p.id} className={styles.paymentRow}>
                                  <div className={styles.paymentLeft}>
                                    <div className={styles.paymentPlan}>
                                      {p.plan}
                                    </div>
                                    <div className={styles.paymentMethod}>
                                      {p.method}
                                    </div>
                                    <div className={styles.paymentDate}>
                                      {formatDate(p.date)}
                                    </div>
                                  </div>
                                  <div className={styles.paymentRight}>
                                    <span className={styles.paymentAmount}>
                                      €{p.amount}
                                    </span>
                                    <Badge
                                      label={p.status}
                                      variant={
                                        p.status === "SUCCESS"
                                          ? "success"
                                          : "danger"
                                      }
                                    />
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                        )}
                        <div className={styles.paymentActions}>
                          <button
                            className={styles.actionBtnBlue}
                            onClick={() =>
                              showToast(
                                "✓ Subscription plan change initiated",
                                "info",
                              )
                            }
                          >
                            <CreditCard size={14} /> Change Plan
                          </button>
                          <button
                            className={styles.actionBtnAmber}
                            onClick={() =>
                              setConfirmAction({
                                action: "cancel",
                                user: selectedUser,
                                label: "Cancel Subscription",
                                variant: "warning",
                              })
                            }
                          >
                            <Ban size={14} /> Cancel Subscription
                          </button>
                          <button
                            className={styles.actionBtnGreen}
                            onClick={() => handleAction("resume", selectedUser)}
                          >
                            <RefreshCw size={14} /> Resume Subscription
                          </button>
                        </div>
                      </div>
                    )}

                    {/* AUDIT */}
                    {userDetailTab === "audit" && (
                      <div>
                        <h4 className={styles.detailSectionTitle}>
                          User Audit Trail
                        </h4>
                        {(userAuditTrail[selectedUser.id] ?? []).length ===
                        0 ? (
                          <div className={styles.emptyState}>
                            No audit records found
                          </div>
                        ) : (
                          <div className={styles.auditList}>
                            {(userAuditTrail[selectedUser.id] ?? []).map(
                              (entry) => (
                                <div
                                  key={entry.id}
                                  className={styles.auditItem}
                                >
                                  <div className={styles.auditDot} />
                                  <div className={styles.auditContent}>
                                    <div className={styles.auditAction}>
                                      {entry.action.replace(/_/g, " ")}
                                    </div>
                                    <div className={styles.auditDetail}>
                                      {entry.detail}
                                    </div>
                                    <div className={styles.auditMeta}>
                                      {formatDate(entry.timestamp)} ·{" "}
                                      {entry.actor}
                                    </div>
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* PREFERENCES */}
                    {userDetailTab === "preferences" && (
                      <div className={styles.prefGrid}>
                        {[
                          {
                            label: "Email Reminders",
                            value: "Enabled",
                            color: "var(--green)",
                          },
                          {
                            label: "Streak Alerts",
                            value: "Enabled",
                            color: "var(--green)",
                          },
                          {
                            label: "Podcast Recommendations",
                            value: "Enabled",
                            color: "var(--green)",
                          },
                          {
                            label: "Daily Study Goal",
                            value: "3 lessons/day",
                            color: "var(--text-primary)",
                          },
                          {
                            label: "Onboarding Complete",
                            value: "Yes",
                            color: "var(--green)",
                          },
                        ].map((p, i) => (
                          <div key={i} className={styles.overviewRow}>
                            <span className={styles.overviewLabel}>
                              {p.label}
                            </span>
                            <span
                              className={styles.overviewValue}
                              style={{ color: p.color }}
                            >
                              {p.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Detail footer actions */}
                  <div className={styles.detailFooter}>
                    <button
                      className={styles.footerBtnBlue}
                      onClick={() => {
                        setEmailTarget(selectedUser);
                        setEmailTo(selectedUser.email);
                        setEmailSubject("");
                        emailEditor?.commands.setContent("");
                        setEmailSent(false);
                        setShowEmailCompose(true);
                      }}
                    >
                      <Mail size={14} /> Send Email
                    </button>
                    <button
                      className={styles.footerBtnAmber}
                      onClick={() =>
                        setConfirmAction({
                          action: "suspend",
                          user: selectedUser,
                          label: "Suspend Account",
                          variant: "warning",
                        })
                      }
                    >
                      <Ban size={14} /> Suspend
                    </button>
                    <button
                      className={styles.footerBtnRed}
                      onClick={() =>
                        setConfirmAction({
                          action: "delete",
                          user: selectedUser,
                          label: "Delete Account",
                          variant: "danger",
                        })
                      }
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                    <button
                      className={styles.footerBtnGhost}
                      onClick={() => handleAction("export", selectedUser)}
                    >
                      <Download size={14} /> Export Data
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* DELETED USER DETAIL OVERLAY */}
          <AnimatePresence>
            {selectedDeleted && (
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
                  onClick={() => setSelectedDeleted(null)}
                />
                <motion.div
                  style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    x: "-50%",
                    y: "-50%",
                    width: 520,
                    maxWidth: "calc(100vw - 32px)",
                    maxHeight: "calc(100vh - 64px)",
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
                        {selectedDeleted.fullName}
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: "var(--text-muted)",
                          marginTop: 2,
                        }}
                      >
                        {selectedDeleted.email}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedDeleted(null)}
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
                      padding: 20,
                      overflowY: "auto",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                    }}
                  >
                    <div
                      className={styles.deletedStatsGrid}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 12,
                        minWidth: 0,
                      }}
                    >
                      {(
                        [
                          {
                            label: "Account Created",
                            value: formatDate(selectedDeleted.accountCreatedAt),
                          },
                          {
                            label: "Account Deleted",
                            value: formatDate(selectedDeleted.accountDeletedAt),
                          },
                          {
                            label: "Days Active",
                            value: `${selectedDeleted.daysActive} days`,
                          },
                          {
                            label: "Total Revenue",
                            value: `€${selectedDeleted.totalRevenue}`,
                            color: "var(--green)",
                          },
                          {
                            label: "Subscription Plan",
                            value:
                              selectedDeleted.subscriptionPlan?.replace(
                                /_/g,
                                " ",
                              ) ?? "None",
                          },
                          {
                            label: "Lessons Completed",
                            value: String(selectedDeleted.lessonsCompleted),
                          },
                          {
                            label: "Quizzes Taken",
                            value: String(selectedDeleted.totalQuizzesTaken),
                          },
                          {
                            label: "Avg Quiz Score",
                            value: `${selectedDeleted.averageQuizScore}%`,
                          },
                          {
                            label: "Highest Score",
                            value: `${selectedDeleted.highestQuizScore}%`,
                            color: "var(--green)",
                          },
                          {
                            label: "Study Time",
                            value: formatStudyTime(
                              selectedDeleted.totalStudyTimeSeconds,
                            ),
                          },
                          {
                            label: "Subjects Started",
                            value: String(selectedDeleted.subjectsStarted),
                          },
                          {
                            label: "Subjects Completed",
                            value: String(selectedDeleted.subjectsCompleted),
                          },
                        ] as DeletedAnalyticsRow[]
                      ).map((row, i) => (
                        <div
                          key={i}
                          style={{
                            background: "var(--bg-card)",
                            border: "1px solid var(--border-default)",
                            borderRadius: 8,
                            padding: "10px 14px",
                          }}
                        >
                          <div
                            style={{
                              fontSize: 11,
                              fontWeight: 500,
                              color: "var(--text-muted)",
                              textTransform: "uppercase",
                              letterSpacing: "0.06em",
                              marginBottom: 4,
                            }}
                          >
                            {row.label}
                          </div>
                          <div
                            style={{
                              fontSize: 15,
                              fontWeight: 600,
                              color: row.color ?? "var(--text-primary)",
                            }}
                          >
                            {row.value}
                          </div>
                        </div>
                      ))}
                    </div>
                    {selectedDeleted.deletionReason && (
                      <div
                        style={{
                          background: "var(--red-bg)",
                          border: "1px solid var(--red)",
                          borderRadius: 8,
                          padding: "12px 16px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 500,
                            color: "var(--red)",
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                            marginBottom: 6,
                          }}
                        >
                          Deletion Reason
                        </div>
                        <div
                          style={{ fontSize: 14, color: "var(--text-primary)" }}
                        >
                          {selectedDeleted.deletionReason}
                        </div>
                        {selectedDeleted.feedback && (
                          <div
                            style={{
                              fontSize: 13,
                              color: "var(--text-secondary)",
                              marginTop: 6,
                              fontStyle: "italic",
                            }}
                          >
                            &quot;{selectedDeleted.feedback}&quot;
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 10,
                      padding: "16px 20px",
                      borderTop: "1px solid var(--border-default)",
                      flexShrink: 0,
                    }}
                  >
                    <button
                      onClick={() => {
                        showToast("✓ Deleted user data exported", "success");
                        setSelectedDeleted(null);
                      }}
                      style={{
                        background: "var(--blue-muted)",
                        border: "1px solid var(--blue-primary)",
                        color: "var(--blue-bright)",
                        borderRadius: 8,
                        padding: "8px 16px",
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <Download size={13} /> Export Data
                    </button>
                    <button
                      onClick={() => setSelectedDeleted(null)}
                      style={{
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-default)",
                        color: "var(--text-secondary)",
                        borderRadius: 8,
                        padding: "8px 16px",
                        fontSize: 13,
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

          {/* CONFIRM ACTION DIALOG */}
          <AnimatePresence>
            {confirmAction && (
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
                  onClick={() => setConfirmAction(null)}
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
                    border: `1px solid ${confirmAction.variant === "danger" ? "var(--red)" : "var(--amber)"}`,
                    borderRadius: 14,
                    zIndex: 601,
                    overflow: "hidden",
                    boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
                  }}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.2 }}
                >
                  <div style={{ padding: "24px 24px 0" }}>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        background:
                          confirmAction.variant === "danger"
                            ? "var(--red-bg)"
                            : "var(--amber-bg)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 16,
                      }}
                    >
                      <AlertCircle
                        size={22}
                        color={
                          confirmAction.variant === "danger"
                            ? "var(--red)"
                            : "var(--amber)"
                        }
                      />
                    </div>
                    <div
                      style={{
                        fontSize: 17,
                        fontWeight: 600,
                        color: "var(--text-primary)",
                        marginBottom: 8,
                      }}
                    >
                      {confirmAction.label}
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        color: "var(--text-secondary)",
                        lineHeight: 1.6,
                      }}
                    >
                      Are you sure you want to{" "}
                      {confirmAction.label.toLowerCase()} for{" "}
                      <strong style={{ color: "var(--text-primary)" }}>
                        {confirmAction.user.name}
                      </strong>
                      ? This action will be logged in the audit trail.
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 10, padding: 24 }}>
                    <button
                      onClick={() => {
                        handleAction(confirmAction.action, confirmAction.user);
                        setSelectedUser(null);
                      }}
                      style={{
                        flex: 1,
                        background:
                          confirmAction.variant === "danger"
                            ? "var(--red)"
                            : "var(--amber)",
                        border: "none",
                        borderRadius: 8,
                        padding: "10px 16px",
                        fontSize: 14,
                        fontWeight: 600,
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      Confirm {confirmAction.label}
                    </button>
                    <button
                      onClick={() => setConfirmAction(null)}
                      style={{
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-default)",
                        borderRadius: 8,
                        padding: "10px 20px",
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

          {/* MOBILE SEARCH OVERLAY */}
          <AnimatePresence>
            {showMobileSearch && (
              <>
                <motion.div
                  style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgba(0,0,0,0.5)",
                    zIndex: 490,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowMobileSearch(false)}
                />
                <motion.div
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    background: "var(--bg-card)",
                    borderBottom: "1px solid var(--border-focus)",
                    zIndex: 491,
                    padding: "12px 16px",
                  }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <Search size={16} color="var(--text-muted)" />
                    <input
                      ref={searchInputRef}
                      autoFocus
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setActivePage(1);
                      }}
                      placeholder="Search users..."
                      style={{
                        flex: 1,
                        background: "var(--bg-elevated)",
                        border: "1px solid var(--border-focus)",
                        borderRadius: 8,
                        padding: "10px 14px",
                        fontSize: 15,
                        color: "var(--text-primary)",
                        outline: "none",
                        fontFamily: "inherit",
                      }}
                    />
                    <button
                      onClick={() => setShowMobileSearch(false)}
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        background: "var(--bg-elevated)",
                        border: "1px solid var(--border-default)",
                        color: "var(--text-secondary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        flexShrink: 0,
                      }}
                    >
                      <X size={16} />
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
                  maxWidth: 360,
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

          <AnimatePresence>
            {showEmailCompose && (
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.95 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                style={{
                  position: "fixed",
                  bottom: 0,
                  right: 24,
                  width: 520,
                  maxWidth: "calc(100vw - 48px)",
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border-focus)",
                  borderRadius: "12px 12px 0 0",
                  boxShadow: "0 -4px 32px rgba(0,0,0,0.5)",
                  zIndex: 400,
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                }}
              >
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 12px",
                    height: 44,
                    background: "var(--bg-card)",
                    borderBottom: "1px solid var(--border-default)",
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--text-primary)",
                    }}
                  >
                    New Message{emailTarget ? ` - ${emailTarget.name}` : ""}
                  </span>
                  <div style={{ display: "flex", gap: 4 }}>
                    <button
                      onClick={() => setShowEmailCompose(false)}
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        background: "transparent",
                        border: "none",
                        color: "var(--text-secondary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <X size={13} />
                    </button>
                  </div>
                </div>

                {/* Fields */}
                <div style={{ flexShrink: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "8px 14px",
                      borderBottom: "1px solid var(--border-default)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        color: "var(--text-muted)",
                        width: 56,
                        flexShrink: 0,
                      }}
                    >
                      To
                    </span>
                    <input
                      value={emailTo}
                      onChange={(e) => setEmailTo(e.target.value)}
                      style={{
                        flex: 1,
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        fontSize: 14,
                        color: "var(--text-primary)",
                        fontFamily: "inherit",
                      }}
                      placeholder="recipient@example.com"
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "8px 14px",
                      borderBottom: "1px solid var(--border-default)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        color: "var(--text-muted)",
                        width: 56,
                        flexShrink: 0,
                      }}
                    >
                      Subject
                    </span>
                    <input
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      style={{
                        flex: 1,
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        fontSize: 14,
                        color: "var(--text-primary)",
                        fontFamily: "inherit",
                      }}
                      placeholder="Email subject..."
                    />
                  </div>
                </div>

                {/* Editor */}
                <div
                  style={{
                    flex: 1,
                    minHeight: 200,
                    maxHeight: 280,
                    overflowY: "auto",
                    padding: "12px 14px",
                  }}
                >
                  <style>{`.ProseMirror { outline: none !important; border: none !important; min-height: 160px; font-size: 14px; color: var(--text-primary); line-height: 1.7; font-family: inherit; } .ProseMirror p.is-editor-empty:first-child::before { content: attr(data-placeholder); color: var(--text-muted); float: left; height: 0; pointer-events: none; }`}</style>
                  <EditorContent editor={emailEditor} />
                </div>

                {/* Toolbar */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 12px",
                    borderTop: "1px solid var(--border-default)",
                    background: "var(--bg-card)",
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <button
                      onClick={() => {
                        if (!emailTo || !emailSubject) return;
                        setEmailSent(true);
                        showToast(`✓ Email sent to ${emailTo}`, "success");
                        setTimeout(() => {
                          setShowEmailCompose(false);
                          setEmailSent(false);
                        }, 1500);
                      }}
                      disabled={emailSent || !emailTo || !emailSubject}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        background: "var(--blue-primary)",
                        color: "white",
                        border: "none",
                        borderRadius: 20,
                        padding: "7px 18px",
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: "pointer",
                        opacity: emailSent ? 0.7 : 1,
                      }}
                    >
                      {emailSent ? "Sent!" : "Send"}{" "}
                      {!emailSent && <Send size={13} />}
                    </button>
                    <div
                      style={{
                        width: 1,
                        height: 18,
                        background: "var(--border-default)",
                        margin: "0 6px",
                      }}
                    />
                    <button
                      onClick={() =>
                        emailEditor?.chain().focus().toggleBold().run()
                      }
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 6,
                        background: "transparent",
                        border: "none",
                        color: "var(--text-secondary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <Bold size={15} />
                    </button>
                    <button
                      onClick={() =>
                        emailEditor?.chain().focus().toggleItalic().run()
                      }
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 6,
                        background: "transparent",
                        border: "none",
                        color: "var(--text-secondary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <Italic size={15} />
                    </button>
                    <button
                      onClick={() =>
                        emailEditor?.chain().focus().toggleBulletList().run()
                      }
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 6,
                        background: "transparent",
                        border: "none",
                        color: "var(--text-secondary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <List size={15} />
                    </button>
                    <button
                      onClick={() =>
                        emailEditor?.chain().focus().toggleOrderedList().run()
                      }
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 6,
                        background: "transparent",
                        border: "none",
                        color: "var(--text-secondary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <ListOrdered size={15} />
                    </button>
                    <button
                      onClick={() =>
                        emailEditor
                          ?.chain()
                          .focus()
                          .toggleHeading({ level: 2 })
                          .run()
                      }
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 6,
                        background: "transparent",
                        border: "none",
                        color: "var(--text-secondary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <Heading2 size={15} />
                    </button>
                    <button
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 6,
                        background: "transparent",
                        border: "none",
                        color: "var(--text-secondary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <Minus size={15} />
                    </button>
                  </div>
                  <label
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 6,
                      background: "transparent",
                      border: "none",
                      color: "var(--text-secondary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Paperclip size={15} />
                    <input type="file" style={{ display: "none" }} />
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showChangePlan && changePlanUser && (
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
                  onClick={() => setShowChangePlan(false)}
                />
                <motion.div
                  style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    x: "-50%",
                    y: "-50%",
                    width: 400,
                    maxWidth: "calc(100vw - 32px)",
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border-focus)",
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
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "18px 20px",
                      borderBottom: "1px solid var(--border-default)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: "var(--text-primary)",
                      }}
                    >
                      Change Plan
                    </span>
                    <button
                      onClick={() => setShowChangePlan(false)}
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
                      padding: 20,
                      display: "flex",
                      flexDirection: "column",
                      gap: 16,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 500,
                          color: "var(--text-muted)",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          marginBottom: 6,
                        }}
                      >
                        User
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          color: "var(--text-primary)",
                          fontWeight: 500,
                        }}
                      >
                        {changePlanUser.name}
                      </div>
                      <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
                        {changePlanUser.email}
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 500,
                          color: "var(--text-muted)",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          marginBottom: 6,
                        }}
                      >
                        Current Plan
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          color: "var(--blue-bright)",
                          fontWeight: 600,
                        }}
                      >
                        {changePlanUser.plan}
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 500,
                          color: "var(--text-muted)",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          marginBottom: 10,
                        }}
                      >
                        Change To
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 8,
                        }}
                      >
                        {["Free", "Standard", "Pro"]
                          .filter((p) => p !== changePlanUser.plan)
                          .map((plan) => (
                            <button
                              key={plan}
                              onClick={() => setSelectedNewPlan(plan)}
                              style={{
                                padding: "12px 16px",
                                borderRadius: 8,
                                cursor: "pointer",
                                background:
                                  selectedNewPlan === plan
                                    ? "var(--blue-muted)"
                                    : "var(--bg-card)",
                                border: `1px solid ${selectedNewPlan === plan ? "var(--blue-primary)" : "var(--border-default)"}`,
                                color:
                                  selectedNewPlan === plan
                                    ? "var(--blue-bright)"
                                    : "var(--text-secondary)",
                                fontSize: 14,
                                fontWeight: 500,
                                textAlign: "left",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <span>{plan}</span>
                              <span
                                style={{
                                  fontSize: 13,
                                  color: "var(--text-muted)",
                                }}
                              >
                                {plan === "Pro"
                                  ? "€49/mo"
                                  : plan === "Standard"
                                    ? "€29/mo"
                                    : "Free"}
                              </span>
                            </button>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", gap: 10, padding: "0 20px 20px" }}
                  >
                    <button
                      onClick={() => {
                        showToast(
                          `✓ ${changePlanUser.name} moved to ${selectedNewPlan} plan`,
                          "success",
                        );
                        setShowChangePlan(false);
                      }}
                      disabled={
                        !selectedNewPlan ||
                        selectedNewPlan === changePlanUser.plan
                      }
                      style={{
                        flex: 1,
                        background: "var(--blue-primary)",
                        color: "white",
                        border: "none",
                        borderRadius: 8,
                        padding: "10px 16px",
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: "pointer",
                        opacity:
                          !selectedNewPlan ||
                          selectedNewPlan === changePlanUser.plan
                            ? 0.5
                            : 1,
                      }}
                    >
                      Confirm Plan Change
                    </button>
                    <button
                      onClick={() => setShowChangePlan(false)}
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
      </>
    </div>
  );
}
