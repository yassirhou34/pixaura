"use client"

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center pt-32 pb-32">
      {/* Enhanced Background gradient - deep navy to black */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/70 to-black" />
      
      {/* Subtle light effects from corners - Enhanced */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-900/30 via-blue-800/10 to-transparent" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-purple-900/25 via-purple-800/10 to-transparent" />
      
      {/* Additional subtle glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      
      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
      
      {/* Section Separator - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent blur-sm" />
      
      {/* Content - Moved down */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center mt-8">
        <div className="animate-fade-in">
          {/* Premium Category Tag - Ultra Redesigned */}
          <div className="inline-flex items-center justify-center mb-8 px-12 py-4 rounded-2xl border-2 border-blue-400/70 bg-gradient-to-br from-black/80 via-slate-900/60 to-black/80 backdrop-blur-2xl shadow-2xl shadow-blue-500/40 relative overflow-hidden group">
            {/* Outer glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            {/* Inner glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 via-transparent to-purple-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
            {/* Corner accents */}
            <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-blue-400/50 rounded-tl-2xl" />
            <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-blue-400/50 rounded-tr-2xl" />
            <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-blue-400/50 rounded-bl-2xl" />
            <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-blue-400/50 rounded-br-2xl" />
            <span className="relative z-10 text-sm md:text-base font-bold text-white tracking-[0.15em] uppercase drop-shadow-lg">
              Production Audiovisuelle Premium
            </span>
          </div>

          {/* Premium Main Heading - Enhanced Typography */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-10 leading-[1.15] text-white tracking-tight">
            <span className="block mb-3">
              <span className="text-white">Nous</span> <span className="inline-block font-black bg-gradient-to-r from-[#00C0FF] via-[#4080FF] to-[#C020FF] bg-clip-text text-transparent">sublimons</span> <span className="text-white font-black">les</span>
            </span>
            <span className="block text-white mb-3 font-bold">marques par l&apos;image, le</span>
            <span className="block text-white font-bold">sens et la performance</span>
          </h1>

          {/* Premium Descriptive Paragraph - 100% Similar to Image */}
          <p className="text-base md:text-lg lg:text-xl text-[#B0C4DE] max-w-5xl mx-auto leading-relaxed font-normal tracking-normal text-center">
            <span className="block">Une agence créative française qui révèle l&apos;aura unique de chaque</span>
            <span className="block">marque à travers la production audiovisuelle, la stratégie digitale</span>
            <span className="block">et l&apos;accompagnement sur mesure.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
