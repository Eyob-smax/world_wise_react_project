import Spinner from "../spinner/Spinner";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import type { ICity } from "../../lib/types";
import Message from "../message/Message";

type TCityList = {
  cities: ICity[] | null;
  isLoading: boolean;
};

export default function CityList({ cities, isLoading }: TCityList) {
  if (isLoading) return <Spinner />;
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
