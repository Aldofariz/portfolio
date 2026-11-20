"use client";

import * as React from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ABOUT_CONTENT } from "@/lib/constants/about-content";

interface StatementWordProps {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  onEllipseInView: boolean;
  statementInView: boolean;
  reducedMotion: boolean;
}

function StatementWord({
  word,
  index,
  total,
  progress,
  onEllipseInView,
  statementInView,
  reducedMotion,
}: StatementWordProps) {
  const start = index / total;
  const end = Math.min(1, (index + 1) / total);
  const fill = useTransform(progress, [start, end], ["#c3c3c0", "#141413"]);
  if (word === "effortless") {
    return (
      <motion.span className="about-statement-word" style={!reducedMotion && statementInView ? { color: fill } : undefined}>
        <span className="about-ellipse-word">
          {word}
          <motion.svg
            aria-hidden="true"
            className="about-effortless-ellipse"
            viewBox="0 0 220 78"
            focusable="false"
          >
            <motion.ellipse
              initial={false}
              animate={reducedMotion ? "immediate" : onEllipseInView ? "drawn" : "undrawn"}
              variants={{
                undrawn: { pathLength: 0 },
                immediate: { pathLength: 1, transition: { duration: 0 } },
                drawn: {
                  pathLength: 1,
                  transition: { duration: 0.9, ease: "easeInOut" },
                },
              }}
              cx="110"
              cy="39"
              rx="102"
              ry="29"
              fill="none"
              stroke="currentColor"
              strokeDasharray="6 5"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
          </motion.svg>
        </span>
      </motion.span>
    );
  }

  return (
    <motion.span
      className="about-statement-word"
      style={!reducedMotion && statementInView ? { color: fill } : undefined}
    >
      {word}
    </motion.span>
  );
}

export function AboutStatement() {
  const statementRef = React.useRef<HTMLDivElement>(null);
  const ellipseRef = React.useRef<HTMLSpanElement>(null);
  const statementInView = useInView(statementRef);
  const ellipseInView = useInView(ellipseRef, { once: true, amount: 0.5 });
  const reducedMotion = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({
    target: statementRef,
    offset: ["start 0.85", "start 0.35"],
  });
  const allWords = ABOUT_CONTENT.statement.flatMap((part) => part.text.split(" "));
  let wordIndex = 0;

  return (
    <div ref={statementRef} className="about-statement-block">
      <h2 className="sr-only">About</h2>
      <p className="about-statement-label">{ABOUT_CONTENT.statementLabel}</p>
      <p className="about-statement">
        {ABOUT_CONTENT.statement.map((part, partIndex) => (
          <span
            className={`about-statement-part about-statement-part-${part.style}`}
            key={part.style}
          >
            {part.text.split(" ").map((word) => {
              const index = wordIndex++;
              const isEffortless = word === "effortless";

              return (
                <React.Fragment key={`${partIndex}-${word}-${index}`}>
                  <span ref={isEffortless ? ellipseRef : undefined} className="about-word-anchor">
                    <StatementWord
                      word={word}
                      index={index}
                      total={allWords.length}
                      progress={scrollYProgress}
                      onEllipseInView={ellipseInView}
                      statementInView={statementInView}
                      reducedMotion={reducedMotion}
                    />
                  </span>{" "}
                </React.Fragment>
              );
            })}
          </span>
        ))}
      </p>
    </div>
  );
}
