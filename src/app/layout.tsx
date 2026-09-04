import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = { title: `${siteConfig.name} | Precisión que acompaña`, description: siteConfig.description, metadataBase: new URL(siteConfig.url) };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="es"><body>{children}</body></html>; }
