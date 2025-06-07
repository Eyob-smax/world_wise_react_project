import styles from "./City.module.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { formatDate } from "../../lib/utils";
import useCities from "../../customhooks/useCities";
import Spinner from "../spinner/Spinner";
import BackButton from "../BackButton";

function City() {
  const { currentCity, getCity, loading } = useCities();
  const { id } = useParams();

  useEffect(() => {
    getCity(id!);
  }, [id]);
  if (loading) return <Spinner />;
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{currentCity?.emoji}</span> {currentCity?.cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {currentCity?.cityName} on</h6>
        <p>{formatDate(currentCity?.date || "")}</p>
      </div>

      {currentCity?.notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{currentCity?.notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${currentCity?.cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {currentCity?.cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
