"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Maximize2,
  Minimize2,
  Search,
  Filter as FilterIcon,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  ChevronDown,
  Check,
  X,
} from "lucide-react";

interface SubmissionTableProps {
  submissions: any[];
}

type FilterType = "all" | "active" | "pending";

const FluidToolbar: React.FC<SubmissionTableProps> = ({ submissions }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [openPanel, setOpenPanel] = useState<"search" | "filter" | null>(null);

  const isSearchOpen = openPanel === "search" || searchQuery.length > 0;
  const isFilterOpen = openPanel === "filter";

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const toggleFullScreen = () => setIsFullScreen((prev) => !prev);

  // Logic to handle search expansion and focus
  useEffect(() => {
    if (openPanel === "search") {
      searchInputRef.current?.focus();
    }
  }, [openPanel]);

  // Unified click outside logic for both views
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const clickedSearch = searchContainerRef.current?.contains(target);

      const clickedFilter = filterRef.current?.contains(target);

      // If click is outside both
      if (!clickedSearch && !clickedFilter) {
        // Collapse search only if empty
        if (!searchQuery) {
          setOpenPanel(null);
        } else {
          // If search has text, only close filter
          setOpenPanel((prev) => (prev === "filter" ? null : prev));
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchQuery]);

  // Filtered Data Logic
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((s) => {
      const matchesSearch =
        s.studentName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filter === "all" ? true : s.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [submissions, searchQuery, filter]);

  return (
    <>
      {/* Global Backdrop for Full Screen Mode */}
      <AnimatePresence>
        {isFullScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-9999 bg-slate-900/40 backdrop-blur-xl pointer-events-auto"
            onClick={toggleFullScreen}
          />
        )}
      </AnimatePresence>

      <motion.div
        layout
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className={`bg-white dark:bg-slate-900 rounded-md border  border-slate-100 overflow-hidden flex flex-col  transition-shadow duration-500 ${
          isFullScreen
            ? "fixed top-4 left-4 z-99999 right-4 bottom-4 md:top-12 md:left-12 md:right-12 md:bottom-12"
            : "relative w-full "
        }`}
      >
        {/* Table fluid options */}
        <div className="p-2 border-b border-slate-100 bg-white shrink-0">
          <div className="flex items-center justify-between gap-3">
            <p className="md:text-lg p-0! m-0!">Student Table</p>
            <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-200/50">
              {/* Morphing Search */}
              <motion.div
                layout
                ref={searchContainerRef}
                className="flex items-center bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenPanel((prev) =>
                      prev === "search" ? null : "search",
                    )
                  }
                  className={`p-2 transition-colors ${isSearchOpen || searchQuery ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"}`}
                >
                  <Search size={16} />
                </button>
                <AnimatePresence initial={false}>
                  {(isSearchOpen || searchQuery) && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 180, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      className="overflow-hidden flex items-center"
                    >
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search student..."
                        className="w-full pr-2 py-2 text-sm bg-transparent border-none focus:outline-none focus:ring-0 text-slate-700"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => {
                            setSearchQuery("");
                            setOpenPanel(null);
                          }}
                          className="pr-2 text-slate-300 hover:text-slate-500"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Persistent Expanding Filter */}
              <div className="relative">
                <motion.button
                  layout
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenPanel((prev) =>
                      prev === "filter" ? null : "filter",
                    );
                  }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all border ${
                    filter !== "all"
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-md"
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 shadow-sm"
                  }`}
                >
                  <FilterIcon size={16} />
                  <AnimatePresence mode="wait">
                    {(filter !== "all" || isFilterOpen) && (
                      <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "auto", opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        className="flex items-center gap-2 overflow-hidden whitespace-nowrap"
                      >
                        <span className="text-xs font-bold uppercase tracking-wider">
                          {filter === "all" ? "All" : filter}
                        </span>
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-300 ${isFilterOpen ? "rotate-180" : ""}`}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

                <AnimatePresence>
                  {isFilterOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-40 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-999"
                    >
                      {(["all", "active", "pending"] as FilterType[]).map(
                        (opt) => (
                          <button
                            key={opt}
                            onClick={() => {
                              setFilter(opt);
                              setOpenPanel(null);
                            }}
                            className={`w-full text-left px-4 py-2.5 text-xs font-bold uppercase flex items-center justify-between transition-colors ${
                              filter === opt
                                ? "text-indigo-600 bg-indigo-50"
                                : "text-slate-500 hover:bg-slate-50"
                            }`}
                          >
                            {opt}
                            {filter === opt && <Check size={14} />}
                          </button>
                        ),
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Expand Table Icon */}
              <motion.button
                layout
                onClick={toggleFullScreen}
                className="p-2.5 bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-100 rounded-xl transition-all shadow-sm"
                title={isFullScreen ? "Exit Full Screen" : "Expand Table"}
              >
                {isFullScreen ? (
                  <Minimize2 size={16} />
                ) : (
                  <Maximize2 size={16} />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Actual Table Body */}
        {submissions.length > 0 && (
          <table className="w-full text-left border-collapse border-none rounded-none">
            <thead className="sticky top-0 z-10 bg-slate-50 backdrop-blur-md">
              <tr
                className="
    [&>th]:px-3
    [&>th]:py-2
    [&>th]:text-base
    [&>th]:font-medium
    [&>th]:text-slate-800
    [&>th]:bg-slate-50
    [&>th]:border-none
    [&>th]:border-b
    [&>th]:border-slate-100
  "
              >
                <th className="">Student</th>
                <th className="hidden md:table-cell">Assignment</th>
                <th className="">Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <AnimatePresence mode="popLayout">
                {filteredSubmissions.length > 0 ? (
                  filteredSubmissions.map((sub) => (
                    <motion.tr
                      key={sub.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-gray-50 [&>td]:border-none px-3 py-2 bg-white transition-colors group cursor-pointer"
                    >
                      <td className="">
                        {sub.studentName}
                      </td>
                      <td className=" hidden md:table-cell">
                        <div className="text-xs font-semibold text-slate-500 truncate max-w-50">
                          {sub.assessment}
                        </div>
                      </td>

                      <td className="">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border ${
                            sub.status === "active"
                              ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                              : "bg-amber-50 border-amber-100 text-amber-700"
                          }`}
                        >
                          {sub.status === "active" ? (
                            <CheckCircle2 size={12} />
                          ) : (
                            <Clock size={12} />
                          )}
                          {sub.status}
                        </span>
                      </td>
                      <td className="text-right">
                        <button className="p-2 text-slate-300 hover:text-slate-600 rounded-xl hover:bg-white transition-all">
                          <MoreHorizontal size={18} />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <motion.tr
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <td colSpan={5} className="py-20 bg-background text-center">
                      <div className="flex flex-col items-center gap-3 text-slate-300">
                        <Search size={40} strokeWidth={1.5} />
                        <p className="font-bold text-sm">
                          No submissions matching your criteria
                        </p>
                      </div>
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        )}

       
      </motion.div>
    </>
  );
};

export default FluidToolbar;
