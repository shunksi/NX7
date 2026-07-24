"use client";

import { useEffect, useState } from "react";

const STATUS_ITEMS: { label: string; value: string; color: string }[] = [
  { label: "ENCRYPTION", value: "AES-4096", color: "var(--green)" },
  { label: "PROXY NODES", value: "247 / active", color: "var(--green)" },
  { label: "CORP WATCHES", value: "6 detected", color: "var(--amber)" },
  { label: "FIREWALL", value: "ENGAGED", color: "var(--green)" },
  { label: "GHOST PROCS", value: "1,847 running", color: "var(--green)" },
  { label: "NET LATENCY", value: "0.4ms", color: "var(--green)" },
];

const CAPABILITIES = [
  "DARKNET ACCESS",
  "CORP DB BREACH",
  "SIGNAL DECRYPT",
  "GHOST ROUTING",
  "AI CONSENSUS",
  "MESH SCRAPING",
];

function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export default function LeftSidebar() {
  const now = useClock();
  const time = now
    ? now.toLocaleTimeString("en-GB", { hour12: false })
    : "--:--:--";
  const date = now
    ? now
        .toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })
        .toUpperCase()
    : "";

  return (
    <aside className="hidden md:flex w-[260px] shrink-0 flex-col border-r border-[var(--border-dim-2)] bg-[var(--panel)] px-4 py-4 overflow-y-auto">
      {/* Logo */}
      <div className="mb-5">
        <div className="flex items-center gap-2">
          <span className="text-[var(--cyan)] text-glow text-sm">◆</span>
          <h1 className="font-display text-[15px] tracking-widest text-[var(--green)] text-glow">
            NEXUS-7
          </h1>
        </div>
        <p className="mt-0.5 text-[10px] tracking-wider text-[var(--text-dim)]">
          NEURAL INTERFACE v2.4.1
        </p>
      </div>

      {/* Sys time */}
      <div className="mb-5">
        <p className="text-[10px] tracking-widest text-[var(--text-dim)] mb-1">
          — SYS_TIME
        </p>
        <p className="font-display text-2xl text-[var(--green)] text-glow leading-none tabular-nums">
          {time}
        </p>
        <p className="text-[10px] text-[var(--text-dim)] mt-1 tracking-wide">
          {date}
        </p>
      </div>

      {/* System status */}
      <div className="mb-5">
        <p className="text-[10px] tracking-widest text-[var(--text-dim)] mb-2">
          — SYSTEM STATUS
        </p>
        <div className="flex flex-col gap-1.5">
          {STATUS_ITEMS.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between text-[11px]"
            >
              <span className="text-[var(--text-dim)] tracking-wide">
                {item.label}
              </span>
              <span
                className="flex items-center gap-1.5 font-medium"
                style={{ color: item.color }}
              >
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full pulse-dot"
                  style={{ background: item.color }}
                />
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Capabilities */}
      <div className="mb-5">
        <p className="text-[10px] tracking-widest text-[var(--text-dim)] mb-2">
          — CAPABILITIES
        </p>
        <div className="flex flex-col gap-1.5">
          {CAPABILITIES.map((cap) => (
            <div
              key={cap}
              className="flex items-center gap-2 text-[11px] text-[var(--green-soft)] tracking-wide"
            >
              <span className="text-[var(--green-dim)]">›</span>
              {cap}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-[var(--border-dim-2)]">
        <p className="text-[9px] leading-relaxed tracking-wide text-[var(--text-dimmer)]">
          UNAUTHORIZED ACCESS PROHIBITED
          <br />
          ARASAKA-CORP COUNTERMEASURES ACTIVE
        </p>
      </div>
    </aside>
  );
}
