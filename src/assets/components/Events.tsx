import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
} from "lucide-react";
import { KalimantanBaratOrnament } from "./Ornament";
import Heading from "./Heading";
import { EVENTS } from "../data";
import Countdown from "./Countdown";
import Reveal from "./animations/Reveal";

/*
Recommended EVENTS data shape in ../data.ts:

export const EVENTS = [
  {
    title: "Resepsi Kalimantan Barat",
    region: "Kalimantan Barat",
    date: "Sabtu, 12 Desember 2026",
    time: "11.00 - 14.00 WIB",
    venue: "Gedung Serbaguna Nusantara",
    address: "Jl. Merdeka No. 12, Pontianak",
    mapsUrl: "https://maps.google.com/...",
    description: "Ramahi tamah dan jamuan bersama keluarga serta para tamu.",
  },
  {
    title: "Resepsi Sulawesi Barat",
    region: "Sulawesi Barat",
    date: "Sabtu, 19 Desember 2026",
    time: "11.00 - 14.00 WITA",
    venue: "Gedung Pertemuan Mandar",
    address: "Alamat acara di Sulawesi Barat",
    mapsUrl: "https://maps.google.com/...",
    description: "Perayaan dan silaturahmi bersama keluarga di Sulawesi Barat.",
  },
];
*/

export default function Events() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function scrollToCard(index: number): void {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const cards = Array.from(
      carousel.querySelectorAll<HTMLElement>("[data-event-card]"),
    );
    const card = cards[index];
    if (!card) return;

    card.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });

    setActiveIndex(index);
  }

  function goToPrevious(): void {
    const nextIndex =
      activeIndex === 0 ? EVENTS.length - 1 : activeIndex - 1;
    scrollToCard(nextIndex);
  }

  function goToNext(): void {
    const nextIndex =
      activeIndex === EVENTS.length - 1 ? 0 : activeIndex + 1;
    scrollToCard(nextIndex);
  }

  function updateActiveCard(): void {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const cards = Array.from(
      carousel.querySelectorAll<HTMLElement>("[data-event-card]"),
    );

    const carouselCenter =
      carousel.getBoundingClientRect().left + carousel.clientWidth / 2;

    const closestIndex = cards.reduce(
      (closest, card, index) => {
        const bounds = card.getBoundingClientRect();
        const cardCenter = bounds.left + bounds.width / 2;
        const distance = Math.abs(cardCenter - carouselCenter);

        return distance < closest.distance
          ? { index, distance }
          : closest;
      },
      { index: 0, distance: Number.POSITIVE_INFINITY },
    ).index;

    setActiveIndex(closestIndex);
  }

  return (
    <section
      id="events"
      className="relative overflow-hidden bg-theme-surface-elevated px-5 py-24"
    >
      <KalimantanBaratOrnament className="-right-6 top-12 h-48 w-48" />

      <Heading
        eyebrow="Simpan tanggalnya"
        title="Rangkaian Acara"
        description="Geser untuk melihat rangkaian acara di Kalimantan Barat dan Sulawesi Barat."
      />

      <Reveal direction="up" duration={0.9}>
        <div className="relative mx-auto mt-10 max-w-5xl">
          {/* Desktop and tablet navigation */}
          <button
            type="button"
            onClick={goToPrevious}
            aria-label="Lihat acara sebelumnya"
            className="absolute left-0 top-1/2 z-20 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-theme-border bg-theme-surface text-theme-primary shadow-[0_10px_30px_rgba(125,90,90,0.16)] transition hover:bg-theme-primary hover:text-theme-page md:flex"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            onClick={goToNext}
            aria-label="Lihat acara berikutnya"
            className="absolute right-0 top-1/2 z-20 hidden h-11 w-11 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-theme-border bg-theme-surface text-theme-primary shadow-[0_10px_30px_rgba(125,90,90,0.16)] transition hover:bg-theme-primary hover:text-theme-page md:flex"
          >
            <ChevronRight size={20} />
          </button>

          {/* Swipeable card track */}
          <div
            ref={carouselRef}
            onScroll={updateActiveCard}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-[7vw] pb-5 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-[14vw] md:px-[18%]"
            aria-label="Daftar acara pernikahan"
          >
            {EVENTS.map((event, index) => {
              const isActive = activeIndex === index;
              const isWestBorneo =
                event.region?.toLowerCase().includes("kalimantan") ??
                index === 0;
              const date = new Date(event.date);

              const formattedDate = new Intl.DateTimeFormat("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }).format(date);
              return (
                <motion.article
                  data-event-card
                  key={`${event.title}-${event.region ?? index}`}
                  animate={{
                    scale: isActive ? 1 : 0.94,
                    opacity: isActive ? 1 : 0.72,
                    y: isActive ? 0 : 10,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 24,
                  }}
                  className="relative min-h-122.5 min-w-[85vw] snap-center overflow-hidden border border-theme-border bg-theme-surface p-6 text-center shadow-[0_20px_55px_rgba(125,90,90,0.14)] sm:min-w-[68vw] md:min-w-[64%] md:p-8 lg:min-w-[58%]"
                >
                  {/* Decorative card background */}
                  <div
                    className="pointer-events-none absolute inset-3 border border-theme-primary/10"
                    aria-hidden="true"
                  />
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-theme-accent/45 blur-2xl"
                    aria-hidden="true"
                  />
                  <div
                    className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-theme-surface-elevated blur-2xl"
                    aria-hidden="true"
                  />

                  <div className="relative z-10 flex min-h-107.5 flex-col items-center">
                    <span className="rounded-full border border-theme-border bg-theme-surface-elevated/70 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-theme-primary">
                      {event.region ??
                        (isWestBorneo
                          ? "Kalimantan Barat"
                          : "Sulawesi Barat")}
                    </span>

                    <div className="mt-7 flex h-14 w-14 items-center justify-center rounded-full border border-theme-border bg-theme-accent/55 text-theme-primary">
                      <CalendarDays size={26} strokeWidth={1.25} />
                    </div>

                    <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-theme-text-muted">
                      Acara ke-{String(index + 1)}
                    </p>

                    <h3 className="mt-2 font-serif text-3xl text-theme-text">
                      {event.title}
                    </h3>

                    <div className="mx-auto my-6 flex w-full max-w-xs items-center gap-3 text-theme-primary">
                      <span className="h-px flex-1 bg-current opacity-25" />
                      <span className="h-2 w-2 rotate-45 bg-current" />
                      <span className="h-px flex-1 bg-current opacity-25" />
                    </div>

                    <p className="font-serif text-lg tracking-wide text-theme-text">
                      {formattedDate}
                    </p>

                    <p className="mt-3 inline-flex items-center gap-2 text-sm text-theme-text-muted">
                      <Clock3 size={15} />
                      {event.time}
                    </p>

                    <p className="mt-5 max-w-md text-sm leading-7 text-theme-text-muted">
                      {event.description}
                    </p>

                    <div className="mt-auto w-full pt-7">
                      <div className="mb-5 border-t border-theme-border pt-5">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-theme-primary">
                          Lokasi
                        </p>
                        <p className="mt-2 font-serif text-xl text-theme-text">
                          {event.venue}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-theme-text-muted">
                          {event.address}
                        </p>
                      </div>

                      <a
                        href={event.mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-theme-primary bg-theme-primary px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-theme-page transition hover:bg-theme-primary-hover"
                      >
                        <MapPin size={15} />
                        Buka peta
                      </a>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* Swipe hint and pagination */}
          <div className="mt-3 flex flex-col items-center gap-4">
            <p className="text-[10px] uppercase tracking-[0.18em] text-theme-text-muted md:hidden">
              Geser untuk melihat acara lainnya
            </p>

            <div
              className="flex items-center justify-center gap-2"
              aria-label={`Acara ${activeIndex + 1} dari ${EVENTS.length}`}
            >
              {EVENTS.map((event, index) => (
                <button
                  key={`${event.title}-indicator`}
                  type="button"
                  onClick={() => scrollToCard(index)}
                  aria-label={`Lihat ${event.title}`}
                  className={`h-2 rounded-full transition-all duration-300 ${activeIndex === index
                      ? "w-8 bg-theme-primary"
                      : "w-2 bg-theme-border hover:bg-theme-primary/40"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <Countdown />
    </section>
  );
}
