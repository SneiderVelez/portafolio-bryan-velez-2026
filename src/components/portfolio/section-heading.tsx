import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  className?: string;
  titleId?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  className,
  titleId,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-7 sm:mb-9", className)}>
      {eyebrow ? <p className="eyebrow mb-2">{eyebrow}</p> : null}
      <h2 className="font-display text-[clamp(2rem,5.4vw,3rem)] font-medium leading-tight tracking-tight text-ink" id={titleId} tabIndex={-1}>
        {title}
      </h2>
    </div>
  );
}
