"use client";

import Ticker from "@/components/Ticker";
import TEXTURE_ITEMS from "@/data/textureItems";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SpineObject from "@/components/SpineObject";
import MediaPlayer from "@/components/MediaPlayer";

// ─────────────────────────────────────────────
//  EDIT THESE to populate your content
// ─────────────────────────────────────────────

const SOUNDCLOUD_EMBEDS = [
  {
    label: "Album 1",
    // Go to SoundCloud → Share → Embed → copy the iframe src and paste it here
    embedSrc:
      "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/savened&color=%23ff0000&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true",
  },
  {
    label: "Album 2",
    // Replace with the second album's embed src
    embedSrc:
      "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/savened&color=%23ff0000&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true",
  },
];

// Replace with your actual hosted video paths
// const HERO_VIDEO_SRC = "/videos/hero.mp4";
// const VIDEOGRAPHY_VIDEO_SRC = "/videos/videography.mp4";

// Texturing images — fill in src / href / alt for each work

const TEXTURING_IMAGES = [
  {
    src: "/images/textures/deagle-cd-1.jpg",
    href: "/graphics/desert-eagle-cd",
    alt: "Desert Eagle | CD",
  },
  {
    src: "/images/textures/ak47-neon-1.jpg",
    href: "/graphics/ak47-neon",
    alt: "AK-47 | Neon Rider",
  },
  // … add more matching the ids in TEXTURE_ITEMS
];
// const TEXTURING_IMAGES: { src: string; href: string; alt: string }[] = [
//   { src: "/images/texture1.jpg", href: "#", alt: "Texture 1" },
//   { src: "/images/texture2.jpg", href: "#", alt: "Texture 2" },
//   { src: "/images/texture3.jpg", href: "#", alt: "Texture 3" },
//   { src: "/images/texture4.jpg", href: "#", alt: "Texture 4" },
//   { src: "/images/texture5.jpg", href: "#", alt: "Texture 5" },
//   { src: "/images/texture6.jpg", href: "#", alt: "Texture 6" },
//   { src: "/images/texture7.jpg", href: "#", alt: "Texture 7" },
//   { src: "/images/texture8.jpg", href: "#", alt: "Texture 8" },
// ];

const NAV_LINKS = [
  { label: "</Music_Composition>", href: "#music" },
  { label: "</Sound_Design>", href: "#sound" },
  { label: "</Videography>", href: "#video" },
  { label: "</Graphics>", href: "#graphics" },
];

// ─────────────────────────────────────────────

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main
      className="relative bg-black text-white overflow-x-hidden"
      style={{ fontFamily: "'Courier New', monospace" }}
    >
      <GlobalStyles />

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4">
        <div className="w-8" />
        <Link
          href="/"
          className="text-white text-base md:text-lg tracking-widest font-light hover:opacity-70 transition-opacity"
        >
          Nedas Pasavodskis
        </Link>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col gap-[5px] cursor-pointer group z-50"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-[1.5px] bg-white transition-all duration-300 ${
              menuOpen ? "w-6 rotate-45 translate-y-[6.5px]" : "w-6"
            }`}
          />
          <span
            className={`block h-[1.5px] bg-white transition-all duration-300 ${
              menuOpen ? "opacity-0 w-6" : "w-4 group-hover:w-6"
            }`}
          />
          <span
            className={`block h-[1.5px] bg-white transition-all duration-300 ${
              menuOpen ? "w-6 -rotate-45 -translate-y-[6.5px]" : "w-6"
            }`}
          />
        </button>
      </nav>

      {/* ── FULLSCREEN MENU OVERLAY ── */}
      <div
        className={`fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-8 transition-all duration-500 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="text-white text-2xl md:text-4xl tracking-widest hover:opacity-50 transition-opacity"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="#contact"
          onClick={() => setMenuOpen(false)}
          className="mt-4 text-white text-sm tracking-[0.4em] uppercase border-b border-white pb-1 hover:opacity-50 transition-opacity"
        >
          GET IN TOUCH
        </Link>
      </div>

      {/* ══════════════════════════════════════════
          SECTION 1 — HERO  (3D object)
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* DESKTOP — left floating links */}
        <div className="hidden md:flex absolute left-16 flex-col gap-16 z-10">
          <FloatingLink href="#music" delay={0}>
            &lt;/Music_Composition&gt;
          </FloatingLink>
          <FloatingLink href="#sound" delay={0.6}>
            &lt;/Sound_Design&gt;
          </FloatingLink>
        </div>

        {/* ── 3-D OBJECT ──
            Replace <ThreeDPlaceholder /> with your component.
            The wrapper is sized w-72 h-72 on mobile, w-96 h-96 on desktop.
        ── */}
        <div className="relative w-72 h-72 lg:w-96 lg:h-96 flex items-center justify-center z-10">
          <ThreeDPlaceholder />
        </div>

        {/* DESKTOP — right floating links */}
        <div className="hidden md:flex absolute right-16 flex-col gap-16 z-10">
          <FloatingLink href="#video" delay={0.3}>
            &lt;/Videography&gt;
          </FloatingLink>
          <FloatingLink href="#graphics" delay={0.9}>
            &lt;/Graphics&gt;
          </FloatingLink>
        </div>

        {/* MOBILE — stacked links overlay */}
        <div className="flex md:hidden absolute inset-0 flex-col items-center justify-center px-8 pt-20 gap-10 z-10 pointer-events-none">
          {NAV_LINKS.map((link, i) => (
            <FloatingLink
              key={link.label}
              href={link.href}
              delay={i * 0.3}
              mobile
            >
              {link.label}
            </FloatingLink>
          ))}
          <Link
            href="#contact"
            className="text-white text-base md:text-3xl font-bold tracking-widest uppercase mt-6 hover:opacity-60 transition-opacity pointer-events-auto"
          >
            GET IN TOUCH
          </Link>
        </div>

        {/* DESKTOP — GET IN TOUCH */}
        <Link
          href="#contact"
          className="hidden md:block absolute bottom-16 left-1/2 -translate-x-1/2 text-white text-xs tracking-[0.5em] uppercase border-b border-transparent hover:border-white transition-all duration-300 pb-1"
        >
          GET IN TOUCH
        </Link>
      </section>

      {/* ══════════════════════════════════════════
          TICKER — SOUND DESIGN
      ══════════════════════════════════════════ */}
      <Ticker word="SOUND DESIGN" />

      {/* ══════════════════════════════════════════
          SECTION 2 — FULL-SCREEN VIDEO (hero/sound design)
      ══════════════════════════════════════════ */}
      <section id="sound" className="relative w-full h-screen overflow-hidden">
        <video
          src="/videos/video1.mp4"
          loop
          controls
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/*  <video
          src="/videos/video1.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        /> */}
        {/* <VideoPlaceholder label="Sound Design / Hero Video" /> */}
        {/* Dark overlay so any overlaid text stays readable */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      </section>

      {/* ══════════════════════════════════════════
          TICKER — MUSIC
      ══════════════════════════════════════════ */}
      <Ticker word="MUSIC" color="yellow" />

      {/* ══════════════════════════════════════════
          SECTION 3 — SOUNDCLOUD EMBEDS
      ══════════════════════════════════════════ */}
      <section id="music">
        {/* {SOUNDCLOUD_EMBEDS.map((embed, i) => (
          <div key={i} className="w-full">
            <iframe
              title={embed.label}
              width="100%"
              height="300"
              allow="autoplay"
              src={embed.embedSrc}
              className="w-full border-0 block"
            />
          </div>
        ))} */}
        <MediaPlayer />
      </section>

      {/* ══════════════════════════════════════════
          TICKER — VIDEOGRAPHY
      ══════════════════════════════════════════ */}
      <Ticker word="VIDEOGRAPHY" color="blue" />

      {/* ══════════════════════════════════════════
          SECTION 4 — VIDEOGRAPHY FULL-SCREEN VIDEO
      ══════════════════════════════════════════ */}
      <section id="video" className="relative w-full h-screen overflow-hidden">
        {/*
          ── REPLACE THIS BLOCK with your video: ──
          <video
            src="/videos/videography.mp4"
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        */}
        <VideoPlaceholder label="Videography Video" />
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      </section>

      {/* ══════════════════════════════════════════
          TICKER — TEXTURING
      ══════════════════════════════════════════ */}
      <Ticker word="TEXTURING" color="green" />

      {/* ══════════════════════════════════════════
          SECTION 5 — TEXTURING IMAGE GRID
          2 cols on mobile, 4 cols on md+
          Images scale down 2 % on hover
      ══════════════════════════════════════════ */}
      <section
        id="graphics"
        className="w-full bg-black px-2 md:px-4 py-2 md:py-4"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-2">
          {TEXTURE_ITEMS.map((item, i) => (
            // <a
            //   key={i}
            //   href={`/graphics/${item.id}`}
            //   className="relative block overflow-hidden group"
            //   style={{ aspectRatio: "1 / 1", display: "block" }}
            // >
            //   {/* ── REPLACE ImagePlaceholder with a real image: ──
            //     <img
            //       src={img.src}
            //       alt={img.alt}
            //       className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[0.98]"
            //     /> */}

            //   {/* Or with Next.js Image (remember to add your domain to next.config): */}
            //   <Image
            //     src={item.images[0]}
            //     alt={item.title}
            //     fill
            //     sizes="(max-width: 768px) 50vw, 25vw"
            //     className="object-cover transition-transform duration-500 ease-out group-hover:scale-[0.98]"
            //   />

            //   {/* <ImagePlaceholder label={item.title} index={i} /> */}
            // </a>

            <Link
              key={i}
              href={`/graphics/${item.id}`}
              className="relative block overflow-hidden group"
              style={{ aspectRatio: "1 / 1", display: "block" }}
            >
              <Image
                src={item.images[0]}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-all duration-500 ease-out group-hover:brightness-50 group-hover:scale-[0.98]"
              />

              {/* Title overlay */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 md:p-4 opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                <h3 className="text-white font-poppins text-sm md:text-lg font-semibold">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER / GET IN TOUCH
      ══════════════════════════════════════════ */}
      <footer
        id="contact"
        className="w-full bg-black py-24 flex flex-col items-center gap-6 border-t border-white/10"
      >
        <p className="text-white/30 text-xs tracking-[0.4em] uppercase">
          Get in touch
        </p>
        {/* Replace href with your actual email */}
        <Link
          href="mailto:your@email.com"
          className="text-white text-xl md:text-3xl tracking-widest hover:opacity-50 transition-opacity"
        >
          your@email.com
        </Link>
      </footer>
    </main>
  );
}

/* ────────────────────────────────────────────────────
   FLOATING LINK
──────────────────────────────────────────────────── */
function FloatingLink({
  href,
  delay,
  children,
  mobile = false,
}: {
  href: string;
  delay: number;
  children: React.ReactNode;
  mobile?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`text-white hover:opacity-50 transition-opacity duration-300 whitespace-nowrap pointer-events-auto ${
        mobile ? "text-xl" : "text-lg lg:text-2xl"
      }`}
      style={{
        letterSpacing: "0.05em",
        animation: `floatUpDown 4s ease-in-out ${delay}s infinite`,
        display: "inline-block",
      }}
    >
      {children}
    </Link>
  );
}

/* ────────────────────────────────────────────────────
   PLACEHOLDERS — swap these out for real content
──────────────────────────────────────────────────── */

/** Replace with your Three.js canvas / Spline scene / etc. */
function ThreeDPlaceholder() {
  return (
    <div className="relative w-full h-full flex justify-start items-end  border border-dashed border-white/20 rounded-full text-white/20 text-xs text-center select-none">
      {/*
        e.g.
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <YourModel />
          <OrbitControls enableZoom={false} />
        </Canvas>
      */}
      <span className=" pointer-events-none"></span>
      <SpineObject />
    </div>
  );
}

/** Replace with a <video> tag */
function VideoPlaceholder({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-neutral-900">
      <span className="text-white/20 text-xs tracking-widest uppercase">
        {label}
      </span>
    </div>
  );
}

/** Replace with real <img> or Next.js <Image> */
function ImagePlaceholder({ label, index }: { label: string; index: number }) {
  const shades = [
    "bg-neutral-900",
    "bg-neutral-800",
    "bg-neutral-700",
    "bg-neutral-800",
  ];
  return (
    <div
      className={`w-full h-full flex items-end p-3 ${
        shades[index % shades.length]
      } transition-transform duration-500 ease-out group-hover:scale-[0.98]`}
      style={{ aspectRatio: "1 / 1" }}
    >
      <span className="text-white/20 text-[10px] tracking-widest uppercase">
        {label}
      </span>
    </div>
  );
}

/* ────────────────────────────────────────────────────
   GLOBAL KEYFRAMES
   TIP: move these two @keyframes into globals.css
──────────────────────────────────────────────────── */
function GlobalStyles() {
  return (
    <style jsx global>{`
      @keyframes floatUpDown {
        0%,
        100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-12px);
        }
      }
      @keyframes ticker {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);
        }
      }
    `}</style>
  );
}
