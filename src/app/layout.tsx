import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

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
    <html lang="pt-br" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
