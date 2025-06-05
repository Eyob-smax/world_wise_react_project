import Button from "../Button";
import { useState, useEffect } from "react";
import styles from "./Form.module.css";
import BackButton from "../BackButton";
import useURLPosition from "../../customhooks/useURLPosition";
import Spinner from "../spinner/Spinner";
import Message from "../message/Message";
import { convertToEmoji } from "../../lib/utils";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useURLPosition();
  const [emoji, setEmoji] = useState("");
  const [geoCodingError, setGeoCodingError] = useState<string | null>(null);
  console.log(country);
  const [geoLoading, setGeoLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setGeoCodingError(null);
      setGeoLoading(true);
      try {
        const response = await fetch(
          `${BASE_URL}?latitude=${lat}&longitude=${lng}`
        );
        const data = await response.json();
        if (!data.countryCode) {
          throw new Error(
            "You select a invalid city please choose another city😉"
          );
        }
        setCityName(data.city || data.locality || data.countryName);
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        const { message } = err as Error;
        setGeoCodingError(message as string);
      } finally {
        setGeoLoading(false);
      }
    })();
  }, [lat, lng]);

  if (geoCodingError) return <Message message={geoCodingError} />;

  if (geoLoading) return <Spinner />;

  return (
    <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          type="date"
          onChange={(e) => setDate(new Date(e.target.value))}
          value={date.toISOString().split("T")[0]}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <BackButton />
        <Button onClick={() => {}} type="primary">
          Add
        </Button>
      </div>
    </form>
  );
}

export default Form;
