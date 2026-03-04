"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/container";

type PolicySection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

const revealEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const cardAccents = [
  "from-[#e8d8be]/74 via-[#d6b88f]/45 to-transparent",
  "from-[#d6e0e8]/72 via-[#adc6d6]/44 to-transparent",
  "from-[#d8d6e8]/72 via-[#bab0da]/44 to-transparent",
] as const;

const primaryButtonClass =
  "inline-flex items-center justify-center rounded-full bg-[#b6814b] px-7 py-3 text-[11px] uppercase tracking-[0.32em] text-[#1a1a18] transition duration-300 hover:-translate-y-0.5 hover:bg-[#9c6b3f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b6814b]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6f3ef]";

const policySections: PolicySection[] = [
  {
    heading: "What information do we collect?",
    paragraphs: [
      "We collect names and email addresses when submitted through website forms. Telephone numbers may also be stored when provided.",
      "In areas where registration is offered, we may request additional information such as your address and related project details to support your enquiry.",
      "We only retain personal data where there is a valid reason to do so, and you can request removal from marketing communications at any time.",
    ],
  },
  {
    heading: "How will we use the information about you?",
    paragraphs: [
      "We do not sell or distribute your personal information to third parties for their own marketing.",
      "The Ratio uses submitted information only for the operation and improvement of our services.",
      "Some of our systems may be hosted by trusted third-party providers. Where this applies, we require those providers to keep your information secure and use it only for agreed purposes.",
    ],
    bullets: [
      "To respond to project enquiries and service requests",
      "To send occasional updates related to The Ratio and our services",
      "To request feedback for service and research purposes",
      "To maintain records only for as long as necessary for the relevant activity",
    ],
  },
  {
    heading: "Security",
    paragraphs: [
      "Personal information submitted through our website is transmitted using Secure Sockets Layer (SSL) encryption technology.",
      "We apply reasonable technical and organisational safeguards to help protect your data.",
    ],
  },
  {
    heading: "Access to your information and correction",
    paragraphs: [
      "You can request details of personal information we hold about you, and ask us to correct or remove inaccurate data.",
      "To make a request, please contact us by email at Info@theratio.co.uk or write to us at Unit 9 Shield Drive Brentford TW8 9EX.",
    ],
  },
  {
    heading: "Copyright and trade marks",
    paragraphs: [
      "All material on this website is owned by The Ratio or used with permission from rights holders. All rights are reserved.",
      "No content may be copied, modified, published, broadcast, or distributed without prior written permission from The Ratio.",
    ],
  },
  {
    heading: "Disclaimer",
    paragraphs: [
      "The Ratio makes no warranties or representations regarding the accuracy or suitability of content on this website for any particular purpose. Content is provided on an \"as is\" basis.",
      "The Ratio does not warrant that this website, its services, or associated servers will always be uninterrupted, error-free, or free from harmful code.",
      "To the maximum extent permitted by law, The Ratio and its representatives shall not be liable for direct, indirect, or consequential loss arising from the use of this website.",
    ],
  },
  {
    heading: "Links",
    paragraphs: [
      "Any links to third-party websites are provided in good faith and for information only.",
      "The Ratio accepts no responsibility for content or materials hosted on external websites.",
    ],
  },
  {
    heading: "Interactive material",
    paragraphs: [
      "Where parts of our website allow user-submitted content, those submissions do not necessarily reflect the views of The Ratio.",
      "By submitting material, you confirm you hold the necessary rights and that your content is not unlawful, defamatory, threatening, obscene, or otherwise objectionable.",
      "The Ratio reserves the right to review, edit, or remove user-submitted content at its sole discretion.",
    ],
  },
  {
    heading: "Google Analytics and tracking data",
    paragraphs: [
      "We use analytics tools, including Google Analytics, to understand anonymous visitor behaviour and improve website performance.",
      "We may also use advertising and remarketing tools that rely on cookies. These cookies help personalise future experiences and advertising, and do not directly identify you to us.",
      "You can manage or clear cookies through your browser settings and can opt out of Google Analytics tracking via Google's available opt-out tools.",
    ],
  },
  {
    heading: "Review of this policy",
    paragraphs: [
      "We may update this policy from time to time. Please review the latest version periodically.",
      "If you have any privacy-related questions, contact us at Info@theratio.co.uk.",
    ],
  },
];

export default function PrivacyPageContent() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  const reveal = (delay = 0, y = 24, amount = 0.26) => ({
    initial: { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount },
    transition: {
      duration: prefersReducedMotion ? 0.01 : 0.74,
      delay: prefersReducedMotion ? 0 : delay,
      ease: revealEase,
    },
  });

  return (
    <article className="bg-[#f6f3ef] text-[#1a1a18]">
      <section className="relative overflow-hidden bg-[#f4eee6] pb-14 pt-28 sm:pb-18 sm:pt-32 lg:pb-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-60 bg-[linear-gradient(180deg,rgba(171,148,104,0.28),transparent)]" />

        <Container className="relative">
          <motion.div {...reveal(0, 24, 0.45)} className="max-w-4xl">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[#8a755b]">Legal</p>
            <h1 className="mt-4 font-(--font-home-serif) text-4xl uppercase tracking-[0.08em] text-[#1f1a15] sm:text-5xl lg:text-6xl">
              Privacy Policy
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#5c5348] sm:text-lg">
              At The Ratio, we take your privacy seriously and are committed to protecting any personal data submitted
              through our website in line with UK data protection legislation and GDPR principles. If you need any
              additional information, contact us at{" "}
              <a
                href="mailto:Info@theratio.co.uk"
                className="border-b border-[#ab9468]/65 text-[#7f6442] transition-colors hover:text-[#5d472d]"
              >
                Info@theratio.co.uk
              </a>
              .
            </p>
          </motion.div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-[#f6f3ef] pb-8 sm:pb-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(232,216,190,0.22),transparent_58%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(170,187,209,0.16),transparent_58%)]" />

        <Container>
          <motion.article
            {...reveal(0.03, 20, 0.32)}
            className="group relative isolate overflow-hidden rounded-[28px] border border-[#f2e6d8] bg-[linear-gradient(145deg,rgba(255,255,255,0.78),rgba(255,255,255,0.42)_50%,rgba(232,221,208,0.55))] p-7 shadow-[0_34px_80px_rgba(40,30,18,0.24),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl sm:p-8"
          >
            <div className="pointer-events-none absolute -top-16 left-1/2 h-40 w-[135%] -translate-x-1/2 rounded-full bg-linear-to-b from-[#e8d8be]/82 via-[#d6b88f]/48 to-transparent blur-2xl transition duration-700 group-hover:scale-110" />
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_18%_0%,rgba(255,255,255,0.78),transparent_52%),radial-gradient(circle_at_82%_100%,rgba(183,152,111,0.2),transparent_50%)]" />
            <div className="pointer-events-none absolute inset-[1px] rounded-[inherit] border border-white/45" />

            <motion.div
              aria-hidden
              className="pointer-events-none absolute -inset-y-14 left-[-70%] w-[64%] -translate-x-full rotate-[12deg] bg-linear-to-r from-transparent via-white/75 to-transparent opacity-0 blur-xl mix-blend-screen"
              initial={prefersReducedMotion ? false : { x: "0%", opacity: 0 }}
              whileInView={
                prefersReducedMotion
                  ? undefined
                  : {
                      x: "280%",
                      opacity: [0, 0.8, 0],
                    }
              }
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1.25, ease: revealEase }}
            />

            <div className="relative z-10 space-y-5">
              <p className="text-[11px] uppercase tracking-[0.34em] text-[#7e6a52]">Data Protection</p>
              <h2 className="font-(--font-home-serif) text-3xl uppercase tracking-[0.06em] text-[#2b241d] sm:text-4xl">
                Your data, handled with care
              </h2>
              <p className="max-w-3xl text-sm leading-relaxed text-[#4f453a] sm:text-base">
                We process personal information only where needed to provide our services, respond to enquiries, and
                maintain legitimate business operations. We do not sell your personal information.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/contact" className={primaryButtonClass}>
                  Contact us
                </Link>
                <a
                  href="mailto:Info@theratio.co.uk"
                  className="inline-flex border-b border-[#ab9468] pb-1 text-[11px] uppercase tracking-[0.26em] text-[#8b6f48] transition-colors hover:text-[#5d472d]"
                >
                  Info@theratio.co.uk
                </a>
              </div>
            </div>
          </motion.article>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-[#f6f3ef] pb-[calc(5rem+env(safe-area-inset-bottom))] sm:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(183,152,111,0.18),transparent_42%)]" />

        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            {policySections.map((section, index) => (
              <motion.article
                key={section.heading}
                {...reveal(index * 0.04, 20, 0.2)}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: -4,
                        transition: { duration: 0.28, ease: revealEase },
                      }
                }
                className="group relative isolate h-full overflow-hidden rounded-[24px] border border-white/60 bg-[linear-gradient(145deg,rgba(255,255,255,0.76),rgba(255,255,255,0.34)_50%,rgba(232,221,208,0.5))] p-6 shadow-[0_30px_68px_rgba(40,30,18,0.18),inset_0_1px_0_rgba(255,255,255,0.74)] backdrop-blur-xl sm:p-7"
              >
                <div
                  className={`pointer-events-none absolute -top-16 left-1/2 h-40 w-[135%] -translate-x-1/2 rounded-full bg-linear-to-b blur-2xl transition duration-700 group-hover:scale-110 ${cardAccents[index % cardAccents.length]}`}
                />
                <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_18%_0%,rgba(255,255,255,0.78),transparent_52%),radial-gradient(circle_at_82%_100%,rgba(183,152,111,0.2),transparent_50%)]" />
                <div className="pointer-events-none absolute inset-[1px] rounded-[inherit] border border-white/45" />

                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute -inset-y-14 left-[-70%] w-[64%] -translate-x-full rotate-[12deg] bg-linear-to-r from-transparent via-white/75 to-transparent opacity-0 blur-xl mix-blend-screen"
                  initial={prefersReducedMotion ? false : { x: "0%", opacity: 0 }}
                  whileInView={
                    prefersReducedMotion
                      ? undefined
                      : {
                          x: "280%",
                          opacity: [0, 0.8, 0],
                        }
                  }
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 1.25, ease: revealEase }}
                />

                <div className="relative z-10 space-y-4">
                  <h3 className="font-(--font-home-serif) text-2xl uppercase tracking-[0.06em] text-[#2c241b]">
                    {section.heading}
                  </h3>
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p
                      key={`${section.heading}-paragraph-${paragraphIndex}`}
                      className="text-sm leading-relaxed text-[#453d34] sm:text-[15px]"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets ? (
                    <ul className="space-y-2 pt-1 text-sm leading-relaxed text-[#453d34] sm:text-[15px]">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#b6814b]" aria-hidden />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </motion.article>
            ))}
          </div>

          <motion.article
            {...reveal(0.1, 20, 0.26)}
            className="mt-8 rounded-[24px] border border-white/60 bg-[linear-gradient(145deg,rgba(255,255,255,0.76),rgba(255,255,255,0.34)_50%,rgba(232,221,208,0.5))] p-6 shadow-[0_30px_68px_rgba(40,30,18,0.18),inset_0_1px_0_rgba(255,255,255,0.74)] backdrop-blur-xl sm:p-7"
          >
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#8a7963]">Google Analytics opt-out</p>
            <p className="mt-4 text-sm leading-relaxed text-[#453d34] sm:text-[15px]">
              You can review Google&apos;s currently available analytics opt-out tools here:
            </p>
            <a
              href="https://tools.google.com/dlpage/gaoptout/"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex border-b border-[#ab9468] pb-1 text-[11px] uppercase tracking-[0.24em] text-[#ab9468] transition-colors hover:text-[#8c744c]"
            >
              Google Analytics opt-out tools
            </a>
          </motion.article>
        </Container>
      </section>
    </article>
  );
}
