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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
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
