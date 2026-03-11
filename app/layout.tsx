import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Beautiful Internet — Ancient Wisdom. Modern Tools.",
  description:
    "Beautiful Internet helps churches and Christian organizations use digital tools to form people toward Christ — not away from him. Digital formation strategy for ministries that are serious about the long game.",
  openGraph: {
    title: "Beautiful Internet",
    description: "Ancient wisdom. Modern tools. Digital formation strategy for the church.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
