import type React from "react"
import type { Metadata } from "next"
import { Geist, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { TranslationProvider } from "@/contexts/translation-context"

const geist = Geist({ subsets: ["latin"] })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-heading" })

export const metadata: Metadata = {
  title: "Pixaura_IT - Branding & Creative Agency",
  description:
    "Unlock your brand's true aura through premium branding, cinematographic production, and strategic digital marketing.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-transparent" suppressHydrationWarning>
      <head>
        {/* Prevent white flash on Vercel - minimal script that runs before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Set black background immediately to prevent white flash on Vercel SSR
                if (typeof document !== 'undefined') {
                  document.documentElement.style.backgroundColor = '#000000';
                  document.body && (document.body.style.backgroundColor = '#000000');
                }
                try {
                  const urlParams = new URLSearchParams(window.location.search);
                  if (urlParams.get('skipIntro') === 'true') {
                    document.documentElement.classList.add('skip-intro-active');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .skip-intro-active [data-intro-wrapper] {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
              }
            `,
          }}
        />
        {/* Preload critical background assets for faster loading on Vercel */}
        <link rel="preload" href="/Banque d_images/backnoiree.png" as="image" />
        <link rel="preload" href="/Banque d_images/backv1.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/Banque d_images/i3.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/Banque d_images/noir.mp4" as="video" type="video/mp4" />
      </head>
      <body
        className={`${geist.className} ${spaceGrotesk.variable} antialiased bg-transparent text-foreground`}
      >
        <TranslationProvider>
          {children}
        </TranslationProvider>
      </body>
    </html>
  )
}
