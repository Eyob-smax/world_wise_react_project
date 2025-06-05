import { useState, useEffect, type ReactNode } from "react";
import type { ICity } from "../lib/types";
import { CitiesContext } from "./useCities";
const BASE_URL = "http://localhost:8000/cities/";

function CitiesProvider({ children }: { children: ReactNode }) {
  const [cities, setCities] = useState<ICity[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState<ICity | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        setCities(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [setCities, setLoading]);

  async function getCity(id: string) {
    setLoading(true);
    try {
      const response = await fetch(BASE_URL + id);
      const data = await response.json();
      setCurrentCity(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const value = {
    cities,
    loading,
    currentCity,
    getCity,
  };

  return (
    <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>
  );
}

export default CitiesProvider;
