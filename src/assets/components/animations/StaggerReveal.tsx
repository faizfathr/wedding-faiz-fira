import type { ReactNode } from "react";
import { Children } from "react";
import { motion, type Variants } from "framer-motion";

type StaggerRevealProps = {
    children: ReactNode;
    className?: string;
    stagger?: number;
    delay?: number;
    once?: boolean;
};

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.14,
            delayChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 35,
        scale: 0.97,
        filter: "blur(5px)",
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export default function StaggerReveal({
    children,
    className = "",
    stagger = 0.14,
    delay = 0.1,
    once = true,
}: StaggerRevealProps) {
    return (
        <motion.div
            className={className}
            variants={{
                ...containerVariants,
                visible: {
                    transition: {
                        staggerChildren: stagger,
                        delayChildren: delay,
                    },
                },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{
                once,
                amount: 0.15,
                margin: "0px 0px -70px 0px",
            }}
        >
            {Children.map(children, (child, index) => (
                <motion.div
                    variants={itemVariants}
                    custom={index}
                    className="h-full"
                >
                    {child}
                </motion.div>
            ))}
        </motion.div>
    );
}