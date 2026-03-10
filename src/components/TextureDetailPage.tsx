"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// ─────────────────────────────────────────────
//  DATA — fill in your real items here
// ─────────────────────────────────────────────
export interface TextureItem {
  id: string;
  title: string;
  images: string[]; // first image is the main/hero one
  description: string[]; // each string = one line (e.g. "Created for Counter-Strike 2")
  link?: { label: string; href: string };
}

// Example data — replace with your own
export const TEXTURE_ITEMS: TextureItem[] = [
  {
    id: "desert-eagle-cd",
    title: "DESERT EAGLE | CD",
    images: [
      "/images/textures/deagle-cd-1.jpg",
      "/images/textures/deagle-cd-2.jpg",
      "/images/textures/deagle-cd-3.jpg",
    ],
    description: ["Created for Counter-Strike 2", "Commissioned by NadeKing"],
    link: {
      label:
        "https://steamcommunity.com/sharedfiles/filedetails/?id=3031874084",
      href: "https://steamcommunity.com/sharedfiles/filedetails/?id=3031874084",
    },
  },
  {
    id: "ak47-neon",
    title: "AK-47 | NEON RIDER",
    images: [
      "/images/textures/ak47-neon-1.jpg",
      "/images/textures/ak47-neon-2.jpg",
    ],
    description: ["Created for Counter-Strike 2", "Personal project"],
    link: {
      label:
        "https://steamcommunity.com/sharedfiles/filedetails/?id=0000000000",
      href: "https://steamcommunity.com/sharedfiles/filedetails/?id=0000000000",
    },
  },
];
// ─────────────────────────────────────────────

interface Props {
  item: TextureItem;
}

export default function TextureDetailPage({ item }: Props) {
  const [activeImg, setActiveImg] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = () =>
    setActiveImg((i) => (i - 1 + item.images.length) % item.images.length);
  const next = () => setActiveImg((i) => (i + 1) % item.images.length);

  return (
    <div
      className="min-h-screen bg-white text-black"
      style={{ fontFamily: "'Courier New', monospace" }}
    >
      {/* ── TOP BAR ── */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4">
        {/* Expand icon */}
        <button
          onClick={() => setLightbox(true)}
          className="text-black hover:opacity-40 transition-opacity"
          aria-label="Expand image"
        >
          <ExpandIcon />
        </button>

        {/* Close / back */}
        <Link
          href="/#graphics"
          className="text-black hover:opacity-40 transition-opacity"
          aria-label="Close"
        >
          <CloseIcon />
        </Link>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="flex flex-col md:flex-row min-h-screen pt-16">
        {/* LEFT — image */}
        <div className="relative flex-1 flex items-center justify-center p-6 md:p-16">
          <div
            className="relative w-full max-w-4xl "
            style={{ aspectRatio: "4/3" }}
          >
            <Image
              src={item.images[activeImg]}
              alt={item.title}
              className="w-full h-full object-contain  rounded-sm"
              width={1024}
              height={1024}
            />
          </div>

          {/* Prev / Next arrows — only shown when multiple images */}
          {item.images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-black hover:opacity-40 transition-opacity p-2"
                aria-label="Previous image"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={next}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-black hover:opacity-40 transition-opacity p-2"
                aria-label="Next image"
              >
                <ChevronRight />
              </button>
            </>
          )}

          {/* Dot indicators */}
          {item.images.length > 1 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              {item.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    i === activeImg ? "bg-black scale-125" : "bg-black/30"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* RIGHT — info panel */}
        <div className="w-full md:w-80 lg:w-96 flex flex-col justify-center px-8 md:px-12 py-12 md:py-0 border-t md:border-t-0 md:border-l border-black/10">
          <h1 className="text-xl md:text-2xl font-normal tracking-widest mb-6 uppercase">
            {item.title}
          </h1>

          <div className="flex flex-col gap-0.5 mb-8">
            {item.description.map((line, i) => (
              <p key={i} className="text-sm text-black/80 leading-relaxed">
                {line}
              </p>
            ))}
          </div>

          {item.link && (
            <Link
              href={item.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-black/60 underline underline-offset-4 hover:text-black transition-colors break-all leading-relaxed"
            >
              {item.link.label}
            </Link>
          )}

          {/* Right-side next arrow (desktop only, matches screenshot) */}
          {item.images.length > 1 && (
            <button
              onClick={next}
              className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 text-black/40 hover:text-black transition-colors"
              aria-label="Next image"
            >
              <ChevronRight />
            </button>
          )}
        </div>
      </div>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          <button
            className="absolute top-5 right-5 text-white hover:opacity-50 transition-opacity"
            onClick={() => setLightbox(false)}
          >
            <CloseIcon white />
          </button>
          {item.images.length > 1 && (
            <>
              <button
                className="absolute left-5 top-1/2 -translate-y-1/2 text-white hover:opacity-50 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
              >
                <ChevronLeft white />
              </button>
              <button
                className="absolute right-5 top-1/2 -translate-y-1/2 text-white hover:opacity-50 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
              >
                <ChevronRight white />
              </button>
            </>
          )}
          <Image
            src={item.images[activeImg]}
            alt={item.title}
            width={1024}
            height={1024}
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

/* ─── SVG ICONS ──────────────────────────────── */
function ExpandIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <polyline points="15 3 21 3 21 9" />
      <polyline points="9 21 3 21 3 15" />
      <line x1="21" y1="3" x2="14" y2="10" />
      <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  );
}

function CloseIcon({ white = false }: { white?: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={white ? "white" : "currentColor"}
      strokeWidth="1.5"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ChevronLeft({ white = false }: { white?: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={white ? "white" : "currentColor"}
      strokeWidth="1.5"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight({ white = false }: { white?: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={white ? "white" : "currentColor"}
      strokeWidth="1.5"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
