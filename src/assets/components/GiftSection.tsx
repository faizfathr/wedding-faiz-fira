import { motion } from "framer-motion";
import { CopyButton } from "./Utils";
import Reveal from "./animations/Reveal";
import StaggerReveal from "./animations/StaggerReveal";
import Heading from "./Heading";
import { Banknote, Gift, Heart } from "lucide-react";
import { WEDDING } from "../data";

export default function GiftSection() {
  return (
    <section
      id="gift"
      className="relative overflow-hidden bg-theme-surface-elevated px-5 py-24"
    >
      <div className="pointer-events-none absolute -right-14 top-10 h-48 w-48 rotate-45 border border-theme-primary/10" />

      <Heading
        eyebrow="Tanda kasih"
        title="Hadiah Pernikahan"
        description="Doa dan kehadiran Anda adalah hadiah terindah. Apabila ingin berbagi tanda kasih, Anda dapat menggunakan informasi berikut."
      />

      <StaggerReveal className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2">
        {WEDDING.bankAccounts.map((account) => (
          <motion.article
            key={account.accountNumber}
            whileHover={{ y: -7, transition: { duration: 0.3 } }}
            className="relative overflow-hidden border border-theme-border bg-theme-surface p-7 shadow-[0_15px_45px_rgba(125,90,90,0.08)]"
          >
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-theme-accent/40" />

            <Banknote
              className="mb-6 text-theme-primary"
              size={30}
              strokeWidth={1.3}
            />

            <p className="text-xs uppercase tracking-[0.18em] text-theme-primary">
              {account.bank}
            </p>

            <p className="mt-3 font-serif text-3xl tracking-wider text-theme-text">
              {account.accountNumber}
            </p>

            <p className="mb-6 mt-2 text-sm text-theme-text-muted">
              a.n. {account.accountName}
            </p>

            <CopyButton value={account.accountNumber} />
          </motion.article>
        ))}
      </StaggerReveal>

      <Reveal className="mx-auto mt-5 max-w-4xl">
        <div className="border border-theme-primary bg-theme-primary p-7 text-center text-theme-page sm:flex sm:items-center sm:justify-between sm:text-left">
          <div className="flex items-start justify-center gap-4 sm:justify-start">
            <Gift
              className="mt-1 shrink-0 text-theme-accent"
              size={27}
              strokeWidth={1.3}
            />

            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-theme-accent">
                Kirim hadiah
              </p>

              <p className="mt-2 max-w-xl text-sm leading-6 text-theme-surface-elevated">
                {WEDDING.giftAddress}
              </p>
            </div>
          </div>

          <CopyButton value={WEDDING.giftAddress} />
        </div>
      </Reveal>

      <Reveal className="mx-auto mt-7 max-w-2xl text-center">
        <p className="inline-flex items-center gap-2 text-sm italic text-theme-text-muted">
          <Heart
            size={15}
            className="fill-theme-accent text-theme-primary"
          />
          Terima kasih atas perhatian dan tanda kasih Anda.
        </p>
      </Reveal>
    </section>
  );
}
