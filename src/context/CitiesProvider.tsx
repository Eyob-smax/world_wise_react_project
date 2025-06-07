import { useEffect, type ReactNode, useReducer } from "react";
import type { ICity } from "../lib/types";
import { CitiesContext } from "../customhooks/useCities";
import { reducer } from "../lib/utils";
import { initialState } from "../lib/utils";
const BASE_URL = "http://localhost:9000/cities/";

function CitiesProvider({ children }: { children: ReactNode }) {
  const [{ cities, loading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    (async () => {
      dispatch({ type: "loading" });
      try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        const { message } = err as Error;
        dispatch({ type: "rejected", payload: message });
      }
    })();
  }, []);
  async function getCity(id: string) {
    dispatch({ type: "loading" });
    try {
      const response = await fetch(BASE_URL + id);
      const data = await response.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch (err) {
      const { message } = err as Error;
      dispatch({ type: "rejected", payload: message });
    }
  }

  async function createCity(newCity: ICity) {
    dispatch({ type: "loading" });
    try {
      console.log("name");
      const response = await fetch(BASE_URL, {
        method: "post",
        headers: { "tontent-type": "application/json" },
        body: JSON.stringify(newCity),
      });
      const data = await response.json();

      dispatch({ type: "cities/created", payload: data });
      return data;
    } catch (err) {
      const { message } = err as Error;
      console.log(message);
      dispatch({ type: "rejected", payload: message });
    }
  }

  async function deleteCity(id: string) {
    dispatch({ type: "loading" });
    try {
      await fetch(BASE_URL + id, {
        method: "DELETE",
      });
      console.log(id);
      dispatch({ type: "city/delete", payload: id });
    } catch (err) {
      const { message } = err as Error;
      dispatch({ type: "rejected", payload: message });
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
