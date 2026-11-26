import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  titleId?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  titleId,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-7 flex flex-col gap-3 sm:mb-9 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div>
        {eyebrow ? <p className="eyebrow mb-2">{eyebrow}</p> : null}
        <h2 className="font-display text-4xl font-medium leading-tight tracking-tight text-ink sm:text-5xl" id={titleId} tabIndex={-1}>
          {title}
        </h2>
      </div>
      {description ? (
        <p className="body-copy max-w-md text-base leading-relaxed text-muted-foreground sm:text-right">
          {description}
        </p>
      ) : null}
    </div>
  );
}
