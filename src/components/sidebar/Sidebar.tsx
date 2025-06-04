import Logo from "../logo/Logo";
import styles from "./Sidebar.module.css";
import AppNav from "../AppNav";
import Footer from "../footer/Footer";
import { Outlet } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />
      <Footer />
    </div>
  );
}
