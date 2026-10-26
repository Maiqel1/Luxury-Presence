import { cn } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10", className)}>{children}</div>;
}

export function RunningHead({
  number,
  title,
  tone = "light",
  className,
}: {
  number: string;
  title: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-6 border-t pt-4 text-[0.7rem] font-semibold tracking-[0.3em] uppercase",
        tone === "light" ? "border-ink/15 text-ink/55" : "border-snow/15 text-snow/55",
        className,
      )}
    >
      <p>
        <span className={tone === "light" ? "text-rose" : "text-rose-light"}>Nº {number}</span>
        <span className="mx-3">—</span>
        {title}
      </p>
      <p className="hidden sm:block">Marci Metzger · Pahrump, NV</p>
    </div>
  );
}

export function SmallCaps({ className, children }: { className?: string; children: React.ReactNode }) {
  return <p className={cn("text-[0.7rem] font-semibold tracking-[0.3em] uppercase", className)}>{children}</p>;
}
