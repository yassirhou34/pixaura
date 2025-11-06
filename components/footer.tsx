import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-black border-t border-primary/20 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-xl mb-4">
              <span className="gradient-text">PIXAURA</span>
              <span className="text-muted">_IT</span>
            </h3>
            <p className="text-foreground/60 text-sm">
              Reveal your brand's true aura through premium creative solutions.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Services</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Branding
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Video Production
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Social Media
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Ad Campaigns
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Company</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <Link href="#about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#humind" className="hover:text-primary transition-colors">
                  Humind
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a href="mailto:contact@pixaura.eu">contact@pixaura.eu</a>
              </li>
              <li className="flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a href="tel:+33123456789">+33 1 23 45 67 89</a>
              </li>
              <li className="flex items-center gap-2 text-foreground/60">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Paris, France</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary/20 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-foreground/40">© 2025 Pixaura_IT. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="text-foreground/60 hover:text-primary text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-foreground/60 hover:text-primary text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-foreground/60 hover:text-primary text-sm transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
