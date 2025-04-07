import { ReactNode } from "react";
import { ThemeProvider } from 'next-themes';
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class"> 
    <main>
      {children}
    </main>
    </ThemeProvider>
  );
}
