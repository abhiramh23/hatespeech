import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ThemeButton } from "@/components/ui/ThemeButton";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HATE SPEECH DETECTION",
  description: "detecting hate speech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ThemeButton />
          {children}
        </Providers>
      </body>
    </html>
  );
}
