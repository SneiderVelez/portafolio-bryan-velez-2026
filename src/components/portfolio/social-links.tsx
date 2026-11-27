import { ArrowUpRight } from "lucide-react";
import type { ComponentType } from "react";

import { cn } from "@/lib/utils";

export type SocialLinkItem = {
  label: string;
  href: string;
  Icon: ComponentType<{
    className?: string;
    "aria-hidden"?: boolean;
  }>;
};

export function SocialLinks({
  links,
  className,
}: {
  links: SocialLinkItem[];
  className?: string;
}) {
  return (
    <nav aria-label="Redes y contacto" className={cn("flex flex-wrap items-center gap-x-5 gap-y-3", className)}>
      {links.map(({ Icon, href, label }) => (
        <a
          aria-label={label}
          className="social-link group inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-control)] px-2 text-sm font-medium text-muted-foreground transition-[color,background-color,font-weight] hover:bg-brand-accent/25 hover:font-semibold hover:text-ink focus-visible:bg-brand-accent/25 focus-visible:text-ink"
          href={href}
          key={label}
          rel={href.startsWith("http") ? "noreferrer" : undefined}
          target={href.startsWith("http") ? "_blank" : undefined}
        >
          <Icon aria-hidden={true} className="size-4 transition-transform group-hover:-translate-y-0.5" />
          <span className="social-link-label">{label}</span>
          {href.startsWith("http") ? (
            <ArrowUpRight aria-hidden="true" className="social-link-arrow size-3" />
          ) : null}
        </a>
      ))}
    </nav>
  );
}
