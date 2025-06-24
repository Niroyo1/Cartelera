import { Montserrat } from "next/font/google";
import Header from "./components/header";
import "./globals.css";

const oswald = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Mi Cartelera",
  description: "Las mejores películas en tu app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${oswald.className} antialiased`}>
        <div className="min-h-screen flex flex-col pt-16 bg-black">
          <Header />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}