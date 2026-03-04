"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Container from "@/components/ui/container";

type Highlight = {
  title: string;
  body: string;
  image: string;
  alt: string;
};

type GalleryItem = {
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  layout: string;
  images: GalleryImage[];
};

type GalleryItemSeed = Omit<GalleryItem, "images"> & {
  folder: string;
  useFirstImageAsPrimary?: boolean;
};

type GalleryImage = {
  image: string;
  alt: string;
};

type ShowroomGalleryResponse = {
  folders: Record<string, string[]>;
};

const revealEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const primaryButtonClass =
  "inline-flex items-center justify-center rounded-full bg-[#b6814b] px-7 py-3 text-[11px] uppercase tracking-[0.32em] text-[#1a1a18] transition duration-300 hover:-translate-y-0.5 hover:bg-[#9c6b3f]";

const secondaryButtonDarkClass =
  "inline-flex items-center justify-center rounded-full border border-white/50 px-6 py-3 text-[11px] uppercase tracking-[0.32em] text-white transition duration-300 hover:border-white";

const highlightCardAccents = [
  "from-[#e8d8be]/50 via-[#d6b88f]/30 to-transparent",
  "from-[#d6e0e8]/50 via-[#adc6d6]/30 to-transparent",
  "from-[#d8d6e8]/50 via-[#bab0da]/30 to-transparent",
  "from-[#e8d8be]/50 via-[#d6b88f]/30 to-transparent",
];

const highlights: Highlight[] = [
  {
    title: "Material Library",
    body: "Stone, timber, metalwork, and textiles presented as tactile palettes so every specification is reviewed in natural light before sign-off.",
    // TODO: replace with licensed showroom imagery (Unsplash/Pexels/Pixabay-approved interim or final shoot).
    image: "/images/placeholders/showroom/Material.JPG",
    alt: "A curated wall of natural stone and timber samples in the showroom.",
  },
  {
    title: "Finish Atelier",
    body: "Cabinetry fronts, specialist finishes, and hand-applied textures are compared side by side to align tone, sheen, and depth.",
    // TODO: replace with licensed showroom imagery (Unsplash/Pexels/Pixabay-approved interim or final shoot).
    image: "/images/placeholders/showroom/Cabinets.jpg",
    alt: "A finish atelier table with bespoke lacquer and hardware samples.",
  },
  {
    title: "Live Spatial Zones",
    body: "Kitchen, lounge, and private-suite vignettes help clients experience circulation, lighting scenes, and furniture scale in real context.",
    // TODO: replace with licensed showroom imagery (Unsplash/Pexels/Pixabay-approved interim or final shoot).
    image: "/images/placeholders/showroom/Live_Space2.jpg",
    alt: "A fully styled showroom zone with layered lighting and furniture.",
  },
  {
    title: "Craftsmanship Bench",
    body: "Joinery prototypes, stitching details, and precision metalwork are reviewed with our makers to finalise details before fabrication.",
    // TODO: replace with licensed showroom imagery (Unsplash/Pexels/Pixabay-approved interim or final shoot).
    image: "/images/placeholders/showroom/Joints.JPG",
    alt: "Close-up craftsmanship bench showing bespoke joinery and metal edge details.",
  },
];

const galleryItemSeeds: GalleryItemSeed[] = [

  {
    title: "Material Wall",
    subtitle: "Natural palettes",
    image: "/images/placeholders/showroom/gallery-frame.svg",
    alt: "Full-height material wall showcasing stones, veneers, and textiles.",
    layout: "lg:col-span-4 lg:row-span-2",
    folder: "Material Wall",
    useFirstImageAsPrimary: true,
  },
  {
    title: "Kitchen Suite",
    subtitle: "Bespoke detailing",
    image: "/images/placeholders/showroom/kitchen-suite.jpg",
    alt: "Showroom kitchen suite with bespoke cabinetry and bronze detailing.",
    layout: "lg:col-span-4 lg:row-span-2",
    folder: "kitchen-suite",
  },
  {
    title: "Private Lounge",
    subtitle: "Layered comfort",
    image: "/images/placeholders/showroom/gallery-frame.svg",
    alt: "Private lounge setup with layered textures and warm ambient lighting.",
    layout: "lg:col-span-4 lg:row-span-2",
    folder: "Private Lounge",
    useFirstImageAsPrimary: true,
  },
  {
    title: "Bathroom Atelier",
    subtitle: "Stone and brass",
    image: "/images/placeholders/showroom/Bathroom_alt.jpg",
    alt: "Bathroom atelier display pairing stone slabs and brushed brass fixtures.",
    layout: "lg:col-span-5 lg:row-span-2",
    folder: "Bathroom Atelier",
  },
  {
    title: "Consultation Corner",
    subtitle: "Design sessions",
    image: "/images/placeholders/showroom/gallery-frame.svg",
    alt: "Consultation corner where designers and clients review drawings and samples.",
    layout: "lg:col-span-7 lg:row-span-2",
    folder: "Consultation Corner",
  },
];

const initialGalleryItems: GalleryItem[] = galleryItemSeeds.map((seed) => {
  const { folder, useFirstImageAsPrimary, ...item } = seed;
  void folder;
  void useFirstImageAsPrimary;

  return {
    ...item,
    images: [{ image: item.image, alt: item.alt }],
  };
});

const revealUp = (prefersReducedMotion: boolean, delay = 0) => ({
  initial: { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.24 },
  transition: {
    duration: prefersReducedMotion ? 0.01 : 0.82,
    delay: prefersReducedMotion ? 0 : delay,
    ease: revealEase,
  },
});

export default function ShowroomPage() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const heroRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(initialGalleryItems);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const { scrollYProgress: ctaProgress } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"],
  });

  const heroImageScale = useTransform(heroProgress, [0, 1], [1.03, 1.12]);
  const heroImageY = useTransform(heroProgress, [0, 1], [0, 26]);
  const heroCopyY = useTransform(heroProgress, [0, 1], [0, 34]);
  const heroCopyOpacity = useTransform(heroProgress, [0, 0.72], [1, 0.24]);
  const ctaImageY = useTransform(ctaProgress, [0, 1], [16, -16]);

  const activeCategory = activeCategoryIndex !== null ? galleryItems[activeCategoryIndex] : null;
  const safeActiveImageIndex = activeCategory ? activeImageIndex % activeCategory.images.length : 0;
  const activeImage = activeCategory ? activeCategory.images[safeActiveImageIndex] : null;

  const scrollToGallerySection = () => {
    const gallerySection = document.getElementById("gallery");

    if (!gallerySection) {
      return;
    }

    gallerySection.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    let isCancelled = false;

    const loadGalleryImages = async () => {
      try {
        const response = await fetch("/api/showroom-gallery", { cache: "no-store" });

        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as ShowroomGalleryResponse;
        const folderMap = payload?.folders ?? {};

        if (isCancelled) {
          return;
        }

        const resolvedItems = galleryItemSeeds.map((seed) => {
          const folderImages = folderMap[seed.folder] ?? [];
          const mappedImages: GalleryImage[] = folderImages.map((imageSrc, imageIndex) => ({
            image: imageSrc,
            alt: `${seed.title} gallery image ${imageIndex + 1}`,
          }));
          const images = mappedImages.length > 0 ? mappedImages : [{ image: seed.image, alt: seed.alt }];
          const cardImage = seed.useFirstImageAsPrimary ? images[0].image : seed.image;
          const cardAlt = seed.useFirstImageAsPrimary ? images[0].alt : seed.alt;
          const { folder, useFirstImageAsPrimary, ...item } = seed;
          void folder;
          void useFirstImageAsPrimary;

          return {
            ...item,
            image: cardImage,
            alt: cardAlt,
            images,
          };
        });

        setGalleryItems(resolvedItems);
      } catch {
        // Keep fallback gallery items when image loading fails.
      }
    };

    void loadGalleryImages();

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    if (activeCategoryIndex === null) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveCategoryIndex(null);
        setActiveImageIndex(0);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [activeCategoryIndex]);

  const showPreviousImage = () => {
    if (!activeCategory) {
      return;
    }

    setActiveImageIndex((previous) => (previous - 1 + activeCategory.images.length) % activeCategory.images.length);
  };

  const showNextImage = () => {
    if (!activeCategory) {
      return;
    }

    setActiveImageIndex((previous) => (previous + 1) % activeCategory.images.length);
  };

  return (
    <article className="overflow-x-clip bg-[#f6f3ef] text-[#1a1a18]">
      <section ref={heroRef} className="relative min-h-svh overflow-hidden bg-[#0f0d0b] text-white">
        <motion.div
          className="absolute inset-0"
          style={{
            scale: prefersReducedMotion ? 1.03 : heroImageScale,
            y: prefersReducedMotion ? 0 : heroImageY,
          }}
        >
          {/* TODO: replace with licensed showroom hero media (Unsplash/Pexels/Pixabay-approved interim or final shoot). */}
          <Image
            src="/images/placeholders/showroom/hero-editorial.jpg"
            alt="Editorial hero view of The Ratio showroom."
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/60 to-black/82" aria-hidden />

        <Container className="relative z-10 grid min-h-svh gap-8 pb-[calc(4rem+env(safe-area-inset-bottom))] pt-32 sm:pt-36 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end lg:pb-20">
          <motion.div
            {...revealUp(prefersReducedMotion, 0.06)}
            style={{
              y: prefersReducedMotion ? 0 : heroCopyY,
              opacity: prefersReducedMotion ? 1 : heroCopyOpacity,
            }}
            className="max-w-3xl space-y-7"
          >
            <p className="text-[11px] uppercase tracking-[0.4em] text-white/74">THE RATIO</p>
            <h1 className="font-(--font-home-serif) text-4xl uppercase tracking-[0.08em] sm:text-5xl lg:text-7xl">
              Showroom
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-white/82 sm:text-lg">
              A tactile, immersive environment where materials, finishes, and craftsmanship are experienced at full
              scale before they are built into your home.
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Link href="/contact" className={primaryButtonClass}>
                Visit the showroom
              </Link>
              <Link href="#gallery" className={secondaryButtonDarkClass}>
                Explore gallery
              </Link>
            </div>
          </motion.div>

          <motion.div {...revealUp(prefersReducedMotion, 0.14)} className="max-w-sm">
            <Link
              href="/contact"
              className="block cursor-pointer rounded-[22px] border border-white/24 bg-white/10 p-5 shadow-[0_20px_55px_rgba(0,0,0,0.28)] transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d7c3a4]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0d0b] supports-backdrop-filter:bg-white/6 supports-backdrop-filter:backdrop-blur-md sm:p-6"
              aria-label="Visit contact page to book a private walkthrough"
            >
              <p className="text-[11px] uppercase tracking-[0.32em] text-white/65">By appointment</p>
              <h2 className="mt-4 font-(--font-home-serif) text-2xl uppercase tracking-[0.06em] text-[#d9c7ab]">
                Private walkthroughs
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/78">
                Design consultations include guided material review, lighting demonstrations, and detail mock-up
                sessions with our studio team.
              </p>
            </Link>
          </motion.div>
        </Container>
      </section>

      <section className="bg-[#f6f3ef] py-16 sm:py-20 lg:py-24">
        <Container className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
          <motion.div {...revealUp(prefersReducedMotion)} className="space-y-6">
            <p className="text-[11px] uppercase tracking-[0.34em] text-[#8b7a63]">Inside the studio</p>
            <h2 className="font-(--font-home-serif) text-3xl uppercase tracking-[0.09em] text-[#ab9468] sm:text-5xl">
              Editorial, not ordinary
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-[#555148] sm:text-lg">
              The showroom is curated like a living editorial set, with architectural vignettes that reveal how
              proportion, texture, and light interact through the day.
            </p>
            <p className="max-w-2xl text-base leading-relaxed text-[#555148] sm:text-lg">
              Every visit is paced as a design journey: from broad atmosphere to fine detail, helping you make
              confident decisions with complete visual clarity.
            </p>
          </motion.div>

          <motion.div
            {...revealUp(prefersReducedMotion, 0.1)}
            className="rounded-[22px] border border-[#ddd2c3] bg-white/75 p-6 shadow-[0_18px_45px_rgba(26,26,24,0.08)] supports-backdrop-filter:backdrop-blur-sm sm:p-7"
          >
            <p className="text-[11px] uppercase tracking-[0.32em] text-[#8a7a63]">Session format</p>
            <ul className="mt-5 space-y-3 text-sm text-[#5d574f]">
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#b6814b]" aria-hidden />
                <span>90-minute guided showroom route with design specialist</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#b6814b]" aria-hidden />
                <span>Material and finish comparisons under calibrated lighting</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#b6814b]" aria-hidden />
                <span>Live detailing discussion with procurement and implementation context</span>
              </li>
            </ul>
          </motion.div>
        </Container>
      </section>

      <section className="bg-[#13100d] py-16 text-white sm:py-20 lg:py-24">
        <Container>
          <motion.div {...revealUp(prefersReducedMotion)} className="space-y-4">
            <p className="text-[11px] uppercase tracking-[0.34em] text-white/58">Showroom highlights</p>
            <h2 className="font-(--font-home-serif) text-3xl uppercase tracking-[0.09em] text-[#d3bc98] sm:text-5xl">
              Materials to craftsmanship
            </h2>
          </motion.div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {highlights.map((item, index) => (
              <motion.button
                type="button"
                key={item.title}
                {...revealUp(prefersReducedMotion, index * 0.1)}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: -8,
                        scale: 1.012,
                        transition: { duration: 0.36, ease: revealEase },
                      }
                }
                transition={{ duration: prefersReducedMotion ? 0.01 : 0.85, ease: revealEase }}
                onClick={scrollToGallerySection}
                className="group relative isolate overflow-hidden rounded-[28px] border border-white/24 bg-white/9 text-left shadow-[0_22px_48px_rgba(3,8,16,0.26)] backdrop-blur-xl cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d7c3a4]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#13100d]"
                aria-label={`View gallery after ${item.title}`}
              >
                <div
                  className={`pointer-events-none absolute -top-14 left-1/2 h-36 w-[130%] -translate-x-1/2 rounded-full bg-linear-to-b ${highlightCardAccents[index % highlightCardAccents.length]} blur-2xl transition duration-700 group-hover:scale-110`}
                />
                <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_18%_0%,rgba(255,255,255,0.24),transparent_52%),radial-gradient(circle_at_82%_100%,rgba(183,152,111,0.16),transparent_50%)]" />
                <div className="pointer-events-none absolute inset-px rounded-[inherit] border border-white/24" />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-y-12 left-[-70%] w-[64%] -translate-x-full rotate-12 bg-linear-to-r from-transparent via-white/45 to-transparent opacity-0 blur-xl transition duration-700 ease-out group-hover:translate-x-[280%] group-hover:opacity-75"
                />
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute -inset-y-12 left-[-70%] w-[64%] -translate-x-full rotate-12 bg-linear-to-r from-transparent via-white/45 to-transparent opacity-0 blur-xl"
                  initial={prefersReducedMotion ? false : { x: "0%", opacity: 0 }}
                  whileInView={
                    prefersReducedMotion
                      ? undefined
                      : {
                          x: "280%",
                          opacity: [0, 0.75, 0],
                        }
                  }
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 1.2, ease: revealEase }}
                />

                <div className="relative z-10 h-56 overflow-hidden sm:h-64">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover transition duration-700 ease-out group-hover:scale-[1.02]"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/25 to-transparent" aria-hidden />
                </div>
                <div className="relative z-10 space-y-3 p-6">
                  <h3 className="font-(--font-home-serif) text-2xl uppercase tracking-[0.06em] text-[#d7c3a4]">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/74">{item.body}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </Container>
      </section>

      <section id="gallery" className="bg-[#f2eee8] py-16 sm:py-20 lg:py-24">
        <Container className="xl:max-w-[1280px]">
          <motion.div {...revealUp(prefersReducedMotion)} className="space-y-4 text-center">
            <p className="text-[11px] uppercase tracking-[0.34em] text-[#8b7a63]">Showroom gallery</p>
            <h2 className="font-(--font-home-serif) text-3xl uppercase tracking-[0.09em] text-[#ab9468] sm:text-5xl">
              Walk through the space
            </h2>
            <p className="mx-auto max-w-3xl text-base leading-relaxed text-[#5a544c] sm:text-lg">
              A visual edit of our physical showroom zones, from broad spatial mood to micro-craft details.
            </p>
          </motion.div>

          <motion.div
            className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-12 lg:grid-flow-dense lg:auto-rows-[132px] lg:gap-5 xl:auto-rows-[144px]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: prefersReducedMotion ? 0 : 0.1,
                },
              },
            }}
          >
            {galleryItems.map((item, index) => (
              <motion.article
                key={item.title}
                variants={{
                  hidden: { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 10 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: prefersReducedMotion ? 0.01 : 0.74,
                      ease: revealEase,
                    },
                  },
                }}
                whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                transition={{ duration: prefersReducedMotion ? 0.01 : 0.3, ease: revealEase }}
                className={item.layout}
              >
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategoryIndex(index);
                    setActiveImageIndex(0);
                  }}
                  className="group relative h-full min-h-[220px] w-full cursor-pointer overflow-hidden rounded-[18px] border border-[#ded4c6] bg-black text-left sm:min-h-[240px] lg:min-h-0"
                  aria-label={`Open image: ${item.title}`}
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover transition duration-700 ease-out group-hover:scale-[1.02]"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/68 via-black/18 to-transparent" aria-hidden />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <div className="rounded-2xl border border-white/24 bg-white/12 px-4 py-3 supports-backdrop-filter:bg-white/8 supports-backdrop-filter:backdrop-blur-md">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-white/70">{item.subtitle}</p>
                      <p className="mt-1 font-(--font-home-serif) text-lg uppercase tracking-[0.05em] text-white">
                        {item.title}
                      </p>
                    </div>
                  </div>
                </button>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </section>

      <section ref={ctaRef} className="relative overflow-hidden bg-[#0e0d0b] py-20 text-white sm:py-24 lg:py-28">
        <motion.div
          className="absolute inset-0"
          style={{ y: prefersReducedMotion ? 0 : ctaImageY }}
        >
          {/* TODO: replace with licensed showroom CTA background imagery. */}
          <Image
            src="/images/placeholders/showroom/cta-visit.svg"
            alt="Showroom appointment background"
            fill
            className="object-cover opacity-44"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-linear-to-b from-black/55 via-black/70 to-black/82" aria-hidden />

        <Container className="relative z-10">
          <motion.div
            {...revealUp(prefersReducedMotion)}
            className="mx-auto max-w-3xl rounded-[24px] border border-white/20 bg-white/8 p-8 text-center shadow-[0_28px_70px_rgba(0,0,0,0.35)] supports-backdrop-filter:bg-white/5 supports-backdrop-filter:backdrop-blur-md sm:p-10"
          >
            <p className="text-[11px] uppercase tracking-[0.34em] text-white/65">Plan your visit</p>
            <h2 className="mt-5 font-(--font-home-serif) text-3xl uppercase tracking-[0.08em] text-[#d8c5a7] sm:text-5xl">
              Experience the showroom in person
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/78 sm:text-lg">
              Book a private appointment to review materials, test lighting moods, and align every detail with your
              project vision.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link href="/contact" className={primaryButtonClass}>
                Visit the showroom
              </Link>
              <Link href="/contact" className={secondaryButtonDarkClass}>
                Book an appointment
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      <section className="bg-[#0f0d0b] pb-[max(4.5rem,env(safe-area-inset-bottom))] pt-0 text-white">
        <Container>
          <motion.div
            {...revealUp(prefersReducedMotion, 0.04)}
            className="overflow-hidden rounded-[28px] border border-white/16 bg-black/35"
          >
            <div className="px-6 py-5 sm:px-8">
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">Brentford showroom map</p>
            </div>
            <div className="h-[320px] w-full border-t border-white/12 sm:h-[380px]">
              <iframe
                title="The Ratio showroom map"
                src="https://www.google.com/maps?q=Unit%209%20Shield%20Drive%20Brentford%20TW8%209EX&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full"
              />
            </div>
          </motion.div>
        </Container>
      </section>

      <AnimatePresence>
        {activeImage ? (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/86 p-4 backdrop-blur-sm sm:p-8"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.28, ease: revealEase }}
            role="dialog"
            aria-modal="true"
            aria-label="Showroom image lightbox"
            onClick={() => {
              setActiveCategoryIndex(null);
              setActiveImageIndex(0);
            }}
          >
            <button
              type="button"
              onClick={() => {
                setActiveCategoryIndex(null);
                setActiveImageIndex(0);
              }}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/35 bg-black/35 text-white transition-colors hover:border-[#d6c4aa] hover:text-[#d6c4aa] sm:right-8 sm:top-8"
              aria-label="Close image"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                <path d="M6.7 5.3 12 10.6l5.3-5.3 1.4 1.4-5.3 5.3 5.3 5.3-1.4 1.4-5.3-5.3-5.3 5.3-1.4-1.4 5.3-5.3-5.3-5.3z" fill="currentColor" />
              </svg>
            </button>

            <div
              className="relative w-full max-w-6xl overflow-hidden rounded-[18px] border border-white/20 bg-black"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative h-[56svh] min-h-[320px] sm:h-[68svh]">
                <Image src={activeImage.image} alt={activeImage.alt} fill className="object-cover" sizes="90vw" priority />
                <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/20 to-transparent" aria-hidden />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                  <p className="text-[10px] uppercase tracking-[0.32em] text-white/66">{activeCategory?.subtitle}</p>
                  <p className="mt-2 font-(--font-home-serif) text-2xl uppercase tracking-[0.08em] text-white sm:text-3xl">
                    {activeCategory?.title}
                  </p>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 flex items-center gap-2 sm:bottom-6 sm:right-6">
                <button
                  type="button"
                  onClick={showPreviousImage}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/35 bg-black/40 text-white transition-colors hover:border-[#d6c4aa] hover:text-[#d6c4aa]"
                  aria-label="Previous image"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                    <path d="M15.7 5.3a1 1 0 0 1 0 1.4L10.4 12l5.3 5.3a1 1 0 1 1-1.4 1.4l-6-6a1 1 0 0 1 0-1.4l6-6a1 1 0 0 1 1.4 0z" fill="currentColor" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={showNextImage}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/35 bg-black/40 text-white transition-colors hover:border-[#d6c4aa] hover:text-[#d6c4aa]"
                  aria-label="Next image"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                    <path d="M8.3 18.7a1 1 0 0 1 0-1.4l5.3-5.3-5.3-5.3a1 1 0 1 1 1.4-1.4l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 0 1-1.4 0z" fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}
