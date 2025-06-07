import styles from "./CityItem.module.css";
import type { ICity } from "../../lib/types";
import { formatDate } from "../../lib/utils";
import { Link } from "react-router-dom";
import useCities from "../../customhooks/useCities";
import { useEffect, type MouseEvent } from "react";
import useLocalStorage from "../../customhooks/useLocalStorage";

export default function CityItem({ city }: { city: ICity }) {
  const { lat, lng } = city.position!;
  const { currentCity } = useCities();
  const { deleteCity } = useCities();
  const [state, setStateFunc] = useLocalStorage("currentCity", currentCity!);

  useEffect(() => {
    setStateFunc(currentCity!);
  }, [currentCity, setStateFunc]);

  async function handleDelete(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!currentCity) return;
    if (currentCity?.id) deleteCity(state.id!);
  }
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
        <button onClick={handleDelete} className={styles.deleteBtn}>
          &times;
        </button>
      </Link>
    </li>
  );
}
