import { motion } from "framer-motion";
import { CopyButton } from "./Utils";
import Reveal from "./animations/Reveal";
import StaggerReveal from "./animations/StaggerReveal";
import Heading from "./Heading";
import { Banknote, Gift, Heart } from "lucide-react";
import { WEDDING } from "../data";

export default function GiftSection() {
  return (
    <section id="gift" className="relative overflow-hidden bg-[#efe6d7] px-5 py-24">
      <div className="pointer-events-none absolute -right-14 top-10 h-48 w-48 rotate-45 border border-[#846846]/10" />
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
            className="relative overflow-hidden border border-[#c5b292] bg-[#fffdf8] p-7 shadow-[0_15px_45px_rgba(78,58,38,0.08)]"
          >
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#bda783]/15" />
            <Banknote className="mb-6 text-[#92724c]" size={30} strokeWidth={1.3} />
            <p className="text-xs uppercase tracking-[0.18em] text-[#987a55]">{account.bank}</p>
            <p className="mt-3 font-serif text-3xl tracking-wider text-[#49372a]">{account.accountNumber}</p>
            <p className="mb-6 mt-2 text-sm text-[#74685b]">a.n. {account.accountName}</p>
            <CopyButton value={account.accountNumber} />
          </motion.article>
        ))}
      </StaggerReveal>
      <Reveal className="mx-auto mt-5 max-w-4xl">
        <div className="border border-[#c5b292] bg-[#554235] p-7 text-center text-[#f8f0e4] sm:flex sm:items-center sm:justify-between sm:text-left">
          <div className="flex items-start justify-center gap-4 sm:justify-start">
            <Gift className="mt-1 shrink-0 text-[#dfccad]" size={27} strokeWidth={1.3} />
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#d7c2a1]">Kirim hadiah</p>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[#eee3d5]">{WEDDING.giftAddress}</p>
            </div>
          </div>
          <CopyButton value={WEDDING.giftAddress} />
        </div>
      </Reveal>

      <Reveal className="mx-auto mt-7 max-w-2xl text-center">
        <p className="inline-flex items-center gap-2 text-sm italic text-[#756756]">
          <Heart size={15} className="fill-[#96764d] text-[#96764d]" />
          Terima kasih atas perhatian dan tanda kasih Anda.
        </p>
      </Reveal>
    </section>
  );
}