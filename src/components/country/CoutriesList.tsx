import Spinner from "../spinner/Spinner";
import styles from "./CountryList.module.css";
import type { ICity } from "../../lib/types";
import Message from "../message/Message";
import CountryItem from "./CountryItem";

type TCityList = {
  cities: ICity[] | null;
  isLoading: boolean;
};
type Tcountry = Array<Pick<ICity, "id" | "emoji" | "country">>;

export default function CountryList({ cities, isLoading }: TCityList) {
  if (isLoading) return <Spinner />;
  if (cities?.length === 0)
    return (
      <Message message={"Add your first city by clicking a city on the map"} />
    );

  const countries = cities?.reduce<Tcountry>((arr, cur) => {
    if (!arr.map((item) => item.country).includes(cur.country)) {
      return [...arr, { country: cur.country, emoji: cur.emoji, id: cur.id }];
    } else {
      return arr;
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries?.map((country) => (
        <CountryItem key={country.id} country={country} />
      ))}
    </ul>
  );
}
