import { useState } from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  Banknote,
  ChevronLeft,
  ChevronRight,
  Gift,
  Heart,
} from "lucide-react";
import { CopyButton } from "./Utils";
import Reveal from "./animations/Reveal";
import StaggerReveal from "./animations/StaggerReveal";
import Heading from "./Heading";
import { WEDDING } from "../data";



const EASE = [0.22, 1, 0.36, 1] as const;
const SWIPE_THRESHOLD = 60;
const CARD_HEIGHT = "h-[300px] sm:h-[280px]";

type GiftAddress = {
  id: string;
  region: string;
  recipient: string;
  address: string;
};

const GIFT_ADDRESSES: GiftAddress[] = [
  {
    id: "kalimantan-barat",
    region: "Kalimantan Barat",
    recipient: "Faiz Fathur Rahman",
    address:
      "JL. Yos Sudarso BTN Kowina I No 19, Singkawang, Kalimantan Barat",
  },
  {
    id: "sulawesi-barat",
    region: "Sulawesi Barat",
    recipient: "Mutmagfira M.",
    address:
      "BTN Axuri Permai, Jalan Dahlia I Blok B No. 5, Rimuku, Mamuju, Sulawesi Barat",
  },
];

function GiftAddressStack() {
  const [activeIndex, setActiveIndex] =
    useState(0);

  const [direction, setDirection] =
    useState<1 | -1>(1);

  const activeAddress =
    GIFT_ADDRESSES[activeIndex];

  const nextIndex =
    activeIndex === GIFT_ADDRESSES.length - 1
      ? 0
      : activeIndex + 1;

  const nextAddress =
    GIFT_ADDRESSES[nextIndex];

  function showNext(): void {
    setDirection(1);

    setActiveIndex((current) =>
      current === GIFT_ADDRESSES.length - 1
        ? 0
        : current + 1,
    );
  }

  function showPrevious(): void {
    setDirection(-1);

    setActiveIndex((current) =>
      current === 0
        ? GIFT_ADDRESSES.length - 1
        : current - 1,
    );
  }

  function showAddress(index: number): void {
    if (index === activeIndex) return;

    setDirection(
      index > activeIndex ? 1 : -1,
    );

    setActiveIndex(index);
  }

  if (!activeAddress || !nextAddress) {
    return null;
  }

  return (
    <Reveal className="mx-auto mt-5 max-w-4xl">
      <div className="relative mx-auto max-w-2xl pb-10">
        {/*
          Card container.
          Extra width on the right reveals the card behind.
        */}
        <div
          className={`relative w-full ${CARD_HEIGHT}`}
        >
          {/* Back card */}
          <motion.button
            type="button"
            onClick={showNext}
            aria-label={`Lihat alamat ${nextAddress.region}`}
            whileHover={{
              x: 5,
              scale: 0.975,
            }}
            whileTap={{
              scale: 0.96,
            }}
            className={`absolute left-6 top-0 z-0 w-[calc(100%-1.5rem)] overflow-hidden rounded-2xl border border-theme-primary/30 bg-theme-primary-dark text-left shadow-[0_16px_40px_rgba(125,90,90,0.16)] sm:left-10 sm:w-[calc(100%-2.5rem)] ${CARD_HEIGHT}`}
          >
            <div
              className="absolute inset-0 bg-linear-to-br from-theme-primary-dark to-theme-primary"
              aria-hidden="true"
            />

            <div className="relative flex h-full items-center justify-end px-4">
              <div className="text-right">
                <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-theme-accent/75 sm:text-[9px]">
                  Alamat berikutnya
                </p>

                <p className="mt-1 max-w-20 font-serif text-sm leading-5 text-theme-page">
                  {nextAddress.region}
                </p>

                <ChevronRight
                  size={16}
                  className="ml-auto mt-2 text-theme-accent"
                />
              </div>
            </div>
          </motion.button>

          {/* Active card */}
          <div className="absolute inset-y-0 left-0 right-6 z-10 sm:right-10">
            <AnimatePresence
              initial={false}
              custom={direction}
              mode="sync"
            >
              <motion.article
                key={activeAddress.id}
                custom={direction}
                initial={{
                  opacity: 0,
                  x:
                    direction === 1
                      ? 90
                      : -90,
                  rotate:
                    direction === 1
                      ? 2
                      : -2,
                  scale: 0.97,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  rotate: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  x:
                    direction === 1
                      ? -140
                      : 140,
                  rotate:
                    direction === 1
                      ? -5
                      : 5,
                  scale: 0.94,
                }}
                transition={{
                  duration: 0.45,
                  ease: EASE,
                }}
                drag="x"
                dragConstraints={{
                  left: 0,
                  right: 0,
                }}
                dragElastic={0.18}
                onDragEnd={(_, info) => {
                  if (
                    info.offset.x <=
                    -SWIPE_THRESHOLD
                  ) {
                    showNext();
                    return;
                  }

                  if (
                    info.offset.x >=
                    SWIPE_THRESHOLD
                  ) {
                    showPrevious();
                  }
                }}
                whileDrag={{
                  cursor: "grabbing",
                  scale: 1.015,
                  rotate:
                    direction === 1
                      ? -1
                      : 1,
                }}
                className={`absolute inset-0 cursor-grab touch-pan-y overflow-hidden rounded-2xl border border-theme-primary bg-theme-primary p-5 text-center text-theme-page shadow-[0_22px_60px_rgba(125,90,90,0.22)] active:cursor-grabbing sm:p-6 sm:text-left ${CARD_HEIGHT}`}
              >
                {/* Decorative background */}
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-theme-accent/15 blur-2xl"
                  aria-hidden="true"
                />

                <div
                  className="pointer-events-none absolute inset-3 rounded-xl border border-theme-accent/15"
                  aria-hidden="true"
                />

                {/* Card content */}
                <div className="relative flex h-full flex-col sm:flex-row sm:items-start sm:gap-5">
                  <div className="mx-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-theme-accent/25 bg-theme-accent/10 text-theme-primary-soft sm:mx-0 sm:h-13 sm:w-13">
                    <Gift
                      size={24}
                      strokeWidth={1.3}
                    />
                  </div>

                  <div className="mt-3 flex min-w-0 flex-1 flex-col sm:mt-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-theme-accent">
                          Kirim hadiah
                        </p>

                        <h3 className="mt-1 font-serif text-lg text-theme-page sm:text-xl">
                          {activeAddress.region}
                        </h3>
                      </div>

                      <span className="shrink-0 rounded-full border border-theme-accent/20 bg-theme-accent/10 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-theme-accent">
                        {activeIndex + 1}/
                        {GIFT_ADDRESSES.length}
                      </span>
                    </div>

                    <div
                      className="my-3 h-px bg-theme-accent/20"
                      aria-hidden="true"
                    />

                    <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-theme-accent/75">
                      Penerima
                    </p>

                    <p className="mt-1 font-serif text-base text-theme-page">
                      {activeAddress.recipient}
                    </p>

                    <p className="mt-2 min-h-12 line-clamp-2 text-xs leading-5 text-theme-surface-elevated sm:text-sm sm:leading-6">
                      {activeAddress.address}
                    </p>

                    <div
                      className="mt-auto flex items-end justify-between gap-3 pt-3"
                      onPointerDown={(event) =>
                        event.stopPropagation()
                      }
                    >
                      <CopyButton
                        content="Alamat"
                        value={
                          activeAddress.address
                        }
                        isDark={true}
                      />

                      <motion.button
                        type="button"
                        onClick={showNext}
                        animate={{
                          x: [0, 4, 0],
                        }}
                        transition={{
                          duration: 1.7,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="flex shrink-0 items-center gap-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-theme-accent"
                      >
                        Geser
                        <ChevronRight
                          size={13}
                        />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-5 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={showPrevious}
            aria-label="Lihat alamat sebelumnya"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-theme-border bg-theme-surface text-theme-primary transition hover:bg-theme-primary hover:text-theme-page"
          >
            <ChevronLeft size={17} />
          </button>

          <div className="flex items-center justify-center gap-2">
            {GIFT_ADDRESSES.map(
              (address, index) => (
                <button
                  key={address.id}
                  type="button"
                  onClick={() =>
                    showAddress(index)
                  }
                  aria-label={`Lihat alamat ${address.region}`}
                  className={`h-2 rounded-full transition-all duration-300 ${activeIndex === index
                      ? "w-8 bg-theme-primary"
                      : "w-2 bg-theme-border hover:bg-theme-primary/40"
                    }`}
                />
              ),
            )}
          </div>

          <button
            type="button"
            onClick={showNext}
            aria-label="Lihat alamat berikutnya"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-theme-border bg-theme-surface text-theme-primary transition hover:bg-theme-primary hover:text-theme-page"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div>
    </Reveal>
  );
}

export default function GiftSection() {
  return (
    <section
      id="gift"
      className="relative overflow-hidden bg-theme-surface-elevated px-5 py-10"
    >
      <div className="pointer-events-none absolute -right-14 top-10 h-48 w-48 rotate-45 border border-theme-primary/10" />

      <Heading
        eyebrow="Tanda kasih"
        title="Hadiah Pernikahan"
        description="Doa dan kehadiran Anda adalah hadiah terindah. Apabila ingin berbagi tanda kasih, Anda dapat menggunakan informasi berikut."
      />

      {/* Bank accounts */}
      <StaggerReveal className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2">
        {WEDDING.bankAccounts.map(
          (account) => (
            <motion.article
              key={account.accountNumber}
              whileHover={{
                y: -7,
                transition: {
                  duration: 0.3,
                },
              }}
              className="relative overflow-hidden border border-theme-border bg-theme-surface p-7 shadow-[0_15px_45px_rgba(125,90,90,0.08)]"
            >
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-theme-accent/40" />

              <Banknote
                className="mb-2 text-theme-primary"
                size={30}
                strokeWidth={1.3}
              />

              <p className="text-xs uppercase tracking-[0.18em] text-theme-primary">
                {account.bank}
              </p>

              <p className="mt-1 font-serif text-xl tracking-wider text-theme-text">
                {account.accountNumber}
              </p>

              <p className="mb-2 mt-1 text-sm text-theme-text-muted">
                a.n. {account.accountName}
              </p>

              <CopyButton
                content="Rekening"
                value={
                  account.accountNumber
                }
              />
            </motion.article>
          ),
        )}
      </StaggerReveal>

      {/* Swipeable address cards */}
      <GiftAddressStack />

      {/* Closing message */}
      <Reveal className="mx-auto mt-7 max-w-2xl text-center">
        <p className="inline-flex items-center gap-2 text-sm italic text-theme-text-muted">
          <Heart
            size={15}
            className="fill-theme-accent text-theme-primary"
          />

          Terima kasih atas perhatian dan tanda
          kasih Anda.
        </p>
      </Reveal>
    </section>
  );
}