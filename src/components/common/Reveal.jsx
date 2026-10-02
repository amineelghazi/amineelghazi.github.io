import { motion } from "framer-motion";

/** Fades (and slides) its content in the first time it scrolls into view. */
export default function Reveal({ delay = 0, x = 0, y = 16, margin = -60, duration = 0.45, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: `${margin}px` }}
      transition={{ duration, delay }}
      {...props}
    />
  );
}
