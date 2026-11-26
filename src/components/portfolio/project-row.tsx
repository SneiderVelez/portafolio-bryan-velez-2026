import Image from "next/image";

import { cn } from "@/lib/utils";
import { ProjectFlow } from "@/components/portfolio/project-flow";

export type Project = {
  number: string;
  layout: "media-right" | "media-left-bleed" | "media-right-staggered";
  category: string;
  period: {
    start: { dateTime: string; label: string };
    end?:
      | { dateTime: string; label: string }
      | { current: true; label: string };
  };
  title: string;
  summary: string;
  preview: "beyond" | "kuadra" | "landing";
  previewLabel?: string;
  previewImages?: { src: string; position?: string }[];
  href?: string;
};

type ProjectRowProps = {
  project: Project;
};

export function ProjectRow({ project }: ProjectRowProps) {
  const flowPaths = {
    "media-right": {
      d: "M360 8H1300C1322 8 1322 8 1322 28V50C1322 66 1308 66 1292 66H940",
      nodeX: 940,
    },
    "media-left-bleed": {
      d: "M0 8H54C74 8 74 8 74 28V50C74 66 90 66 106 66H880",
      nodeX: 880,
    },
    "media-right-staggered": {
      d: "M460 8H1300C1322 8 1322 8 1322 28V50C1322 66 1308 66 1292 66H990",
      nodeX: 990,
    },
  }[project.layout];

  return (
    <article className={cn("project-row", `project-row--${project.layout}`)}>
      <ProjectFlow nodeX={flowPaths.nodeX} path={flowPaths.d} />

      <div className="project-row-inner">
        <span className="project-index font-mono text-xs text-muted-foreground">
          {project.number}
        </span>

        <div className="project-copy">
          <div className="project-meta">
            <p className="project-category">{project.category}</p>
            <p className="project-period">
              <time dateTime={project.period.start.dateTime}>
                {project.period.start.label}
              </time>
              {project.period.end ? (
                <>
                  {" — "}
                  {"current" in project.period.end ? (
                    <span>{project.period.end.label}</span>
                  ) : (
                    <time dateTime={project.period.end.dateTime}>
                      {project.period.end.label}
                    </time>
                  )}
                </>
              ) : null}
            </p>
          </div>
          <h3 className="font-display text-xl font-semibold leading-snug tracking-tight text-ink sm:text-2xl">
            {project.title}
            {project.href ? (
              <a
                aria-label={`Abrir ${project.title} en una pestaña nueva`}
                className="project-title-link"
                href={project.href}
                rel="noreferrer"
                target="_blank"
              >
                <span aria-hidden="true" className="project-link-arrow">↗</span>
              </a>
            ) : null}
          </h3>
          <p className="body-copy mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {project.summary}
          </p>
        </div>

        <div
          className={cn("project-preview", `project-preview--${project.preview}`, {
            "project-preview--two-images": project.previewImages?.length === 2,
            "project-preview--three-images": project.previewImages?.length === 3,
          })}
        >
          {project.previewImages?.length ? (
            <div className="project-preview-gallery">
              {project.previewImages.map((image, index) => {
                const previewImage = (
                  <Image
                    alt=""
                    className="project-preview-image"
                    fill
                    quality={78}
                    sizes="(max-width: 1024px) 100vw, (max-width: 1440px) 45vw, 640px"
                    src={image.src}
                    style={{ objectPosition: image.position ?? "50% 50%" }}
                  />
                );

                if (!project.href) {
                  return (
                    <div className="project-preview-frame" key={image.src}>
                      {previewImage}
                    </div>
                  );
                }

                return (
                  <a
                    aria-label={`Abrir ${project.title} desde la captura ${index + 1} en una pestaña nueva`}
                    className="project-preview-frame project-preview-frame--link"
                    href={project.href}
                    key={image.src}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {previewImage}
                  </a>
                );
              })}
            </div>
          ) : (
            project.previewLabel
          )}
        </div>
      </div>
    </article>
  );
}
