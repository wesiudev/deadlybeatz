import { Metadata } from "next";
import About from "@/components/About";
import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";

export const metadata: Metadata = {
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#8cf562",
  publisher: "wesiudev",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
  title:
    "Quixy | Sklep - Tworzenie Stron Internetowych - Aplikacje Internetowe",
  description:
    "W Quixy tworzymy konkurencyjne strony internetowe. Co u nas znajdziesz? Aplikacje internetowe oparte o najnowsze technologie. Oferta stron internetowych. Grafika komputerowa, Grafika na Social Media.",
  openGraph: {
    type: "website",
    url: "https://quixy.pl",
    title: "",
    description:
      "W Quixy tworzymy konkurencyjne strony internetowe. Co u nas znajdziesz? Aplikacje internetowe oparte o najnowsze technologie. Oferta stron internetowych. Grafika komputerowa, Grafika na Social Media.",
    siteName: "Quixy",
    images: [
      {
        url: "/favicon.ico",
      },
    ],
  },
};
export default async function Page() {
  return (
    <div>
      <Header />

      <About />
      <Footer />
    </div>
  );
}
