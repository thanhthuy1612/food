import { ThemeProvider } from "@/components/theme-provider";
// import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import AppProvider from "@/app/app-provider";
import { cookies } from "next/headers";
import SlideSession from "@/components/slide-session";
import accountApiRequest from "@/apiRequest/account";
import { handleErrorApi } from "@/lib/utils";
import { AccountResType } from "@/schemaValidations/account.schema";
import { baseOpenGraph } from "@/app/shared-metadata";

const roboto = Roboto({
  subsets: ["vietnamese"],
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Website đồ ăn",
    default: "Website đồ ăn",
  },
  description: "Thanh Thùy",
  openGraph: baseOpenGraph,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;

  let user: AccountResType["data"] | null = null;
  try {
    if (sessionToken) {
      const result = await accountApiRequest.me(sessionToken);
      user = result?.payload.data ?? null;
    }
  } catch (error) {
    handleErrorApi({ error });
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider initialSessionToken={sessionToken ?? ""} user={user}>
            <Header user={user} />
            {children}
            <SlideSession />
          </AppProvider>
          {/* <Toaster /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
