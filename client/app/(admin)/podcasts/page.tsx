"use client";
import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
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
  SkipBack,
  SkipForward,
  List,
  Pencil,
  Check,
} from "lucide-react";
import { adminPodcasts, podcastFolders, podcastStats } from "@/lib/dummy-data";
import styles from "./podcasts.module.css";

type ToastType = {
  message: string;
  type: "success" | "danger" | "warning" | "info";
};
type ViewMode = "folders" | "folder-detail";
type AdminPodcast = {
  id: string;
  title: string;
  subjectName: string;
  subjectColor: string;
  duration: number;
  moduleNumber: number | null;
  lessonNumber: number | null;
  part: number | null;
  isBonus: boolean;
  isPublished: boolean;
  audioUrl: string;
  thumbnail: string;
  notes: { concepts: string[]; cases: string[] };
  examTip: string;
  plays: number;
  uniqueListeners: number;
  avgCompletion: number;
  folderId: string;
  order: number;
  createdAt: string;
};

const SUBJECTS = [
  "All Episodes",
  "Criminal Law",
  "Contract Law",
  "Tort Law",
  "Constitutional Law",
  "Equity",
  "EU Law",
  "Property Law",
  "Company Law",
  "Bonus",
];

const SUBJECT_COLORS: Record<string, string> = {
  "Criminal Law": "#E6027D",
  "Contract Law": "#FDC300",
  "Tort Law": "#B38513",
  "Constitutional Law": "#961C81",
  "EU Law": "#009DDD",
  Equity: "#63C0F2",
  "Property Law": "#5F3EB5",
  "Company Law": "#8659FB",
  Bonus: "#10B981",
};

const formatDuration = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const formatNumber = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n.toString();

export default function PodcastsPage() {
  const router = useRouter();
  const [toast, setToast] = useState<ToastType | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("folders");
  const [selectedFolder, setSelectedFolder] = useState<
    (typeof podcastFolders)[0] | null
  >(null);
  const [search, setSearch] = useState("");
  const [activeSubject, setActiveSubject] = useState("All Episodes");
  const [selectedPodcast, setSelectedPodcast] = useState<AdminPodcast | null>(
    null,
  );
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [folderMenu, setFolderMenu] = useState<string | null>(null);
  const [podcastMenu, setPodcastMenu] = useState<string | null>(null);
  const [showAddPodcast, setShowAddPodcast] = useState(false);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState<string | null>(null);
  const [folders, setFolders] = useState(podcastFolders);
  const [podcasts, setPodcasts] = useState<AdminPodcast[]>(
    adminPodcasts as unknown as AdminPodcast[],
  );
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
  const [isEditing, setIsEditing] = useState(false);
  const [homePage, setHomePage] = useState(1);
  const [editForm, setEditForm] = useState<{
    title: string;
    subjectName: string;
    concepts: string;
    cases: string;
    examTip: string;
  } | null>(null);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

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
    const matchSubject =
      activeSubject === "All Episodes" || p.subjectName === activeSubject;
    const matchFolder =
      viewMode === "folder-detail" ? p.folderId === selectedFolder?.id : true;
    return matchSearch && matchSubject && matchFolder;
  });

  const HOME_PER_PAGE = 20;
  const homeFilteredPodcasts = useMemo(
    () =>
      podcasts.filter((p) => {
        const matchSearch =
          !search || p.title.toLowerCase().includes(search.toLowerCase());
        const matchSubject =
          activeSubject === "All Episodes" || p.subjectName === activeSubject;
        return matchSearch && matchSubject;
      }),
    [podcasts, search, activeSubject],
  );
  const homeTotalPages = Math.max(
    1,
    Math.ceil(homeFilteredPodcasts.length / HOME_PER_PAGE),
  );
  const paginatedHomePodcasts = useMemo(() => {
    const start = (homePage - 1) * HOME_PER_PAGE;
    return homeFilteredPodcasts.slice(start, start + HOME_PER_PAGE);
  }, [homeFilteredPodcasts, homePage]);

  const handleSelectPodcast = (podcast: AdminPodcast) => {
    setSelectedPodcast(podcast);
    setIsEditing(false);
    setEditForm(null);
  };

  const handleStartEdit = () => {
    if (!selectedPodcast) return;
    setEditForm({
      title: selectedPodcast.title,
      subjectName: selectedPodcast.subjectName,
      concepts: selectedPodcast.notes?.concepts?.join("\n") ?? "",
      cases: selectedPodcast.notes?.cases?.join("\n") ?? "",
      examTip: selectedPodcast.examTip ?? "",
    });
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (!selectedPodcast || !editForm) return;
    const parsedConcepts = editForm.concepts
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const parsedCases = editForm.cases
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const updated = {
      ...selectedPodcast,
      title: editForm.title,
      subjectName: editForm.subjectName,
      subjectColor:
        SUBJECT_COLORS[editForm.subjectName] ?? selectedPodcast.subjectColor,
      notes: {
        concepts: parsedConcepts as typeof selectedPodcast.notes.concepts,
        cases: parsedCases as typeof selectedPodcast.notes.cases,
      },
      examTip: editForm.examTip,
    } as AdminPodcast;
    setPodcasts((prev) =>
      prev.map((p) => (p.id === selectedPodcast.id ? updated : p)),
    );
    setSelectedPodcast(updated);
    setIsEditing(false);
    setEditForm(null);
    showToast("✓ Episode updated successfully", "success");
  };

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

  const handlePodcastAction = (action: string, podcast: AdminPodcast) => {
    setPodcastMenu(null);
    if (action === "delete") {
      setPodcasts((prev) => prev.filter((p) => p.id !== podcast.id));
      if (selectedPodcast?.id === podcast.id) setSelectedPodcast(null);
      showToast(`✓ "${podcast.title}" deleted`, "warning");
    }
    if (action === "publish") {
      const updated = { ...podcast, isPublished: !podcast.isPublished };
      setPodcasts((prev) =>
        prev.map((p) => (p.id === podcast.id ? updated : p)),
      );
      if (selectedPodcast?.id === podcast.id) setSelectedPodcast(updated);
      showToast(
        `✓ "${podcast.title}" ${podcast.isPublished ? "unpublished" : "published"}`,
        "success",
      );
    }
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

  const togglePlay = (podcastId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setPlayingId((prev) => (prev === podcastId ? null : podcastId));
  };

  const analyticsTarget = podcasts.find((p) => p.id === showAnalytics);

  // --- RENDER ----------------------------------------------------
  return (
    <div className={styles.page}>
      {/* PAGE HEADER */}
      <div className={styles.pageHeader}>
        <div className={styles.headerLeft}>
          {viewMode === "folder-detail" && (
            <button
              className={styles.backBtn}
              onClick={() => {
                setViewMode("folders");
                setSelectedFolder(null);
                setSelectedPodcast(null);
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
            onClick={() => router.push("/podcasts/all")}
          >
            <List size={14} />
            All Episodes
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

      {/* STATS STRIP */}
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

      {/* FOLDERS VIEW */}
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

            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Recent Episodes</h3>
              <button
                className={styles.viewAllBtn}
                onClick={() => router.push("/podcasts/all")}
              >
                View all <ChevronRight size={13} />
              </button>
            </div>

            <div
              className={`${styles.listLayout} ${selectedPodcast ? styles.listLayoutWithPanel : ""}`}
            >
              <div className={styles.listAndPanel}>
                <div className={styles.episodeListWrap}>
                  <SpotifyEpisodeList
                    podcasts={paginatedHomePodcasts}
                    playingId={playingId}
                    selectedId={selectedPodcast?.id ?? null}
                    podcastMenu={podcastMenu}
                    hoveredRow={hoveredRow}
                    onTogglePlay={togglePlay}
                    onMenuToggle={(id) =>
                      setPodcastMenu(podcastMenu === id ? null : id)
                    }
                    onMenuAction={handlePodcastAction}
                    onSelect={handleSelectPodcast}
                    onHover={setHoveredRow}
                  />
                  <HomePagination
                    page={homePage}
                    totalPages={homeTotalPages}
                    onPageChange={setHomePage}
                  />
                </div>

                <AnimatePresence>
                  {selectedPodcast && (
                    <StudyNotesPanel
                      selectedPodcast={selectedPodcast}
                      isEditing={isEditing}
                      editForm={editForm}
                      playingId={playingId}
                      onStartEdit={handleStartEdit}
                      onClose={() => {
                        setSelectedPodcast(null);
                        setIsEditing(false);
                      }}
                      onTogglePlay={togglePlay}
                      onSetEditForm={setEditForm}
                      onCancelEdit={() => {
                        setIsEditing(false);
                        setEditForm(null);
                      }}
                      onSaveEdit={handleSaveEdit}
                      onShowAnalytics={setShowAnalytics}
                      onPodcastAction={handlePodcastAction}
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}

        {viewMode === "folder-detail" && (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`${styles.listLayout} ${selectedPodcast ? styles.listLayoutWithPanel : ""}`}
          >
            {/* Subject filter pills */}
            <div className={styles.filterRow}>
              <div className={styles.subjectPills}>
                {SUBJECTS.map((s) => (
                  <button
                    key={s}
                    className={`${styles.subjectPill} ${activeSubject === s ? styles.subjectPillActive : ""}`}
                    style={
                      activeSubject === s && s !== "All Episodes"
                        ? {
                            background: SUBJECT_COLORS[s] + "20",
                            borderColor: SUBJECT_COLORS[s] + "60",
                            color: SUBJECT_COLORS[s],
                          }
                        : {}
                    }
                    onClick={() => setActiveSubject(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className={styles.searchWrap}>
                <Search size={14} className={styles.searchIcon} />
                <input
                  className={styles.searchInput}
                  placeholder="Search episodes..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Spotify list */}
            <div className={styles.listAndPanel}>
              <div className={styles.episodeListWrap}>
                <SpotifyEpisodeList
                  podcasts={filteredPodcasts}
                  playingId={playingId}
                  selectedId={selectedPodcast?.id ?? null}
                  podcastMenu={podcastMenu}
                  hoveredRow={hoveredRow}
                  onTogglePlay={togglePlay}
                  onMenuToggle={(id) =>
                    setPodcastMenu(podcastMenu === id ? null : id)
                  }
                  onMenuAction={handlePodcastAction}
                  onSelect={handleSelectPodcast}
                  onHover={setHoveredRow}
                />
              </div>
              <AnimatePresence>
                {selectedPodcast && (
                  <StudyNotesPanel
                    selectedPodcast={selectedPodcast}
                    isEditing={isEditing}
                    editForm={editForm}
                    playingId={playingId}
                    onStartEdit={handleStartEdit}
                    onClose={() => {
                      setSelectedPodcast(null);
                      setIsEditing(false);
                    }}
                    onTogglePlay={togglePlay}
                    onSetEditForm={setEditForm}
                    onCancelEdit={() => {
                      setIsEditing(false);
                      setEditForm(null);
                    }}
                    onSaveEdit={handleSaveEdit}
                    onShowAnalytics={setShowAnalytics}
                    onPodcastAction={handlePodcastAction}
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE BOTTOM SHEET */}
      <AnimatePresence>
        {selectedPodcast &&
          (viewMode === "folders" || viewMode === "folder-detail") && (
            <motion.div
              className={styles.mobileSheet}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.mobileSheetHandle} />
              <div className={styles.mobileSheetHeader}>
                <div className={styles.mobileSheetTitle}>
                  {selectedPodcast.title}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {!isEditing && (
                    <button
                      className={styles.editIconBtn}
                      onClick={handleStartEdit}
                    >
                      <Pencil size={13} />
                    </button>
                  )}
                  <button
                    className={styles.panelCloseBtn}
                    onClick={() => {
                      setSelectedPodcast(null);
                      setIsEditing(false);
                    }}
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
              <div className={styles.mobileSheetScroll}>
                {/* Same content as desktop panel — reuse panelScroll content */}
                <div
                  className={styles.nowPlayingMeta}
                  style={{ marginBottom: 12 }}
                >
                  {formatDuration(selectedPodcast.duration)} •{" "}
                  {selectedPodcast.subjectName}
                </div>
                <div className={styles.playerBar}>
                  <button className={styles.playerSkip}>
                    <SkipBack size={14} />
                  </button>
                  <button
                    className={styles.playerPlay}
                    onClick={() => togglePlay(selectedPodcast.id)}
                  >
                    {playingId === selectedPodcast.id ? (
                      <Pause size={16} />
                    ) : (
                      <Play size={16} />
                    )}
                  </button>
                  <button className={styles.playerSkip}>
                    <SkipForward size={14} />
                  </button>
                  <div className={styles.playerTrack}>
                    <div
                      className={styles.playerProgress}
                      style={{
                        width: playingId === selectedPodcast.id ? "35%" : "0%",
                      }}
                    />
                  </div>
                </div>
                <div className={styles.notesSection} style={{ marginTop: 16 }}>
                  <div className={styles.notesSectionTitle}>Episode Notes</div>
                  <div className={styles.notesBlock}>
                    <div
                      className={styles.notesBlockTitle}
                      style={{ color: "#E6027D" }}
                    >
                      📌 Key Concepts
                    </div>
                    {isEditing ? (
                      <textarea
                        className={styles.editTextarea}
                        rows={3}
                        value={editForm?.concepts ?? ""}
                        onChange={(e) =>
                          setEditForm((f) =>
                            f ? { ...f, concepts: e.target.value } : f,
                          )
                        }
                        placeholder="One concept per line..."
                      />
                    ) : (
                      selectedPodcast.notes?.concepts?.map((c, i) => (
                        <div key={i} className={styles.noteItem}>
                          <div
                            className={styles.noteDot}
                            style={{ background: "var(--blue-bright)" }}
                          />
                          <span>{c}</span>
                        </div>
                      ))
                    )}
                  </div>
                  <div className={styles.notesBlock}>
                    <div
                      className={styles.notesBlockTitle}
                      style={{ color: "#FDC300" }}
                    >
                      ⚖️ Key Cases
                    </div>
                    {isEditing ? (
                      <textarea
                        className={styles.editTextarea}
                        rows={3}
                        value={editForm?.cases ?? ""}
                        onChange={(e) =>
                          setEditForm((f) =>
                            f ? { ...f, cases: e.target.value } : f,
                          )
                        }
                        placeholder="One case per line..."
                      />
                    ) : (
                      selectedPodcast.notes?.cases?.map((c, i) => (
                        <div key={i} className={styles.noteItem}>
                          <div
                            className={styles.noteDot}
                            style={{ background: "var(--amber)" }}
                          />
                          <span>{c}</span>
                        </div>
                      ))
                    )}
                  </div>
                  <div className={styles.examTipBlock}>
                    <div className={styles.examTipTitle}>💡 Exam Tip</div>
                    {isEditing ? (
                      <textarea
                        className={styles.editTextarea}
                        rows={3}
                        value={editForm?.examTip ?? ""}
                        onChange={(e) =>
                          setEditForm((f) =>
                            f ? { ...f, examTip: e.target.value } : f,
                          )
                        }
                      />
                    ) : (
                      <div className={styles.examTipText}>
                        {selectedPodcast.examTip}
                      </div>
                    )}
                  </div>
                </div>
                {isEditing && (
                  <div className={styles.editActions}>
                    <button
                      className={styles.cancelBtn}
                      onClick={() => {
                        setIsEditing(false);
                        setEditForm(null);
                      }}
                    >
                      Cancel
                    </button>
                    <button className={styles.saveBtn} onClick={handleSaveEdit}>
                      <Check size={13} /> Save
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
      </AnimatePresence>

      {/* ── ALL EXISTING MODALS UNCHANGED ── */}
      {/* ADD PODCAST MODAL */}
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
                    { label: "Subject", options: Object.keys(SUBJECT_COLORS) },
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
                {[
                  {
                    label: "Key Concepts (one per line)",
                    rows: 3,
                    placeholder: "Each line becomes a bullet point concept...",
                  },
                  {
                    label: "Key Cases (one per line)",
                    rows: 3,
                    placeholder:
                      "e.g. Donoghue v Stevenson [1932] — neighbour principle...",
                  },
                  {
                    label: "Exam Tip",
                    rows: 2,
                    placeholder: "FE-1 exam strategy tip...",
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
                    <textarea
                      rows={f.rows}
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
                        resize: "vertical",
                      }}
                    />
                  </div>
                ))}
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

      {/* BULK UPLOAD MODAL */}
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
                            {Object.keys(SUBJECT_COLORS).map((s) => (
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

      {/* NEW FOLDER MODAL */}
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

      {/* ANALYTICS OVERLAY */}
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

// -- SPOTIFY EPISODE LIST COMPONENT ------------------------------
function SpotifyEpisodeList({
  podcasts,
  playingId,
  selectedId,
  podcastMenu,
  hoveredRow,
  onTogglePlay,
  onMenuToggle,
  onMenuAction,
  onSelect,
  onHover,
}: {
  podcasts: AdminPodcast[];
  playingId: string | null;
  selectedId: string | null;
  podcastMenu: string | null;
  hoveredRow: string | null;
  onTogglePlay: (id: string, e?: React.MouseEvent) => void;
  onMenuToggle: (id: string) => void;
  onMenuAction: (action: string, podcast: AdminPodcast) => void;
  onSelect: (podcast: AdminPodcast) => void;
  onHover: (id: string | null) => void;
}) {
  return (
    <div className={styles.spotifyTable}>
      {/* Table header */}
      <div className={styles.spotifyHeader}>
        <div className={styles.colHash}>#</div>
        <div className={styles.colEpisode}>EPISODE</div>
        <div className={styles.colSubject}>SUBJECT</div>
        <div className={styles.colDuration}>DURATION</div>
        <div className={styles.colListen}>LISTEN</div>
        <div className={styles.colMore} />
      </div>

      {/* Rows */}
      {podcasts.map((podcast, idx) => {
        const isSelected = selectedId === podcast.id;
        const isPlaying = playingId === podcast.id;
        const isHovered = hoveredRow === podcast.id;

        return (
          <div
            key={podcast.id}
            className={`${styles.spotifyRow} ${isSelected ? styles.spotifyRowSelected : ""}`}
            onClick={() => onSelect(podcast)}
            onMouseEnter={() => onHover(podcast.id)}
            onMouseLeave={() => onHover(null)}
          >
            {/* # column — shows index or play icon on hover/playing */}
            <div className={styles.colHash}>
              {isPlaying ? (
                <button
                  className={styles.rowPlayBtn}
                  onClick={(e) => onTogglePlay(podcast.id, e)}
                >
                  <Pause size={13} />
                </button>
              ) : isHovered ? (
                <button
                  className={styles.rowPlayBtn}
                  onClick={(e) => onTogglePlay(podcast.id, e)}
                >
                  <Play size={13} />
                </button>
              ) : (
                <span
                  className={`${styles.rowNumber} ${isPlaying ? styles.rowNumberPlaying : ""}`}
                >
                  {isPlaying ? "▶" : idx + 1}
                </span>
              )}
            </div>

            {/* Episode column */}
            <div className={styles.colEpisode}>
              <div
                className={styles.episodeThumb}
                style={{
                  background: podcast.subjectColor + "20",
                  border: `1px solid ${podcast.subjectColor}40`,
                }}
              >
                <Mic size={14} color={podcast.subjectColor} />
              </div>
              <div className={styles.episodeInfo}>
                <div
                  className={`${styles.episodeTitle} ${isPlaying ? styles.episodeTitlePlaying : ""}`}
                  style={isPlaying ? { color: podcast.subjectColor } : {}}
                >
                  {podcast.title}
                </div>
                <div className={styles.episodeSub}>
                  FE-1 Made Simple Podcast • Akintunde Idowu
                </div>
              </div>
              {!podcast.isPublished && (
                <span className={styles.draftBadge}>DRAFT</span>
              )}
            </div>

            {/* Subject column — colored pill / bar */}
            <div className={styles.colSubject}>
              <div
                className={styles.subjectBar}
                style={{ background: podcast.subjectColor }}
              />
            </div>

            {/* Duration column */}
            <div className={styles.colDuration}>
              {Math.floor(podcast.duration / 60)} min
            </div>

            {/* Listen / play button column */}
            <div className={styles.colListen}>
              <button
                className={`${styles.playBtn} ${isPlaying ? styles.playBtnActive : ""}`}
                onClick={(e) => onTogglePlay(podcast.id, e)}
              >
                {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                {isPlaying ? "Pause" : "Play"}
              </button>
            </div>

            {/* More menu column */}
            <div
              className={styles.colMore}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.moreBtn}
                onClick={() => onMenuToggle(podcast.id)}
              >
                <MoreVertical size={14} />
              </button>
              <AnimatePresence>
                {podcastMenu === podcast.id && (
                  <motion.div
                    className={styles.rowMenu}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
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
                        className={`${styles.rowMenuItem} ${item.danger ? styles.rowMenuItemDanger : ""}`}
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
        );
      })}
    </div>
  );
}

function HomePagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (next: number) => void;
}) {
  if (totalPages <= 1) return null;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 8,
        paddingTop: 12,
      }}
    >
      <button
        className={styles.secondaryBtn}
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page <= 1}
        style={{ opacity: page <= 1 ? 0.55 : 1 }}
      >
        Prev
      </button>
      <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
        Page {page} of {totalPages}
      </span>
      <button
        className={styles.secondaryBtn}
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
        style={{ opacity: page >= totalPages ? 0.55 : 1 }}
      >
        Next
      </button>
    </div>
  );
}

function StudyNotesPanel({
  selectedPodcast,
  isEditing,
  editForm,
  playingId,
  onStartEdit,
  onClose,
  onTogglePlay,
  onSetEditForm,
  onCancelEdit,
  onSaveEdit,
  onShowAnalytics,
  onPodcastAction,
}: {
  selectedPodcast: AdminPodcast;
  isEditing: boolean;
  editForm: {
    title: string;
    subjectName: string;
    concepts: string;
    cases: string;
    examTip: string;
  } | null;
  playingId: string | null;
  onStartEdit: () => void;
  onClose: () => void;
  onTogglePlay: (id: string, e?: React.MouseEvent) => void;
  onSetEditForm: React.Dispatch<
    React.SetStateAction<{
      title: string;
      subjectName: string;
      concepts: string;
      cases: string;
      examTip: string;
    } | null>
  >;
  onCancelEdit: () => void;
  onSaveEdit: () => void;
  onShowAnalytics: (id: string | null) => void;
  onPodcastAction: (action: string, podcast: AdminPodcast) => void;
}) {
  return (
    <motion.div
      className={styles.studyPanel}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.panelHeader}>
        <div className={styles.panelHeaderLeft}>
          <span className={styles.panelHeaderLabel}>📝 Study Notes</span>
          {!isEditing && (
            <button
              className={styles.editIconBtn}
              onClick={onStartEdit}
              title="Edit episode"
            >
              <Pencil size={13} />
            </button>
          )}
        </div>
        <button className={styles.panelCloseBtn} onClick={onClose}>
          <X size={14} />
        </button>
      </div>

      <div className={styles.panelScroll}>
        <div className={styles.nowPlaying}>
          <div className={styles.nowPlayingLabel}>NOW PLAYING</div>
          <div className={styles.nowPlayingTitle}>
            {isEditing ? (
              <input
                className={styles.editInput}
                value={editForm?.title ?? ""}
                onChange={(e) =>
                  onSetEditForm((f) =>
                    f ? { ...f, title: e.target.value } : f,
                  )
                }
                placeholder="Episode title"
              />
            ) : (
              selectedPodcast.title
            )}
          </div>
          <div className={styles.nowPlayingMeta}>
            {formatDuration(selectedPodcast.duration)} • Episode {selectedPodcast.order}
          </div>
        </div>

        {isEditing && (
          <div className={styles.editField}>
            <label className={styles.editLabel}>Subject</label>
            <select
              className={styles.editSelect}
              value={editForm?.subjectName ?? ""}
              onChange={(e) =>
                onSetEditForm((f) =>
                  f ? { ...f, subjectName: e.target.value } : f,
                )
              }
            >
              {Object.keys(SUBJECT_COLORS).map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        )}

        <div className={styles.playerBar}>
          <button className={styles.playerSkip}>
            <SkipBack size={14} />
          </button>
          <button
            className={styles.playerPlay}
            onClick={() => onTogglePlay(selectedPodcast.id)}
          >
            {playingId === selectedPodcast.id ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button className={styles.playerSkip}>
            <SkipForward size={14} />
          </button>
          <div className={styles.playerTrack}>
            <div
              className={styles.playerProgress}
              style={{ width: playingId === selectedPodcast.id ? "35%" : "0%" }}
            />
          </div>
          <span className={styles.playerTime}>{formatDuration(selectedPodcast.duration)}</span>
        </div>

        <div className={styles.panelStats}>
          {[
            {
              label: "Plays",
              value: formatNumber(selectedPodcast.plays),
              color: "var(--blue-bright)",
            },
            {
              label: "Listeners",
              value: formatNumber(selectedPodcast.uniqueListeners),
              color: "var(--green)",
            },
            {
              label: "Completion",
              value: `${selectedPodcast.avgCompletion}%`,
              color: "var(--amber)",
            },
          ].map((s, i) => (
            <div key={i} className={styles.panelStat}>
              <div className={styles.panelStatValue} style={{ color: s.color }}>
                {s.value}
              </div>
              <div className={styles.panelStatLabel}>{s.label}</div>
            </div>
          ))}
        </div>

        <div className={styles.notesSection}>
          <div className={styles.notesSectionTitle}>Episode Notes</div>

          <div className={styles.notesBlock}>
            <div className={styles.notesBlockTitle} style={{ color: "#E6027D" }}>
              📌 Key Concepts
            </div>
            {isEditing ? (
              <textarea
                className={styles.editTextarea}
                rows={4}
                value={editForm?.concepts ?? ""}
                onChange={(e) =>
                  onSetEditForm((f) =>
                    f ? { ...f, concepts: e.target.value } : f,
                  )
                }
                placeholder="One concept per line..."
              />
            ) : selectedPodcast.notes?.concepts?.length > 0 ? (
              selectedPodcast.notes.concepts.map((c, i) => (
                <div key={i} className={styles.noteItem}>
                  <div className={styles.noteDot} style={{ background: "var(--blue-bright)" }} />
                  <span>{c}</span>
                </div>
              ))
            ) : (
              <div className={styles.notesEmpty}>No concepts added</div>
            )}
          </div>

          <div className={styles.notesBlock}>
            <div className={styles.notesBlockTitle} style={{ color: "#FDC300" }}>
              ⚖️ Key Cases
            </div>
            {isEditing ? (
              <textarea
                className={styles.editTextarea}
                rows={4}
                value={editForm?.cases ?? ""}
                onChange={(e) =>
                  onSetEditForm((f) =>
                    f ? { ...f, cases: e.target.value } : f,
                  )
                }
                placeholder="One case per line..."
              />
            ) : selectedPodcast.notes?.cases?.length > 0 ? (
              selectedPodcast.notes.cases.map((c, i) => (
                <div key={i} className={styles.noteItem}>
                  <div className={styles.noteDot} style={{ background: "var(--amber)" }} />
                  <span>{c}</span>
                </div>
              ))
            ) : (
              <div className={styles.notesEmpty}>No cases added</div>
            )}
          </div>

          <div className={styles.examTipBlock}>
            <div className={styles.examTipTitle}>💡 Exam Tip</div>
            {isEditing ? (
              <textarea
                className={styles.editTextarea}
                rows={3}
                value={editForm?.examTip ?? ""}
                onChange={(e) =>
                  onSetEditForm((f) =>
                    f ? { ...f, examTip: e.target.value } : f,
                  )
                }
                placeholder="FE-1 exam strategy tip..."
              />
            ) : (
              <div className={styles.examTipText}>
                {selectedPodcast.examTip || "No exam tip added"}
              </div>
            )}
          </div>
        </div>

        {isEditing && (
          <div className={styles.editActions}>
            <button className={styles.cancelBtn} onClick={onCancelEdit}>
              Cancel
            </button>
            <button className={styles.saveBtn} onClick={onSaveEdit}>
              <Check size={13} /> Save Changes
            </button>
          </div>
        )}

        {!isEditing && (
          <div className={styles.panelFooter}>
            <button
              className={styles.publishBtn}
              style={
                selectedPodcast.isPublished
                  ? {
                      background: "var(--amber-bg)",
                      border: "1px solid var(--amber)",
                      color: "var(--amber)",
                    }
                  : {
                      background: "var(--green-bg)",
                      border: "1px solid var(--green)",
                      color: "var(--green)",
                    }
              }
              onClick={() => onPodcastAction("publish", selectedPodcast)}
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
              className={styles.analyticsBtn}
              onClick={() => onShowAnalytics(selectedPodcast.id)}
            >
              <BarChart2 size={13} /> Analytics
            </button>
            <button
              className={styles.deleteBtn}
              onClick={() => onPodcastAction("delete", selectedPodcast)}
            >
              <Trash2 size={13} />
            </button>
          </div>
        )}

        {!isEditing && (
          <button className={styles.downloadBtn}>📄 Download Full Notes (PDF)</button>
        )}
      </div>
    </motion.div>
  );
}
