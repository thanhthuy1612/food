import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import AppProvider from "@/app/app-provider";
import { cookies } from "next/headers";

const roboto = Roboto({
  subsets: ["vietnamese"],
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <AppProvider initialSessionToken={sessionToken?.value ?? ""}>
            {children}
          </AppProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
