
import Providers from "@/components/ui/session";
import "./globals.css";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head><title>Next.js Tutorial</title></head>
      <body
      
      >
        <Providers>
  {children}
        </Providers>
      
      </body>
    </html>
  );
}
