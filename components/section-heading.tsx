interface SectionHeadingProps {
  title: string
  subtitle?: string
  center?: boolean
}

export function SectionHeading({ title, subtitle, center = true }: SectionHeadingProps) {
  return (
    <div className={center ? "text-center" : ""}>
      <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">{title}</h2>
      {subtitle && <p className="text-lg text-foreground/70 max-w-2xl">{subtitle}</p>}
    </div>
  )
}
