import {
  useEffect,
  useState,
} from "react";
import type { FormEvent } from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  CheckCircle2,
  Heart,
  Loader2,
  MessageCircleHeart,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import Heading from "./Heading";
import Reveal from "./animations/Reveal";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbytxJvz-K_Bjgu6h-M5AEz2_QVBpXqI-9zPfVa3XeU2hF6sUJYGrdWLmxfqO9eX7dxVYg/exec";

const EASE = [0.22, 1, 0.36, 1] as const;

type Attendance =
  | "Hadir"
  | "Tidak dapat hadir"
  | "Masih tentatif";

type RSVPStatus =
  | "idle"
  | "saving"
  | "success"
  | "error";

type RSVPEntry = {
  id: string;
  name: string;
  attendance: Attendance;
  guests: number;
  message: string;
  createdAt: string;
};

type RSVPForm = Omit<
  RSVPEntry,
  "id" | "createdAt"
>;

type RSVPResponse = {
  success?: boolean;
  message?: string;
};

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
    message:
      "Semoga menjadi keluarga yang penuh kasih, kebahagiaan, dan keberkahan dalam setiap perjalanan yang akan dilalui bersama.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "sample-2",
    name: "Sahabat Mempelai",
    attendance: "Hadir",
    guests: 1,
    message:
      "Selamat menempuh perjalanan baru. Semoga selalu saling menguatkan, memahami, dan menjaga satu sama lain.",
    createdAt: new Date().toISOString(),
  },
];

function truncateWords(
  text: string,
  maximumWords = 20,
): string {
  const words = text.trim().split(/\s+/);

  if (words.length <= maximumWords) {
    return text;
  }

  return `${words
    .slice(0, maximumWords)
    .join(" ")}...`;
}

type MessageCardProps = {
  entry: RSVPEntry;
  index: number;
  onOpen: (entry: RSVPEntry) => void;
};

function MessageCard({
  entry,
  index,
  onOpen,
}: MessageCardProps) {
  const messagePreview = truncateWords(
    entry.message,
    20,
  );

  return (
    <motion.button
      type="button"
      layout
      onClick={() => onOpen(entry)}
      initial={{
        opacity: 0,
        y: 24,
        scale: 0.92,
        rotate: index % 2 === 0 ? -1.5 : 1.5,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: 0,
      }}
      exit={{
        opacity: 0,
        y: -16,
        scale: 0.94,
      }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.05, 0.3),
        ease: EASE,
      }}
      whileHover={{
        y: -5,
        scale: 1.025,
        rotate: index % 2 === 0 ? -0.5 : 0.5,
      }}
      whileTap={{
        scale: 0.95,
      }}
      className="group relative flex min-h-40 w-full flex-col overflow-hidden rounded-xl border border-theme-border bg-theme-surface p-2.5 text-left shadow-[0_8px_24px_rgba(125,90,90,0.08)] transition-colors hover:border-theme-primary/35 sm:min-h-48 sm:p-4"
      aria-label={`Baca ucapan lengkap dari ${entry.name}`}
    >
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-theme-accent/35 blur-xl"
        aria-hidden="true"
      />

      <div className="relative flex w-full items-center gap-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-theme-surface-elevated font-serif text-sm text-theme-primary sm:h-10 sm:w-10 sm:text-lg">
          {entry.name.charAt(0).toUpperCase()}
        </div>

        <div className="min-w-0">
          <h3 className="truncate font-serif text-xs text-theme-text sm:text-base">
            {entry.name}
          </h3>

          <p className="mt-0.5 hidden text-[8px] uppercase tracking-wider text-theme-primary sm:block">
            {entry.attendance}
          </p>
        </div>
      </div>

      <p className="relative mt-3 line-clamp-5 text-[10px] leading-4 text-theme-text-muted sm:text-sm sm:leading-6">
        “{messagePreview}”
      </p>

      <div className="relative mt-auto pt-3">
        <span className="text-[8px] font-semibold uppercase tracking-[0.12em] text-theme-primary sm:text-[9px]">
          Baca lengkap
        </span>

        <motion.span
          animate={{
            x: [0, 3, 0],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="ml-1 inline-block text-theme-primary"
        >
          →
        </motion.span>
      </div>
    </motion.button>
  );
}

type MessageModalProps = {
  entry: RSVPEntry | null;
  onClose: () => void;
};

function MessageModal({
  entry,
  onClose,
}: MessageModalProps) {
  if (
    !entry ||
    typeof document === "undefined"
  ) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      <motion.div
        key={entry.id}
        className="fixed inset-0 z-[100] flex items-center justify-center px-5 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.button
          type="button"
          aria-label="Tutup ucapan"
          onClick={onClose}
          className="absolute inset-0 cursor-default bg-theme-overlay/45 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        <motion.article
          role="dialog"
          aria-modal="true"
          aria-labelledby="message-modal-title"
          initial={{
            opacity: 0,
            y: 45,
            scale: 0.86,
            rotate: -2,
            filter: "blur(8px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            filter: "blur(0px)",
          }}
          exit={{
            opacity: 0,
            y: 30,
            scale: 0.9,
            rotate: 2,
            filter: "blur(6px)",
          }}
          transition={{
            type: "spring",
            stiffness: 190,
            damping: 20,
            mass: 0.85,
          }}
          className="relative z-10 w-full max-w-xl overflow-hidden rounded-3xl border border-theme-border bg-theme-surface p-6 shadow-[0_30px_90px_rgba(40,20,20,0.32)] sm:p-9"
        >
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-theme-accent/50 blur-3xl"
            aria-hidden="true"
          />

          <div
            className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-theme-surface-elevated blur-3xl"
            aria-hidden="true"
          />

          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-theme-border bg-theme-surface-elevated text-theme-primary transition hover:bg-theme-primary hover:text-theme-page"
            aria-label="Tutup"
          >
            <X size={17} />
          </button>

          <div className="relative flex items-center gap-4 pr-10">
            <motion.div
              initial={{
                scale: 0.6,
                rotate: -15,
              }}
              animate={{
                scale: 1,
                rotate: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 16,
                delay: 0.12,
              }}
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-theme-accent font-serif text-2xl text-theme-primary"
            >
              {entry.name.charAt(0).toUpperCase()}
            </motion.div>

            <div className="min-w-0">
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-theme-primary">
                Ucapan dari
              </p>

              <h3
                id="message-modal-title"
                className="mt-1 font-serif text-2xl text-theme-text"
              >
                {entry.name}
              </h3>
            </div>
          </div>

          <div className="relative my-6 flex items-center gap-3 text-theme-primary">
            <span className="h-px flex-1 bg-current opacity-20" />

            <Heart
              size={16}
              className="fill-theme-accent"
              strokeWidth={1.2}
            />

            <span className="h-px flex-1 bg-current opacity-20" />
          </div>

          <motion.blockquote
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.55,
              delay: 0.16,
              ease: EASE,
            }}
            className="relative max-h-[55vh] overflow-y-auto pr-2 font-serif text-lg leading-8 text-theme-text sm:text-xl sm:leading-9"
          >
            “{entry.message}”
          </motion.blockquote>

          <div className="relative mt-7 flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-full bg-theme-surface-elevated px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-theme-primary">
              {entry.attendance}
            </span>

            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-theme-primary px-5 py-2.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-theme-page transition hover:bg-theme-primary-hover"
            >
              Tutup ucapan
            </button>
          </div>
        </motion.article>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}

export default function RSVPSection() {
  const [form, setForm] =
    useState<RSVPForm>(initialForm);

  const [messages, setMessages] =
    useState<RSVPEntry[]>(sampleMessages);

  const [status, setStatus] =
    useState<RSVPStatus>("idle");

  const [
    selectedMessage,
    setSelectedMessage,
  ] = useState<RSVPEntry | null>(null);

  useEffect(() => {
    if (
      !GOOGLE_SCRIPT_URL.startsWith(
        "https://script.google.com/",
      )
    ) {
      return;
    }

    fetch(GOOGLE_SCRIPT_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Could not load messages: ${response.status}`,
          );
        }

        return response.json();
      })
      .then((data: unknown) => {
        if (
          Array.isArray(data) &&
          data.length > 0
          // console.log("RSVP messages loaded:", data
        ) {
          console.log("RSVP messages loaded:", data);
          setMessages(
            (data as RSVPEntry[])
              .slice()
              .reverse(),
          );
        }
      })
      .catch((error: unknown) => {
        console.error(
          "Could not load RSVP messages:",
          error,
        );
      });
  }, []);

  useEffect(() => {
    if (!selectedMessage) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    function handleKeyDown(
      event: KeyboardEvent,
    ): void {
      if (event.key === "Escape") {
        setSelectedMessage(null);
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [selectedMessage]);

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
      if (
        !GOOGLE_SCRIPT_URL.startsWith(
          "https://script.google.com/",
        )
      ) {
        throw new Error(
          "Google Apps Script URL has not been configured.",
        );
      }

      const response = await fetch(
        GOOGLE_SCRIPT_URL,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "text/plain;charset=utf-8",
          },
          body: JSON.stringify(newEntry),
        },
      );

      if (!response.ok) {
        throw new Error(
          `Request failed with status ${response.status}`,
        );
      }

      const result =
        (await response.json()) as RSVPResponse;

      if (result.success !== true) {
        throw new Error(
          result.message ??
            "Could not save RSVP.",
        );
      }

      setMessages((current) => [
        newEntry,
        ...current,
      ]);

      setForm(initialForm);
      setStatus("success");

      window.setTimeout(() => {
        setStatus("idle");
      }, 3500);
    } catch (error) {
      console.error(
        "RSVP submission failed:",
        error,
      );

      setStatus("error");
    }
  }

  return (
    <section
      id="rsvp"
      className="bg-theme-surface px-5 py-24"
    >
      <Heading
        eyebrow="Konfirmasi dan doa"
        title="RSVP & Ucapan"
        description="Mohon melakukan konfirmasi kehadiran. Atas setiap doa dan ucapan yang diberikan, kami mengucapkan terima kasih."
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
                    setForm((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
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
                      setForm((current) => ({
                        ...current,
                        attendance:
                          event.target
                            .value as Attendance,
                      }))
                    }
                    className="w-full border border-theme-border bg-theme-surface px-4 py-3 text-theme-text outline-none focus:border-theme-primary"
                  >
                    <option value="Hadir">
                      Hadir
                    </option>

                    <option value="Tidak dapat hadir">
                      Tidak dapat hadir
                    </option>

                    <option value="Masih tentatif">
                      Masih tentatif
                    </option>
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
                      setForm((current) => ({
                        ...current,
                        guests: Number(
                          event.target.value,
                        ),
                      }))
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
                    setForm((current) => ({
                      ...current,
                      message:
                        event.target.value,
                    }))
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
                  <Loader2
                    className="animate-spin"
                    size={16}
                  />
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
                  initial={{
                    opacity: 0,
                    height: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                  }}
                  className="mt-5 flex items-center gap-3 bg-theme-accent p-4 text-sm text-theme-primary-dark"
                >
                  <CheckCircle2 size={20} />
                  Pesan tersimpan dan ucapan
                  telah ditampilkan.
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  key="error"
                  initial={{
                    opacity: 0,
                    height: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                  }}
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
            className="grid max-h-[620px] grid-cols-3 gap-2 overflow-y-auto pr-1 sm:gap-3 lg:grid-cols-2 lg:gap-4 lg:pr-2"
          >
            <AnimatePresence initial>
              {messages.map(
                (entry, index) => (
                  <MessageCard
                    key={entry.id}
                    entry={entry}
                    index={index}
                    onOpen={
                      setSelectedMessage
                    }
                  />
                ),
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <MessageModal
        entry={selectedMessage}
        onClose={() =>
          setSelectedMessage(null)
        }
      />
    </section>
  );
}