import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://dualmo-unlimited.pirorion0318.chatgpt.site"),
  title: "デュアルモ｜今の電話番号はそのまま、日中データ無制限",
  description: "今の音声SIMにデータ通信専用eSIMを追加するだけ。docomo回線の日中データ無制限を月額2,490円で。",
  keywords: ["デュアルモ", "デュアルSIM", "eSIM", "データ無制限", "docomo回線"],
  robots: { index: true, follow: true },
  icons: {
    icon: "/brand/dualmo-symbol-approved-b-hq.webp",
    shortcut: "/brand/dualmo-symbol-approved-b-hq.webp",
    apple: "/brand/dualmo-app-icon-approved-b-hq.webp",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "デュアルモ",
    title: "デュアルモ｜今の電話番号はそのまま、日中データ無制限",
    description: "今の音声SIMにeSIMを追加するだけ。docomo回線の日中データ無制限を月額2,490円で。",
    images: [{ url: "/og-v2.webp", width: 1200, height: 675, alt: "DUALMO — 電話番号はそのまま、日中データ無制限" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "デュアルモ｜今の電話番号はそのまま、日中データ無制限",
    description: "今の音声SIMにeSIMを追加するだけ。日中データ無制限を月額2,490円で。",
    images: ["/og-v2.webp"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body>{children}</body></html>;
}
