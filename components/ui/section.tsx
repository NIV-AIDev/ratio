import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type SectionProps = HTMLAttributes<HTMLElement> & {
  as?: "section" | "div" | "article";
};

export default function Section({
  as: Component = "section",
  className,
  ...props
}: SectionProps) {
  return (
    <Component className={cn("py-20", className)} {...props} />
  );
}
