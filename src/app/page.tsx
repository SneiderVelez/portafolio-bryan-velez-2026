import Image from "next/image";
import Link from "next/link";

import { AboutHighlights } from "@/components/portfolio/about-highlights";
import { AboutPortraitArt } from "@/components/portfolio/about-portrait-art";
import { ProjectRow, type Project } from "@/components/portfolio/project-row";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PageContainer } from "@/components/ui/page-container";
import { buttonVariants } from "@/components/ui/button";
import { BuildScene } from "@/components/portfolio/geometric-build";
import { TechnologySection } from "@/components/portfolio/technology-section";

const projects: Project[] = [
  {
    number: "01",
    layout: "media-right",
    category: "Sitio web · CMS · Frontend",
    period: {
      start: { dateTime: "2025-07", label: "Jul. 2025" },
      end: { dateTime: "2025-12", label: "Dic. 2025" },
    },
    title: "Beyond Learning Academy",
    summary:
      "Construí el sitio y trabajé en el CMS personalizado con Payload, componentes reutilizables y conexión con la API.",
    preview: "beyond",
    previewImages: [
      { src: "/images/projects/beyond-features.png", position: "50% 56%" },
      { src: "/images/projects/beyond-courses.png", position: "50% 56%" },
    ],
    href: "https://beyondlearningacademy.com/es",
  },
  {
    number: "02",
    layout: "media-left-bleed",
    category: "Producto SaaS · Frontend · Sistema de diseño · QA",
    period: {
      start: { dateTime: "2024", label: "2024" },
      end: { current: true, label: "Actualidad" },
    },
    title: "Kuadra",
    summary:
      "Desarrollo el frontend en React y Vite de una plataforma SaaS de facturación electrónica y POS. Implemento módulos desde Figma, evoluciono componentes accesibles y reutilizables y detecto problemas de interfaz antes de producción.",
    preview: "kuadra",
    previewImages: [
      { src: "/images/projects/kuadra-sales-redacted.png", position: "50% 50%" },
      { src: "/images/projects/kuadra-dashboard-redacted.png", position: "50% 50%" },
    ],
  },
  {
    number: "03",
    layout: "media-right-staggered",
    category: "Landing · Comunicación visual",
    period: {
      start: { dateTime: "2025", label: "2025" },
    },
    title: "Kuadra · Landing pública",
    summary:
      "Desarrollé la landing pública para presentar el producto y sus funcionalidades.",
    preview: "landing",
    previewImages: [
      { src: "/images/projects/kuadra-home.png", position: "50% 42%" },
      { src: "/images/projects/kuadra-about.png", position: "50% 50%" },
      { src: "/images/projects/kuadra-contact.png", position: "50% 50%" },
    ],
    href: "https://kuadra.com/",
  },
];

export default function Home() {
  return (
    <>
      <a
        className="sr-only z-50 rounded-md bg-ink px-4 py-3 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        href="#contenido"
      >
        Saltar al contenido
      </a>
      <SiteHeader />
      <main className="site-main" id="contenido">
        <section
          aria-labelledby="hero-title"
          className="hero-section"
          id="inicio"
        >
          <BuildScene>
            <div className="page-shell hero-layout">
              <div className="hero-content">
                <p className="eyebrow mb-5">
                  Desarrollo frontend · sitios web y productos digitales
                </p>
                <h1
                  className="max-w-4xl font-display text-[clamp(3rem,7vw,5rem)] font-medium leading-[1.02] tracking-tight text-ink"
                  id="hero-title"
                  tabIndex={-1}
                >
                  De la curiosidad
                  <span className="hero-highlight block">al sistema.</span>
                </h1>
                <p className="body-copy mt-6 max-w-xl text-lg leading-[1.8] text-muted-foreground sm:text-xl">
                  Desarrollo experiencias web: desde sitios visuales completos
                  hasta interfaces para productos SaaS. Mi base es frontend y
                  estoy ampliando mi camino hacia full stack.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    className={buttonVariants({ size: "lg" })}
                    data-background-reveal
                    href="#proyectos"
                  >
                    Ver proyectos
                  </Link>
                  <Link
                    className={buttonVariants({ variant: "outline", size: "lg" })}
                    data-background-reveal
                    href="mailto:sneivega09@gmail.com"
                  >
                    Contactarme
                  </Link>
                </div>
              </div>
            </div>
          </BuildScene>
        </section>

        <section
          aria-labelledby="projects-title"
          className="projects-section"
          id="proyectos"
        >
          <div className="page-shell">
            <SectionHeading
              description="Una selección de trabajo visual y de producto."
              className="!mb-6 sm:!mb-7"
              title="Proyectos"
              titleId="projects-title"
            />
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <ProjectRow key={project.number} project={project} />
            ))}
          </div>
        </section>

        <section
          aria-labelledby="about-title"
          className="about-section"
          id="sobre-mi"
        >
          <div className="about-layout page-shell grid gap-8 py-12 sm:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)] sm:items-center sm:gap-16 sm:py-16">
            <div className="about-copy max-w-2xl">
              <p className="eyebrow mb-3">Frontend · producto · calidad</p>
              <SectionHeading
                className="mb-5"
                title="Sobre mí"
                titleId="about-title"
              />
              <p className="body-copy text-lg leading-[1.8] text-muted-foreground">
                Soy tecnólogo en Electricidad Industrial. Durante mis estudios de
                Ingeniería en esta área tuve mi primer acercamiento al desarrollo en
                una clase de C++. Me gustó y seguí explorando ese interés al estudiar
                Desarrollo de Software, donde aprendí C#.
              </p>
              <p className="body-copy mt-4 text-lg leading-[1.8] text-muted-foreground">
                Hoy trabajo como desarrollador junior, principalmente en frontend.
                Me gusta involucrarme desde la idea, aportar lo que sé y cuidar los
                detalles para que el producto se vea bien, funcione bien y quede
                bien resuelto.
              </p>
              <AboutHighlights />
            </div>
            <figure className="about-portrait flex min-h-80 items-center justify-center sm:min-h-[26rem]">
              <AboutPortraitArt />
              <Image
                alt="Retrato ilustrado de Bryan Vélez"
                className="about-portrait__image h-auto w-full max-w-[30rem]"
                height={1254}
                sizes="(max-width: 640px) 100vw, 30rem"
                src="/images/retrato-bryan.png"
                width={1254}
              />
            </figure>
          </div>
        </section>

        <TechnologySection />

      </main>
      <PageContainer className="site-footer mt-8">
        <SiteFooter />
      </PageContainer>
    </>
  );
}
