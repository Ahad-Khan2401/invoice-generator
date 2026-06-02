import type { Block } from "@/lib/posts";

/* Renders a blog post body from structured blocks with consistent,
   readable Tailwind styling. Server component (zero client JS).
   `text` may contain trusted inline HTML (<strong>, <em>, <a>). */
export default function BlogContent({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return <h2 key={i} className="pt-3 text-[22px] sm:text-[26px] font-extrabold tracking-tight text-slate-900">{b.text}</h2>;
          case "h3":
            return <h3 key={i} className="pt-2 text-[18px] font-bold text-slate-900">{b.text}</h3>;
          case "p":
            return <p key={i} className="text-[15.5px] leading-[1.8] text-slate-600 [&_a]:font-medium [&_a]:text-indigo-600 [&_a]:underline [&_a]:underline-offset-2 [&_strong]:text-slate-900" dangerouslySetInnerHTML={{ __html: b.text }} />;
          case "ul":
            return (
              <ul key={i} className="space-y-2.5 pl-1">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-3 text-[15.5px] leading-relaxed text-slate-600 [&_a]:font-medium [&_a]:text-indigo-600 [&_a]:underline [&_strong]:text-slate-900">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-500" />
                    <span dangerouslySetInnerHTML={{ __html: it }} />
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="space-y-2.5">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-3 text-[15.5px] leading-relaxed text-slate-600 [&_a]:font-medium [&_a]:text-indigo-600 [&_a]:underline [&_strong]:text-slate-900">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-indigo-50 text-[12px] font-bold text-indigo-600">{j + 1}</span>
                    <span className="pt-0.5" dangerouslySetInnerHTML={{ __html: it }} />
                  </li>
                ))}
              </ol>
            );
          case "callout":
            return (
              <div key={i} className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4 sm:p-5 text-[15px] leading-relaxed text-slate-700 [&_a]:font-semibold [&_a]:text-indigo-600 [&_a]:underline" dangerouslySetInnerHTML={{ __html: `💡 ${b.text}` }} />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
