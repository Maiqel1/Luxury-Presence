import { FacebookIcon, InstagramIcon, LinkedInIcon, YelpIcon } from "@/components/site/icons";
import { socials } from "@/lib/content";
import { cn } from "@/lib/utils";

const icons = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  LinkedIn: LinkedInIcon,
  Yelp: YelpIcon,
};

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-3", className)}>
      {socials.map((social) => {
        const Icon = icons[social.name];
        return (
          <li key={social.name}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${social.name} (opens in a new tab)`}
              className="inline-flex size-11 items-center justify-center rounded-full border border-snow/20 text-snow/80 transition-colors hover:border-rose-light hover:text-rose-light"
            >
              <Icon aria-hidden className="size-5" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
