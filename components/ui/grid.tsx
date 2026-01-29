import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type GridProps = HTMLAttributes<HTMLDivElement> & {
  columns?: 2 | 3 | 4;
};

export default function Grid({
  columns = 3,
  className,
  ...props
}: GridProps) {
  const columnClasses: Record<number, string> = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div
      className={cn("grid gap-6", columnClasses[columns], className)}
      {...props}
    />
  );
}
