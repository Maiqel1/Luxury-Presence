import Image from "next/image";
import { affiliations } from "@/lib/content";

export function Affiliations() {
  return (
    <div className="mt-28 grid border-y border-ink/15 md:mt-36 md:grid-cols-[14rem_1fr]">
      <p className="flex items-center py-6 text-[0.7rem] font-semibold tracking-[0.3em] text-ink/55 uppercase md:border-r md:border-ink/15 md:py-0">
        Affiliations
      </p>
      <ul className="grid grid-cols-2 sm:grid-cols-4">
        {affiliations.map((affiliation) => (
          <li
            key={affiliation.name}
            className="group flex flex-col items-center justify-center gap-4 border-ink/15 px-4 py-8 text-center max-sm:border-t max-sm:even:border-l sm:border-l sm:first:border-l-0"
          >
            <Image
              src={affiliation.src}
              alt=""
              sizes="96px"
              className="h-14 w-auto opacity-75 mix-blend-multiply grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0 md:h-16"
            />
            <span className="text-[0.7rem] leading-snug text-ink/60">{affiliation.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
