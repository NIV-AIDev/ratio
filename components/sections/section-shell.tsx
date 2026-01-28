import type { ReactNode } from "react";

type SectionShellProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export default function SectionShell({
  children,
  className,
  id,
}: SectionShellProps) {
  const baseClassName = "border-b border-zinc-200/60 py-16";
  const sectionClassName = className
    ? `${baseClassName} ${className}`
    : baseClassName;

  return (
    <section className={sectionClassName} id={id}>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
        {children}
      </div>
    </section>
  );
}
