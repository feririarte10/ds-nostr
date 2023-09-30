import LoginProvider from "@/components/connect/LoginProvider";
import { NostrifyProvider } from "@/contexts/Nostrify";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
        <NostrifyProvider explicitRelayUrls={["wss://relay.damus.io/"]}>
          <LoginProvider>{children}</LoginProvider>
        </NostrifyProvider>
      </body>
    </html>
  );
}
