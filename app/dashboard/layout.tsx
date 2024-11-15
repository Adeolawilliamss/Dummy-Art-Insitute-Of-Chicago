"use client";
import { usePathname } from 'next/navigation';
import Navbar from './Navbar/page';
import Footer from './Footer/page';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  console.log("Current Path:", pathname);

  return (
    <div>
      {/* Conditionally render Navbar on all pages except the homepage */}
      {pathname !== '/dashboard' && <Navbar />}
      {children}
      <Footer />
    </div>
  );
}
