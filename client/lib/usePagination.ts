import { useState, useMemo, useCallback } from "react";

export function usePagination<T>(items: T[], perPage: number) {
  const [page, setPageRaw] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / perPage));

  const safePage = Math.min(page, totalPages);

  const paginated = useMemo(
    () => items.slice((safePage - 1) * perPage, safePage * perPage),
    [items, safePage, perPage],
  );

  const setPage = useCallback(
    (p: number) => {
      setPageRaw(
        Math.max(
          1,
          Math.min(p, Math.max(1, Math.ceil(items.length / perPage))),
        ),
      );
    },
    [items.length, perPage],
  );

  const reset = useCallback(() => setPageRaw(1), []);

  return {
    page: safePage,
    setPage,
    paginated,
    total: items.length,
    totalPages,
    reset,
  };
}
