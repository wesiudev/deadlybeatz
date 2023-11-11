import "./globals.css";
import localFont from "next/font/local";
import { Metadata } from "next";
import Script from "next/script";
import "aos/dist/aos.css";
import { Providers } from "@/redux/Provider";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import { Anton } from "next/font/google";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className="scrollbarMain">
      <body
        className={`${cocosharp.variable} ${druk.variable} ${anton.variable} 
       w-full overflow-x-hidden relative font-coco`}
      >
        <Header />
        <Providers>{children}</Providers>
        <Footer />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T3RRVSJN"
            height="0"
            width="0"
            className="hidden invisible"
          ></iframe>
        </noscript>
        <Script id="google-analytics">
          {`
             (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
             new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
             j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
             'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
             })(window,document,'script','dataLayer','GTM-T3RRVSJN');
          `}
        </Script>
      </body>
    </html>
  );
}
const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anton",
});
const druk = localFont({
  src: "../public/fonts/Druk-wide.ttf",

  variable: "--font-druk",
});
const cocosharp = localFont({
  src: [
    {
      path: "../public/fonts/Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/Bold.ttf",
      weight: "700",
    },
    {
      path: "../public/fonts/ExtraLight.ttf",
      weight: "200",
    },
    {
      path: "../public/fonts/Light.ttf",
      weight: "300",
    },
    {
      path: "../public/fonts/LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/Regular.ttf",
      weight: "500",
    },
  ],
  variable: "--font-cocosharp",
});
export const metadata: Metadata = {
  viewport: "width=device-width, initial-scale=1",
  themeColor: "white",
  publisher: "quixy",
  manifest: "/manifest.json",
  icons: [
    {
      url: "/favicon.ico",
    },
  ],
  title: "Największa platforma z bitami na sprzedaż DeadlyBeatz",
  description:
    "Dołącz do największej społeczności producentów w Polsce. Otwórz sklep z bitami. Kupuj i sprzedawaj bity na swoim sklepie.",
  openGraph: {
    type: "website",
    url: "https://deadlybeatz.com",
    title: "Największa platforma z bitami na sprzedaż DeadlyBeatz",
    description:
      "Dołącz do największej społeczności producentów w Polsce. Otwórz sklep z bitami. Kupuj i sprzedawaj bity na swoim sklepie.",
    siteName: "DeadlyBeatz",
    images: [
      {
        url: "/favicon.ico",
      },
    ],
  },
};
