import { useContext, createContext } from "react";
import type { ICity } from "../lib/types";

interface CContext {
  cities: ICity[];
  onSetCities: (city: ICity[]) => void;
  loading: boolean;
  onSetLoading: (value: boolean) => void;
}

export const CitiesContext = createContext<CContext | null>(null);

export default function useCities(): CContext {
  const context = useContext(CitiesContext);
  if (!context) {
    throw new Error("The cities context used outside the provider wrapper!");
  }
  return context;
}
