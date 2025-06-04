import styles from "./CountryItem.module.css";
import type { ICity } from "../../lib/types";
type TCountry = Pick<ICity, "country" | "id" | "emoji">;

function CountryItem({ country }: { country: TCountry }) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
