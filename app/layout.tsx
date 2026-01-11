import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Exo } from "next/font/google";
import { RootProvider } from "fumadocs-ui/provider/next";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";


const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const exo = Exo({
  variable: "--font-exo",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default:
      "showcase-ui | Free Premium Animated React & Framer Motion Components",
    template: "%s | showcase-ui",
  },
  description:
    "Free premium animated React components and micro-interactions built with Framer Motion and Tailwind CSS. Modern, ready-to-use motion components for high-converting websites.",
  authors: [{ name: "Yetunde Morenikeji" }],
  creator: "showcase-ui",
  metadataBase: new URL("https://uselayouts.com"),
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://uselayouts.com",
    title:
      "uselayouts | Free Premium Animated React & Framer Motion Components",
    description:
      "Free premium animated React components and micro-interactions built with Framer Motion and Tailwind CSS. Modern, ready-to-use motion components for high-converting websites.",
    siteName: "showcase-ui",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "showcase-ui - Premium Animated React Components",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "showcase-ui | Free Premium Animated React & Framer Motion Components",
    description:
      "Free premium animated React components and micro-interactions built with Framer Motion and Tailwind CSS. Modern, ready-to-use motion components for high-converting websites.",
    images: ["/og.png"],
    creator: "@morenikeji_48",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} light`}
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${exo.variable} ${geistMono.variable} flex flex-col min-h-screen antialiased`}
      >
        <RootProvider>{children}</RootProvider>
        <Analytics />
        <GoogleAnalytics gaId="G-EBGR3GK00N" />
      </body>
    </html>
  );
}
