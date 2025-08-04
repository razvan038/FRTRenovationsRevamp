import './globals.css';
import '@fontsource/montserrat';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className=" bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}