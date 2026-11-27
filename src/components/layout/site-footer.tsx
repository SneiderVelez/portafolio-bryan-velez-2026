import { SocialLinks } from "@/components/portfolio/social-links";
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
} from "@/components/portfolio/social-icons";

export function SiteFooter() {
  return (
    <footer className="site-footer page-shell flex flex-wrap items-center justify-between gap-4 border-t border-line py-6 text-sm text-muted-foreground">
      <span>Bryan Vélez · Portafolio</span>
      <SocialLinks
        className="site-footer-socials"
        links={[
          {
            Icon: LinkedinIcon,
            href: "https://www.linkedin.com/in/bryan-sneider-velez/",
            label: "LinkedIn",
          },
          {
            Icon: GithubIcon,
            href: "https://github.com/SneiderVelez",
            label: "GitHub",
          },
          {
            Icon: MailIcon,
            href: "mailto:sneivega09@gmail.com",
            label: "Correo",
          },
        ]}
      />
    </footer>
  );
}
