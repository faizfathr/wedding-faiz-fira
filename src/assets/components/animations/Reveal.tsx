import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

export type RevealDirection =
    | "up"
    | "down"
    | "left"
    | "right"
    | "scale"
    | "fade";

type RevealProps = {
    children: ReactNode;
    direction?: RevealDirection;
    delay?: number;
    duration?: number;
    distance?: number;
    once?: boolean;
    amount?: number;
    className?: string;
};

function createVariants(
    direction: RevealDirection,
    distance: number,
): Variants {
    const hiddenVariants: Record<
        RevealDirection,
        {
            opacity: number;
            x?: number;
            y?: number;
            scale?: number;
            filter?: string;
        }
    > = {
        up: {
            opacity: 0,
            y: distance,
            filter: "blur(5px)",
        },
        down: {
            opacity: 0,
            y: -distance,
            filter: "blur(5px)",
        },
        left: {
            opacity: 0,
            x: distance,
            filter: "blur(5px)",
        },
        right: {
            opacity: 0,
            x: -distance,
            filter: "blur(5px)",
        },
        scale: {
            opacity: 0,
            scale: 0.92,
            filter: "blur(5px)",
        },
        fade: {
            opacity: 0,
            filter: "blur(4px)",
        },
    };

    return {
        hidden: hiddenVariants[direction],
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
        },
    };
}

export default function Reveal({
    children,
    direction = "up",
    delay = 0,
    duration = 0.8,
    distance = 35,
    className = "",
}: RevealProps) {
    const variants = createVariants(direction, distance);

    return (
        <motion.div
            className={className}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{
                once: true,
                amount: 0.2,
                margin: "0px 0px -70px 0px",
            }}
            transition={{
                duration,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            {children}
        </motion.div>
    );
}