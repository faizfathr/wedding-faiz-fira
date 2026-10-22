import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type TypewriterTextProps = {
    text: string;
    speed?: number;
    startDelay?: number;
};

export default function TypewriterText({
    text,
    speed = 35,
    startDelay = 450,
}: TypewriterTextProps) {
    const [displayedText, setDisplayedText] =
        useState("");

    const [isTyping, setIsTyping] =
        useState(false);

    useEffect(() => {
        const safeText = text?.trim() ?? "";

        setDisplayedText("");

        if (!safeText) {
            setIsTyping(false);
            return;
        }

        let characterIndex = 0;
        let typingTimer: number | undefined;

        setIsTyping(true);

        const delayTimer = window.setTimeout(() => {
            typingTimer = window.setInterval(() => {
                characterIndex += 1;

                setDisplayedText(
                    safeText.slice(0, characterIndex),
                );

                if (
                    characterIndex >= safeText.length
                ) {
                    if (typingTimer !== undefined) {
                        window.clearInterval(typingTimer);
                    }

                    setIsTyping(false);
                }
            }, speed);
        }, startDelay);

        return () => {
            window.clearTimeout(delayTimer);

            if (typingTimer !== undefined) {
                window.clearInterval(typingTimer);
            }
        };
    }, [text, speed, startDelay]);

    return (
        <>
            {displayedText}

            <motion.span
                aria-hidden="true"
                animate={{
                    opacity: isTyping
                        ? [1, 0, 1]
                        : [0.7, 0, 0.7],
                }}
                transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="ml-0.5 inline-block text-theme-accent"
            >
                |
            </motion.span>
        </>
    );
}