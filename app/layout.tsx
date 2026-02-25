import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "@/components/auth/AppProviders";

export const metadata: Metadata = {
  title: "MCQ Scanner - Automated OMR Grading",
  description: "Professional OMR grading system - Upload, Scan, Result",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
