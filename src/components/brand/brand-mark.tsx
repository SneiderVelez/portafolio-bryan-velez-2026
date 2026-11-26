export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 32 32"
    >
      <path
        d="M5 24C12 24 13 9 26 8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.7"
      />
      <circle cx="5" cy="24" r="3" fill="var(--signal)" />
      <circle cx="26" cy="8" r="4" fill="var(--brand-accent)" />
      <path d="M22 8h-4" stroke="var(--brand-accent)" strokeLinecap="round" strokeWidth="1.7" />
    </svg>
  );
}
