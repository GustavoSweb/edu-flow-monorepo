import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { fontVariables, Providers } from "@/_app";
import "@/_app/styles/globals.css";

export const metadata: Metadata = {
  title: "EduFlow",
  description: "Plataforma de cursos para concursos públicos.",
};

export const viewport: Viewport = { themeColor: "#0F4C51" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={fontVariables}>
      <body className="bg-bg font-sans text-fg antialiased">
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-surface focus:px-4 focus:py-2">
          Pular para o conteúdo
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
