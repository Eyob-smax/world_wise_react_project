import { useState, type ReactNode } from "react";
import type { ICity } from "../lib/types";
import { CitiesContext } from "./useCities";

function CitiesProvider({ children }: { children: ReactNode }) {
  const [cities, setCities] = useState<ICity[]>([]);
  const [loading, setLoading] = useState(false);

  const value = {
    cities,
    setCities,
    loading,
    setLoading,
  };

  return (
    <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>
  );
}

export default CitiesProvider;
