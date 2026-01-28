type SectionHeadingProps = {
  label?: string;
  title: string;
  description?: string;
  as?: "h1" | "h2" | "h3";
};

export default function SectionHeading({
  label,
  title,
  description,
  as = "h2",
}: SectionHeadingProps) {
  const HeadingTag = as;

  return (
    <header className="flex flex-col gap-4">
      {label ? (
        <span className="text-xs uppercase tracking-[0.4em] text-zinc-500">
          {label}
        </span>
      ) : null}
      <HeadingTag className="text-2xl font-semibold uppercase tracking-[0.2em] text-zinc-900">
        {title}
      </HeadingTag>
      {description ? (
        <p className="max-w-2xl text-sm uppercase tracking-[0.18em] text-zinc-500">
          {description}
        </p>
      ) : null}
    </header>
  );
}
