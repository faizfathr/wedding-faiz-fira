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
      <div className="mx-auto mb-6 h-44 w-44 overflow-hidden rounded-full border border-[#b49a73] bg-[#eee5d5] shadow-[0_12px_35px_rgba(80,60,40,0.12)]">
        {/* {photoUrl ? (
          {photoUrl}
        ) : ( */}
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-serif text-6xl text-[#765c3d]">
              {initials}
            </span>
          </div>
        {/* )} */}
      </div>

      <h3 className="font-serif text-3xl text-[#4b392c]">
        {name}
      </h3>

      <p className="mt-3 text-sm leading-6 text-[#71655a]">
        {parents}
      </p>

      <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#9b7d55]">
        {origin}
      </p>
    </motion.article>
  );
}