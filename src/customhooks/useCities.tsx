import { useContext, createContext } from "react";
import type { CContext } from "../lib/types";

export const CitiesContext = createContext<CContext | null>(null);

export default function useCities(): CContext {
  const context = useContext(CitiesContext);
  if (!context) {
    throw new Error("The cities context used outside the provider wrapper!");
  }
  return context;
}
