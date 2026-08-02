import { motion } from "framer-motion";
import Heading from "./Heading";
import { STORIES } from "../data";
import Reveal from "./animations/Reveal";

export default function StorySection() {
  return (
    <section id="story" className="bg-theme-surface px-5 py-24">
      <Heading eyebrow="Perjalanan kami" title="Cerita Cinta" />
      <div className="mx-auto max-w-3xl">
        {STORIES.map((story, index) => (
          <Reveal
            key={story.year}
            direction={index % 2 === 0 ? "right" : "left"}
            delay={index * 0.08}
            duration={0.85}
          >
            <article className="grid grid-cols-[64px_1fr] gap-5 border-l border-theme-border pb-12 pl-7 last:pb-0">
              <motion.div
                whileHover={{
                  scale: 1.1,
                  rotate: -3,
                }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 18,
                }}
                className="-ml-9 flex h-16 w-16 items-center justify-center rounded-full border border-theme-border bg-theme-surface-elevated font-serif text-theme-primary"
              >
                {story.year}
              </motion.div>

              <div className="pt-2">
                <h3 className="font-serif text-2xl text-theme-text">
                  {story.title}
                </h3>

                <p className="mt-2 leading-7 text-theme-text-muted">
                  {story.description}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
