import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Dr. Jan Duffy REALTOR® | Skye Canyon Real Estate Expert Las Vegas NV 89166",
    template: "%s | Dr. Jan Duffy REALTOR®"
  },
  description: "Expert Skye Canyon real estate agent Dr. Jan Duffy specializes in luxury homes, new construction & golf course properties in Las Vegas NV 89166. Call (702) 500-1902!",
  keywords: [
    "Skye Canyon homes for sale",
    "Las Vegas NV 89166",
    "luxury real estate",
    "Dr. Jan Duffy REALTOR",
    "golf course homes",
    "guard gated community",
    "new construction",
    "Desert Highlands Golf Course"
  ],
  authors: [{ name: "Dr. Jan Duffy" }],
  creator: "Dr. Jan Duffy Real Estate",
  publisher: "Dr. Jan Duffy Real Estate",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.skyecanyonhomesforsale.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Dr. Jan Duffy REALTOR® | Skye Canyon Real Estate Expert Las Vegas NV 89166",
    description: "Expert Skye Canyon real estate agent Dr. Jan Duffy specializes in luxury homes, new construction & golf course properties in Las Vegas NV 89166.",
    url: "https://www.skyecanyonhomesforsale.com",
    siteName: "Skye Canyon Homes for Sale",
    images: [
      {
        url: "/images/dr-jan-duffy-realtor.jpg",
        width: 1200,
        height: 630,
        alt: "Dr. Jan Duffy, Skye Canyon Real Estate Expert",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Jan Duffy REALTOR® | Skye Canyon Real Estate Expert",
    description: "Expert Skye Canyon real estate agent specializing in luxury homes in Las Vegas NV 89166.",
    images: ["/images/dr-jan-duffy-realtor.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
