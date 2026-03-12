import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { 
  SoftwareApplicationSchema, 
  FAQPageSchema, 
  HowToSchema, 
  OrganizationSchema, 
  WebSiteSchema 
} from "./components/SchemaMarkup";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Comprimir Imágenes Gratis | Reducir Tamaño de Fotos Online",
  description: "Comprime imágenes JPG, PNG y WebP gratis. Reduce el tamaño de tus fotos hasta 90% sin perder calidad. Rápido, seguro y sin límites. 100% en tu navegador.",
  keywords: "comprimir imagenes, reducir tamaño foto, comprimir jpg, comprimir png, optimizar imagenes, compresor fotos gratis",
  verification: {
    google: 'vZjt9xYtNLmt4ivvSXWSVmKCUdHM55uIy',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
    ],
    shortcut: '/favicon.ico',
    apple: '/icon.svg',
  },
  metadataBase: new URL('https://compresor-imagenes.com'),
  openGraph: {
    title: "Comprimir Imágenes Gratis | Compresor de Fotos Online",
    description: "Reduce el tamaño de tus imágenes hasta 90% sin perder calidad visible. Gratis y sin límites.",
    url: 'https://compresor-imagenes.com',
    siteName: 'Compresor de Imágenes',
    type: "website",
    images: [
      {
        url: '/icon.svg',
        width: 512,
        height: 512,
        alt: 'Compresor de Imágenes Logo',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Comprimir Imágenes Gratis | Compresor de Fotos Online",
    description: "Reduce el tamaño de tus imágenes hasta 90% sin perder calidad visible. Gratis y sin límites.",
    images: ['/icon.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon.svg" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <link rel="shortcut icon" href="/icon.svg" />
        <SoftwareApplicationSchema />
        <FAQPageSchema />
        <HowToSchema />
        <OrganizationSchema />
        <WebSiteSchema />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
