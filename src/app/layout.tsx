import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PresentationProvider } from "@/lib/presentation-context";
import PresentationLayout from "@/components/layout/PresentationLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Bakım Pusulası - Bakım Verenlerin Dijital Rehberi",
  description: "Bakım verenlerin yolculuğunda kanıta dayalı rehberlik sunan açık kaynak platform. Zarit Bakım Yükü Ölçeği, araç kiti ve destek kaynakları ile bakım verme sürecini güçlendirin.",
  keywords: ["bakım veren", "caregiver", "bakım yükü", "zarit ölçeği", "sağlık", "destek"],
  authors: [{ name: "Bakım Pusulası Ekibi" }],
  openGraph: {
    title: "Bakım Pusulası",
    description: "Bakım verenlerin dijital rehberi",
    type: "website",
  },
};

// Static export optimization
export const dynamic = 'force-static';
export const dynamicParams = false;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={inter.variable}>
      <body className="font-sans antialiased">
        <PresentationProvider>
          <PresentationLayout>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </PresentationLayout>
        </PresentationProvider>
      </body>
    </html>
  );
}
