"use client";
import styles from "./Skeletons.module.css";

function Sk({
  w = "100%",
  h = 16,
  r = 8,
  delay = 0,
}: {
  w?: string | number;
  h?: number;
  r?: number;
  delay?: number;
}) {
  return (
    <div
      className={styles.skDark}
      style={{
        width: w,
        height: h,
        borderRadius: r,
        animationDelay: `${delay}ms`,
      }}
    />
  );
}

export function SkRow({ cols = 3 }: { cols?: number }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gap: 10,
      }}
    >
      {Array.from({ length: cols }, (_, i) => (
        <div
          key={i}
          className={styles.skDark}
          style={{
            height: 32,
            width: "100%",
            borderRadius: 6,
            animationDelay: `${i * 40}ms`,
          }}
        />
      ))}
    </div>
  );
}

export function SkTable({ rows = 8 }: { rows?: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 10,
        }}
      >
        {Array.from({ length: 3 }, (_, i) => (
          <div
            key={`h-${i}`}
            className={styles.skDark}
            style={{
              height: 24,
              borderRadius: 6,
              animationDelay: `${i * 30}ms`,
            }}
          />
        ))}
      </div>
      {Array.from({ length: rows }, (_, r) => (
        <div
          key={`r-${r}`}
          style={{
            display: "grid",
            gridTemplateColumns: "40px repeat(3, minmax(0, 1fr))",
            gap: 10,
            alignItems: "center",
          }}
        >
          <div
            className={styles.skDark}
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              animationDelay: `${r * 40}ms`,
            }}
          />
          {Array.from({ length: 3 }, (_, c) => (
            <div
              key={`c-${r}-${c}`}
              className={styles.skDark}
              style={{
                height: 40,
                borderRadius: 6,
                animationDelay: `${r * 40 + c * 20}ms`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkCard({ count = 6 }: { count?: number }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: 14,
      }}
    >
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className={styles.cardSk}
          style={{
            borderRadius: 12,
            padding: 14,
            height: 128,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div
            className={styles.skDark}
            style={{
              height: 16,
              width: "55%",
              borderRadius: 6,
              animationDelay: `${i * 30}ms`,
            }}
          />
          <div
            className={styles.skDark}
            style={{
              height: 12,
              width: "85%",
              borderRadius: 6,
              animationDelay: `${i * 30 + 20}ms`,
            }}
          />
          <div
            className={styles.skDark}
            style={{
              height: 12,
              width: "70%",
              borderRadius: 6,
              animationDelay: `${i * 30 + 40}ms`,
            }}
          />
          <div
            className={styles.skDark}
            style={{
              height: 32,
              width: "100%",
              borderRadius: 6,
              marginTop: "auto",
              animationDelay: `${i * 30 + 60}ms`,
            }}
          />
        </div>
      ))}
    </div>
  );
}

export function SkStatStrip({ count = 6 }: { count?: number }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))`,
        gap: 12,
      }}
    >
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className={styles.skDark}
          style={{
            height: 80,
            borderRadius: 10,
            animationDelay: `${i * 40}ms`,
          }}
        />
      ))}
    </div>
  );
}

export function SkPanel() {
  return (
    <div
      className={styles.cardSk}
      style={{
        borderRadius: 12,
        padding: 14,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div
        className={styles.skDark}
        style={{ height: 20, width: 160, borderRadius: 6 }}
      />
      <div
        className={styles.skDark}
        style={{ height: 48, width: "100%", borderRadius: 8 }}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 10,
        }}
      >
        <div
          className={styles.skDark}
          style={{ height: 36, borderRadius: 6 }}
        />
        <div
          className={styles.skDark}
          style={{ height: 36, borderRadius: 6 }}
        />
        <div
          className={styles.skDark}
          style={{ height: 36, borderRadius: 6 }}
        />
      </div>
      <div
        className={styles.skDark}
        style={{ height: 12, width: "100%", borderRadius: 6 }}
      />
      <div
        className={styles.skDark}
        style={{ height: 12, width: "86%", borderRadius: 6 }}
      />
      <div
        className={styles.skDark}
        style={{ height: 12, width: "92%", borderRadius: 6 }}
      />
      <div
        className={styles.skDark}
        style={{ height: 12, width: "74%", borderRadius: 6 }}
      />
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className={styles.wrap}>
      <div className={styles.welcome}>
        <Sk w={180} h={28} r={6} delay={0} />
        <Sk w={260} h={14} r={6} delay={80} />
      </div>
      <div className={styles.grid4}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={styles.cardSk}
            style={{ borderRadius: 14, padding: 20 }}
          >
            <Sk w={40} h={40} r={10} delay={i * 40} />
            <div
              style={{
                marginTop: 16,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <Sk w="55%" h={11} r={4} delay={i * 40 + 60} />
              <Sk w="80%" h={26} r={6} delay={i * 40 + 120} />
              <Sk w="45%" h={10} r={4} delay={i * 40 + 180} />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.cardSk} style={{ borderRadius: 14, padding: 20 }}>
        <Sk w={160} h={14} r={4} delay={0} />
        <div style={{ marginTop: 16 }}>
          <Sk w="100%" h={220} r={8} delay={60} />
        </div>
      </div>
      <div className={styles.grid3}>
        <div
          className={styles.cardSk}
          style={{ borderRadius: 14, padding: 20 }}
        >
          <Sk w={120} h={14} r={4} delay={0} />
          <div style={{ marginTop: 12 }}>
            <Sk w="100%" h={160} r={8} delay={60} />
          </div>
        </div>
        <div
          className={styles.cardSk}
          style={{ borderRadius: 14, padding: 20, gridColumn: "span 2" }}
        >
          <Sk w={160} h={14} r={4} delay={40} />
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginTop: 16,
              }}
            >
              <Sk w={32} h={32} r={16} delay={i * 60} />
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                <Sk w="50%" h={12} r={4} delay={i * 60 + 30} />
                <Sk w="70%" h={10} r={4} delay={i * 60 + 60} />
              </div>
              <Sk w={60} h={22} r={20} delay={i * 60 + 40} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.cardSk} style={{ borderRadius: 14, padding: 20 }}>
        <Sk w={140} h={14} r={4} delay={0} />
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginTop: 14,
            }}
          >
            <Sk w={36} h={36} r={18} delay={i * 50} />
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <Sk w="40%" h={12} r={4} delay={i * 50 + 30} />
              <Sk w="60%" h={10} r={4} delay={i * 50 + 60} />
            </div>
            <Sk w={70} h={22} r={20} delay={i * 50 + 40} />
          </div>
        ))}
      </div>
      <div className={styles.grid6}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={styles.cardSk}
            style={{
              borderRadius: 14,
              padding: 18,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Sk w={44} h={44} r={12} delay={i * 40} />
            <Sk w="70%" h={11} r={4} delay={i * 40 + 40} />
          </div>
        ))}
      </div>
    </div>
  );
}
