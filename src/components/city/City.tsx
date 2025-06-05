import styles from "./City.module.css";
import type { ICity } from "../../lib/types";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatDate } from "../../lib/utils";
import useCities from "../../context/useCities";

function City() {
  const { cities } = useCities();
  const [currentCountry, setCurrentCountry] = useState<ICity[]>([]);
  const { id } = useParams();

  useEffect(() => {
    const Country = cities?.filter((item) => {
      return item.id === id;
    });
    setCurrentCountry(Country);
  }, [cities, id]);

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{currentCountry[0]?.emoji}</span> {currentCountry[0]?.cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {currentCountry[0]?.cityName} on</h6>
        <p>{formatDate(currentCountry[0]?.date || "")}</p>
      </div>

      {currentCountry[0]?.notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{currentCountry[0]?.notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${currentCountry[0]?.cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {currentCountry[0]?.cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>{/* <ButtonBack /> */}</div>
    </div>
  );
}

export default City;
