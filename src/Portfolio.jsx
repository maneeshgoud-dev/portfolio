import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DATA = {
  name: "K E Maneesh Goud",
  role: "Aspiring MERN Stack Developer",
  intro:
    "I build clean, fast, and accessible web experiences — from development to deployment. Currently sharpening my craft with React, Node.js, and everything in between.",
  email: "maneeshgoud.dev@gmail.com",
  github: "https://github.com/maneeshgoud-dev",
  linkedin: "https://www.linkedin.com/in/maneesh-goud-324354386/",
  bio: `I turn coffee ☕ into code and bugs into... well, slightly smaller bugs. I'm a MERN Stack Developer who loves bringing ideas to life through clean, interactive, and user-friendly web applications. Every new project is a chance to experiment, solve problems, and learn something I didn't know yesterday.
  
  You'll usually find me building, debugging, rebuilding, and occasionally staring at my screen wondering why the code worked five minutes ago but refuses to cooperate now. Somehow, it always ends with a few console.log() statements and a satisfying \"Aha!\" moment. 
  
  I'm constantly exploring new technologies, sharpening my problem-solving skills, and looking for the next challenge to build. My goal isn't just to write code that works—it's to create applications that are fast, scalable, and enjoyable to use. This is just the beginning, and I'm excited to keep building, learning, and turning ambitious ideas into real products.`,
  skills: [
    "React",
    "JavaScript",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Git",
    "GitHub",
  ],
  projects: [
    {
      title: "SubTrakt",
      description:
        "A subsctription management web application that allows users to track and manage their subscriptions in one place. It provides features like subscription tracking and remindersto help users stay on top of their recurring expenses.",
      tech: ["React", "Node.js", "MongoDB", "Express.js", "Tailwind CSS"],
      github: "https://github.com/maneeshgoud-dev/subtrakt",
      live: "http://subtrakt-beta.vercel.app",
    },
  ],
  timeline: [
    {
      year: "2026 — Present",
      title: "Full-Stack MERN Developer (Learning & Personal Projects)",
      place: "Independent study & personal projects",
      description:
        "Building full-stack web applications with MongoDB, Express.js, React, and Node.js while strengthening problem-solving skills through Data Structures & Algorithms. Continuously exploring modern web technologies and best practices to create scalable, user-friendly applications.",
    },
    {
      year: "2023 — 2027",
      title: "B.Tech in Electronics & Communication Engineering (ECE)",
      place: "Final Year Student at Pulla Reddy Engineering College, Kurnool",
      description:
        "While pursuing my degree in Electronics & Communication Engineering, I discovered a strong interest in software development and shifted my focus toward web technologies. Since then, I've been actively learning Data Structures & Algorithms, Object-Oriented Programming (Java), Database Management Systems (DBMS), Operating Systems, Computer Networks, and Full-Stack Web Development, building projects to strengthen my practical skills along the way.",
    },
    {
      year: "2025",
      title: "Started My Web Development Journey",
      place: "From curiosity to creation",
      description:
        "Wrote my first HTML page and got hooked on building things for the web.",
    },
  ],
};

const NAV_LINKS = [
  { label: "Home", path: "~/", href: "#home" },
  { label: "About", path: "~/about", href: "#about" },
  { label: "Skills", path: "~/skills", href: "#skills" },
  { label: "Projects", path: "~/projects", href: "#projects" },
  { label: "Experience", path: "~/experience", href: "#experience" },
  { label: "Contact", path: "~/contact", href: "#contact" },
];

// ── Small reusable bits ─────────────────────────────────────────────────

function SectionLabel({ index, path }) {
  return (
    <div className="flex items-center gap-3 mb-6 md:mb-8">
      <span className="font-mono text-xs text-[#666] tracking-wider">
        {index}
      </span>
      <span className="h-px flex-1 max-w-[40px] bg-[#2a2a2a]" />
      <span className="font-mono text-xs text-[#8a8a8a] tracking-wider">
        {path}
      </span>
    </div>
  );
}

function GhostButton({
  children,
  href,
  onClick,
  primary = false,
  className = "",
}) {
  const base =
    "inline-flex items-center gap-2 px-6 py-3 font-mono text-sm tracking-wide transition-colors duration-300 border";
  const styles = primary
    ? "bg-white text-black border-white hover:bg-transparent hover:text-white"
    : "bg-transparent text-white border-[#333] hover:border-white";
  return (
    <a
      href={href}
      onClick={onClick}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </a>
  );
}

// ── Main component ──────────────────────────────────────────────────────

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const rootRef = useRef(null);
  const heroNameRef = useRef(null);
  const heroSubRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroImgWrapRef = useRef(null);
  const heroCtaRef = useRef(null);
  const cursorRef = useRef(null);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    const targetY = el.getBoundingClientRect().top + window.scrollY;
    const proxy = { y: window.scrollY };
    gsap.to(proxy, {
      y: targetY,
      duration: 1,
      ease: "power3.inOut",
      onUpdate: () => window.scrollTo(0, proxy.y),
    });
  };

  // ── Hero entrance + cursor blink ──────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        navRef.current,
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
      )
        .fromTo(
          heroSubRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.3,
        )
        .fromTo(
          heroNameRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9 },
          0.4,
        )
        .fromTo(
          heroTextRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          0.65,
        )
        .fromTo(
          heroCtaRef.current ? heroCtaRef.current.children : [],
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 },
          0.8,
        )
        .fromTo(
          heroImgWrapRef.current,
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 1 },
          0.3,
        );

      // terminal cursor blink
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)",
      });

      // floating profile image
      gsap.to(heroImgWrapRef.current, {
        y: -16,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.4,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // ── Scroll reveals ──────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const revealEls = gsap.utils.toArray("[data-reveal]");
      revealEls.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      const staggerGroups = gsap.utils.toArray("[data-reveal-group]");
      staggerGroups.forEach((group) => {
        const items = group.querySelectorAll("[data-reveal-item]");
        gsap.fromTo(
          items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: group,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      // section nav active-state tracking
      const sections = gsap.utils.toArray("section[id]");
      sections.forEach((sec) => {
        ScrollTrigger.create({
          trigger: sec,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => setActiveSection(sec.id),
          onEnterBack: () => setActiveSection(sec.id),
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // ── Mobile menu animation ───────────────────────────────────────────
  useEffect(() => {
    if (!mobileMenuRef.current) return;
    if (menuOpen) {
      gsap.set(mobileMenuRef.current, { display: "flex" });
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power2.out" },
      );
      gsap.fromTo(
        mobileMenuRef.current.querySelectorAll("[data-mobile-link]"),
        { opacity: 0, x: -16 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.06,
          delay: 0.05,
          ease: "power2.out",
        },
      );
    } else if (mobileMenuRef.current.style.display === "flex") {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => gsap.set(mobileMenuRef.current, { display: "none" }),
      });
    }
  }, [menuOpen]);

  return (
    <div
      ref={rootRef}
      className="bg-black text-white min-h-screen w-full font-sans overflow-x-hidden selection:bg-white selection:text-black"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #444; }
      `}</style>

      {/* ── NAVBAR ─────────────────────────────────────────────────── */}
      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/70 border-b border-[#1a1a1a]"
      >
        <nav className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`font-mono text-xs tracking-wide transition-colors duration-300 ${
                    activeSection === link.href.slice(1)
                      ? "text-white"
                      : "text-[#777] hover:text-white"
                  }`}
                >
                  {link.path}
                </a>
              </li>
            ))}
          </ul>

          {/* Hamburger */}
          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-[5px] group"
          >
            <span
              className={`block h-px w-6 bg-white transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[3px]" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-white transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[3px]" : ""
              }`}
            />
          </button>
        </nav>

        {/* Mobile menu panel */}
        <div
          ref={mobileMenuRef}
          style={{ display: "none" }}
          className="md:hidden flex-col absolute top-16 left-0 right-0 bg-black border-b border-[#1a1a1a] px-6 py-8 gap-6"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              data-mobile-link
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-mono text-base text-[#aaa] hover:text-white transition-colors"
            >
              <span className="text-[#555] mr-2">{link.path}</span>
            </a>
          ))}
        </div>
      </header>

      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section
        id="home"
        className="min-h-screen flex items-center px-6 md:px-10 pt-24 pb-16"
      >
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center">
          {/* Left column */}
          <div className="order-2 md:order-1 text-center md:text-left">
            <p
              ref={heroSubRef}
              className="font-mono text-sm text-[#888] mb-4 tracking-wide"
            >
              {`Hello there! I'm`}
            </p>
            <h1
              ref={heroNameRef}
              className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight mb-3"
            >
              {DATA.name}
              <span
                ref={cursorRef}
                className="inline-block w-[3px] h-9 md:h-12 bg-white ml-2 translate-y-1"
              />
            </h1>
            <p className="font-mono text-base md:text-lg text-[#cfcfcf] mb-6">
              {DATA.role}
            </p>
            <p
              ref={heroTextRef}
              className="text-[#999] text-base md:text-lg leading-relaxed max-w-md mx-auto md:mx-0 mb-10"
            >
              {DATA.intro}
            </p>
          </div>

          {/* Right column — profile image */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <div
              ref={heroImgWrapRef}
              className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-[22rem] md:h-[22rem]"
            >
              <div className="absolute inset-0 border border-[#2a2a2a] rounded-2xl rotate-3" />
              <div className="relative w-full h-full rounded-2xl bg-[#0d0d0d] border border-[#222] flex items-center justify-center overflow-hidden">
                <img
                  src="/images/profile.jpeg"
                  alt="K E Maneesh Goud"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ──────────────────────────────────────────────────── */}
      <section
        id="about"
        className="px-6 md:px-10 py-24 md:py-32 border-t border-[#1a1a1a]"
      >
        <div className="max-w-6xl mx-auto">
          <div data-reveal>
            <SectionLabel index="01" path="~/about" />
          </div>
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-16 items-start">
            <h2
              data-reveal
              className="font-display text-3xl md:text-4xl font-medium leading-tight"
            >
              About
              <br />
              Me
            </h2>
            <div data-reveal>
              <p className="text-[#aaa] text-base md:text-lg leading-relaxed mb-8 whitespace-pre-line">
                {DATA.bio}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ─────────────────────────────────────────────────── */}
      <section
        id="skills"
        className="px-6 md:px-10 py-24 md:py-32 border-t border-[#1a1a1a]"
      >
        <div className="max-w-6xl mx-auto">
          <div data-reveal>
            <SectionLabel index="02" path="~/skills" />
          </div>
          <h2
            data-reveal
            className="font-display text-3xl md:text-4xl font-medium mb-12 md:mb-16"
          >
            Skills &amp; Tools
          </h2>

          <div
            data-reveal-group
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4"
          >
            {DATA.skills.map((skill) => (
              <SkillCard key={skill} name={skill} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ───────────────────────────────────────────────── */}
      <section
        id="projects"
        className="px-6 md:px-10 py-24 md:py-32 border-t border-[#1a1a1a]"
      >
        <div className="max-w-6xl mx-auto">
          <div data-reveal>
            <SectionLabel index="03" path="~/projects" />
          </div>
          <h2
            data-reveal
            className="font-display text-3xl md:text-4xl font-medium mb-12 md:mb-16"
          >
            Projects
          </h2>

          <div
            data-reveal-group
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          >
            {DATA.projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE / EDUCATION ─────────────────────────────────── */}
      <section
        id="experience"
        className="px-6 md:px-10 py-24 md:py-32 border-t border-[#1a1a1a]"
      >
        <div className="max-w-6xl mx-auto">
          <div data-reveal>
            <SectionLabel index="04" path="~/experience" />
          </div>
          <h2
            data-reveal
            className="font-display text-3xl md:text-4xl font-medium mb-12 md:mb-16"
          >
            Experience &amp; Education
          </h2>

          <div data-reveal-group className="relative max-w-3xl">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#222]" />
            {DATA.timeline.map((item, i) => (
              <div
                data-reveal-item
                key={i}
                className="relative pl-10 pb-12 last:pb-0"
              >
                <span className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-black border-2 border-white" />
                <p className="font-mono text-xs text-[#777] mb-2 tracking-wide">
                  {item.year}
                </p>
                <h3 className="font-display text-xl font-medium mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-[#888] mb-3">{item.place}</p>
                <p className="text-[#999] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="px-6 md:px-10 py-24 md:py-32 border-t border-[#1a1a1a]"
      >
        <div className="max-w-6xl mx-auto">
          <div data-reveal>
            <SectionLabel index="05" path="~/contact" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <div data-reveal>
              <h2 className="font-display text-3xl md:text-4xl font-medium mb-5 leading-tight">
                Let's build
                <br />
                something.
              </h2>
              <p className="text-[#999] leading-relaxed mb-10 max-w-sm">
                Have a project in mind, an opportunity, or just want to talk
                shop? My inbox is open.
              </p>

              <ul className="space-y-4">
                <SocialLink
                  icon="mail"
                  label={DATA.email}
                  href={`mailto:${DATA.email}`}
                />
                <SocialLink icon="github" label="GitHub" href={DATA.github} />
                <SocialLink
                  icon="linkedin"
                  label="LinkedIn"
                  href={DATA.linkedin}
                />
              </ul>
            </div>

            <form
              data-reveal
              className="space-y-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <FormField label="Name" placeholder="Your name" />
              <FormField
                label="Email"
                placeholder="you@example.com"
                type="email"
              />
              <FormField
                label="Message"
                placeholder="Tell me about your project..."
                textarea
              />
              <button
                type="submit"
                className="w-full mt-2 px-6 py-3 bg-white text-black font-mono text-sm tracking-wide border border-white hover:bg-transparent hover:text-white transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      <footer className="px-6 md:px-10 py-10 border-t border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="font-mono text-xs text-[#666]">
            © {new Date().getFullYear()} {DATA.name}. All rights reserved.
          </p>
          <ul className="flex items-center gap-6 flex-wrap justify-center">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-mono text-xs text-[#777] hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </div>
  );
}

// ── Sub-components ──────────────────────────────────────────────────────

function SkillCard({ name }) {
  const ref = useRef(null);

  const handleEnter = () => {
    gsap.to(ref.current, {
      y: -4,
      borderColor: "#ffffff",
      duration: 0.3,
      ease: "power2.out",
    });
  };
  const handleLeave = () => {
    gsap.to(ref.current, {
      y: 0,
      borderColor: "#222222",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={ref}
      data-reveal-item
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="border border-[#222] rounded-lg px-4 py-6 flex items-center justify-center text-center transition-shadow"
    >
      <span className="font-mono text-sm md:text-base">{name}</span>
    </div>
  );
}

function ProjectCard({ project }) {
  const ref = useRef(null);

  const handleEnter = () => {
    gsap.to(ref.current, {
      borderColor: "#ffffff",
      duration: 0.35,
      ease: "power2.out",
    });
  };
  const handleLeave = () => {
    gsap.to(ref.current, {
      borderColor: "#222222",
      duration: 0.35,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={ref}
      data-reveal-item
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="border border-[#222] rounded-xl overflow-hidden flex flex-col"
    >
      <div className="aspect-[16/10] bg-[#0d0d0d] border-b border-[#222] flex items-center justify-center">
        <img
          src="/images/subtrakt-preview.png"
          alt={`${project.title} preview`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display text-xl font-medium mb-2">
          {project.title}
        </h3>
        <p className="text-[#999] text-sm leading-relaxed mb-5 flex-1">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-[11px] text-[#aaa] border border-[#2a2a2a] rounded-full px-3 py-1"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          <a
            href={project.github}
            className="font-mono text-xs text-[#bbb] hover:text-white border-b border-transparent hover:border-white transition-colors duration-300 pb-0.5"
          >
            Source
          </a>
          <a
            href={project.live}
            className="font-mono text-xs text-[#bbb] hover:text-white border-b border-transparent hover:border-white transition-colors duration-300 pb-0.5"
          >
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
}

function SocialLink({ icon, label, href }) {
  const icons = {
    mail: (
      <path
        d="M2.25 6.75A2.25 2.25 0 014.5 4.5h15a2.25 2.25 0 012.25 2.25v10.5A2.25 2.25 0 0119.5 19.5h-15a2.25 2.25 0 01-2.25-2.25V6.75zm2.4-.75 6.6 4.95a1.5 1.5 0 001.5 0l6.6-4.95"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    ),
    github: (
      <path
        d="M12 2C6.48 2 2 6.58 2 12.25c0 4.49 2.87 8.3 6.84 9.65.5.1.68-.22.68-.49 0-.24-.01-1.02-.01-1.86-2.78.5-3.5-.7-3.72-1.34-.13-.32-.68-1.34-1.16-1.61-.4-.22-.97-.74-.01-.75.9-.01 1.54.83 1.75 1.18 1.03 1.73 2.67 1.24 3.32.94.1-.73.4-1.23.73-1.51-2.55-.29-5.21-1.28-5.21-5.71 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.48.12-3.08 0 0 .96-.31 3.16 1.18a10.9 10.9 0 015.76 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.6.24 2.79.12 3.08.73.81 1.18 1.83 1.18 3.1 0 4.44-2.67 5.42-5.22 5.7.41.36.77 1.06.77 2.15 0 1.55-.01 2.8-.01 3.18 0 .27.18.6.69.49A10.02 10.02 0 0022 12.25C22 6.58 17.52 2 12 2z"
        fill="currentColor"
        stroke="none"
      />
    ),
    linkedin: (
      <path
        d="M4.98 3.5C4.98 4.6 4.1 5.5 3 5.5S1 4.6 1 3.5 1.9 1.5 3 1.5s1.98.9 1.98 2zM1.5 8.5h3V21h-3V8.5zM8.5 8.5h2.88v1.73h.04c.4-.76 1.39-1.56 2.86-1.56 3.06 0 3.62 2.01 3.62 4.62V21h-3v-5.34c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.81V21h-3V8.5z"
        fill="currentColor"
        stroke="none"
      />
    ),
  };

  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 text-[#bbb] hover:text-white transition-colors duration-300"
      >
        <span className="w-9 h-9 rounded-full border border-[#2a2a2a] group-hover:border-white flex items-center justify-center transition-colors duration-300">
          <svg viewBox="0 0 24 24" className="w-4 h-4">
            {icons[icon]}
          </svg>
        </span>
        <span className="font-mono text-sm">{label}</span>
      </a>
    </li>
  );
}

function FormField({ label, placeholder, type = "text", textarea = false }) {
  const ref = useRef(null);

  const handleFocus = () => {
    gsap.to(ref.current, {
      borderColor: "#ffffff",
      duration: 0.25,
      ease: "power2.out",
    });
  };
  const handleBlur = () => {
    gsap.to(ref.current, {
      borderColor: "#222222",
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const sharedClass =
    "w-full bg-transparent border px-4 py-3 text-sm text-white placeholder-[#555] focus:outline-none transition-colors duration-300 rounded-lg";

  return (
    <div>
      <label className="block font-mono text-xs text-[#777] mb-2 tracking-wide">
        {label}
      </label>
      {textarea ? (
        <textarea
          ref={ref}
          rows={4}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`${sharedClass} border-[#222] resize-none`}
        />
      ) : (
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`${sharedClass} border-[#222]`}
        />
      )}
    </div>
  );
}
