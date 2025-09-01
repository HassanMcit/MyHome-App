import AppNavbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <>
      <AppNavbar />
      <Outlet />
      <Footer />
    </>
  );
}
