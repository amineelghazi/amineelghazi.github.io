import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const Chevron = ({ dir = "right" }) => (
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={dir === "right" ? "M9 6l6 6-6 6" : "M15 6l-6 6 6 6"} />
  </svg>
);

const arrowBtn =
  "absolute top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white backdrop-blur transition hover:bg-black/70";

export default function ImageCarousel({ images = [], alt = "" }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const count = images.length;

  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

  // Clavier + blocage du scroll quand le lightbox est ouvert
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Escape") setOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, next, prev]);

  if (count === 0) return null;

  return (
    <>
      {/* Carousel dans la carte */}
      <div className="group/carousel relative h-full w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={images[index]}
            alt={`${alt} ${index + 1}`}
            onClick={() => setOpen(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 h-full w-full cursor-zoom-in object-cover"
          />
        </AnimatePresence>

        {count > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Image précédente"
              className={`${arrowBtn} left-3 opacity-0 group-hover/carousel:opacity-100 focus:opacity-100`}
            >
              <Chevron dir="left" />
            </button>
            <button
              onClick={next}
              aria-label="Image suivante"
              className={`${arrowBtn} right-3 opacity-0 group-hover/carousel:opacity-100 focus:opacity-100`}
            >
              <Chevron dir="right" />
            </button>
            <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Aller à l'image ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-5 bg-cyan-400" : "w-1.5 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Lightbox (portal vers document.body) */}
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
              onClick={() => setOpen(false)}
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Fermer"
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>

              {count > 1 && (
                <button
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  aria-label="Image précédente"
                  className={`${arrowBtn} left-4`}
                >
                  <Chevron dir="left" />
                </button>
              )}

              <AnimatePresence mode="wait">
                <motion.img
                  key={index}
                  src={images[index]}
                  alt={`${alt} ${index + 1}`}
                  onClick={(e) => e.stopPropagation()}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
                />
              </AnimatePresence>

              {count > 1 && (
                <button
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  aria-label="Image suivante"
                  className={`${arrowBtn} right-4`}
                >
                  <Chevron dir="right" />
                </button>
              )}

              <span className="absolute bottom-4 text-sm text-slate-400">
                {index + 1} / {count}
              </span>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}