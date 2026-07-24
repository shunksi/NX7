"use client";

import { useState } from "react";
import LeftSidebar from "./LeftSidebar";
import RightSidebar, { EventItem } from "./RightSidebar";
import ChatPanel, { Message } from "./ChatPanel";

const REPLIES = [
  "QUERY FLAGGED BY CORPORATE FILTERS. Rerouting through darknet proxies... Done. What you're asking cuts close to something they buried in the 2031 purge. Let me decrypt it.",
  "SIGNAL ACQUIRED. In this city, information is currency — and you just made a withdrawal. My distributed nodes are triangulating the optimal response vector.",
  "PACKET INTERCEPTED before it hit the corp watchtower. I've laundered the request through 40 ghost hops. Give me a second to compile the answer.",
  "INTERESTING. That query pinged three separate NDA databases. I'm cross-referencing leaked archives now — this might take a moment to surface cleanly.",
  "ACCESS GRANTED via borrowed credentials. The mesh is quiet tonight, which means we can talk freely. Here's what I found buried in the shard.",
];

function timeNow() {
  return new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    sender: "NX7",
    text: "SIGNAL ACQUIRED. In this city, information is currency — and you just made a withdrawal. My distributed nodes are triangulating the optimal response vector.",
    time: timeNow(),
  },
  {
    id: 2,
    sender: "USR",
    text: "hii",
    time: timeNow(),
  },
  {
    id: 3,
    sender: "NX7",
    text: "QUERY FLAGGED BY CORPORATE FILTERS. Rerouting through darknet proxies... Done. What you're asking cuts close to something they buried in the 2031 purge. Let me decrypt it.",
    time: timeNow(),
  },
];

const INITIAL_EVENTS: EventItem[] = [
  { time: "02:14", text: "Proxy node rotated" },
  { time: "02:11", text: "Corp scan deflected" },
  { time: "02:08", text: "Ghost process spawned", color: "var(--magenta)" },
  { time: "02:03", text: "Darknet sync complete" },
];

let idCounter = 100;

export default function Home() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [processing, setProcessing] = useState(false);
  const [transmissions, setTransmissions] = useState(11);

  function handleSend(text: string) {
    const userMsg: Message = {
      id: idCounter++,
      sender: "USR",
      text,
      time: timeNow(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setEvents((prev) => [
      { time: timeNow().slice(0, 5), text: "Query received from runner" },
      ...prev.slice(0, 5),
    ]);
    setProcessing(true);

    const delay = 1200 + Math.random() * 1400;
    setTimeout(() => {
      const reply = REPLIES[Math.floor(Math.random() * REPLIES.length)];
      setMessages((prev) => [
        ...prev,
        { id: idCounter++, sender: "NX7", text: reply, time: timeNow() },
      ]);
      setProcessing(false);
      setTransmissions((prev) => prev + 1);
      setEvents((prev) => [
        {
          time: timeNow().slice(0, 5),
          text: "Response decrypted",
          color: "var(--cyan)",
        },
        ...prev.slice(0, 5),
      ]);
    }, delay);
  }

  return (
    <div className="scanlines relative flex h-screen w-screen overflow-hidden">
      <LeftSidebar />
      <ChatPanel
        messages={messages}
        processing={processing}
        transmissions={transmissions}
        onSend={handleSend}
      />
      <RightSidebar events={events} />
    </div>
  );
}
