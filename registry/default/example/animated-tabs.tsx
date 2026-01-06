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
  showArrows = false,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
  showArrows?: boolean;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = propTabs[activeIndex];
  const [hovering, setHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const goToIndex = (idx: number) => {
    setActiveIndex(idx);

    const btn = tabRefs.current[idx];
    const container = containerRef.current;
    if (!btn || !container) return;

    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    const offset =
      btnRect.left -
      containerRect.left -
      containerRect.width / 2 +
      btnRect.width / 2;

    container.scrollBy({
      left: offset,
      behavior: "smooth",
    });
  };

  const isOverflowing = (el?: HTMLElement | null) =>
    el ? el.scrollWidth > el.clientWidth : false;

  // Auto rotate tabs every 30s
  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = propTabs.findIndex((t) => t.value === active.value);
      const nextIndex = (currentIndex + 1) % propTabs.length;
      goToIndex(nextIndex);

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
    }, 4000);

    return () => clearInterval(interval);
  }, [active, propTabs]);

  return (
    <>
      <div className="w-full flex justify-center items-center">
        {/* Left arrow */}
        {showArrows && activeIndex !== 0 && (
          <button
            onClick={() => goToIndex(activeIndex - 1)}
            className="absolute left-0.5 z-10 p-2 bg-white/10 shadow-md rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        <div className="relative bg-white dark:bg-black max-w-4xl py-2 px-[3%] rounded-full drop-shadow-md w-full">
          <div className="pointer-events-none absolute rounded-l-full left-0 top-0 h-full w-12 bg-linear-to-r from-white dark:from-black to-transparent z-10" />

          <motion.div
            ref={containerRef}
            className={cn(
              "flex flex-row gap-3 items-center rounded-full ",
              "relative overflow-x-auto no-scrollbar",
              "justify-start",
              containerClassName
            )}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={(_, info) => {
              if (info.offset.x < -50 && activeIndex < propTabs.length - 1) {
                goToIndex(activeIndex + 1);
              }
              if (info.offset.x > 50 && activeIndex > 0) {
                goToIndex(activeIndex - 1);
              }
            }}
          >
            {propTabs.map((tab, idx) => (
              <button
                key={tab.title}
                ref={(el) => {
                  tabRefs.current[idx] = el;
                }}
                onClick={() => {
                  goToIndex(idx);
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
                      "absolute inset-0 dark:bg-white  rounded-full ",
                      activeTabClassName
                    )}
                  />
                )}

                <span
                  className={cn(
                    "relative block transition-all duration-300 font-normal",
                    active.value === tab.value
                      ? "text-white dark:text-black"
                      : "text-black dark:text-white",
                    ""
                  )}
                >
                  <span
                    ref={(el) => {
                      if (el && activeIndex !== idx && isOverflowing(el)) {
                        el.style.webkitMaskImage =
                          "linear-gradient(to right, black 80%, transparent 100%)";
                        el.style.maskImage =
                          "linear-gradient(to right, black 80%, transparent 100%)";
                      }
                    }}
                    className="block whitespace-nowrap"
                  >
                    {tab.title}
                  </span>
                </span>
              </button>
            ))}
          </motion.div>

          <div className="pointer-events-none absolute rounded-r-full right-0 top-0 h-full w-12 bg-linear-to-l from-white dark:from-black to-transparent z-10" />
        </div>

        {/* Right arrow */}
        {showArrows && activeIndex !== propTabs.length - 1 && (
          <button
            onClick={() => goToIndex(activeIndex + 1)}
            className="absolute right-0.5 z-10 p-2 bg-white/10 shadow-md rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className={`${active?.bgColor && "mt-[2%]"}`}>
        <FadeInDiv
          tabs={propTabs}
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
