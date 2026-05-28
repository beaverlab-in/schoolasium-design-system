import type { Metadata } from "next";
import { Roboto, Open_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AppShell } from "@/components/providers/AppShell";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-roboto",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-open-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://design.schoolasium.com"
  ),
  title: {
    default: "Schoolasium Design System",
    template: "%s · Schoolasium DS",
  },
  description:
    "The centralized design ecosystem for Schoolasium — components, tokens, resources, and AI-ready guidelines for building world-class EdTech experiences.",
  keywords: ["design system", "Schoolasium", "components", "design tokens", "EdTech", "UI library"],
  authors: [{ name: "Schoolasium Design & Engineering" }],
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Schoolasium Design System",
    description: "Premium design ecosystem for Schoolasium — the visual programming & robotics education platform.",
    type: "website",
    locale: "en_US",
    images: [{ url: "/logo.png", width: 4261, height: 712, alt: "Schoolasium" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Schoolasium Design System",
    description: "Premium design ecosystem for Schoolasium.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${openSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <AppShell>
            {children}
          </AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
