import {
  useEffect,
  useState,
} from "react";
import type { FormEvent } from "react";
import Heading from "./Heading";
import Reveal from "./animations/Reveal";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  CheckCircle2,
  Loader2,
  Lock,
  MessageCircleHeart,
  Send,
  Sparkles,
} from "lucide-react";
import useGuest from "../hooks/useGuests";
import type {
  Attendance,
  RSVPEntry,
  RSVPForm,
  RSVPResponse,
  RSVPStatus,
} from "./RSVP/Types";
import MessageCard from "./RSVP/MessageCard";
import MessageModal from "./RSVP/MessageModal";

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

const initialForm: RSVPForm = {
  name: "",
  group: "Tamu Undangan",
  attendance: "Hadir",
  guests: 1,
  message: "",
};

const sampleMessages: RSVPEntry[] = [
  {
    id: "sample-1",
    name: "Keluarga Besar",
    group: "Tamu Undangan",
    attendance: "Hadir",
    guests: 2,
    message:
      "Semoga menjadi keluarga yang penuh kasih, kebahagiaan, dan keberkahan dalam setiap perjalanan yang akan dilalui bersama.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "sample-2",
    name: "Para Sahabat",
    group: "Tamu Undangan",
    attendance: "Hadir",
    guests: 1,
    message:
      "Selamat menempuh perjalanan baru. Semoga selalu saling menguatkan, memahami, dan menjaga satu sama lain.",
    createdAt: new Date().toISOString(),
  },
];

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

  const {
    guest,
    loading,
    found,
  } = useGuest();

  // Mengisi nama dan grup otomatis dari tautan undangan
  useEffect(() => {
    const controller = new AbortController();

    async function loadMessages(): Promise<void> {
      try {
        const url =
          `${GOOGLE_SCRIPT_URL}?mode=rsvp`;

        const response = await fetch(url, {
          method: "GET",
          signal: controller.signal,
          cache: "no-store",
        });

        const responseText =
          await response.text();

        if (!response.ok) {
          throw new Error(
            `Could not load messages: ${response.status}`,
          );
        }

        let data: unknown;

        try {
          data = JSON.parse(responseText);
        } catch {
          throw new Error(
            `Apps Script returned invalid JSON: ${responseText.slice(0, 200)}`,
          );
        }

        if (!Array.isArray(data)) {
          console.error(
            "RSVP response is not an array:",
            data,
          );

          throw new Error(
            "RSVP response must be an array.",
          );
        }

        const normalizedMessages: RSVPEntry[] =
          data
            .map((item: Partial<RSVPEntry>) => ({
              id:
                item.id ||
                crypto.randomUUID(),

              name:
                item.name ||
                "Tamu",

              group:
                item.group ||
                "Tamu Undangan",

              attendance:
                item.attendance ||
                "Masih tentatif",

              guests:
                Number(item.guests) || 1,

              message:
                item.message ||
                "",

              createdAt:
                item.createdAt ||
                new Date().toISOString(),
            }))
            .filter(
              (item) =>
                item.name.trim() !== "" &&
                item.message.trim() !== "",
            );

        setMessages(normalizedMessages);
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return;
        }

        console.error(
          "Could not load RSVP messages:",
          error,
        );
      }
    }

    void loadMessages();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (loading || !found) return;

    const guestName =
      guest.displayName?.trim() ?? "";

    if (!guestName) return;

    setForm((current) => ({
      ...current,
      name: guestName,
    }));
  }, [
    loading,
    found,
    guest.displayName,
  ]);

  // Mengunci scroll dan menangani tombol Escape ketika modal terbuka
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
      group: guest.displayGroup,
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

      const response = await fetch(`${GOOGLE_SCRIPT_URL}?mode=rsvp`, {
        method: "POST",
        headers: {
          "Content-Type":
            "text/plain;charset=utf-8",
        },
        body: JSON.stringify(newEntry),
      },
      ).then((response) => {
        if (!response.ok) {
          throw new Error(
            `Request failed with status ${response.status}`,
          );
        }
        return response;
      })
        ;


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
      className="flex flex-col items-center justify-center bg-theme-surface p-5"
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
              <label className="block">
                <span className="mb-2 block text-xs uppercase tracking-[0.15em] text-theme-text-muted">
                  Grup undangan
                </span>

                <div className="relative">
                  <input
                    type="text"
                    value={guest.displayGroup}
                    readOnly
                    aria-readonly="true"
                    tabIndex={-1}
                    className="w-full cursor-not-allowed border border-theme-border bg-theme-accent/30 px-4 py-3 pr-12 font-medium text-theme-primary outline-none"
                  />

                  <div
                    className="pointer-events-none absolute inset-y-0 right-4 flex items-center"
                    aria-hidden="true"
                  >
                    <Lock
                      size={15}
                      className="text-theme-primary/70"
                    />
                  </div>
                </div>
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
                  className="mt-5 flex items-center gap-3 bg-green-300 p-4 text-sm text-theme-primary-dark"
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
            className="grid max-h-155 grid-cols-3 gap-2 overflow-y-auto pr-1 sm:gap-3 lg:grid-cols-2 lg:gap-4 lg:pr-2"
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