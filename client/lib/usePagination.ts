import { useState, useMemo } from "react";

export function usePagination<T>(items: T[], perPage: number) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(items.length / perPage);

  const paginated = useMemo(
    () => items.slice((page - 1) * perPage, page * perPage),
    [items, page, perPage],
  );

  const reset = () => setPage(1);

  return { page, setPage, paginated, total: items.length, totalPages, reset };
}
