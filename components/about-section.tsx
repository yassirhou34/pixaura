import { SectionHeading } from "./section-heading"
import Image from "next/image"

const values = [
  {
    title: "Innovation",
    description: "We push creative boundaries and embrace emerging trends.",
    icon: "💡",
  },
  {
    title: "Authenticity",
    description: "Your brand's true story told with transparency and integrity.",
    icon: "✓",
  },
  {
    title: "Accessibility",
    description: "Premium creative solutions within reach for ambitious brands.",
    icon: "🌍",
  },
  {
    title: "Diversity",
    description: "Multiple perspectives creating richer, more resonant campaigns.",
    icon: "👥",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="relative py-20 px-6 bg-black overflow-hidden">
      {/* Section Separator - Top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent blur-sm" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <SectionHeading
              title="Behind Every Image, A Vision"
              subtitle="We blend creative artistry with strategic insight to elevate ambitious brands."
              center={false}
            />

            <p className="text-foreground/70 mt-6 leading-relaxed">
              At Pixaura_IT, we believe every brand has an aura—a unique essence waiting to be revealed. We exist to
              help ambitious companies unlock that potential through strategic branding, cinematic production, and
              data-driven marketing.
            </p>

            <p className="text-foreground/70 mt-4 leading-relaxed">
              With roots in both art and technology, our team combines creative vision with analytical rigor. We don't
              just create content; we architect experiences that captivate, convert, and create lasting impact.
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden h-96">
            <Image src="/Copie de DSC_0520.jpg" alt="Pixaura Team" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        </div>

        {/* Values Grid */}
        <div>
          <h3 className="text-3xl font-bold mb-12 text-center">Our Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/5 to-muted/5 border border-primary/20 hover:border-primary/50 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h4 className="font-bold mb-2">{value.title}</h4>
                <p className="text-sm text-foreground/70">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          {[
            { number: "150+", label: "Projects Delivered" },
            { number: "45+", label: "Happy Clients" },
            { number: "8.5x", label: "Avg ROAS" },
            { number: "12+", label: "Years Experience" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-sm text-foreground/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Section Separator - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent blur-sm" />
    </section>
  )
}
