import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Outfit } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "BeeHive",
  description: "BeeHive - The Beehive App",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          socialButtonsVariant: "iconButton",
          logoImageUrl: "/logo.png",
        },
      }}
    >
      <html lang="en">
        <body className={` ${outfit.className} antialiased grainy`}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
