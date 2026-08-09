import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kurt Xiao | Senior Full-Stack Engineer",
  description:
    "Portfolio of Kurt Xiao, a senior full-stack engineer focused on thoughtful products and dependable systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
