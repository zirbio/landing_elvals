import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "El Vals de la Novia - Asesoría Boutique",
  description: "Asesoría boutique para novias. Sesión de 60-90 min donde dejas tu boda preparada y lista.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}