import { SectionHeading } from "@/components/portfolio/section-heading";

const technologyGroups = [
  {
    title: "Lenguajes",
    items: ["JavaScript", "C#"],
  },
  {
    title: "Frontend",
    items: ["React.js", "Next.js", "Vite", "Tailwind CSS", "shadcn/ui"],
  },
  {
    title: "Diseño y CMS",
    items: [
      "Figma Dev Mode",
      "Sistemas de diseño",
      "Componentes modulares",
      "Payload CMS",
      "CRUDs",
    ],
  },
  {
    title: "Integración y calidad",
    items: [
      "API REST",
      "Fetch / Axios",
      "QA funcional",
      "QA exploratorio",
      "UI/UX",
      "Git / GitHub",
      "OpenCode · IA",
    ],
  },
] as const;

export function TechnologySection() {
  return (
    <section
      aria-labelledby="technology-title"
      className="technology-section"
      id="tecnologias"
    >
      <div className="page-shell border-t border-line pb-12 pt-8 sm:pb-16 sm:pt-10">
        <SectionHeading
          className="mb-7 sm:mb-9"
          description="Tecnologías y prácticas que aplico en proyectos de producto y desarrollo web."
          eyebrow="Herramientas · lenguajes · calidad"
          title="Tecnologías que uso"
          titleId="technology-title"
        />

        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 xl:grid-cols-4">
          {technologyGroups.map((group) => (
            <article className="border-t border-line pt-4" key={group.title}>
              <h3 className="mb-3 font-display text-lg font-semibold tracking-tight text-ink">
                {group.title}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    className="rounded-full border border-line bg-surface px-2.5 py-1 text-sm text-muted-foreground"
                    key={item}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap gap-x-10 gap-y-2 border-t border-line pt-4 text-sm text-muted-foreground">
          <p>
            <span className="font-semibold text-ink">En aprendizaje:</span> Java · SQL
          </p>
          <p>
            <span className="font-semibold text-ink">Idiomas:</span> español nativo · inglés A2
          </p>
        </div>
      </div>
    </section>
  );
}
