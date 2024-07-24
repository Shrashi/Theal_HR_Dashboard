import type { Metadata } from "next";
import { Jost } from "next/font/google";
import SideNavComponent from "./components/SideNav";
import "../app/styles/globals.scss";
import Header from "./components/Header";
import { ThemeProvider } from "../../providers/ThemeProvider";
import GlobalState from "../../providers/GlobalProvider";

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-jost",
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
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={jost.variable}>
        <ThemeProvider>
          <GlobalState>
            <main className="main">{children}</main>
          </GlobalState>
        </ThemeProvider>
      </body>
    </html>
  );
}