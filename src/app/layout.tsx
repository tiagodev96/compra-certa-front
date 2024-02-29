import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Compra Certa",
  description:
    "Faça suas compras de forma certeira com o Compra Certa! Adicione produtos ao seu carrinho, ajuste quantidades e preços, e veja o total da compra conforme você avança. Mantenha um registro das suas compras finalizadas para referência futura.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>{children}</body>
      <Script id="theme-definition">
        {`
          let theme = localStorage.getItem('theme');
          if (theme) {
            if (theme === 'dark') {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          } else {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
              localStorage.setItem('theme', 'dark');
              document.documentElement.classList.add('dark');
            } else {
              localStorage.setItem('theme', 'light');
              document.documentElement.classList.remove('dark');
            }
          }
        `}
      </Script>
    </html>
  );
}
