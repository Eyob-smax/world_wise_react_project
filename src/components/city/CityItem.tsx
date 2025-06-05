import styles from "./CityItem.module.css";
import type { ICity } from "../../lib/types";
import { formatDate } from "../../lib/utils";
import { Link } from "react-router-dom";
import useCities from "../../context/useCities";

export default function CityItem({ city }: { city: ICity }) {
  const { lat, lng } = city.position!;
  const { currentCity } = useCities();
  return (
    <li>
      <Link
        to={`${city.id}?lat=${lat}&lng=${lng}`}
        className={`${styles.cityItem} ${
          city.id === currentCity?.id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{city.emoji}</span>
        <h3 className={styles.name}>{city.cityName}</h3>
        <time className={styles.date}>{formatDate(city.date, true)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}
