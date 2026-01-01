import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-roboto", // Optional: for CSS variables
});

export const metadata: Metadata = {
  title: "EmTerra",
  description: "Measure, Manage, and Reduce Your Carbon Footprint",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <body style={{ margin: 0, padding: 0 }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
