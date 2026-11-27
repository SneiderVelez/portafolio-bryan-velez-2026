import Image from "next/image";

export function BrandMark({ className }: { className?: string }) {
  return (
    <Image
      alt=""
      aria-hidden={true}
      className={className}
      height={32}
      loading="eager"
      src="/brand-mark.svg"
      unoptimized
      width={32}
    />
  );
}
