import { motion } from "framer-motion";

type PersonCardProps = {
  initials: string;
  name: string;
  parents: string;
  origin: string;
  photoUrl?: string;
  photoAlt?: string;
};

export default function PersonCard({
  initials,
  name,
  parents,
  origin,
  // photoUrl = undefined,
  // photoAlt = "Foto orang yang diundang",
}: PersonCardProps) {
  return (
    <motion.article whileHover={{ y: -5 }} className="text-center">
      <div className="mx-auto mb-6 h-44 w-44 overflow-hidden rounded-full border border-theme-border bg-theme-surface-elevated shadow-[0_12px_35px_rgba(125,90,90,0.12)]">
        {/* {photoUrl ? (
          {photoUrl}
        ) : ( */}
        <div className="flex h-full w-full items-center justify-center">
          <span className="font-serif text-6xl text-theme-primary">
            {initials}
          </span>
        </div>
        {/* )} */}
      </div>

      <h3 className="font-serif text-3xl text-theme-text">
        {name}
      </h3>

      <p className="mt-3 text-sm leading-6 text-theme-text-muted">
        {parents}
      </p>

      <p className="mt-2 text-xs uppercase tracking-[0.18em] text-theme-primary">
        {origin}
      </p>
    </motion.article>
  );
}
