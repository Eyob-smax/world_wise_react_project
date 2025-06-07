import { createContext, useContext } from "react";
import type { IAuthContextValue } from "../lib/types";

export const AuthContext = createContext<IAuthContextValue | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Auth context used outside its provider!");
  }
}
