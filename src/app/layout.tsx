import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { SessionAuthProvider } from "@/context/SessionAuthProvider";
import { Header } from "@/components/header";
import { NextUIProviders } from "@/context/nextui-provider";
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
export const metadata: Metadata = {
  title: "Sandcibatta",
  description: "Generated by create next app",
};
import { Toaster } from 'sonner'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`dark ${montserrat.className}`}>
        <Toaster position="bottom-left"  richColors/>
        <SessionAuthProvider>
          <NextUIProviders>
            <Header />

            <main className="main">{children}</main>
          </NextUIProviders>
        </SessionAuthProvider>
      </body>
    </html>
  );
}
