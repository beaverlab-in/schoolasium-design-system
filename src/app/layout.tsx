import type { Metadata } from "next";
import { Roboto, Open_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

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
  title: {
    default: "Schoolasium Design System",
    template: "%s · Schoolasium Design System",
  },
  description:
    "The centralized design ecosystem for Schoolasium — components, tokens, resources, and AI-ready guidelines for building world-class EdTech experiences.",
  keywords: [
    "design system",
    "Schoolasium",
    "components",
    "design tokens",
    "EdTech",
    "UI library",
  ],
  authors: [{ name: "Schoolasium Design & Engineering" }],
  openGraph: {
    title: "Schoolasium Design System",
    description:
      "Premium design ecosystem for Schoolasium — the visual programming & robotics education platform.",
    type: "website",
    locale: "en_US",
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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
