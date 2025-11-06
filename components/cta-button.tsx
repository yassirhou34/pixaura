import Link from "next/link"

interface CTAButtonProps {
  text?: string
  href?: string
}

export function CTAButton({ text = "Book a Call", href = "#contact" }: CTAButtonProps) {
  return (
    <Link
      href={href}
      className="inline-block px-8 py-4 bg-primary text-black font-bold text-lg rounded-full hover-glow transition-all duration-300 hover:scale-105"
    >
      {text}
    </Link>
  )
}
