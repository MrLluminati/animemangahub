type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeader({ eyebrow, title, description, className = "" }: SectionHeaderProps) {
  return (
    <div className={`space-y-3 ${className}`.trim()}>
      {eyebrow ? <p className="anipulse-label text-[var(--ap-primary-active)]">{eyebrow}</p> : null}
      <h2 className="anipulse-heading text-3xl md:text-4xl">{title}</h2>
      {description ? <p className="max-w-2xl text-base leading-7 text-[var(--ap-text-muted)]">{description}</p> : null}
    </div>
  );
}
