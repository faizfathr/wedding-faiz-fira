import { motion } from "framer-motion";
import Heading from "./Heading";
import { STORIES } from "../data";
import Reveal from "./animations/Reveal";

export default function StorySection() {
  return (
    <section id="story" className="bg-[#fffdf8] px-5 py-24">
      <Heading eyebrow="Perjalanan kami" title="Cerita Cinta" />
      <div className="mx-auto max-w-3xl">
        {STORIES.map((story, index) => (
          <Reveal
            key={story.year}
            direction={index % 2 === 0 ? "right" : "left"}
            delay={index * 0.08}
            duration={0.85}
          >
            <article className="grid grid-cols-[64px_1fr] gap-5 border-l border-[#c4b293] pb-12 pl-7 last:pb-0">
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
                className="-ml-[36px] flex h-16 w-16 items-center justify-center rounded-full border border-[#b29b77] bg-[#f2eadc] font-serif text-[#6a5338]"
              >
                {story.year}
              </motion.div>

              <div className="pt-2">
                <h3 className="font-serif text-2xl text-[#4b392c]">
                  {story.title}
                </h3>

                <p className="mt-2 leading-7 text-[#74685e]">
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