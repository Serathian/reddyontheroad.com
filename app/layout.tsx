import type { Metadata } from "next";
import { caveat, crimsonText, courierPrime } from "./fonts";
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
      <body className={`${caveat.variable} ${crimsonText.variable} ${courierPrime.variable}`}>
        {children}
      </body>
    </html>
  );
}
