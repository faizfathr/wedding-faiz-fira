import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  Loader2,
  MessageCircleHeart,
  Send,
  Sparkles,
} from "lucide-react";
import Heading from "./Heading";
import Reveal from "./animations/Reveal";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbytxJvz-K_Bjgu6h-M5AEz2_QVBpXqI-9zPfVa3XeU2hF6sUJYGrdWLmxfqO9eX7dxVYg/exec";

type Attendance = "Hadir" | "Tidak dapat hadir" | "Masih tentatif";

type RSVPEntry = {
  id: string;
  name: string;
  attendance: Attendance;
  guests: number;
  message: string;
  createdAt: string;
};

type RSVPForm = Omit<RSVPEntry, "id" | "createdAt">;

const initialForm: RSVPForm = {
  name: "",
  attendance: "Hadir",
  guests: 1,
  message: "",
};

const sampleMessages: RSVPEntry[] = [
  {
    id: "sample-1",
    name: "Keluarga Besar",
    attendance: "Hadir",
    guests: 2,
    message: "Semoga menjadi keluarga yang penuh kasih, kebahagiaan, dan keberkahan.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "sample-2",
    name: "Sahabat Mempelai",
    attendance: "Hadir",
    guests: 1,
    message: "Selamat menempuh perjalanan baru. Semoga selalu saling menguatkan.",
    createdAt: new Date().toISOString(),
  },
];

function MessageCard({ entry, index }: { entry: RSVPEntry; index: number }) {
  return (
    <motion.article
      layout
      initial={{
        opacity: 0,
        y: 28,
        scale: 0.96,
        rotate: index % 2 ? 0.7 : -0.7,
      }}
      animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.97 }}
      transition={{
        duration: 0.65,
        delay: Math.min(index * 0.07, 0.35),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -5, transition: { duration: 0.25 } }}
      className="h-full border border-theme-border bg-theme-surface p-6 shadow-[0_12px_35px_rgba(125,90,90,0.07)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-theme-surface-elevated font-serif text-xl text-theme-primary">
          {entry.name.charAt(0).toUpperCase()}
        </div>

        <span className="rounded-full bg-theme-accent px-3 py-1 text-[10px] uppercase tracking-wider text-theme-primary">
          {entry.attendance}
        </span>
      </div>

      <h3 className="mt-5 font-serif text-xl text-theme-text">
        {entry.name}
      </h3>

      <p className="mt-3 leading-7 text-theme-text-muted">
        “{entry.message}”
      </p>
    </motion.article>
  );
}

function RSVPAndMessagesSection() {
  const [form, setForm] = useState<RSVPForm>(initialForm);
  const [messages, setMessages] = useState<RSVPEntry[]>(sampleMessages);
  const [status, setStatus] = useState<
    "idle" | "saving" | "success" | "error"
  >("idle");

  useEffect(() => {
    if (!GOOGLE_SCRIPT_URL.startsWith("https://script.google.com/")) return;

    fetch(GOOGLE_SCRIPT_URL)
      .then((response) => response.json())
      .then((data: RSVPEntry[]) => {
        if (Array.isArray(data) && data.length) {
          setMessages(data.slice().reverse());
        }
      })
      .catch(() => undefined);
  }, []);

  async function submit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (status === "saving") return;

    setStatus("saving");

    const newEntry: RSVPEntry = {
      id: crypto.randomUUID(),
      ...form,
      createdAt: new Date().toISOString(),
    };

    try {
      if (!GOOGLE_SCRIPT_URL.startsWith("https://script.google.com/")) {
        throw new Error(
          "Google Apps Script URL has not been configured.",
        );
      }

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(newEntry),
      });

      if (!response.ok) {
        throw new Error(
          `Request failed with status ${response.status}`,
        );
      }

      const result: {
        success?: boolean;
        message?: string;
      } = await response.json();

      if (result.success !== true) {
        throw new Error(
          result.message ?? "Could not save RSVP.",
        );
      }

      setMessages((current) => [newEntry, ...current]);
      setForm(initialForm);
      setStatus("success");

      window.setTimeout(() => {
        setStatus("idle");
      }, 3500);
    } catch (error) {
      console.error("RSVP submission failed:", error);
      setStatus("error");
    }
  }

  return (
    <section id="rsvp" className="bg-theme-surface px-5 py-24">
      <Heading
        eyebrow="Konfirmasi dan doa"
        title="RSVP & Ucapan"
        description="Mohon melakukan konfirmasi berikut, atas semua ucapan ucapannya kami ucapkan terimakasih."
      />

      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <form
            onSubmit={submit}
            className="border border-theme-border bg-theme-surface-elevated p-6 shadow-[0_18px_50px_rgba(125,90,90,0.08)] sm:p-8"
          >
            <div className="mb-7 flex items-center gap-3">
              <MessageCircleHeart
                className="text-theme-primary"
                strokeWidth={1.4}
              />
              <h3 className="font-serif text-2xl text-theme-text">
                Kirim konfirmasi
              </h3>
            </div>

            <div className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-xs uppercase tracking-[0.15em] text-theme-text-muted">
                  Nama lengkap
                </span>
                <input
                  required
                  value={form.name}
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                  className="w-full border border-theme-border bg-theme-surface px-4 py-3 text-theme-text outline-none transition placeholder:text-theme-text-muted/70 focus:border-theme-primary focus:ring-2 focus:ring-theme-primary/10"
                  placeholder="Nama Anda"
                />
              </label>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs uppercase tracking-[0.15em] text-theme-text-muted">
                    Kehadiran
                  </span>
                  <select
                    value={form.attendance}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        attendance: event.target.value as Attendance,
                      })
                    }
                    className="w-full border border-theme-border bg-theme-surface px-4 py-3 text-theme-text outline-none focus:border-theme-primary"
                  >
                    <option>Hadir</option>
                    <option>Tidak dapat hadir</option>
                    <option>Masih tentatif</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs uppercase tracking-[0.15em] text-theme-text-muted">
                    Jumlah tamu
                  </span>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={form.guests}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        guests: Number(event.target.value),
                      })
                    }
                    className="w-full border border-theme-border bg-theme-surface px-4 py-3 text-theme-text outline-none focus:border-theme-primary"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-xs uppercase tracking-[0.15em] text-theme-text-muted">
                  Ucapan dan doa
                </span>
                <textarea
                  required
                  rows={5}
                  maxLength={500}
                  value={form.message}
                  onChange={(event) =>
                    setForm({ ...form, message: event.target.value })
                  }
                  className="w-full resize-none border border-theme-border bg-theme-surface px-4 py-3 text-theme-text outline-none transition placeholder:text-theme-text-muted/70 focus:border-theme-primary"
                  placeholder="Tuliskan ucapan terbaik Anda"
                />
                <span className="mt-1 block text-right text-xs text-theme-text-muted">
                  {form.message.length}/500
                </span>
              </label>

              <button
                type="submit"
                disabled={status === "saving"}
                className="inline-flex w-full items-center justify-center gap-2 bg-theme-primary px-6 py-4 text-xs uppercase tracking-[0.18em] text-theme-page transition hover:bg-theme-primary-hover disabled:cursor-wait disabled:opacity-70"
              >
                {status === "saving" ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <Send size={15} />
                )}
                {status === "saving"
                  ? "Menyimpan..."
                  : "Kirim konfirmasi"}
              </button>
            </div>

            <AnimatePresence mode="wait">
              {status === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, height: 0, y: 10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-5 flex items-center gap-3 bg-theme-accent p-4 text-sm text-theme-primary-dark"
                >
                  <CheckCircle2 size={20} />
                  Pesan tersimpan dan ucapan telah ditampilkan.
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, height: 0, y: 10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-5 bg-theme-surface p-4 text-sm leading-6 text-theme-primary-dark"
                >
                  Pesan belum dapat disimpan.
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Reveal>

        <div>
          <Reveal>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-theme-primary">
                  Doa dari tamu
                </p>
                <h3 className="mt-2 font-serif text-3xl text-theme-text">
                  Ucapan Terbaru
                </h3>
              </div>
              <Sparkles
                className="text-theme-primary"
                strokeWidth={1.3}
              />
            </div>
          </Reveal>

          <motion.div
            layout
            className="grid max-h-[620px] gap-4 overflow-y-auto pr-2 sm:grid-cols-2"
          >
            <AnimatePresence initial>
              {messages.map((entry, index) => (
                <MessageCard
                  key={entry.id}
                  entry={entry}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}



export default function WeddingGiftAndRSVP() {
  return (
    <div className="min-h-screen bg-[#fffdf8] text-[#43362d] selection:bg-[#c9b28d] selection:text-white">
      <RSVPAndMessagesSection />
    </div>
  );
}