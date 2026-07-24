"use client";

import { useEffect, useState } from "react";

const TIME_LABELS = [
  "00:00", "02:00", "04:00", "06:00", "08:00", "10:00",
  "12:00", "14:00", "16:00", "18:00", "20:00", "22:00",
];

type Threat = { name: string; level: number; color: string };

const THREATS: Threat[] = [
  { name: "ARASAKA", level: 3, color: "var(--amber)" },
  { name: "MILITECH", level: 1, color: "var(--green)" },
  { name: "NETWATCH", level: 4, color: "var(--red)" },
];

export type EventItem = { time: string; text: string; color?: string };

export default function RightSidebar({ events }: { events: EventItem[] }) {
  const [bars, setBars] = useState<number[]>(() =>
    TIME_LABELS.map(() => 10 + Math.random() * 85)
  );

  useEffect(() => {
    const id = setInterval(() => {
      setBars((prev) => {
        const next = [...prev];
        next[next.length - 1] = 10 + Math.random() * 85;
        return next;
      });
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <aside className="hidden lg:flex w-[270px] shrink-0 flex-col border-l border-[var(--border-dim-2)] bg-[var(--panel)] px-4 py-4 overflow-y-auto">
      {/* Net activity */}
      <div className="mb-5">
        <p className="text-[10px] tracking-widest text-[var(--text-dim)] mb-2">
          — NET ACTIVITY
        </p>
        <div className="flex flex-col gap-1.5">
          {TIME_LABELS.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <span className="w-9 text-[9px] text-[var(--text-dimmer)] tabular-nums">
                {label}
              </span>
              <div className="flex-1 h-2 bg-[var(--panel-2)] rounded-sm overflow-hidden">
                <div
                  className="h-full rounded-sm transition-all duration-700 ease-out"
                  style={{
                    width: `${bars[i]}%`,
                    background:
                      i === TIME_LABELS.length - 1
                        ? "linear-gradient(90deg, var(--cyan), var(--green))"
                        : "var(--green-dim)",
                    opacity: i === TIME_LABELS.length - 1 ? 1 : 0.6,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Threat level */}
      <div className="mb-5">
        <p className="text-[10px] tracking-widest text-[var(--text-dim)] mb-2">
          — THREAT LEVEL
        </p>
        <div className="border border-[var(--amber)]/40 bg-[var(--amber)]/5 rounded-sm py-2 text-center mb-3">
          <span className="font-display tracking-[0.2em] text-[var(--amber)] text-glow text-[13px]">
            MODERATE
          </span>
        </div>
        <div className="flex flex-col gap-2.5">
          {THREATS.map((t) => (
            <div key={t.name}>
              <div className="flex items-center justify-between text-[10px] mb-1">
                <span className="text-[var(--text-dim)] tracking-wide">
                  {t.name}
                </span>
                <span style={{ color: t.color }}>{t.level}/5</span>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className="h-1.5 flex-1 rounded-sm"
                    style={{
                      background:
                        i < t.level ? t.color : "var(--panel-2)",
                      boxShadow:
                        i < t.level ? `0 0 6px ${t.color}` : "none",
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent events */}
      <div>
        <p className="text-[10px] tracking-widest text-[var(--text-dim)] mb-2">
          — RECENT EVENTS
        </p>
        <div className="flex flex-col gap-1.5">
          {events.map((e, i) => (
            <div
              key={i}
              className="text-[10px] leading-relaxed rise-in"
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <span className="text-[var(--text-dimmer)] tabular-nums mr-1.5">
                {e.time}
              </span>
              <span style={{ color: e.color ?? "var(--green-soft)" }}>
                {e.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
