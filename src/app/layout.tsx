import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "InstaPromptly | Instagram Reels Title & Hashtag Generator",
    template: "%s | InstaPromptly",
  },
  description:
    "Generate viral titles and engaging hashtags for Instagram Reels. Boost your visibility and engagement. Free & fast title & hashtag generator.",
  alternates: {
    canonical: "https://instapromptly.com/",
    languages: {
      "en": "https://instapromptly.com/",
      "tr": "https://instapromptly.com/tr",
    },
  },
  openGraph: {
    title: "InstaPromptly | Instagram Reels Title & Hashtag Generator",
    description:
      "Generate viral titles and engaging hashtags for Instagram Reels. Boost your visibility and engagement.",
    url: "https://instapromptly.com/",
    siteName: "InstaPromptly",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "InstaPromptly | Instagram Reels Title & Hashtag Generator",
    description:
      "Generate viral titles and engaging hashtags for Instagram Reels. Boost your visibility and engagement.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="alternate" href="https://instapromptly.com/" hrefLang="en" />
        <link rel="alternate" href="https://instapromptly.com/tr" hrefLang="tr" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
