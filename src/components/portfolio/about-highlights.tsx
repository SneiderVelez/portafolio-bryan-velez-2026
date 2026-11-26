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
      "Terminé el sexto semestre de la Tecnología en Desarrollo de Software y estoy pendiente de grado.",
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
      "Estoy ampliando mi perfil hacia full stack y fortaleciendo mis conocimientos en Java y SQL.",
  },
  {
    id: "interests",
    label: "Aficiones",
    description:
      "Disfruto salir a caminar y hacer una pausa para apreciar el paisaje, especialmente en la montaña.",
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
