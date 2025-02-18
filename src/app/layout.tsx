import type { Metadata } from "next";
import {Inter} from "next/font/google";
import "./globals.css"
import SessionProvider from "@/components/SessionProvider";
import QueryProvider from "@/components/QueryProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Twitter",
  description: "Tweet tweet tweet",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <QueryProvider>
            {children}
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
