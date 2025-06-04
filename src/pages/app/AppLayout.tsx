import User from "../../components/user/User";
import Sidebar from "../../components/sidebar/Sidebar";
import styles from "./AppLayout.module.css";
import Map from "../../components/map/Map";
function AppLayout() {
  return (
    <div className={styles.app}>
      <User />
      <Sidebar />
      <Map />
    </div>
  );
}

export default AppLayout;
