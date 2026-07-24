"use client";

import { useEffect, useRef, useState } from "react";

export type Message = {
  id: number;
  sender: "NX7" | "USR";
  text: string;
  time: string;
};

const TAGS = ["MESH", "DARK", "GHOST"];

export default function ChatPanel({
  messages,
  processing,
  transmissions,
  onSend,
}: {
  messages: Message[];
  processing: boolean;
  transmissions: number;
  onSend: (text: string) => void;
}) {
  const [value, setValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, processing]);

  function handleSend() {
    const text = value.trim();
    if (!text) return;
    onSend(text);
    setValue("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <section className="flex flex-1 min-w-0 flex-col bg-[var(--void)]">
      {/* Header */}
      <header className="border-b border-[var(--border-dim-2)] bg-[var(--panel)] px-5 py-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2
              className="glitch-title font-display text-[15px] sm:text-[17px] tracking-wider text-[var(--green)] text-glow"
              data-text="SECURE CHANNEL // DARKNET-7"
            >
              SECURE CHANNEL // DARKNET-7
            </h2>
            <p className="text-[10px] tracking-wide text-[var(--text-dim)] mt-1">
              END-TO-END ENCRYPTED · GHOST ROUTING ACTIVE ·{" "}
              <span className="text-[var(--green-soft)]">
                {transmissions} TRANSMISSIONS
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="text-[9px] tracking-widest border border-[var(--border-dim)] text-[var(--text-dim)] px-2 py-1 rounded-sm"
              >
                {tag}
              </span>
            ))}
            <span className="flex items-center gap-1.5 text-[10px] tracking-widest text-[var(--green)] ml-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--green)] pulse-dot" />
              ONLINE
            </span>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4 crt-bg"
      >
        {messages.map((m) =>
          m.sender === "NX7" ? (
            <div key={m.id} className="max-w-[80%] sm:max-w-[70%] rise-in">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] px-1.5 py-0.5 border border-[var(--green-dim)] text-[var(--green)] tracking-widest rounded-sm">
                  NX7
                </span>
                <span className="text-[9px] text-[var(--text-dimmer)]">
                  NEXUS-7 {m.time}
                </span>
              </div>
              <div className="border border-[var(--border-dim)] bg-[var(--panel)] border-glow rounded-sm px-4 py-3 text-[12px] leading-relaxed text-[var(--green-soft)]">
                {m.text}
              </div>
            </div>
          ) : (
            <div
              key={m.id}
              className="max-w-[80%] sm:max-w-[70%] self-end text-right rise-in"
            >
              <div className="flex items-center justify-end gap-2 mb-1">
                <span className="text-[9px] text-[var(--text-dimmer)]">
                  {m.time}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 border border-[var(--magenta)]/50 text-[var(--magenta)] tracking-widest rounded-sm">
                  USR
                </span>
              </div>
              <div className="border-r-2 border-[var(--magenta)] bg-[var(--magenta)]/5 rounded-sm px-4 py-3 text-[12px] leading-relaxed text-left text-[var(--green-soft)]">
                {m.text}
              </div>
            </div>
          )
        )}

        {processing && (
          <div className="max-w-[70%] rise-in">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] px-1.5 py-0.5 border border-[var(--green-dim)] text-[var(--green)] tracking-widest rounded-sm">
                NX7
              </span>
              <span className="text-[9px] text-[var(--text-dimmer)] tracking-widest">
                PROCESSING...
              </span>
            </div>
            <div className="border border-[var(--border-dim)] bg-[var(--panel)] rounded-sm px-4 py-3 text-[12px] text-[var(--green)] flex items-center gap-2">
              <span className="flex gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--green)] animate-bounce [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--green)] animate-bounce [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--green)] animate-bounce" />
              </span>
              ACCESSING NEURAL MESH...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-[var(--border-dim-2)] bg-[var(--panel)] px-5 py-3">
        <div className="flex items-end gap-3">
          <div className="flex-1 flex items-center border border-[var(--border-dim)] focus-within:border-[var(--green-dim)] bg-[var(--void)] rounded-sm px-3 py-2.5 transition-colors">
            <span className="text-[var(--green-dim)] mr-2 select-none">
              &gt;_
            </span>
            <textarea
              rows={1}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="ENTER QUERY... [SHIFT+ENTER for newline]"
              className="flex-1 resize-none bg-transparent outline-none text-[12px] text-[var(--green-soft)] placeholder:text-[var(--text-dimmer)] tracking-wide leading-relaxed max-h-24"
            />
            <span className="cursor-blink text-[var(--green)] ml-1">▌</span>
          </div>
          <button
            onClick={handleSend}
            className="shrink-0 border border-[var(--green-dim)] hover:bg-[var(--green)]/10 hover:border-[var(--green)] text-[var(--green)] text-[11px] tracking-widest px-4 py-2.5 rounded-sm transition-colors"
          >
            SEND ▸
          </button>
        </div>
        <p className="text-[9px] text-[var(--text-dimmer)] mt-2 tracking-wide">
          TRANSMISSION ENCRYPTED · GHOST ROUTED · UNTRACEABLE
          <span className="float-right">ENTER ↵ TO TRANSMIT</span>
        </p>
      </div>
    </section>
  );
}
