import { easeIn, motion } from "motion/react";
const variantSpan = {
  visible: {
    y: [5, -5, 6],
    x: [3, 6, 5],
    transition: {
      repeat: Infinity,
      duration: 0.7,
    },
  },
};
export const Loader = () => {
  return (
    <div className="ml-5">
      <motion.span
        variants={variantSpan}
        animate="visible"
        className="bg-[var(--color-pink-primary)] rounded-full h-5 w-5 inline-block"
      ></motion.span>
    </div>
  );
};
