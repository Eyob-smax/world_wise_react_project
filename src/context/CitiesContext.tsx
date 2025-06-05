import { useState, type ReactNode } from "react";
import type { ICity } from "../lib/types";
import { CitiesContext } from "./useCities";

function CitiesProvider({ children }: { children: ReactNode }) {
  const [cities, setCities] = useState<ICity[]>([]);
  const [loading, setLoading] = useState(false);

  function onSetCities(newCity: ICity[]) {
    setCities(newCity);
  }

  function onSetLoading(value: true | false) {
    setLoading(value);
  }

  const value = {
    cities,
    onSetCities,
    loading,
    onSetLoading,
  };

  return (
    <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>
  );
}

export default CitiesProvider;
