"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Pagination.module.css";

interface Props {
  page: number;
  total: number;
  perPage: number;
  onChange: (page: number) => void;
}

export default function Pagination({ page, total, perPage, onChange }: Props) {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return null;

  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, total);

  const getPages = () => {
    if (totalPages <= 7)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (page <= 4) return [1, 2, 3, 4, 5, "…", totalPages];
    if (page >= totalPages - 3)
      return [
        1,
        "…",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    return [1, "…", page - 1, page, page + 1, "…", totalPages];
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.pageBtn}
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      >
        <ChevronLeft size={14} />
      </button>
      <div className={styles.pageNumbers}>
        {getPages().map((n, i) =>
          n === "…" ? (
            <span key={`e${i}`} className={styles.ellipsis}>
              …
            </span>
          ) : (
            <button
              key={n}
              className={`${styles.pageNumber} ${n === page ? styles.pageNumberActive : ""}`}
              onClick={() => onChange(Number(n))}
            >
              {n}
            </button>
          ),
        )}
      </div>
      <button
        className={styles.pageBtn}
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
      >
        <ChevronRight size={14} />
      </button>
      <span className={styles.pageInfo}>
        {start}–{end} of {total}
      </span>
    </div>
  );
}
