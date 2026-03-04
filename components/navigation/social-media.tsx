import { cn } from "@/lib/utils";

export type SocialPlatform = "Instagram" | "LinkedIn" | "Houzz" | "TikTok" | "Twitter";

export type SocialLink = {
  platform: SocialPlatform;
  href: string;
};

export const footerSocialLinks: SocialLink[] = [
  { platform: "Instagram", href: "https://www.instagram.com" },
  { platform: "LinkedIn", href: "https://www.linkedin.com" },
  { platform: "Houzz", href: "https://www.houzz.co.uk" },
];

export const extendedSocialLinks: SocialLink[] = [
  { platform: "TikTok", href: "https://www.tiktok.com" },
  { platform: "Twitter", href: "https://x.com" },
  ...footerSocialLinks,
];

type SocialMediaIconProps = {
  platform: SocialPlatform;
  className?: string;
};

const baseIconClass = "h-4 w-4";

export function SocialMediaIcon({ platform, className }: SocialMediaIconProps) {
  const classes = cn(baseIconClass, className);

  if (platform === "Instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={classes} fill="none">
        <defs>
          <linearGradient id="instagramBgGradient" x1="4" y1="21" x2="20" y2="3" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#F9CE34" />
            <stop offset="0.35" stopColor="#EE2A7B" />
            <stop offset="0.7" stopColor="#C329B9" />
            <stop offset="1" stopColor="#6228D7" />
          </linearGradient>
        </defs>
        <rect x="2.5" y="2.5" width="19" height="19" rx="5.4" fill="url(#instagramBgGradient)" />
        <rect x="6.35" y="6.35" width="11.3" height="11.3" rx="3.45" stroke="#FFFFFF" strokeWidth="1.9" />
        <circle cx="12" cy="12" r="2.85" stroke="#FFFFFF" strokeWidth="1.9" />
        <circle cx="16.15" cy="7.85" r="1.15" fill="#FFFFFF" />
      </svg>
    );
  }

  if (platform === "LinkedIn") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={classes} fill="none">
        <circle cx="12" cy="12" r="9.5" fill="#0A66C2" />
        <circle cx="8.15" cy="8" r="1.25" fill="#FFFFFF" />
        <rect x="6.95" y="10" width="2.4" height="7.15" fill="#FFFFFF" />
        <path
          d="M10.95 9.95h2.3v1.03c.36-.64 1.31-1.33 2.67-1.33 2.3 0 3.13 1.49 3.13 3.89v3.61h-2.43v-3.29c0-1.24-.27-2.13-1.52-2.13-.98 0-1.58.65-1.82 1.28-.07.18-.1.42-.1.65v3.49h-2.23V9.95Z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  if (platform === "Houzz") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={classes} fill="none">
        <rect x="2.5" y="2.5" width="19" height="19" fill="#78BE20" />
        <path d="M8.2 6h3.1v5h4.4V18h-3.1v-3.5h-1.3V18H8.2V6Z" fill="#FFFFFF" />
      </svg>
    );
  }

  if (platform === "TikTok") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={classes} fill="currentColor">
        <path d="M14.2 3.5h2.7c.3 1.7 1.3 3.1 2.9 3.8v2.8a8.8 8.8 0 0 1-2.8-.8v5.1c0 3.2-2.4 5.9-5.8 5.9a5.8 5.8 0 0 1-5.6-5.9c0-3.2 2.5-5.8 5.6-5.8.3 0 .6 0 .9.1v2.9a3.5 3.5 0 0 0-.9-.1c-1.6 0-2.9 1.3-2.9 3s1.3 3 3 3c1.8 0 2.8-1.4 2.8-3.2V3.5Z" />
      </svg>
    );
  }

  if (platform === "Twitter") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={classes} fill="currentColor">
        <path d="M13.98 10.16 20.93 3h-1.65l-6.03 6.2L8.43 3H3l7.28 10.59L3 21h1.65l6.35-6.53L15.57 21H21l-7.02-10.84ZM11.84 12.35l-.74-1.06-5.86-8.4h2.47l4.73 6.78.74 1.06 6.14 8.79h-2.47l-5.01-7.17Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden className={classes} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M5 5 19 19" />
      <path d="M19 5 5 19" />
    </svg>
  );
}
