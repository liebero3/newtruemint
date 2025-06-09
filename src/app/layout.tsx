import "./globals.css"
import Header from "./webcompos/Header"

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body className=" w-screen h-screen">
        <Header />
        {children}
      </body>
    </html>
  );
}
