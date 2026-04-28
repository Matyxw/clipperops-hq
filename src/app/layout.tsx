import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets:  ["latin"],
  variable: "--font-inter",
  display:  "swap",
});

export const metadata: Metadata = {
  title:       "ClipperOps | El Sistema Operativo para Barberías de Élite",
  description: "Automatización radical. Motor de IA agéntica. Cero inasistencias.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={inter.variable} suppressHydrationWarning>
      <body
        className="font-sans bg-background text-white selection:bg-accent-mint selection:text-black"
        suppressHydrationWarning
      >
        {/* FIX: removed justify-center (centra verticalmente y "sube" las tarjetas)  */}
        {/* FIX: removed overflow-hidden (cortaba el scroll de la página completa)   */}
        <main className="relative flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}