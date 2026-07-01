import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { generateOrganizationStructuredData, generateWebSiteStructuredData } from "@/lib/structured-data";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://eventqul.com'),
  title: {
    default: "EventQul - Premium Event Ticket Marketplace",
    template: "%s | EventQul"
  },
  description:
    "Discover and book tickets to the best events in Bangladesh. Concerts, conferences, sports, and more.",
  keywords: [
    "events",
    "tickets",
    "Bangladesh",
    "concerts",
    "conferences",
    "sports",
    "Dhaka",
  ],
  authors: [{ name: "EventQul", url: "https://eventqul.com" }],
  creator: "EventQul",
  publisher: "EventQul",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_BD",
    url: "https://eventqul.com",
    siteName: "EventQul",
    title: "EventQul - Premium Event Ticket Marketplace",
    description: "Discover and book tickets to the best events in Bangladesh.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EventQul",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EventQul - Premium Event Ticket Marketplace",
    description: "Discover and book tickets to the best events in Bangladesh.",
    images: ["/og-image.png"],
    creator: "@eventqul",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationData = generateOrganizationStructuredData();
  const websiteData = generateWebSiteStructuredData();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider />
        <div className="min-h-screen flex flex-col">
          <Navbar variant="glass" />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
