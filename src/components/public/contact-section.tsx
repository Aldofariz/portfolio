"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Mail } from "lucide-react";

const EMAIL_ADDRESS = "aldofarizfadilla@gmail.com";
const RESUME_URL = "https://drive.google.com/file/d/1xxfF4rIKOOoW7EF1sQio924h28fHfWIr/view?usp=sharing";

const CONTACT_CARDS: {
  title: string;
  description: string;
  href: string;
  variant: string;
}[] = [
  {
    title: "GitHub",
    description: "Code, experiments, and things I build.",
    href: "https://github.com/aldofariz",
    variant: "github",
  },
  {
    title: "LinkedIn",
    description: "Let's connect and talk about good work.",
    href: "https://linkedin.com/in/aldofariz",
    variant: "linkedin",
  },
  {
    title: "Resume",
    description: "Explore my résumé and experience.",
    href: RESUME_URL,
    variant: "resume",
  },
];

function ContactCardIllustration({ variant }: { variant: string }) {
  if (variant === "linkedin") {
    return (
      <svg viewBox="0 0 260 180" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="case-leather" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#b9754f" /><stop offset=".5" stopColor="#75452f" /><stop offset="1" stopColor="#422b22" /></linearGradient>
          <linearGradient id="case-flap" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#cf9469" /><stop offset="1" stopColor="#8b573b" /></linearGradient>
          <linearGradient id="case-metal" x1="0" x2="1"><stop stopColor="#d8bd8b" /><stop offset=".5" stopColor="#8d7149" /><stop offset="1" stopColor="#ead8ad" /></linearGradient>
        </defs>
        <ellipse cx="131" cy="158" rx="101" ry="12" fill="#2d211b" opacity=".15" />
        <path d="M76 53V39q0-13 14-13h79q14 0 14 13v14h-14V41q0-4-5-4H95q-5 0-5 4v12z" fill="#543628" />
        <path d="M39 62q0-11 11-11h160q11 0 11 11v72q0 12-12 12H52q-13 0-13-12z" fill="url(#case-leather)" />
        <path d="M43 64q0-8 9-8h156q9 0 9 8v19H43z" fill="url(#case-flap)" />
        <path d="M46 67h168M48 135h163" fill="none" stroke="#e0b38a" strokeWidth="1.4" opacity=".7" />
        <path d="M49 73v54M211 73v54" stroke="#3c291f" strokeWidth="2" opacity=".45" />
        <path d="M116 83h29v8h-29z" rx="2" fill="url(#case-metal)" />
        <path d="M123 87h15v24q0 5-7 5t-8-5z" fill="url(#case-metal)" />
        <rect x="47" y="93" width="24" height="29" rx="4" fill="#57382a" stroke="#d3a17a" strokeWidth="2" />
        <rect x="188" y="93" width="24" height="29" rx="4" fill="#57382a" stroke="#d3a17a" strokeWidth="2" />
        <path d="M59 122v15m149-15v15" stroke="#d9bd8f" strokeWidth="3" />
        <path d="M67 64v-7m127 7v-7" stroke="#f0c69d" strokeWidth="1.5" strokeDasharray="2 4" />
        <path d="m42 136 8 3-2 7-8-2zm171 0-8 3 2 7 8-2z" fill="#b79461" />
      </svg>
    );
  }

  if (variant === "github") {
    return (
      <svg viewBox="0 0 260 180" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="laptop-screen" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#495765" /><stop offset="1" stopColor="#171d24" /></linearGradient>
          <linearGradient id="laptop-base" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#d8dce0" /><stop offset=".45" stopColor="#858d95" /><stop offset="1" stopColor="#454b52" /></linearGradient>
        </defs>
        <ellipse cx="130" cy="158" rx="103" ry="11" fill="#2d3338" opacity=".15" />
        <path d="M67 35q0-7 8-7h111q8 0 8 7v81H67z" fill="#343b42" />
        <rect x="74" y="35" width="113" height="69" rx="3" fill="url(#laptop-screen)" />
        <path d="m118 55-15 13 15 13m27-26 15 13-15 13m-8-31-8 35" fill="none" stroke="#a9c6dd" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="131" cy="31" r="1.5" fill="#909aa3" />
        <path d="M59 116h142l21 24q2 4-5 5H44q-7-1-4-5z" fill="url(#laptop-base)" />
        <path d="m74 120 111 0 12 15H62z" fill="#686f76" />
        <path d="m83 123 93 0 6 8H77z" fill="#b8bdc1" />
        <path d="M114 138h34" stroke="#444a50" strokeWidth="2" strokeLinecap="round" />
        <path d="M65 142h130" stroke="#eef0f2" strokeWidth="1" opacity=".6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 260 180" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="resume-paper" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#fffefa" /><stop offset="1" stopColor="#e6dfd0" /></linearGradient>
        <linearGradient id="resume-folder" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#c7a77a" /><stop offset="1" stopColor="#806346" /></linearGradient>
      </defs>
      <ellipse cx="133" cy="158" rx="88" ry="11" fill="#30271f" opacity=".15" />
      <path d="M53 66q0-8 9-8h48l14 13h72q9 0 9 9v61q0 9-9 9H62q-9 0-9-9z" fill="url(#resume-folder)" />
      <path d="M77 35q0-8 8-8h83l25 26v84q0 8-8 8H85q-8 0-8-8z" fill="url(#resume-paper)" stroke="#d4cdbf" strokeWidth="2" />
      <path d="M168 27v22q0 5 5 5h20" fill="#e6dfd0" stroke="#d4cdbf" strokeWidth="2" />
      <rect x="93" y="56" width="30" height="35" rx="2" fill="#d4d9d3" />
      <circle cx="108" cy="68" r="7" fill="#a6ada7" />
      <path d="M97 87q2-12 11-12t11 12" fill="#89958e" />
      <path d="M132 61h38m-38 8h29" stroke="#61584d" strokeWidth="3" strokeLinecap="round" />
      <path d="M94 101h79m-79 10h66m-66 10h73m-73 10h45" stroke="#b6b0a5" strokeWidth="2" strokeLinecap="round" />
      <circle cx="175" cy="116" r="17" fill="#c17a68" opacity=".9" />
      <text x="175" y="119" fill="#fff8ee" fontFamily="Arial,sans-serif" fontSize="6" fontWeight="700" textAnchor="middle" letterSpacing=".7">RESUME</text>
      <path d="m164 57 26 0" stroke="#b6b0a5" strokeWidth="1" />
    </svg>
  );
}

function PostageFlower() {
  return (
    <svg className="contact-postage-flower" viewBox="0 0 150 150" aria-hidden="true" focusable="false">
      <rect x="13" y="10" width="124" height="128" rx="5" fill="#fff" stroke="#d9d9d6" strokeDasharray="3 5" />
      <g transform="translate(76 75)">
        {Array.from({ length: 12 }, (_, index) => (
          <ellipse key={index} cx="0" cy="-23" rx="8" ry="20" fill={index % 2 ? "#ff9d05" : "#ffb20b"} transform={`rotate(${index * 30})`} />
        ))}
        <circle r="12" fill="#7c3f13" />
        <circle r="7" fill="#322719" />
      </g>
      <circle cx="42" cy="112" r="19" fill="#fafaf9" stroke="#aaa9a5" />
      <circle cx="42" cy="112" r="14" fill="none" stroke="#c6c5c1" />
      <path d="m36 108 6-3 6 3v8l-6 3-6-3z" fill="none" stroke="#aaa9a5" strokeWidth="1.4" />
      <text x="101" y="47" fill="#141413" fontFamily="Georgia,serif" fontSize="30">26</text>
      <path d="M60 116c24-9 45-9 72-2M61 122c23-7 45-6 69-1" fill="none" stroke="#aaa9a5" strokeWidth="1" />
    </svg>
  );
}

function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);

  window.location.href = `mailto:${EMAIL_ADDRESS}?subject=${subject}&body=${body}`;
}

export function ContactSection() {
  const [isPreparingEmail, setIsPreparingEmail] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    setIsPreparingEmail(true);
    handleContactSubmit(event);
    window.setTimeout(() => setIsPreparingEmail(false), 1200);
  }

  return (
    <section id="contact" className="contact-section">
      <div className="contact-heading">
        <h2 className="contact-title font-display">
          Curious to see and hear more?<br />
          <span>Let’s connect.</span>
        </h2>
        <p className="contact-intro font-display">
          The work I have shown you above is just a small part that I am particularly proud of.
          If you are curious to see more or work together, feel free to reach out.
        </p>
      </div>

      <div className="contact-letter">
        <div className="contact-letter-message">
          <p className="contact-letter-greeting font-display">Hello there...</p>
          <label className="contact-message-label" htmlFor="contact-message">Your message</label>
          <textarea id="contact-message" name="message" form="contact-form" required placeholder="Write me a note..." />
        </div>

        <form id="contact-form" className="contact-letter-form" onSubmit={onSubmit}>
          <PostageFlower />
          <p className="contact-to-label">To</p>
          <a className="contact-email-address" href={`mailto:${EMAIL_ADDRESS}`}>{EMAIL_ADDRESS}</a>

          <label htmlFor="contact-name">Your name</label>
          <input id="contact-name" name="name" type="text" autoComplete="name" required />

          <label htmlFor="contact-email">Your email address</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" required />

          <button className="contact-submit" type="submit" disabled={isPreparingEmail}>
            <Mail aria-hidden="true" size={15} />
            {isPreparingEmail ? "Opening email…" : "Send a note"}
          </button>
        </form>
      </div>

      <div className="contact-cards">
        {CONTACT_CARDS.map(({ title, description, href, variant }) => (
          <a
            className={`contact-card contact-card-${variant}`}
            href={href}
            key={title}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact-card-title font-display">{title}</span>
            <span className="contact-card-description">{description}</span>
            <span className={`contact-card-art contact-card-art-${variant}`}><ContactCardIllustration variant={variant} /></span>
            <span className="contact-card-arrow" aria-hidden="true"><ArrowUpRight size={17} /></span>
          </a>
        ))}
      </div>
    </section>
  );
}
