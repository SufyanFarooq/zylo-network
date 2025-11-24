"use client";

import React, { useMemo, useState } from "react";
import './StakingLevelsTable.css';

export type Column<T> = {
  key: keyof T | string;
  header: string;
  width?: string | number;
  align?: "left" | "center" | "right";
  render?: (_row: T) => React.ReactNode;
};

export type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  pageSize?: number;
  initialPage?: number;
  pageSizeOptions?: number[];
  emptyMessage?: string;
  onRowClick?: (_row: T) => void;
  className?: string;
  accent?: 'yellow' | 'green';
};

// type CSSPropertiesWithVars = React.CSSProperties & { "--accent"?: string };

export default function Table<T extends Record<string, unknown>>({
  columns,
  data,
  pageSize = 10,
  initialPage = 1,
  pageSizeOptions: _pageSizeOptions = [10, 25, 50],
  emptyMessage = "No data found",
  onRowClick,
  className,
  accent = 'yellow',
}: TableProps<T>) {
  const [page, setPage] = useState<number>(initialPage);
  const [limit] = useState<number>(pageSize);
  const [hover, setHover] = useState<number | null>(null);

  const total = data.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const clampedPage = Math.min(page, totalPages);

  const paged = useMemo(() => {
    const start = (clampedPage - 1) * limit;
    return data.slice(start, start + limit);
  }, [data, clampedPage, limit]);

  const from = total === 0 ? 0 : (clampedPage - 1) * limit + 1;
  const to = Math.min(clampedPage * limit, total);

  // Build compact page items like: 1 … 4 5 6 … 12
  const pageItems = useMemo(() => {
    const maxButtons = 5; // middle window
    const items: (number | string)[] = [];
    if (totalPages <= maxButtons + 2) {
      for (let i = 1; i <= totalPages; i++) items.push(i);
      return items;
    }
    const window = 2;
    const start = Math.max(2, clampedPage - window);
    const end = Math.min(totalPages - 1, clampedPage + window);
    items.push(1);
    if (start > 2) items.push('…');
    for (let i = start; i <= end; i++) items.push(i);
    if (end < totalPages - 1) items.push('…');
    items.push(totalPages);
    return items;
  }, [clampedPage, totalPages]);

  const accentColor = accent === 'green' ? 'var(--primary-green)' : 'var(--primary-yellow)';

  return (
    <div className={["w-100", className].filter(Boolean).join(' ')}>
      <div
        style={{
          border: `1px solid ${accent === 'green' ? 'rgba(0,255,163,0.28)' : 'rgba(254,230,0,0.35)'}`,
          borderRadius: 14,
          overflow: "hidden",
          background: "rgba(255,255,255,0.03)",
          boxShadow: `0 10px 30px rgba(0,0,0,0.25), 0 0 0 0.5px ${accentColor} inset, 0 16px 40px ${accent === 'green' ? 'rgba(0,255,163,0.10)' : 'rgba(254,230,0,0.12)'} `,
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}>
            <thead>
              <tr>
                {columns.map((c, idx) => (
                  <th
                    key={idx}
                    style={{
                      textAlign: c.align ?? "left",
                      padding: "14px 16px",
                      background: accent === 'green' ? 'rgba(0,255,163,0.10)' : 'rgba(254,230,0,0.10)',
                      color: "var(--text-white)",
                      fontWeight: 700,
                      borderBottom: `1px solid ${accent === 'green' ? 'rgba(0,255,163,0.28)' : 'rgba(254,230,0,0.25)'}`,
                      width: c.width,
                      whiteSpace: "nowrap",
                      position: 'sticky',
                      top: 0,
                      zIndex: 2,
                    }}
                  >
                    {c.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 && (
                <tr>
                  <td colSpan={columns.length} style={{ padding: 20, textAlign: "center", color: "var(--text-gray)" }}>
                    {emptyMessage}
                  </td>
                </tr>
              )}
              {paged.map((row, rIdx) => (
                <tr
                  key={rIdx}
                  onMouseEnter={() => setHover(rIdx)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => onRowClick?.(row)}
                  style={{
                    cursor: onRowClick ? "pointer" : "default",
                    background:
                      hover === rIdx
                        ? (accent === 'green' ? 'rgba(0,255,163,0.08)' : 'rgba(254,230,0,0.08)')
                        : rIdx % 2 === 0
                          ? "rgba(255,255,255,0.02)"
                          : "transparent",
                    transition: "background 160ms ease",
                  }}
                >
                  {columns.map((c, cIdx) => {
                    const content: React.ReactNode = (() => {
                      if (c.render) return c.render(row);
                      const key = c.key;
                      if (typeof key === "string") {
                        return (row as unknown as Record<string, unknown>)[key] as React.ReactNode;
                      }
                      return row[key] as unknown as React.ReactNode;
                    })();
                    return (
                      <td
                        key={cIdx}
                        style={{
                          padding: "12px 16px",
                          borderBottom: `1px solid ${accent === 'green' ? 'rgba(0,255,163,0.14)' : 'rgba(255,255,255,0.06)'}`,
                          textAlign: c.align ?? "left",
                          color: "var(--text-white)",
                        }}
                      >
                        {content}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination - StakingLevelsTable Style */}
        <div className="pagination-container">
          <div className="pagination-info">
            Showing {from}-{to} of {total} entries
          </div>

          <div className="pagination-controls">
            <button
              className="pagination-btn"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={clampedPage <= 1}
            >
              Previous
            </button>

            <div className="pagination-numbers">
              {pageItems.map((it, i) =>
                typeof it === 'number' ? (
                  <button
                    key={i}
                    className={`pagination-number ${it === clampedPage ? 'active' : ''}`}
                    onClick={() => setPage(it)}
                    aria-current={it === clampedPage}
                  >
                    {it}
                  </button>
                ) : (
                  <span key={i} style={{ padding: '0 4px', color: 'rgba(255, 255, 255, 0.7)' }}>…</span>
                )
              )}
            </div>

            <button
              className="pagination-btn"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={clampedPage >= totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
