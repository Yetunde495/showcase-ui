"use client";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { type TOCItemType, useActiveAnchors } from "fumadocs-core/toc";
import { RiExpandUpDownLine } from "react-icons/ri";
import { MdExpandMore } from "react-icons/md";

export function TocPill({ items }: { items: TOCItemType[] }) {
  const progress = useScrollProgress();
  const [open, setOpen] = useState(false);

  const activeAnchors = useActiveAnchors();

  const activeItem = useMemo(() => {
    if (activeAnchors.length === 0) return undefined;
    const first = activeAnchors[0];
    return items.find((item) => item.url === `#${first}`);
  }, [activeAnchors, items]);

  if (items.length === 0) return null;

  return (
    <div
      className="
        fixed bottom-6 left-1/2 z-50
        -translate-x-1/2 md:-translate-x-[30%] xl:-translate-x-1/2
        w-[min(92vw,420px)]
      "
    >
      <motion.div
        layout
        className="
          rounded-[30px]
          bg-background/70
          backdrop-blur-xl
          border border-fd-border/60
          shadow-[0_8px_30px_rgba(0,0,0,0.12)]
          overflow-hidden
        "
      >
        {/* Header (always visible) */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="
            flex w-full items-center gap-2
            px-4 py-2 text-sm
            text-left cursor-pointer
          "
        >
          <span className="truncate font-medium">{activeItem?.title}</span>

          <span className="ml-auto text-lg">
            {open ? <MdExpandMore /> : <RiExpandUpDownLine />}
          </span>
        </button>

        {/* Progress */}
        <div className="">
          <div className="relative -mt-1 h-1 w-full overflow-hidden rounded-[30px]">
            <div
              className="absolute left-0 top-0 h-full bg-fd-foreground transition-[width] duration-150"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>

        {/* Expandable TOC */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="
                border-t border-fd-border/50
                max-h-[50vh]
                overflow-y-auto
              "
            >
              <div className="px-4 py-2 text-sm">
                {items.map((item) => (
                  <a
                    key={item.url}
                    href={`${item.url}`}
                    onClick={() => setOpen(false)}
                    className={`
                      block p-1.5
                      rounded-full
                      text-fd-muted-foreground
                      hover:text-fd-foreground
                      transition-colors
                      ${activeItem?.url === item.url ? "bg bg-fd-background  text-fd-primary" : ""}
                    `}
                    style={{
                      paddingLeft: 12 * Math.max(item.depth - 1, 0),
                    }}
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
