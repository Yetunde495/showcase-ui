"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode | any;
  reverse?: boolean;
  bgColor?: string;
};

export const AnimatedTabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}) => {
  const [active, setActive] = useState<Tab>(propTabs[0]);
  const [tabs, setTabs] = useState<Tab[]>(propTabs);
  const [hovering, setHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };

  // Auto rotate tabs every 30s
  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = propTabs.findIndex((t) => t.value === active.value);
      const nextIndex = (currentIndex + 1) % propTabs.length;
      moveSelectedTabToTop(nextIndex);

      // Scroll the newly active tab into view
      const btn = tabRefs.current[nextIndex];
      if (btn && containerRef.current) {
        const btnRect = btn.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();

        if (btnRect.left < containerRect.left) {
          // Button is cut off on the left
          containerRef.current.scrollBy({
            left: btnRect.left - containerRect.left - 20,
            behavior: "smooth",
          });
        } else if (btnRect.right > containerRect.right) {
          // Button is cut off on the right
          containerRef.current.scrollBy({
            left: btnRect.right - containerRect.right + 20,
            behavior: "smooth",
          });
        }
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [active, propTabs]);

  // Scroll functions for arrows
  const scrollLeft = () => {
    // containerRef.current?.scrollBy({ left: -150, behavior: "smooth" });
    const currentIndex = propTabs.findIndex((t) => t.value === active.value);
    const prevIndex = (currentIndex - 1) % propTabs.length;
    moveSelectedTabToTop(prevIndex);
    // Scroll the newly active tab into view
    const btn = tabRefs.current[prevIndex];
    if (btn && containerRef.current) {
      const btnRect = btn.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      if (btnRect.left < containerRect.left) {
        // Button is cut off on the left
        containerRef.current.scrollBy({
          left: btnRect.left - containerRect.left - 20,
          behavior: "smooth",
        });
      } else if (btnRect.right > containerRect.right) {
        // Button is cut off on the right
        containerRef.current.scrollBy({
          left: btnRect.right - containerRect.right + 20,
          behavior: "smooth",
        });
      }
    }
  };

  const scrollRight = () => {
    // containerRef.current?.scrollBy({ left: 150, behavior: "smooth" });
    const currentIndex = propTabs.findIndex((t) => t.value === active.value);
    const nextIndex = (currentIndex + 1) % propTabs.length;
    moveSelectedTabToTop(nextIndex);
    // Scroll the newly active tab into view
    const btn = tabRefs.current[nextIndex];
    if (btn && containerRef.current) {
      const btnRect = btn.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      if (btnRect.left < containerRect.left) {
        // Button is cut off on the left
        containerRef.current.scrollBy({
          left: btnRect.left - containerRect.left - 20,
          behavior: "smooth",
        });
      } else if (btnRect.right > containerRect.right) {
        // Button is cut off on the right
        containerRef.current.scrollBy({
          left: btnRect.right - containerRect.right + 20,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <>
      <div className="w-full flex justify-center items-center">
        {/* Left arrow */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 z-10 p-2 bg-white/10 shadow-md rounded-full hidden"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <motion.div
          ref={containerRef}
          className={cn(
            "flex flex-row gap-2 items-center rounded-full bg-white max-w-4xl py-2 px-2 drop-shadow-md justify-center relative overflow-auto no-scrollbar w-auto",
            containerClassName
          )}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={(_, info) => {
            if (info.offset.x < -50) {
              scrollRight();
            } else if (info.offset.x > 50) {
              scrollLeft();
            }
          }}
        >
          {/* Left blur */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-linear-to-r from-white to-transparent z-10" />

          {/* Right blur */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-linear-to-l from-white to-transparent z-10" />

          {propTabs.map((tab, idx) => (
            <button
              key={tab.title}
              ref={(el) => {
                tabRefs.current[idx] = el;
              }}
              onClick={() => {
                moveSelectedTabToTop(idx);
              }}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              className={cn(
                "relative px-3 py-2 font-semibold rounded-full",
                "flex items-center justify-center",
                "whitespace-nowrap overflow-hidden",
                "shrink transition-all duration-300",
                tabClassName
              )}
              style={{
                width: active.value === tab.value ? "auto" : 140, // 🔥 key line
                minWidth: active.value === tab.value ? "max-content" : 140,
                transformStyle: "preserve-3d",
              }}
            >
              {active.value === tab.value && (
                <motion.div
                  layoutId="clickedbutton"
                  transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                  className={cn(
                    "absolute inset-0 bg-[#21A878]  rounded-full ",
                    activeTabClassName
                  )}
                />
              )}

              <span
                className={cn(
                  "relative block transition-all duration-300",
                  active.value === tab.value ? "text-white" : "text-black",
                  "dark:text-white"
                )}
              >
                <span
                  className="block whitespace-nowrap transition-all duration-300"
                  style={
                    active.value !== tab.value
                      ? {
                          WebkitMaskImage:
                            "linear-gradient(to right, black 75%, transparent 100%)",
                          maskImage:
                            "linear-gradient(to right, black 75%, transparent 100%)",
                        }
                      : undefined
                  }
                >
                  {tab.title}
                </span>
              </span>
            </button>
          ))}
        </motion.div>

        {/* Right arrow */}
        <button
          onClick={scrollRight}
          className="absolute right-0 z-10 p-2 bg-white/10 shadow-md rounded-full hidden"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className={`${active?.bgColor && "mt-[7%]"}`}>
        <FadeInDiv
          tabs={tabs}
          active={active}
          key={active.value}
          hovering={hovering}
          className={cn("mt-20", contentClassName)}
        />
      </div>
    </>
  );
};

export const FadeInDiv = ({
  className,
  tabs,
  active,
}: {
  className?: string;
  key?: string;
  tabs: Tab[];
  active: Tab;
  hovering?: boolean;
}) => {
  return (
    <div
      className={` ${active?.reverse ? "md:pr-[5%]" : "md:pl-[5%]"} ${
        active?.bgColor
      } relative w-full h-full overflow-hidden  max-md:px-[5%]`}
    >
      {tabs.map((tab) =>
        tab.value === active.value ? (
          <motion.div
            key={tab.value}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{
              duration: 0.8,
              delay: 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={cn(" w-full h-full", className)}
          >
            {tab.content}
          </motion.div>
        ) : null
      )}
    </div>
  );
};
