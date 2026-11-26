type HighlightKind = "formation" | "experience" | "growth" | "interests";

const highlights: {
  id: HighlightKind;
  label: string;
  description: string;
}[] = [
  {
    id: "formation",
    label: "Formación",
    description:
      "Terminé las materias de Desarrollo de Software; me falta el proyecto de grado para graduarme.",
  },
  {
    id: "experience",
    label: "Experiencia",
    description:
      "Llevo cerca de dos años trabajando en desarrollo frontend, principalmente con React.",
  },
  {
    id: "growth",
    label: "En crecimiento",
    description:
      "Estoy reforzando mis bases de backend para complementar mi experiencia en frontend.",
  },
  {
    id: "interests",
    label: "Aficiones",
    description:
      "Me gusta descubrir lugares a pie, sobre todo en la montaña, y retarme a llegar hasta la cima.",
  },
];

export function AboutHighlights() {
  return (
    <div className="about-highlights">
      {highlights.map((highlight) => (
        <article
          className={`about-highlight about-highlight--${highlight.id}`}
          key={highlight.id}
          tabIndex={0}
        >
          <div className="about-highlight__copy">
            <h3 className="about-highlight__label eyebrow">{highlight.label}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {highlight.description}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
