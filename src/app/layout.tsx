import "@/styles/globals.scss";
import LoginProvider from "@/components/connect/LoginProvider";
import { NostrifyProvider } from "@/contexts/Nostrify";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./themeProvider";
import { ModalProvider } from "@/contexts/ModalContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DS Nostr Boilerplate",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="data-theme" defaultTheme="dark">
          <NostrifyProvider
            explicitRelayUrls={[
              "wss://relay.damus.io/",
              "wss://nostr-pub.wellorder.net/",
              "wss://nos.lol/",
            ]}
          >
            <ModalProvider>
              <LoginProvider>{children}</LoginProvider>
            </ModalProvider>
          </NostrifyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
