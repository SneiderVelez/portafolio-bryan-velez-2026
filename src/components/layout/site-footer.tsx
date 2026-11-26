import { Mail } from "lucide-react";

import { SocialLinks } from "@/components/portfolio/social-links";

export function SiteFooter() {
  return (
    <footer className="site-footer page-shell flex flex-wrap items-center justify-between gap-4 border-t border-line py-6 text-sm text-muted-foreground">
      <span>Bryan Vélez · Portafolio</span>
      <SocialLinks links={[{ Icon: Mail, href: "mailto:sneivega09@gmail.com", label: "Correo" }]} />
    </footer>
  );
}
