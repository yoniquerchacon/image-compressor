import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  openGraph: {
    title: "Comprimir Imágenes Gratis | Compresor de Fotos Online",
    description: "Reduce el tamaño de tus imágenes hasta 90% sin perder calidad visible. Gratis y sin límites.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
