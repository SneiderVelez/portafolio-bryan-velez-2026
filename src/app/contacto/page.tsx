import type { Metadata } from "next";

import { ContactForm } from "@/components/portfolio/contact-form";
import { ContactRouteArt } from "@/components/portfolio/contact-route-art";
import {
  GithubIcon,
  LinkedinIcon,
} from "@/components/portfolio/social-icons";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SocialLinks } from "@/components/portfolio/social-links";
import { PageContainer } from "@/components/ui/page-container";

export const metadata: Metadata = {
  title: "Contacto | Bryan Vélez",
  description:
    "Cuéntame sobre tu proyecto, una oportunidad o una idea. Estoy disponible para conversar.",
};

export default function ContactPage() {
  return (
    <>
      <a
        className="sr-only z-50 rounded-md bg-ink px-4 py-3 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        href="#contenido"
      >
        Saltar al contenido
      </a>
      <SiteHeader />
      <main className="site-main contact-page" id="contenido">
        <section
          aria-labelledby="contact-title"
          className="contact-section page-shell"
        >
          <div className="contact-layout">
            <div className="contact-intro">
              <p className="eyebrow mb-4">Contacto · proyectos · ideas</p>
              <h1 className="contact-title font-display" id="contact-title" tabIndex={-1}>
                <span className="hero-highlight contact-title__highlight">Hablemos</span>.
              </h1>
              <p className="contact-description body-copy">
                ¿Tienes una idea, una oportunidad o quieres conversar sobre un
                proyecto? Cuéntame un poco y seguimos hablando.
              </p>
              <ContactRouteArt />
              <div className="contact-direct">
                <p className="contact-direct__label">También puedes encontrarme en</p>
                <SocialLinks
                  className="contact-social-links"
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
                  ]}
                />
              </div>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>
      <PageContainer className="site-footer mt-8">
        <SiteFooter />
      </PageContainer>
    </>
  );
}
