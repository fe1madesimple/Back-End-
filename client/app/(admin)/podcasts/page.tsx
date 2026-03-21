"use client";
import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  Folder,
  FolderOpen,
  MoreVertical,
  Play,
  Pause,
  Plus,
  Upload,
  Search,
  BarChart2,
  Clock,
  Users,
  TrendingUp,
  Edit2,
  Trash2,
  Copy,
  Move,
  Eye,
  EyeOff,
  ChevronRight,
  X,
  FileText,
  CheckCircle,
  ArrowLeft,
  Grid,
  List,
} from "lucide-react";
import { adminPodcasts, podcastFolders, podcastStats } from "@/lib/dummy-data";
import styles from "./podcasts.module.css";

type ToastType = {
  message: string;
  type: "success" | "danger" | "warning" | "info";
};
type ViewMode = "folders" | "all" | "folder-detail";
type DisplayMode = "grid" | "list";

const formatDuration = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const formatNumber = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n.toString();

export default function PodcastsPage() {
  const [toast, setToast] = useState<ToastType | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("folders");
  const [displayMode, setDisplayMode] = useState<DisplayMode>("grid");
  const [selectedFolder, setSelectedFolder] = useState<
    (typeof podcastFolders)[0] | null
  >(null);
  const [search, setSearch] = useState("");
  const [selectedPodcast, setSelectedPodcast] = useState<
    (typeof adminPodcasts)[0] | null
  >(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [folderMenu, setFolderMenu] = useState<string | null>(null);
  const [podcastMenu, setPodcastMenu] = useState<string | null>(null);
  const [showAddPodcast, setShowAddPodcast] = useState(false);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState<string | null>(null);
  const [folders, setFolders] = useState(podcastFolders);
  const [podcasts, setPodcasts] = useState(adminPodcasts);
  const [newFolderName, setNewFolderName] = useState("");
  const [bulkFiles, setBulkFiles] = useState<
    {
      name: string;
      concepts: string;
      cases: string;
      examTip: string;
      subject: string;
    }[]
  >([]);
  const [bulkStep, setBulkStep] = useState<"select" | "fill" | "done">(
    "select",
  );
  const [audioProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const showToast = useCallback(
    (message: string, type: ToastType["type"] = "success") => {
      setToast({ message, type });
      setTimeout(() => setToast(null), 3000);
    },
    [],
  );

  const filteredPodcasts = podcasts.filter((p) => {
    const matchSearch =
      !search || p.title.toLowerCase().includes(search.toLowerCase());
    const matchFolder =
      viewMode === "folder-detail" ? p.folderId === selectedFolder?.id : true;
    return matchSearch && matchFolder;
  });

  const handleFolderAction = (
    action: string,
    folder: (typeof podcastFolders)[0],
  ) => {
    setFolderMenu(null);
    if (action === "rename")
      showToast(`✓ Folder "${folder.name}" renamed`, "success");
    if (action === "delete") {
      setFolders((prev) => prev.filter((f) => f.id !== folder.id));
      showToast(`✓ Folder "${folder.name}" deleted`, "warning");
    }
    if (action === "copy")
      showToast(`✓ Folder "${folder.name}" copied`, "info");
    if (action === "move") showToast(`✓ Folder "${folder.name}" moved`, "info");
  };

  const handlePodcastAction = (
    action: string,
    podcast: (typeof adminPodcasts)[0],
  ) => {
    setPodcastMenu(null);
    if (action === "delete") {
      setPodcasts((prev) => prev.filter((p) => p.id !== podcast.id));
      showToast(`✓ "${podcast.title}" deleted`, "warning");
    }
    if (action === "publish") {
      setPodcasts((prev) =>
        prev.map((p) =>
          p.id === podcast.id ? { ...p, isPublished: !p.isPublished } : p,
        ),
      );
      showToast(
        `✓ "${podcast.title}" ${podcast.isPublished ? "unpublished" : "published"}`,
        "success",
      );
    }
    if (action === "copy") showToast(`✓ "${podcast.title}" copied`, "info");
    if (action === "move") showToast(`✓ "${podcast.title}" moved`, "info");
    if (action === "analytics") setShowAnalytics(podcast.id);
  };

  const handleBulkFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setBulkFiles(
      files.map((f) => ({
        name: f.name,
        concepts: "",
        cases: "",
        examTip: "",
        subject: "Criminal Law",
      })),
    );
    setBulkStep("fill");
  };

  const togglePlay = (podcastId: string) => {
    if (playingId === podcastId) {
      setPlayingId(null);
      audioRef.current?.pause();
    } else {
      setPlayingId(podcastId);
    }
  };

  const analyticsTarget = podcasts.find((p) => p.id === showAnalytics);

  return (
    <div className={styles.page}>
      {/* ── PAGE HEADER ── */}
      <div className={styles.pageHeader}>
        <div className={styles.headerLeft}>
          {viewMode === "folder-detail" && (
            <button
              className={styles.backBtn}
              onClick={() => {
                setViewMode("folders");
                setSelectedFolder(null);
              }}
            >
              <ArrowLeft size={16} />
            </button>
          )}
          <div>
            <h1 className={styles.title}>
              {viewMode === "folder-detail"
                ? selectedFolder?.name
                : "Podcast Library"}
            </h1>
            <p className={styles.subtitle}>
              {viewMode === "folder-detail"
                ? `${filteredPodcasts.length} episodes in this folder`
                : `${podcastStats.totalEpisodes} episodes · ${podcastStats.published} published · ${podcastStats.drafts} drafts`}
            </p>
          </div>
        </div>
        <div className={styles.headerActions}>
          <button
            className={styles.viewBtn}
            onClick={() =>
              setViewMode((v) => (v === "folders" ? "all" : "folders"))
            }
          >
            {viewMode === "folders" ? <List size={14} /> : <Grid size={14} />}
            {viewMode === "folders" ? "All Episodes" : "Folders"}
          </button>
          <button
            className={styles.secondaryBtn}
            onClick={() => setShowFolderModal(true)}
          >
            <Folder size={14} /> New Folder
          </button>
          <button
            className={styles.secondaryBtn}
            onClick={() => setShowBulkUpload(true)}
          >
            <Upload size={14} /> Bulk Upload
          </button>
          <button
            className={styles.primaryBtn}
            onClick={() => setShowAddPodcast(true)}
          >
            <Plus size={14} /> Add Podcast
          </button>
        </div>
      </div>

      {/* ── STATS STRIP ── */}
      <div className={styles.statsStrip}>
        {[
          {
            label: "Total Episodes",
            value: podcastStats.totalEpisodes,
            color: "var(--blue-bright)",
            icon: Mic,
          },
          {
            label: "Total Play Hours",
            value: `${podcastStats.totalPlayHours.toLocaleString()}h`,
            color: "var(--purple)",
            icon: Clock,
          },
          {
            label: "Unique Listeners",
            value: formatNumber(podcastStats.uniqueListeners),
            color: "var(--green)",
            icon: Users,
          },
          {
            label: "Avg Completion",
            value: `${podcastStats.avgCompletionRate}%`,
            color: "var(--amber)",
            icon: TrendingUp,
          },
          {
            label: "This Week",
            value: `+${podcastStats.thisWeekPlays}`,
            color: "var(--cyan)",
            icon: BarChart2,
          },
          {
            label: "Drafts",
            value: podcastStats.drafts,
            color: "var(--red)",
            icon: FileText,
          },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className={styles.statCard}>
              <div className={styles.statTop}>
                <span className={styles.statLabel}>{s.label}</span>
                <div
                  className={styles.statIconWrap}
                  style={{ background: s.color + "20" }}
                >
                  <Icon size={13} color={s.color} />
                </div>
              </div>
              <div className={styles.statValue} style={{ color: s.color }}>
                {s.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── SEARCH BAR ── */}
      <div className={styles.searchRow}>
        <div className={styles.searchWrap}>
          <Search size={14} className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            placeholder="Search episodes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.displayToggle}>
          <button
            className={`${styles.toggleBtn} ${displayMode === "grid" ? styles.toggleBtnActive : ""}`}
            onClick={() => setDisplayMode("grid")}
          >
            <Grid size={14} />
          </button>
          <button
            className={`${styles.toggleBtn} ${displayMode === "list" ? styles.toggleBtnActive : ""}`}
            onClick={() => setDisplayMode("list")}
          >
            <List size={14} />
          </button>
        </div>
      </div>

      {/* ── FOLDERS VIEW ── */}
      <AnimatePresence mode="wait">
        {viewMode === "folders" && (
          <motion.div
            key="folders"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className={styles.foldersGrid}>
              {folders.map((folder) => (
                <div
                  key={folder.id}
                  className={styles.folderCard}
                  onClick={() => {
                    setSelectedFolder(folder);
                    setViewMode("folder-detail");
                  }}
                >
                  <div className={styles.folderTop}>
                    <div
                      className={styles.folderIcon}
                      style={{
                        background: folder.color + "20",
                        borderColor: folder.color + "40",
                      }}
                    >
                      <FolderOpen size={22} color={folder.color} />
                    </div>
                    <button
                      className={styles.menuBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        setFolderMenu(
                          folderMenu === folder.id ? null : folder.id,
                        );
                      }}
                    >
                      <MoreVertical size={14} />
                    </button>
                    <AnimatePresence>
                      {folderMenu === folder.id && (
                        <motion.div
                          className={styles.dropdownMenu}
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {[
                            { label: "Rename", icon: Edit2, action: "rename" },
                            { label: "Copy", icon: Copy, action: "copy" },
                            { label: "Move", icon: Move, action: "move" },
                            {
                              label: "Delete",
                              icon: Trash2,
                              action: "delete",
                              danger: true,
                            },
                          ].map((item) => (
                            <button
                              key={item.action}
                              className={`${styles.dropdownItem} ${item.danger ? styles.dropdownItemDanger : ""}`}
                              onClick={() =>
                                handleFolderAction(item.action, folder)
                              }
                            >
                              <item.icon size={13} /> {item.label}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className={styles.folderName}>{folder.name}</div>
                  <div className={styles.folderMeta}>
                    {folder.podcastCount} episodes
                  </div>
                  <div
                    className={styles.folderBar}
                    style={{ background: folder.color }}
                  />
                </div>
              ))}
            </div>

            {/* All episodes preview below folders */}
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Recent Episodes</h3>
              <button
                className={styles.viewAllBtn}
                onClick={() => setViewMode("all")}
              >
                View all <ChevronRight size={13} />
              </button>
            </div>
            <PodcastList
              podcasts={filteredPodcasts.slice(0, 6)}
              displayMode="grid"
              playingId={playingId}
              podcastMenu={podcastMenu}
              onTogglePlay={togglePlay}
              onMenuToggle={(id) =>
                setPodcastMenu(podcastMenu === id ? null : id)
              }
              onMenuAction={handlePodcastAction}
              onSelect={setSelectedPodcast}
            />
          </motion.div>
        )}

        {(viewMode === "all" || viewMode === "folder-detail") && (
          <motion.div
            key="all"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PodcastList
              podcasts={filteredPodcasts}
              displayMode={displayMode}
              playingId={playingId}
              podcastMenu={podcastMenu}
              onTogglePlay={togglePlay}
              onMenuToggle={(id) =>
                setPodcastMenu(podcastMenu === id ? null : id)
              }
              onMenuAction={handlePodcastAction}
              onSelect={setSelectedPodcast}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PODCAST DETAIL OVERLAY ── */}
      <AnimatePresence>
        {selectedPodcast && (
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
              onClick={() => setSelectedPodcast(null)}
            />
            <motion.div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                x: "-50%",
                y: "-50%",
                width: 640,
                maxWidth: "calc(100vw - 32px)",
                maxHeight: "calc(100vh - 48px)",
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-focus)",
                borderRadius: 16,
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
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "18px 24px",
                  borderBottom: "1px solid var(--border-default)",
                  flexShrink: 0,
                }}
              >
                <img
                  src={selectedPodcast.thumbnail || ""}
                  alt=""
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 10,
                    objectFit: "cover",
                    background: "var(--bg-hover)",
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      marginBottom: 2,
                    }}
                  >
                    {selectedPodcast.title}
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: selectedPodcast.subjectColor,
                        background: selectedPodcast.subjectColor + "20",
                        border: `1px solid ${selectedPodcast.subjectColor}40`,
                        borderRadius: 20,
                        padding: "2px 8px",
                      }}
                    >
                      {selectedPodcast.subjectName}
                    </span>
                    <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                      {formatDuration(selectedPodcast.duration)}
                    </span>
                    {!selectedPodcast.isPublished && (
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: "var(--amber)",
                          background: "var(--amber-bg)",
                          border: "1px solid var(--amber)",
                          borderRadius: 20,
                          padding: "2px 8px",
                        }}
                      >
                        DRAFT
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPodcast(null)}
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

              {/* Audio player */}
              <div
                style={{
                  background: "var(--bg-card)",
                  borderBottom: "1px solid var(--border-default)",
                  padding: "14px 24px",
                  flexShrink: 0,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <button
                    onClick={() => togglePlay(selectedPodcast.id)}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "var(--blue-primary)",
                      border: "none",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                  >
                    {playingId === selectedPodcast.id ? (
                      <Pause size={16} />
                    ) : (
                      <Play size={16} />
                    )}
                  </button>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        height: 4,
                        background: "var(--bg-hover)",
                        borderRadius: 2,
                        overflow: "hidden",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${audioProgress}%`,
                          background: "var(--blue-primary)",
                          borderRadius: 2,
                          transition: "width 0.3s",
                        }}
                      />
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 12,
                      color: "var(--text-muted)",
                      flexShrink: 0,
                    }}
                  >
                    {formatDuration(selectedPodcast.duration)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div
                style={{
                  overflowY: "auto",
                  flex: 1,
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                {/* Stats row */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 10,
                  }}
                >
                  {[
                    {
                      label: "Total Plays",
                      value: formatNumber(selectedPodcast.plays),
                      color: "var(--blue-bright)",
                    },
                    {
                      label: "Unique Listeners",
                      value: formatNumber(selectedPodcast.uniqueListeners),
                      color: "var(--green)",
                    },
                    {
                      label: "Avg Completion",
                      value: `${selectedPodcast.avgCompletion}%`,
                      color: "var(--amber)",
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
                          fontSize: 20,
                          fontWeight: 700,
                          color: s.color,
                        }}
                      >
                        {s.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Module info */}
                {!selectedPodcast.isBonus && (
                  <div style={{ display: "flex", gap: 8 }}>
                    {[
                      { label: "Module", value: selectedPodcast.moduleNumber },
                      { label: "Lesson", value: selectedPodcast.lessonNumber },
                      { label: "Part", value: selectedPodcast.part },
                    ].map((item, i) => (
                      <div
                        key={i}
                        style={{
                          background: "var(--bg-card)",
                          border: "1px solid var(--border-default)",
                          borderRadius: 8,
                          padding: "8px 14px",
                          textAlign: "center",
                          flex: 1,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 10,
                            color: "var(--text-muted)",
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                          }}
                        >
                          {item.label}
                        </div>
                        <div
                          style={{
                            fontSize: 18,
                            fontWeight: 700,
                            color: "var(--text-primary)",
                            marginTop: 2,
                          }}
                        >
                          {item.value ?? "—"}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Key Concepts */}
                {selectedPodcast.notes?.concepts?.length > 0 && (
                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "var(--text-muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginBottom: 8,
                      }}
                    >
                      📌 Key Concepts
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                      }}
                    >
                      {selectedPodcast.notes.concepts.map((c, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 8,
                            fontSize: 13,
                            color: "var(--text-primary)",
                            lineHeight: 1.6,
                          }}
                        >
                          <div
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: "var(--blue-bright)",
                              marginTop: 6,
                              flexShrink: 0,
                            }}
                          />
                          {c}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Cases */}
                {selectedPodcast.notes?.cases?.length > 0 && (
                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "var(--text-muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginBottom: 8,
                      }}
                    >
                      ⚖️ Key Cases
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                      }}
                    >
                      {selectedPodcast.notes.cases.map((c, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 8,
                            fontSize: 13,
                            color: "var(--text-secondary)",
                            lineHeight: 1.6,
                          }}
                        >
                          <div
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: "var(--amber)",
                              marginTop: 6,
                              flexShrink: 0,
                            }}
                          />
                          {c}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Exam Tip */}
                {selectedPodcast.examTip && (
                  <div
                    style={{
                      background: "var(--amber-bg)",
                      border: "1px solid var(--amber)",
                      borderRadius: 8,
                      padding: "12px 16px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "var(--amber)",
                        marginBottom: 6,
                      }}
                    >
                      💡 Exam Tip
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "var(--text-primary)",
                        lineHeight: 1.7,
                      }}
                    >
                      {selectedPodcast.examTip}
                    </div>
                  </div>
                )}

                {/* Audio URL */}
                <div
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-default)",
                    borderRadius: 8,
                    padding: "12px 16px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      marginBottom: 6,
                    }}
                  >
                    Audio URL
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--blue-bright)",
                      wordBreak: "break-all",
                      fontFamily: "monospace",
                    }}
                  >
                    {selectedPodcast.audioUrl}
                  </div>
                </div>
              </div>

              {/* Footer actions */}
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  padding: "16px 24px",
                  borderTop: "1px solid var(--border-default)",
                  flexShrink: 0,
                }}
              >
                <button
                  onClick={() => {
                    handlePodcastAction("publish", selectedPodcast);
                    setSelectedPodcast(null);
                  }}
                  style={{
                    flex: 1,
                    background: selectedPodcast.isPublished
                      ? "var(--amber-bg)"
                      : "var(--green-bg)",
                    border: `1px solid ${selectedPodcast.isPublished ? "var(--amber)" : "var(--green)"}`,
                    color: selectedPodcast.isPublished
                      ? "var(--amber)"
                      : "var(--green)",
                    borderRadius: 8,
                    padding: "9px",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                  }}
                >
                  {selectedPodcast.isPublished ? (
                    <>
                      <EyeOff size={13} /> Unpublish
                    </>
                  ) : (
                    <>
                      <Eye size={13} /> Publish
                    </>
                  )}
                </button>
                <button
                  onClick={() =>
                    handlePodcastAction("analytics", selectedPodcast)
                  }
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-default)",
                    borderRadius: 8,
                    padding: "9px 16px",
                    fontSize: 13,
                    color: "var(--text-secondary)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <BarChart2 size={13} /> Analytics
                </button>
                <button
                  onClick={() => {
                    handlePodcastAction("delete", selectedPodcast);
                    setSelectedPodcast(null);
                  }}
                  style={{
                    background: "var(--red-bg)",
                    border: "1px solid var(--red)",
                    borderRadius: 8,
                    padding: "9px 14px",
                    fontSize: 13,
                    color: "var(--red)",
                    cursor: "pointer",
                  }}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── ANALYTICS OVERLAY ── */}
      <AnimatePresence>
        {showAnalytics && analyticsTarget && (
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
              onClick={() => setShowAnalytics(null)}
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
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-focus)",
                borderRadius: 16,
                zIndex: 601,
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
                <div>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "var(--text-primary)",
                    }}
                  >
                    Episode Analytics
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "var(--text-muted)",
                      marginTop: 2,
                    }}
                  >
                    {analyticsTarget.title}
                  </div>
                </div>
                <button
                  onClick={() => setShowAnalytics(null)}
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
                  gap: 16,
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 10,
                  }}
                >
                  {[
                    {
                      label: "Total Plays",
                      value: formatNumber(analyticsTarget.plays),
                      color: "var(--blue-bright)",
                    },
                    {
                      label: "Unique Listeners",
                      value: formatNumber(analyticsTarget.uniqueListeners),
                      color: "var(--green)",
                    },
                    {
                      label: "Avg Completion",
                      value: `${analyticsTarget.avgCompletion}%`,
                      color: "var(--amber)",
                    },
                  ].map((s, i) => (
                    <div
                      key={i}
                      style={{
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-default)",
                        borderRadius: 8,
                        padding: "12px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 10,
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
                          fontSize: 22,
                          fontWeight: 700,
                          color: s.color,
                        }}
                      >
                        {s.value}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Completion bar */}
                <div
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-default)",
                    borderRadius: 8,
                    padding: "14px 16px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                      Completion Rate
                    </span>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color:
                          analyticsTarget.avgCompletion >= 70
                            ? "var(--green)"
                            : analyticsTarget.avgCompletion >= 50
                              ? "var(--amber)"
                              : "var(--red)",
                      }}
                    >
                      {analyticsTarget.avgCompletion}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: 8,
                      background: "var(--bg-hover)",
                      borderRadius: 4,
                      overflow: "hidden",
                    }}
                  >
                    <motion.div
                      style={{
                        height: "100%",
                        background:
                          analyticsTarget.avgCompletion >= 70
                            ? "var(--green)"
                            : analyticsTarget.avgCompletion >= 50
                              ? "var(--amber)"
                              : "var(--red)",
                        borderRadius: 4,
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${analyticsTarget.avgCompletion}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>
                {/* Subject color tag */}
                <div
                  style={{
                    background: analyticsTarget.subjectColor + "15",
                    border: `1px solid ${analyticsTarget.subjectColor}40`,
                    borderRadius: 8,
                    padding: "10px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: analyticsTarget.subjectColor,
                    }}
                  />
                  <span
                    style={{
                      fontSize: 13,
                      color: analyticsTarget.subjectColor,
                      fontWeight: 600,
                    }}
                  >
                    {analyticsTarget.subjectName}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      color: "var(--text-muted)",
                      marginLeft: "auto",
                    }}
                  >
                    {formatDuration(analyticsTarget.duration)}
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── ADD PODCAST MODAL ── */}
      <AnimatePresence>
        {showAddPodcast && (
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
              onClick={() => setShowAddPodcast(false)}
            />
            <motion.div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                x: "-50%",
                y: "-50%",
                width: 560,
                maxWidth: "calc(100vw - 32px)",
                maxHeight: "calc(100vh - 48px)",
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-focus)",
                borderRadius: 16,
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
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  Add New Podcast
                </h3>
                <button
                  onClick={() => setShowAddPodcast(false)}
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
                  overflowY: "auto",
                  flex: 1,
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                {[
                  {
                    label: "Episode Title",
                    placeholder: "e.g. Mens Rea - Intention and Recklessness",
                    type: "text",
                  },
                  {
                    label: "Audio URL (Cloudinary)",
                    placeholder: "https://res.cloudinary.com/...",
                    type: "text",
                  },
                  {
                    label: "Thumbnail URL",
                    placeholder: "https://res.cloudinary.com/...",
                    type: "text",
                  },
                ].map((f, i) => (
                  <div
                    key={i}
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
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
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
                    />
                  </div>
                ))}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                  }}
                >
                  {[
                    {
                      label: "Subject",
                      options: [
                        "Criminal Law",
                        "Contract Law",
                        "Tort Law",
                        "Equity",
                        "EU Law",
                        "Property Law",
                        "Constitutional Law",
                        "Company Law",
                        "Bonus",
                      ],
                    },
                    {
                      label: "Module Number",
                      options: Array.from({ length: 16 }, (_, i) =>
                        (i + 1).toString(),
                      ),
                    },
                  ].map((f, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                      }}
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
                        {f.label}
                      </label>
                      <select
                        style={{
                          background: "var(--bg-card)",
                          border: "1px solid var(--border-default)",
                          borderRadius: 8,
                          padding: "10px 14px",
                          fontSize: 14,
                          color: "var(--text-primary)",
                          outline: "none",
                          fontFamily: "inherit",
                          cursor: "pointer",
                          colorScheme: "dark",
                        }}
                      >
                        {f.options.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    </div>
                  ))}
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
                    Key Concepts (one per line)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Each line becomes a bullet point concept..."
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-default)",
                      borderRadius: 8,
                      padding: "10px 14px",
                      fontSize: 14,
                      color: "var(--text-primary)",
                      outline: "none",
                      fontFamily: "inherit",
                      resize: "vertical",
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
                    Key Cases (one per line)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Donoghue v Stevenson [1932] - neighbour principle..."
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-default)",
                      borderRadius: 8,
                      padding: "10px 14px",
                      fontSize: 14,
                      color: "var(--text-primary)",
                      outline: "none",
                      fontFamily: "inherit",
                      resize: "vertical",
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
                    Exam Tip
                  </label>
                  <textarea
                    rows={2}
                    placeholder="FE-1 exam strategy tip for this episode..."
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-default)",
                      borderRadius: 8,
                      padding: "10px 14px",
                      fontSize: 14,
                      color: "var(--text-primary)",
                      outline: "none",
                      fontFamily: "inherit",
                      resize: "vertical",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-default)",
                    borderRadius: 8,
                    padding: "12px 16px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: "var(--text-primary)",
                      }}
                    >
                      Save as Draft
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                      Publish later when ready
                    </div>
                  </div>
                  <button className={styles.toggle} />
                </div>
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
                <button
                  onClick={() => {
                    setShowAddPodcast(false);
                    showToast("✓ Podcast saved as draft", "info");
                  }}
                  style={{
                    flex: 1,
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-default)",
                    borderRadius: 8,
                    padding: "10px",
                    fontSize: 13,
                    color: "var(--text-secondary)",
                    cursor: "pointer",
                  }}
                >
                  Save Draft
                </button>
                <button
                  onClick={() => {
                    setShowAddPodcast(false);
                    showToast("✓ Podcast published successfully", "success");
                  }}
                  style={{
                    flex: 2,
                    background: "var(--blue-primary)",
                    border: "none",
                    borderRadius: 8,
                    padding: "10px",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "white",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                  }}
                >
                  <CheckCircle size={13} /> Publish Episode
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── BULK UPLOAD MODAL ── */}
      <AnimatePresence>
        {showBulkUpload && (
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
                setShowBulkUpload(false);
                setBulkStep("select");
                setBulkFiles([]);
              }}
            />
            <motion.div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                x: "-50%",
                y: "-50%",
                width: bulkStep === "fill" ? 720 : 480,
                maxWidth: "calc(100vw - 32px)",
                maxHeight: "calc(100vh - 48px)",
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-focus)",
                borderRadius: 16,
                zIndex: 501,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
                transition: "width 0.3s ease",
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
                  <h3
                    style={{
                      fontSize: 17,
                      fontWeight: 600,
                      color: "var(--text-primary)",
                    }}
                  >
                    Bulk Upload
                  </h3>
                  <div
                    style={{
                      fontSize: 13,
                      color: "var(--text-muted)",
                      marginTop: 2,
                    }}
                  >
                    {bulkStep === "select" &&
                      "Select multiple audio files to upload at once"}
                    {bulkStep === "fill" &&
                      `Fill in study notes for each of the ${bulkFiles.length} selected files`}
                    {bulkStep === "done" && "Upload complete"}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowBulkUpload(false);
                    setBulkStep("select");
                    setBulkFiles([]);
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

              <div style={{ overflowY: "auto", flex: 1, padding: 24 }}>
                {bulkStep === "select" && (
                  <div>
                    <label
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 12,
                        border: "2px dashed var(--border-focus)",
                        borderRadius: 12,
                        padding: "48px 24px",
                        cursor: "pointer",
                        transition: "background 0.2s",
                      }}
                    >
                      <Upload size={32} color="var(--text-muted)" />
                      <div
                        style={{
                          fontSize: 15,
                          fontWeight: 500,
                          color: "var(--text-primary)",
                        }}
                      >
                        Click to select audio files
                      </div>
                      <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
                        MP3, M4A files supported · Select multiple at once
                      </div>
                      <input
                        type="file"
                        multiple
                        accept=".mp3,.m4a"
                        style={{ display: "none" }}
                        onChange={handleBulkFileSelect}
                      />
                    </label>
                  </div>
                )}

                {bulkStep === "fill" && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 20,
                    }}
                  >
                    {bulkFiles.map((file, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: "var(--bg-card)",
                          border: "1px solid var(--border-default)",
                          borderRadius: 10,
                          padding: 16,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            marginBottom: 14,
                          }}
                        >
                          <div
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 8,
                              background: "var(--blue-muted)",
                              border: "1px solid var(--blue-primary)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <Mic size={14} color="var(--blue-bright)" />
                          </div>
                          <div
                            style={{
                              fontSize: 13,
                              fontWeight: 500,
                              color: "var(--text-primary)",
                              flex: 1,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {file.name}
                          </div>
                          <select
                            value={file.subject}
                            onChange={(e) =>
                              setBulkFiles((prev) =>
                                prev.map((f, i) =>
                                  i === idx
                                    ? { ...f, subject: e.target.value }
                                    : f,
                                ),
                              )
                            }
                            style={{
                              background: "var(--bg-elevated)",
                              border: "1px solid var(--border-default)",
                              borderRadius: 6,
                              padding: "4px 8px",
                              fontSize: 12,
                              color: "var(--text-primary)",
                              outline: "none",
                              fontFamily: "inherit",
                              cursor: "pointer",
                              colorScheme: "dark",
                            }}
                          >
                            {[
                              "Criminal Law",
                              "Contract Law",
                              "Tort Law",
                              "Equity",
                              "EU Law",
                              "Property Law",
                              "Constitutional Law",
                              "Company Law",
                              "Bonus",
                            ].map((s) => (
                              <option key={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 10,
                          }}
                        >
                          <textarea
                            rows={2}
                            placeholder="Key concepts (one per line)..."
                            value={file.concepts}
                            onChange={(e) =>
                              setBulkFiles((prev) =>
                                prev.map((f, i) =>
                                  i === idx
                                    ? { ...f, concepts: e.target.value }
                                    : f,
                                ),
                              )
                            }
                            style={{
                              background: "var(--bg-elevated)",
                              border: "1px solid var(--border-default)",
                              borderRadius: 6,
                              padding: "8px 12px",
                              fontSize: 13,
                              color: "var(--text-primary)",
                              outline: "none",
                              fontFamily: "inherit",
                              resize: "vertical",
                            }}
                          />
                          <textarea
                            rows={2}
                            placeholder="Key cases (one per line)..."
                            value={file.cases}
                            onChange={(e) =>
                              setBulkFiles((prev) =>
                                prev.map((f, i) =>
                                  i === idx
                                    ? { ...f, cases: e.target.value }
                                    : f,
                                ),
                              )
                            }
                            style={{
                              background: "var(--bg-elevated)",
                              border: "1px solid var(--border-default)",
                              borderRadius: 6,
                              padding: "8px 12px",
                              fontSize: 13,
                              color: "var(--text-primary)",
                              outline: "none",
                              fontFamily: "inherit",
                              resize: "vertical",
                            }}
                          />
                          <input
                            placeholder="Exam tip..."
                            value={file.examTip}
                            onChange={(e) =>
                              setBulkFiles((prev) =>
                                prev.map((f, i) =>
                                  i === idx
                                    ? { ...f, examTip: e.target.value }
                                    : f,
                                ),
                              )
                            }
                            style={{
                              background: "var(--bg-elevated)",
                              border: "1px solid var(--border-default)",
                              borderRadius: 6,
                              padding: "8px 12px",
                              fontSize: 13,
                              color: "var(--text-primary)",
                              outline: "none",
                              fontFamily: "inherit",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {bulkStep === "done" && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 12,
                      padding: "40px 24px",
                    }}
                  >
                    <CheckCircle size={48} color="var(--green)" />
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 600,
                        color: "var(--text-primary)",
                      }}
                    >
                      Upload Complete
                    </div>
                    <div
                      style={{ fontSize: 14, color: "var(--text-secondary)" }}
                    >
                      {bulkFiles.length} episodes uploaded successfully
                    </div>
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
                {bulkStep === "fill" && (
                  <>
                    <button
                      onClick={() => setBulkStep("select")}
                      style={{
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-default)",
                        borderRadius: 8,
                        padding: "10px 16px",
                        fontSize: 13,
                        color: "var(--text-secondary)",
                        cursor: "pointer",
                      }}
                    >
                      Back
                    </button>
                    <button
                      onClick={() => {
                        setBulkStep("done");
                        showToast(
                          `✓ ${bulkFiles.length} episodes uploaded`,
                          "success",
                        );
                      }}
                      style={{
                        flex: 1,
                        background: "var(--blue-primary)",
                        border: "none",
                        borderRadius: 8,
                        padding: "10px",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "white",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                      }}
                    >
                      <Upload size={13} /> Upload {bulkFiles.length} Episodes
                    </button>
                  </>
                )}
                {bulkStep === "done" && (
                  <button
                    onClick={() => {
                      setShowBulkUpload(false);
                      setBulkStep("select");
                      setBulkFiles([]);
                    }}
                    style={{
                      flex: 1,
                      background: "var(--blue-primary)",
                      border: "none",
                      borderRadius: 8,
                      padding: "10px",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    Done
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── NEW FOLDER MODAL ── */}
      <AnimatePresence>
        {showFolderModal && (
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
              onClick={() => setShowFolderModal(false)}
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
                borderRadius: 16,
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
                  New Folder
                </h3>
              </div>
              <div
                style={{
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
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
                    Folder Name
                  </label>
                  <input
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    placeholder="e.g. Criminal Law"
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
                    autoFocus
                  />
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, padding: "0 24px 24px" }}>
                <button
                  onClick={() => setShowFolderModal(false)}
                  style={{
                    flex: 1,
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-default)",
                    borderRadius: 8,
                    padding: "10px",
                    fontSize: 13,
                    color: "var(--text-secondary)",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (!newFolderName.trim()) return;
                    setFolders((prev) => [
                      ...prev,
                      {
                        id: `f${Date.now()}`,
                        name: newFolderName,
                        color: "#3B82F6",
                        podcastCount: 0,
                        createdAt: new Date().toISOString(),
                      },
                    ]);
                    setNewFolderName("");
                    setShowFolderModal(false);
                    showToast(`✓ Folder "${newFolderName}" created`, "success");
                  }}
                  style={{
                    flex: 2,
                    background: "var(--blue-primary)",
                    border: "none",
                    borderRadius: 8,
                    padding: "10px",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Create Folder
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

// ── PODCAST LIST COMPONENT ──────────────────────────────────────
function PodcastList({
  podcasts,
  displayMode,
  playingId,
  podcastMenu,
  onTogglePlay,
  onMenuToggle,
  onMenuAction,
  onSelect,
}: {
  podcasts: typeof adminPodcasts;
  displayMode: "grid" | "list";
  playingId: string | null;
  podcastMenu: string | null;
  onTogglePlay: (id: string) => void;
  onMenuToggle: (id: string) => void;
  onMenuAction: (action: string, podcast: (typeof adminPodcasts)[0]) => void;
  onSelect: (podcast: (typeof adminPodcasts)[0]) => void;
}) {
  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  if (displayMode === "list") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {podcasts.map((podcast) => (
          <div
            key={podcast.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 14px",
              background: "var(--bg-card)",
              border: "1px solid var(--border-default)",
              borderRadius: 8,
              cursor: "pointer",
              transition: "background 0.15s",
            }}
            onClick={() => onSelect(podcast)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTogglePlay(podcast.id);
              }}
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background:
                  playingId === podcast.id
                    ? "var(--blue-primary)"
                    : "var(--bg-elevated)",
                border: `1px solid ${playingId === podcast.id ? "var(--blue-primary)" : "var(--border-default)"}`,
                color:
                  playingId === podcast.id ? "white" : "var(--text-secondary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              {playingId === podcast.id ? (
                <Pause size={12} />
              ) : (
                <Play size={12} />
              )}
            </button>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: podcast.subjectColor,
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--text-primary)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {podcast.title}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--text-muted)",
                  marginTop: 1,
                }}
              >
                {podcast.subjectName} · {formatDuration(podcast.duration)}
              </div>
            </div>
            {!podcast.isPublished && (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "var(--amber)",
                  background: "var(--amber-bg)",
                  border: "1px solid var(--amber)",
                  borderRadius: 20,
                  padding: "2px 6px",
                  flexShrink: 0,
                }}
              >
                DRAFT
              </span>
            )}
            <span
              style={{
                fontSize: 12,
                color: "var(--text-muted)",
                flexShrink: 0,
              }}
            >
              {podcast.plays.toLocaleString()} plays
            </span>
            <div
              style={{ position: "relative", flexShrink: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => onMenuToggle(podcast.id)}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border-default)",
                  color: "var(--text-muted)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <MoreVertical size={13} />
              </button>
              <AnimatePresence>
                {podcastMenu === podcast.id && (
                  <motion.div
                    style={{
                      position: "absolute",
                      right: 0,
                      top: 32,
                      background: "var(--bg-elevated)",
                      border: "1px solid var(--border-default)",
                      borderRadius: 8,
                      zIndex: 100,
                      minWidth: 160,
                      boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                      overflow: "hidden",
                    }}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                  >
                    {[
                      {
                        label: podcast.isPublished ? "Unpublish" : "Publish",
                        icon: podcast.isPublished ? EyeOff : Eye,
                        action: "publish",
                      },
                      {
                        label: "Analytics",
                        icon: BarChart2,
                        action: "analytics",
                      },
                      { label: "Copy", icon: Copy, action: "copy" },
                      { label: "Move", icon: Move, action: "move" },
                      {
                        label: "Delete",
                        icon: Trash2,
                        action: "delete",
                        danger: true,
                      },
                    ].map((item) => (
                      <button
                        key={item.action}
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "9px 14px",
                          background: "none",
                          border: "none",
                          color: item.danger
                            ? "var(--red)"
                            : "var(--text-secondary)",
                          fontSize: 13,
                          cursor: "pointer",
                          textAlign: "left",
                          fontFamily: "inherit",
                        }}
                        onClick={() => onMenuAction(item.action, podcast)}
                      >
                        <item.icon size={13} /> {item.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: 12,
      }}
    >
      {podcasts.map((podcast) => (
        <div
          key={podcast.id}
          style={{
            background: "var(--bg-card)",
            border: `1px solid ${!podcast.isPublished ? "var(--amber)" : "var(--border-default)"}`,
            borderRadius: 10,
            overflow: "hidden",
            cursor: "pointer",
            transition: "border-color 0.15s",
          }}
          onClick={() => onSelect(podcast)}
        >
          <div style={{ position: "relative" }}>
            <img
              src={podcast.thumbnail || ""}
              alt=""
              style={{
                width: "100%",
                height: 100,
                objectFit: "cover",
                display: "block",
                background: "var(--bg-elevated)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)",
              }}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTogglePlay(podcast.id);
              }}
              style={{
                position: "absolute",
                bottom: 8,
                left: 8,
                width: 32,
                height: 32,
                borderRadius: "50%",
                background:
                  playingId === podcast.id
                    ? "var(--blue-primary)"
                    : "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              {playingId === podcast.id ? (
                <Pause size={12} />
              ) : (
                <Play size={12} />
              )}
            </button>
            <div
              style={{
                position: "absolute",
                bottom: 8,
                right: 8,
                fontSize: 11,
                color: "white",
                background: "rgba(0,0,0,0.5)",
                borderRadius: 4,
                padding: "2px 6px",
              }}
            >
              {formatDuration(podcast.duration)}
            </div>
            {!podcast.isPublished && (
              <div
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  fontSize: 10,
                  fontWeight: 700,
                  color: "var(--amber)",
                  background: "var(--amber-bg)",
                  border: "1px solid var(--amber)",
                  borderRadius: 20,
                  padding: "2px 8px",
                }}
              >
                DRAFT
              </div>
            )}
          </div>
          <div style={{ padding: 12 }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 8,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  lineHeight: 1.4,
                  flex: 1,
                }}
              >
                {podcast.title}
              </div>
              <div
                style={{ position: "relative", flexShrink: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => onMenuToggle(podcast.id)}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 6,
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border-default)",
                    color: "var(--text-muted)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <MoreVertical size={12} />
                </button>
                <AnimatePresence>
                  {podcastMenu === podcast.id && (
                    <motion.div
                      style={{
                        position: "absolute",
                        right: 0,
                        top: 28,
                        background: "var(--bg-elevated)",
                        border: "1px solid var(--border-default)",
                        borderRadius: 8,
                        zIndex: 100,
                        minWidth: 160,
                        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                        overflow: "hidden",
                      }}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                    >
                      {[
                        {
                          label: podcast.isPublished ? "Unpublish" : "Publish",
                          icon: podcast.isPublished ? EyeOff : Eye,
                          action: "publish",
                        },
                        {
                          label: "Analytics",
                          icon: BarChart2,
                          action: "analytics",
                        },
                        { label: "Copy", icon: Copy, action: "copy" },
                        { label: "Move", icon: Move, action: "move" },
                        {
                          label: "Delete",
                          icon: Trash2,
                          action: "delete",
                          danger: true,
                        },
                      ].map((item) => (
                        <button
                          key={item.action}
                          style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "9px 14px",
                            background: "none",
                            border: "none",
                            color: item.danger
                              ? "var(--red)"
                              : "var(--text-secondary)",
                            fontSize: 13,
                            cursor: "pointer",
                            textAlign: "left",
                            fontFamily: "inherit",
                          }}
                          onClick={() => onMenuAction(item.action, podcast)}
                        >
                          <item.icon size={13} /> {item.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginTop: 6,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: podcast.subjectColor,
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
                {podcast.subjectName}
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: "var(--text-muted)",
                  marginLeft: "auto",
                }}
              >
                {podcast.plays.toLocaleString()} plays
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
