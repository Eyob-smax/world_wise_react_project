import "react-datepicker/dist/react-datepicker.css";
import Button from "../Button";
import { useState, useEffect } from "react";
import styles from "./Form.module.css";
import BackButton from "../BackButton";
import useURLPosition from "../../customhooks/useURLPosition";
import Spinner from "../spinner/Spinner";
import Message from "../message/Message";
import { convertToEmoji } from "../../lib/utils";
import DatePicker from "react-datepicker";
import type { ICity } from "../../lib/types";
import useCities from "../../customhooks/useCities";
import { useNavigate } from "react-router-dom";

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
  const { createCity, error, loading } = useCities();
  const navigate = useNavigate();

  useEffect(() => {
    if (!lat && !lng) return;
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity: ICity = {
      cityName,
      country,
      emoji,
      date: date.toISOString().split("T")[0],
      notes,
      position: {
        lat: Number(lat),
        lng: Number(lng),
      },
    };

    await Promise.resolve(createCity(newCity));
    navigate("/app/cities");
  }

  if (geoCodingError) return <Message message={geoCodingError} />;

  if (!lat && !lng)
    return <Message message={"Start by selecting places on the map."} />;
  if (error) return <Message message={error} />;

  if (geoLoading) return <Spinner />;

  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.form} ${loading ? styles.loading : ""}`}
    >
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
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date!)}
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
        <Button type="primary">Add</Button>
      </div>
    </form>
  );
}

export default Form;
