import type { Metadata } from "next";
import "./globals.css";
import * as styles from "./styles";
import { Roboto } from "next/font/google";

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
      <body className={styles.body}>{children}</body>
    </html>
  );
}
