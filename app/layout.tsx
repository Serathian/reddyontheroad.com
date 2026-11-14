import type { Metadata } from "next";
import { plusJakartaSans, newsreader } from "./fonts";
import Header from "./components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reddy on the Road",
  description: "A digital travel journal - our family's journey across the United States",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className={`${plusJakartaSans.variable} ${newsreader.variable}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
