import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../hooks/use-outside-click";
import { Journal } from "../types";
import { Building, Award, Clock } from "lucide-react";

interface ExpandableJournalCardsProps {
  journals: Journal[];
}

export function ExpandableJournalCards({ journals }: ExpandableJournalCardsProps) {
  const [active, setActive] = useState<Journal | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-sm h-full w-full z-10"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.Name}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="absolute top-2 right-2 bg-blue-600 text-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              X
            </motion.button>

            <motion.div
              layoutId={`card-${active.Name}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] text-black bg-zinc-700 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100
 rounded-3xl overflow-hidden p-4 shadow-lg"
            >
              <h3 className="font-bold text-xl text-center mb-2">{active.Name}</h3>
              <div className="flex items-center justify-between p-2">
                <div className="flex items-center  space-x-2">
                  <Building className="w-5 h-5 text-blue-600" />
                  <span>{active.Publisher}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  <span>JIF: {active.JIF}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span>Decision Time: {active.Decision_Time} days</span>
                </div>
              </div>
              
              
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {journals.map((journal) => (
          <motion.div
            key={journal.id}
            layoutId={`card-${journal.Name}-${id}`}
            onClick={() => setActive(journal)}
            className="p-4 border rounded-lg shadow-sm cursor-pointer text-black hover:bg-gray-50"
          >
            <h3 className="font-semibold text-lg">{journal.Name}</h3>
            <p className="text-sm font-semibold text-blue-700">Publisher: {journal.Publisher}</p>
          </motion.div>
        ))}
      </div>
    </>
  );
}
