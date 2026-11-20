"use client";

import * as React from "react";
import Image from "next/image";
import {
  MotionConfig,
  motion,
  useAnimationControls,
  useInView,
  useReducedMotion,
} from "motion/react";
import { ABOUT_CONTENT } from "@/lib/constants/about-content";

const settleVariants = {
  hidden: { opacity: 0, y: 16, rotate: 2 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const folderVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

function BinderClip() {
  return (
    <svg className="binder-clip" viewBox="0 0 54 58" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="binder-metal" x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#f8fafc" />
          <stop offset=".45" stopColor="#9ca3af" />
          <stop offset="1" stopColor="#e5e7eb" />
        </linearGradient>
      </defs>
      <path d="M16 48V12c0-10 22-10 22 0v36M16 18c0 13 22 13 22 0" fill="none" stroke="url(#binder-metal)" strokeWidth="4" />
      <path d="M11 20c0 15 32 15 32 0" fill="none" stroke="#6b7280" strokeWidth="2" />
    </svg>
  );
}

function PaperClip() {
  return (
    <svg className="bio-paperclip" viewBox="0 0 44 70" aria-hidden="true" focusable="false">
      <path d="M30 12v39a11 11 0 0 1-22 0V17a7 7 0 0 1 14 0v33a3 3 0 0 1-6 0V20" fill="none" stroke="#71717a" strokeWidth="3" strokeLinecap="round" />
      <path d="M30 12v39a11 11 0 0 1-22 0V17" fill="none" stroke="#f4f4f5" strokeWidth="1" />
    </svg>
  );
}

function IdentityCard({ imageUrl, canHover }: { imageUrl: string | null; canHover: boolean }) {
  const [imageFailed, setImageFailed] = React.useState(false);
  const { idCard } = ABOUT_CONTENT;

  return (
    <motion.article
      className="identity-card"
      style={{ rotate: -4 }}
      whileHover={canHover ? {
        rotate: -1,
        y: -6,
        transition: { type: "spring", stiffness: 280, damping: 18 },
      } : undefined}
    >
      <span className="identity-card-hover-shadow" aria-hidden="true" />
      <BinderClip />
      <div className="identity-card-topline">
        <p className="identity-card-title font-display">{idCard.title}</p>
        <span className="identity-card-number">{idCard.number}</span>
      </div>
      <div className="identity-card-main">
        <div className="identity-photo-frame">
          {imageUrl && !imageFailed ? (
            <Image
              src={imageUrl}
              alt="Portrait of Aldo Fariz Fadilla"
              fill
              sizes="(max-width: 1023px) 80px, 100px"
              className="identity-photo"
              onError={() => setImageFailed(true)}
              priority
            />
          ) : (
            <svg viewBox="0 0 64 84" className="identity-photo-placeholder" aria-hidden="true">
              <circle cx="32" cy="26" r="14" />
              <path d="M7 78c1-19 10-29 25-29s24 10 25 29" />
            </svg>
          )}
        </div>
        <dl className="identity-fields">
          <div>
            <dt>Name</dt>
            <dd>{idCard.name}</dd>
          </div>
          <div>
            <dt>Occupation</dt>
            <dd>{idCard.occupation}</dd>
          </div>
          <div>
            <dt>Education</dt>
            <dd>{idCard.education}</dd>
          </div>
        </dl>
      </div>
      <div className="identity-card-footer">
        <span className="identity-barcode" aria-hidden="true" />
        <svg className="identity-signature" viewBox="0 0 120 32" aria-hidden="true" focusable="false">
          <path d="M3 24c9-18 13-18 9-2-2 8 6-2 9-8 1 13 5 15 10 3 2-5 4-5 4 1 1 10 10-5 13-10-1 15 3 18 10 7 6-9 8-13 7-4-2 13 8 13 17 2 5-7 8-10 9-5 0 5-1 7 4 7" fill="none" stroke="#23356b" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      </div>
    </motion.article>
  );
}

function RuledNotebookPage() {
  return (
    <div className="ruled-notebook-page" aria-hidden="true">
      <span className="notebook-hole notebook-hole-one" />
      <span className="notebook-hole notebook-hole-two" />
      <span className="notebook-hole notebook-hole-three" />
    </div>
  );
}

function TravelPostcard({ small = false }: { small?: boolean }) {
  return (
    <div className={`travel-postcard${small ? " travel-postcard-small" : ""}`} aria-hidden="true">
      <div className="travel-postcard-art">
        <svg viewBox="0 0 240 150" role="presentation">
          <defs><linearGradient id={small ? "postcard-sky-small" : "postcard-sky-left"} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#8fc4d2" /><stop offset="1" stopColor="#e4d6a7" /></linearGradient></defs>
          <rect width="240" height="150" fill={`url(#${small ? "postcard-sky-small" : "postcard-sky-left"})`} />
          <circle cx="184" cy="38" r="18" fill="#f8e3a3" />
          <path d="M0 105 52 54l35 40 38-56 72 77 43-35v70H0z" fill="#536b62" />
          <path d="M0 118q54-22 103 0t137-1v33H0z" fill="#6dabb0" />
          <path d="M0 130q70-20 140 0t100-2" fill="none" stroke="#e5d19d" strokeWidth="5" />
        </svg>
      </div>
      <span className="travel-postcard-caption">{small ? "GREETINGS · FROM SOMEWHERE" : "POSTCARD · 01"}</span><span className="travel-postcard-stamp">✳</span>
    </div>
  );
}

function HandwrittenNote() {
  return <div className="handwritten-note" aria-hidden="true"><span>collect moments</span><svg viewBox="0 0 110 20"><path d="M2 10c22-9 40-7 55 0s31 6 50-2" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></div>;
}

function DecorativeLabel() {
  return <div className="decorative-label" aria-hidden="true"><span>FIELD</span><strong>NOTES</strong><i>EST. 2026</i></div>;
}

function ConcertTicket() {
  return (
    <div className="concert-ticket" aria-hidden="true">
      <span className="concert-ticket-kicker">LIVE SESSION · ADMIT ONE</span>
      <strong className="concert-ticket-title">MAKE<br />SOME NOISE</strong>
      <span className="concert-ticket-footer">BACKSTAGE PASS <i>026</i></span>
      <span className="concert-ticket-code" />
    </div>
  );
}

function AirmailDoodle() {
  return (
    <svg className="airmail-doodle" viewBox="0 0 160 60" aria-hidden="true" focusable="false">
      <path d="M8 43C38 5 98 3 143 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 4" />
      <path d="m132 13 14 11-17 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <text x="15" y="55">AIR MAIL</text>
    </svg>
  );
}

function TicketStub({ canHover }: { canHover: boolean }) {
  return (
    <motion.div
      className="ticket-stub"
      aria-hidden="true"
      whileHover={canHover ? { x: 14, transition: { type: "spring", stiffness: 260, damping: 20 } } : undefined}
    >
      <span className="ticket-eyebrow">{ABOUT_CONTENT.ticket.eyebrow}</span>
      <span className="ticket-title">{ABOUT_CONTENT.ticket.title}</span>
      <span className="ticket-barcode" />
      <span className="ticket-number">{ABOUT_CONTENT.ticket.number}</span>
    </motion.div>
  );
}

function MaskingTape({ color }: { color: "blue" | "cream" }) {
  return <span className={`masking-tape masking-tape-${color}`} aria-hidden="true" />;
}

type StampMotifName = "laptop" | "brackets" | "plane";

function StampMotif({ motif }: { motif: StampMotifName }) {
  if (motif === "laptop") {
    return (
      <svg viewBox="0 0 48 40" aria-hidden="true" focusable="false">
        <rect x="8" y="4" width="32" height="23" rx="2" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M3 33h42l-4 4H7z" fill="currentColor" />
      </svg>
    );
  }
  if (motif === "brackets") {
    return (
      <svg viewBox="0 0 48 40" aria-hidden="true" focusable="false">
        <path d="m16 7-11 13 11 13M32 7l11 13-11 13M28 4l-8 32" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 40" aria-hidden="true" focusable="false">
      <path d="m3 18 41-14-15 32-7-13z" fill="currentColor" />
      <path d="m22 23-1 13 8-10" fill="currentColor" />
    </svg>
  );
}

function PostageStamp({ motif, playful = false, canHover }: { motif: StampMotifName; playful?: boolean; canHover: boolean }) {
  const stamp = (
    <div className={`postage-stamp postage-stamp-${motif}`} aria-hidden="true">
      <StampMotif motif={motif} />
    </div>
  );

  if (!playful) return stamp;

  return (
    <motion.div
      className="postage-stamp-hover-target"
      aria-hidden="true"
      whileHover={canHover ? { rotate: [0, -6, 5, -3, 0], transition: { duration: 0.5 } } : undefined}
    >
      {stamp}
    </motion.div>
  );
}

function Postmark({ id, label }: { id: string; label: string }) {
  return (
    <svg className={`postmark postmark-${id}`} viewBox="0 0 150 100" aria-hidden="true" focusable="false">
      <defs>
        <path id={`postmark-path-${id}`} d="M 17,53 A 47,35 0 1,1 111,53 A 47,35 0 1,1 17,53" />
      </defs>
      <ellipse cx="64" cy="52" rx="48" ry="34" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M111 36h33M113 45h30M113 54h30M111 63h33" stroke="currentColor" strokeWidth="2" />
      <text>
        <textPath href={`#postmark-path-${id}`} startOffset="4%">{label}</textPath>
      </text>
    </svg>
  );
}

function StickyNote({ canHover }: { canHover: boolean }) {
  return (
    <motion.aside
      className="sticky-note"
      aria-hidden="true"
      style={{ rotate: -5 }}
      whileHover={canHover ? { rotate: 0, scale: 1.04, y: -4, transition: { type: "spring", stiffness: 260, damping: 18 } } : undefined}
    >
      <span className="sticky-tape" />
      <span className="sticky-note-title">{ABOUT_CONTENT.stickyNote.title}</span>
      <span className="sticky-note-detail">{ABOUT_CONTENT.stickyNote.detail}</span>
    </motion.aside>
  );
}

function BioPaper({ bio }: { bio: string }) {
  const trimmedBio = bio.trim();

  return (
    <article className="bio-paper">
      <PaperClip />
      <h3 className="bio-paper-heading font-display">
        <span>{ABOUT_CONTENT.paperHeading[0]}</span>
        <span>{ABOUT_CONTENT.paperHeading[1]}</span>
      </h3>
      {trimmedBio ? <p className="bio-paper-body">{trimmedBio}</p> : null}
      <span className="bio-paper-tab" aria-hidden="true">{ABOUT_CONTENT.folderTab}</span>
    </article>
  );
}

interface AboutScrapbookProps {
  bio: string;
  photoUrl: string | null;
}

export function AboutScrapbook({ bio, photoUrl }: AboutScrapbookProps) {
  const folderRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(folderRef, { once: true, amount: 0.12 });
  const reducedMotion = Boolean(useReducedMotion());
  const controls = useAnimationControls();
  const [canHover, setCanHover] = React.useState(false);
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const updatePointer = () => setCanHover(pointerQuery.matches);
    const updateDesktop = () => setIsDesktop(desktopQuery.matches);
    updatePointer();
    updateDesktop();
    pointerQuery.addEventListener("change", updatePointer);
    desktopQuery.addEventListener("change", updateDesktop);

    if (reducedMotion) controls.set("visible");
    else if (isInView) {
      controls.set("hidden");
      controls.start("visible");
    } else controls.set("hidden");

    return () => {
      pointerQuery.removeEventListener("change", updatePointer);
      desktopQuery.removeEventListener("change", updateDesktop);
    };
  }, [controls, isInView, reducedMotion]);

  return (
    <MotionConfig reducedMotion="user">
      <div ref={folderRef} className="about-folder">
        <div className="folder-surface" aria-hidden="true" />
        <div className="folder-grain" aria-hidden="true" />
        <motion.div
          className="about-folder-grid"
          animate={controls}
          initial={false}
          variants={folderVariants}
        >
          <aside className="folder-left-gutter">
            {isDesktop && (
              <>
                <RuledNotebookPage />
                <TravelPostcard />
                <HandwrittenNote />
              </>
            )}
            <motion.div className="folder-settle-item identity-card-position" variants={settleVariants}>
              <IdentityCard key={photoUrl ?? "no-photo"} imageUrl={photoUrl} canHover={canHover && !reducedMotion} />
              <MaskingTape color="blue" />
            </motion.div>
            {isDesktop && (
              <motion.div className="folder-settle-item ticket-position" variants={settleVariants}>
                <TicketStub canHover={canHover && !reducedMotion} />
                <MaskingTape color="cream" />
              </motion.div>
            )}
            {isDesktop && <DecorativeLabel />}
          </aside>

          <motion.div className="folder-settle-item bio-paper-position" variants={settleVariants}>
            <BioPaper bio={bio} />
            {isDesktop && <span className="bio-paper-tape" aria-hidden="true" />}
          </motion.div>

          <aside className="folder-right-gutter">
            <div className="stamp-group">
              <motion.div className="folder-settle-item stamp-position stamp-position-plane" variants={settleVariants}>
                <PostageStamp motif="plane" playful canHover={canHover && !reducedMotion} />
              </motion.div>
              {isDesktop && (
                <>
                  <motion.div className="folder-settle-item stamp-position stamp-position-laptop" variants={settleVariants}>
                    <PostageStamp motif="laptop" canHover={false} />
                  </motion.div>
                  <motion.div className="folder-settle-item stamp-position stamp-position-brackets" variants={settleVariants}>
                    <PostageStamp motif="brackets" canHover={false} />
                  </motion.div>
                  <Postmark id="one" label="SOFTWARE · ENGINEER · 2026" />
                  <Postmark id="two" label="ALDO FARIZ FADILLA" />
                  <div className="folder-torn-scrap" aria-hidden="true" />
                </>
              )}
            </div>
            {isDesktop && (
              <div className="right-memorabilia" aria-hidden="true">
                <ConcertTicket />
                <TravelPostcard small />
                <AirmailDoodle />
              </div>
            )}
            <motion.div className="folder-settle-item sticky-note-position" variants={settleVariants}>
              <StickyNote canHover={canHover && !reducedMotion} />
            </motion.div>
          </aside>
        </motion.div>
      </div>
    </MotionConfig>
  );
}
