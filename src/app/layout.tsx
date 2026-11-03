import type { Metadata } from "next";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ShoppingProvider } from "@/components/storefront/shopping-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Éclat Joaillerie",
  description:
    "Des créations de joaillerie d’exception. Découvrez nos bagues, colliers, bracelets et boucles d’oreilles en or et diamants.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className="h-full antialiased"
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full font-sans">
        <ShoppingProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </ShoppingProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
