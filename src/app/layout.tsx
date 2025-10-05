import type { Metadata } from "next";
import { ThirdwebProvider } from "@/components/ThirdwebProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tactics on Chain",
  description: "A tactical turn-based strategy game with blockchain integration",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThirdwebProvider>
          {children}
        </ThirdwebProvider>
      </body>
    </html>
  );
}
