"use client";

import * as React from "react";
import Image from "next/image";
import {
  MotionConfig,
  motion,
  useAnimationControls,
  useReducedMotion,
} from "motion/react";
import { HERO_CONTENT, type HeroIconKey } from "@/lib/constants/hero-content";

const ICONS: Record<HeroIconKey, string> = {
  idCard: "/icons/hero/id-card.png",
  laptop: "/icons/hero/laptop.png",
  gear: "/icons/hero/gear.png",
  brick: "/icons/hero/brick.png",
  palette: "/icons/hero/palette.png",
  rocket: "/icons/hero/rocket.png",
  coffee: "/icons/hero/coffee.png",
};

const wordVariants = {
  hidden: { opacity: 0, y: "0.6em" },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.34,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: 0.08 + index * 0.017,
    },
  }),
};

const iconVariants = {
  hidden: { scale: 0, rotate: -12 },
  visible: (index: number) => ({
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 16,
      delay: 0.86 + index * 0.065,
    },
  }),
};

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.38, delay },
  }),
};

function HeroIcon({
  icon,
  index,
  canHover,
  reducedMotion,
  controls,
}: {
  icon: HeroIconKey;
  index: number;
  canHover: boolean;
  reducedMotion: boolean;
  controls: ReturnType<typeof useAnimationControls>;
}) {
  const hoverEnabled = canHover && !reducedMotion;

  return (
    <motion.span
      aria-hidden="true"
      className="hero-icon"
      whileHover={
        hoverEnabled
          ? {
              scale: 1.5,
              rotate: index % 2 === 0 ? 8 : -8,
              zIndex: 2,
              transition: { type: "spring", stiffness: 300, damping: 14 },
            }
          : undefined
      }
    >
      <motion.span
        animate={controls}
        className="hero-icon-art"
        custom={index}
        initial={false}
        variants={iconVariants}
      >
        <Image src={ICONS[icon]} alt="" width={160} height={160} priority />
      </motion.span>
    </motion.span>
  );
}

export function Hero() {
  const controls = useAnimationControls();
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = Boolean(prefersReducedMotion);
  const [canHover, setCanHover] = React.useState(false);

  React.useEffect(() => {
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updatePointer = () => setCanHover(pointerQuery.matches);
    updatePointer();
    pointerQuery.addEventListener("change", updatePointer);

    if (reducedMotion) {
      controls.set("visible");
    } else {
      controls.set("hidden");
      controls.start("visible");
    }

    return () => pointerQuery.removeEventListener("change", updatePointer);
  }, [controls, reducedMotion]);

  let iconIndex = 0;

  return (
    <MotionConfig reducedMotion="user">
      <section className="hero-section border-b border-editorial-border">
        <div className="hero-content">
          <motion.p
            animate={controls}
            className="hero-availability"
            initial={false}
            custom={0}
            variants={fadeVariants}
          >
            <HeroIcon
              icon="idCard"
              index={iconIndex++}
              canHover={canHover}
              reducedMotion={reducedMotion}
              controls={controls}
            />
            <span>{HERO_CONTENT.availability}</span>
          </motion.p>

          <h1 className="hero-headline font-display">
            {HERO_CONTENT.headline.map((word, index) => (
              <React.Fragment key={`${word.text}-${index}`}>
                <motion.span
                  animate={controls}
                  className={`hero-word${word.italic ? " hero-word-italic" : ""}`}
                  custom={index}
                  initial={false}
                  variants={wordVariants}
                >
                  {word.text}
                  {word.iconAfter && (
                    <HeroIcon
                      icon={word.iconAfter}
                      index={iconIndex++}
                      canHover={canHover}
                      reducedMotion={reducedMotion}
                      controls={controls}
                    />
                  )}
                </motion.span>{" "}
              </React.Fragment>
            ))}
          </h1>

          <motion.p
            animate={controls}
            className="hero-subtext"
            custom={0.88}
            initial={false}
            variants={fadeVariants}
          >
            {HERO_CONTENT.subtext}
          </motion.p>

          <motion.div
            animate={controls}
            className="hero-actions"
            custom={0.92}
            initial={false}
            variants={fadeVariants}
          >
            <a className="hero-button hero-button-primary" href="#work">
              {HERO_CONTENT.primaryAction}
            </a>
            <a className="hero-button hero-button-secondary" href="#about">
              {HERO_CONTENT.secondaryAction}
            </a>
          </motion.div>

          <motion.p
            animate={controls}
            className="hero-badge"
            custom={0.92}
            initial={false}
            variants={fadeVariants}
          >
            {HERO_CONTENT.badge}
          </motion.p>
        </div>
      </section>
    </MotionConfig>
  );
}
