import { useState, useEffect, type ReactNode } from "react";
import type { ICity } from "../lib/types";
import { CitiesContext } from "./useCities";
const BASE_URL = "http://localhost:8000/cities";

function CitiesProvider({ children }: { children: ReactNode }) {
  const [cities, setCities] = useState<ICity[]>([]);
  const [loading, setLoading] = useState(false);

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

  const value = {
    cities,
    loading,
  };

  return (
    <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>
  );
}

export default CitiesProvider;
