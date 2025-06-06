import { useState, useEffect, type ReactNode } from "react";
import type { ICity } from "../lib/types";
import { CitiesContext } from "./useCities";
const BASE_URL = "http://localhost:8000/cities/";

function CitiesProvider({ children }: { children: ReactNode }) {
  const [cities, setCities] = useState<ICity[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState<ICity | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setError(null);
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        setCities(data);
      } catch (err) {
        const { message } = err as Error;
        setError(message);
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
      const { message } = err as Error;
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  async function createCity(newCity: ICity) {
    setLoading(true);
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCity),
      });
      const data = await response.json();
      setCities((prev) => [...prev, data]);
      return data; // Important for awaiting in the form
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function deleteCity(id: string) {
    setLoading(true);
    try {
      await fetch(BASE_URL + id, {
        method: "DELETE",
      });
      setCities((prev) => prev.filter((city) => city.id !== id));
    } catch (err) {
      const { message } = err as Error;
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  const value = {
    cities,
    loading,
    currentCity,
    getCity,
    error,
    createCity,
    deleteCity,
  };

  return (
    <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>
  );
}

export default CitiesProvider;
