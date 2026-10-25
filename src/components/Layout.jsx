import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CompareBar from "./CompareBar";

export default function Layout() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0 }); }, [pathname]);
  return (
    <>
      <Navbar />
      <main className={pathname === "/" ? "" : "pt-20"}><Outlet /></main>
      <Footer />
      <CompareBar />
    </>
  );
}
