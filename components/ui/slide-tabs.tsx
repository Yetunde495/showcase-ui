"use client";

import { motion } from "framer-motion";
import React, {
  createContext,
  useContext,
  useState,
  useId,
} from "react";

type TabsContextType = {
  active: string;
  setActive: (value: string) => void;
  layoutId: string;
};

const TabsContext = createContext<TabsContextType | null>(null);

interface SlideTabsProps {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}

export function SlideTabs({
  defaultValue,
  children,
  className,
}: SlideTabsProps) {
  const [active, setActive] = useState(defaultValue);

  // 👇 unique ID per instance
  const id = useId();

  return (
    <TabsContext.Provider
      value={{
        active,
        setActive,
        layoutId: `slide-tab-${id}`,
      }}
    >
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function SlideTabsList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative flex w-fit rounded-xl bg-slate-100 dark:bg-white/5 p-1 ${className}`}
    >
      {children}
    </div>
  );
}

export function SlideTabsTrigger({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  const context = useContext(TabsContext);
  if (!context)
    throw new Error("SlideTabsTrigger must be used inside SlideTabs");

  const { active, setActive, layoutId } = context;
  const isActive = active === value;

  return (
    <button
      onClick={() => setActive(value)}
      className="relative px-4 py-2 text-sm font-medium z-10"
    >
      {isActive && (
        <motion.div
          layoutId={layoutId} // 👈 now unique per tab group
          className="absolute inset-0 rounded-lg bg-white dark:bg-slate-800 shadow-sm"
          transition={{ type: "spring", stiffness: 500, damping: 40 }}
        />
      )}

      <span
        className={`relative transition-colors ${
          isActive
            ? "text-slate-900 dark:text-white"
            : "text-slate-500 dark:text-slate-400"
        }`}
      >
        {children}
      </span>
    </button>
  );
}

export function SlideTabsContent({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const context = useContext(TabsContext);
  if (!context)
    throw new Error("SlideTabsContent must be used inside SlideTabs");

  const { active } = context;

  if (active !== value) return null;

  return (
    <motion.div
      key={value}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`${className ?? ' mt-5'}`}
    >
      {children}
    </motion.div>
  );
}