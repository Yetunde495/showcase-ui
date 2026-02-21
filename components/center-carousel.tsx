"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export type CarouselItem = {
  id: string;
  image: string;
  title?: string;
  subtitle?: string;
};

type CenterCarouselProps = {
  items: CarouselItem[];
  cardWidth?: number;
  spacing?: number;
};

function getCircularOffset(index: number, activeIndex: number, length: number) {
  let diff = index - activeIndex;

  if (diff > length / 2) diff -= length;
  if (diff < -length / 2) diff += length;

  return diff;
}

export function CenterCarousel({
  items,
  cardWidth = 300,
  spacing = 300,
}: CenterCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const VISIBLE_RANGE = 2;

  const extendedItems = items.flatMap((item, i) => [
    { ...item, _virtualIndex: i - items.length },
    { ...item, _virtualIndex: i },
    { ...item, _virtualIndex: i + items.length },
  ]);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    startAutoSlide();
    return stopAutoSlide;
  }, []);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % items.length);
    }, 3500);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 z-20 
    bg-linear-to-r 
    from-[#ffffff] via-transparent to-[#ffffff]"
      />

      <div className="relative whitespace-nowrap mx-auto gap-3 flex h-105 items-center justify-center">
        {items.map((item, index) => {
          // const offset = item._virtualIndex - activeIndex;
          const offset = getCircularOffset(index, activeIndex, items.length);

          const absOffset = Math.abs(offset);
          const GAP = 10;

          if (Math.abs(offset) > VISIBLE_RANGE) return null;

          return (
            <motion.div
              key={`${item.id}`}
              className="absolute rounded-2xl bg-white shadow-xl mx-4 overflow-hidden"
              style={{ width: cardWidth }}
              animate={{
                x: offset * (cardWidth + GAP),
                scale: absOffset === 0 ? 1 : absOffset === 1 ? 0.8 : 0.7,
                y: absOffset === 0 ? 0 : 14,
                opacity: absOffset > 2 ? 0 : 1,
                zIndex: 10 - absOffset,
                filter: absOffset === 0 ? "blur(0px)" : "blur(1.5px)",
              }}
              transition={{
                type: "spring",
                stiffness: 110,
                damping: 24,
                mass: 1.3,
              }}
            >
              <img
                src={item.image}
                alt={item.title ?? ""}
                className="h-full w-full object-cover"
              />

              {(item.title || item.subtitle) && (
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm opacity-80">{item.subtitle}</p>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
