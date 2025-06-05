import { useContext, createContext } from "react";
import type { ICity } from "../lib/types";

interface CContext {
  cities: ICity[];
  loading: boolean;
}

export const CitiesContext = createContext<CContext | null>(null);

export default function useCities(): CContext {
  const context = useContext(CitiesContext);
  if (!context) {
    throw new Error("The cities context used outside the provider wrapper!");
  }
  return context;
}
