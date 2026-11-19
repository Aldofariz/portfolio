import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aldo Fariz Personal Portfolio",
  description: "Personal portfolio showcasing engineering background, experience, and selected projects.",
  icons: {
    icon: "/logopo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-editorial-bg text-editorial-fg antialiased selection:bg-editorial-accent selection:text-white">
        {children}
      </body>
    </html>
  );
}
