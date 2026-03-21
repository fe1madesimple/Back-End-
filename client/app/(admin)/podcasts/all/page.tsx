"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mic, Pause, Play, Search } from "lucide-react";
import { adminPodcasts } from "@/lib/dummy-data";
import listStyles from "../podcasts.module.css";
import styles from "./all.module.css";

type AdminPodcast = {
  id: string;
  title: string;
  subjectName: string;
  subjectColor: string;
  duration: number;
  isPublished: boolean;
  plays: number;
  uniqueListeners: number;
  avgCompletion: number;
  notes: { concepts: string[]; cases: string[] };
  examTip: string;
  order: number;
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

function formatNumber(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n.toString();
}

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function PodcastsAllPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [activeSubject, setActiveSubject] = useState("All Episodes");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const podcasts = adminPodcasts as unknown as AdminPodcast[];
  const filtered = useMemo(
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

  const PER_PAGE = 20;
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return filtered.slice(start, start + PER_PAGE);
  }, [filtered, page]);

  const selected = podcasts.find((p) => p.id === selectedId) ?? null;

  return (
    <div className={styles.page}>
      <div className={styles.topRow}>
        <div className={styles.left}>
          <button className={styles.backBtn} onClick={() => router.push("/podcasts")}>
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className={styles.title}>All Episodes</h1>
            <p className={styles.subtitle}>{filtered.length} episodes</p>
          </div>
        </div>

        <div className={styles.filters}>
          <div className={styles.subjectPills}>
            {SUBJECTS.map((s) => (
              <button
                key={s}
                className={`${styles.subjectPill} ${activeSubject === s ? styles.subjectPillActive : ""}`}
                onClick={() => {
                  setActiveSubject(s);
                  setPage(1);
                }}
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
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>
      </div>

      <div className={`${styles.listLayout} ${selected ? styles.listLayoutWithPanel : ""}`}>
        <div className={styles.episodeListWrap}>
          <div className={listStyles.spotifyTable}>
            <div className={listStyles.spotifyHeader}>
              <div className={listStyles.colHash}>#</div>
              <div className={listStyles.colEpisode}>EPISODE</div>
              <div className={listStyles.colSubject}>SUBJECT</div>
              <div className={listStyles.colDuration}>DURATION</div>
              <div className={listStyles.colListen}>LISTEN</div>
              <div className={listStyles.colMore} />
            </div>
            {paginated.map((podcast, idx) => {
              const isPlaying = playingId === podcast.id;
              return (
                <div
                  key={podcast.id}
                  className={`${listStyles.spotifyRow} ${selectedId === podcast.id ? listStyles.spotifyRowSelected : ""}`}
                  onClick={() => setSelectedId(podcast.id)}
                >
                  <div className={listStyles.colHash}>
                    <span className={listStyles.rowNumber}>{(page - 1) * PER_PAGE + idx + 1}</span>
                  </div>
                  <div className={listStyles.colEpisode}>
                    <div
                      className={listStyles.episodeThumb}
                      style={{
                        background: podcast.subjectColor + "20",
                        border: `1px solid ${podcast.subjectColor}40`,
                      }}
                    >
                      <Mic size={14} color={podcast.subjectColor} />
                    </div>
                    <div className={listStyles.episodeInfo}>
                      <div className={listStyles.episodeTitle}>{podcast.title}</div>
                      <div className={listStyles.episodeSub}>FE-1 Made Simple Podcast</div>
                    </div>
                  </div>
                  <div className={listStyles.colSubject}>
                    <div className={listStyles.subjectBar} style={{ background: podcast.subjectColor }} />
                  </div>
                  <div className={listStyles.colDuration}>{Math.floor(podcast.duration / 60)} min</div>
                  <div className={listStyles.colListen}>
                    <button
                      className={`${listStyles.playBtn} ${isPlaying ? listStyles.playBtnActive : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setPlayingId((prev) => (prev === podcast.id ? null : podcast.id));
                      }}
                    >
                      {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                      {isPlaying ? "Pause" : "Play"}
                    </button>
                  </div>
                  <div className={listStyles.colMore} />
                </div>
              );
            })}
          </div>

          <div className={styles.pagination}>
            <button
              className={styles.secondaryBtn}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              style={{ opacity: page <= 1 ? 0.55 : 1 }}
            >
              Prev
            </button>
            <span className={styles.pageLabel}>Page {page} of {totalPages}</span>
            <button
              className={styles.secondaryBtn}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              style={{ opacity: page >= totalPages ? 0.55 : 1 }}
            >
              Next
            </button>
          </div>
        </div>

        {selected && (
          <div className={styles.studyPanel}>
            <div className={styles.studyTitle}>Study Notes</div>
            <div className={styles.studyText}>
              <strong>{selected.title}</strong>
              <br />
              {formatDuration(selected.duration)} • Plays: {formatNumber(selected.plays)} • Listeners: {formatNumber(selected.uniqueListeners)}
            </div>
            <div className={styles.studyText} style={{ marginTop: 12 }}>
              <strong>Exam Tip:</strong> {selected.examTip || "No exam tip added"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
