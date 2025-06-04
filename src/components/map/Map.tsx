import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

export default function Map() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate("form")} className={styles.mapContainer}>
      <h3>Map</h3>
      <p>Latitude: {searchParams.get("lat")}</p>
      <p>Latitude: {searchParams.get("lng")}</p>
    </div>
  );
}
