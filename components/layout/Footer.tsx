import Link from "next/link";
import { NAV_LINKS, SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "@/components/icons/SocialIcons";

const SOCIALS = [
  { name: "Instagram", href: SOCIAL_LINKS.instagram, Icon: InstagramIcon },
  { name: "Facebook", href: SOCIAL_LINKS.facebook, Icon: FacebookIcon },
  { name: "TikTok", href: SOCIAL_LINKS.tiktok, Icon: TikTokIcon },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-black/5 bg-hookmi-cream">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-heading text-xl font-bold text-hookmi-ink">{SITE_NAME}</p>
          <p className="mt-2 max-w-xs text-sm text-hookmi-ink/70">
            Kits de crochet para principiantes, con tutoriales en video paso a paso.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-hookmi-ink/80 hover:text-hookmi-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {SOCIALS.map(({ name, href, Icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`HOOKMI en ${name}`}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-hookmi-ink transition hover:bg-hookmi-yellow"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-black/5 px-5 py-4 text-center text-xs text-hookmi-ink/60">
        © {new Date().getFullYear()} {SITE_NAME}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
