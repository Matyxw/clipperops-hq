import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// FIX: display: "swap" evita el bloqueo de render mientras Inter carga.
// Sin esto el browser espera la fuente antes de pintar cualquier texto —
// el usuario ve una pantalla en blanco en conexiones lentas.
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
    // FIX: la clase solo necesita la variable CSS, no el nombre de la fuente.
    // inter.className aplicaría font-family directamente en el <html>;
    // inter.variable expone --font-inter para que Tailwind la consuma via
    // font-sans → var(--font-inter), que es el patrón correcto.
    <html lang="es" className={inter.variable} suppressHydrationWarning>
      <body
        className="font-sans bg-background text-white selection:bg-accent-mint selection:text-black"
        suppressHydrationWarning
      >
        <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}