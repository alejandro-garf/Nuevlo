import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nuevlo — AI-Powered Immigration Legal Help",
  description:
    "Free AI-powered immigration guidance. Real attorneys when you need them. Bilingual. Built for your community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800&family=Pacifico&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-nunito antialiased">
        {children}
      </body>
    </html>
  );
}
