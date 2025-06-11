import { motion } from "motion/react";
const variantSpan = {
  visible: {
    y: [5, -5, 6],
    transition: {
      repeat: Infinity,
      duration: 0.7,
    },
  },
};
export const Loader = () => {
  return (
    <div>
      <motion.span
        variants={variantSpan}
        animate="visible"
        className="bg-[var(--color-pink-primary)] rounded-full h-5 w-5 inline-block"
      ></motion.span>
    </div>
  );
};
