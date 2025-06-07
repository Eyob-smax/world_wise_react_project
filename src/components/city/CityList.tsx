import Spinner from "../spinner/Spinner";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Message from "../message/Message";
import useCities from "../../customhooks/useCities";

export default function CityList() {
  const { cities, loading } = useCities();
  if (loading) return <Spinner />;
  if (cities?.length === 0)
    return (
      <Message message={"Add your first city by clicking a city on the map"} />
    );

  return (
    <ul className={styles.cityList}>
      {cities?.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}
