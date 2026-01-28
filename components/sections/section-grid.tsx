type SectionItem = {
  id: string;
  title: string;
  description?: string;
  meta?: string;
};

type SectionGridProps = {
  items: SectionItem[];
  columns?: 2 | 3;
};

export default function SectionGrid({ items, columns = 3 }: SectionGridProps) {
  const columnClassName = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3";

  return (
    <ul className={`grid gap-6 ${columnClassName}`}>
      {items.map((item) => (
        <li
          key={item.id}
          className="border border-zinc-200/70 bg-white/70 p-5 text-zinc-600"
        >
          <article className="flex h-full flex-col gap-3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400">
              {item.meta ?? "Placeholder"}
            </span>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-900">
              {item.title}
            </h2>
            {item.description ? (
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                {item.description}
              </p>
            ) : null}
          </article>
        </li>
      ))}
    </ul>
  );
}
