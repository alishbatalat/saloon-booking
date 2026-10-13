"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { getChatReply, type ChatLink } from "@/lib/chatbot";

type ChatMessage = {
  id: string;
  from: "user" | "bot";
  text: string;
  links?: ChatLink[];
};

const welcome: ChatMessage = {
  id: "welcome",
  from: "bot",
  text: "Hi, I'm the Orielle guide. Ask me about a page, a specific service (\"what is balayage\"), hours, or how to book — I'll explain it and link you straight there.",
};

function nextId() {
  return Math.random().toString(36).slice(2);
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([welcome]);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  function send(event: React.FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;

    const reply = getChatReply(text);
    setMessages((current) => [
      ...current,
      { id: nextId(), from: "user", text },
      { id: nextId(), from: "bot", text: reply.text, links: reply.links },
    ]);
    setInput("");
  }

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="flex h-[min(70vh,560px)] w-[min(92vw,360px)] flex-col overflow-hidden border border-line bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-line bg-night px-5 py-4 text-white">
              <div>
                <p className="font-serif text-lg leading-none">Orielle Guide</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/60">Ask about the site</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="relative h-8 w-8 shrink-0"
              >
                <span className="absolute left-1.5 right-1.5 top-1/2 h-px rotate-45 bg-white/70" />
                <span className="absolute left-1.5 right-1.5 top-1/2 h-px -rotate-45 bg-white/70" />
              </button>
            </div>

            <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
              {messages.map((message) => (
                <div key={message.id} className={message.from === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div
                    className={`max-w-[85%] whitespace-pre-line text-sm leading-6 ${
                      message.from === "user" ? "bg-ink text-white" : "bg-stone text-ink"
                    } px-4 py-3`}
                  >
                    <p>{message.text}</p>
                    {message.links?.length ? (
                      <div className="mt-3 flex flex-col gap-1.5 border-t border-black/10 pt-3">
                        {message.links.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            className="footer-link text-[12px] uppercase tracking-[0.14em] text-bronze"
                          >
                            {link.label} →
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={send} className="flex gap-2 border-t border-line p-3">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask a question…"
                className="min-w-0 flex-1 border border-line bg-transparent px-3 py-2 text-sm text-ink outline-none focus:border-ink"
              />
              <button
                type="submit"
                className="shrink-0 border border-ink px-4 text-[11px] uppercase tracking-[0.16em] text-ink btn-fill"
              >
                Send
              </button>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close chat" : "Open chat"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-white shadow-xl"
      >
        {open ? (
          <span className="relative h-5 w-5">
            <span className="absolute left-0 right-0 top-1/2 h-px rotate-45 bg-white" />
            <span className="absolute left-0 right-0 top-1/2 h-px -rotate-45 bg-white" />
          </span>
        ) : (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
            <path d="M4 5.5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 3.5v-3.5H4a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z" />
          </svg>
        )}
      </motion.button>
    </div>
  );
}
