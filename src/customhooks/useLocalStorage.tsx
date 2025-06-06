import { useEffect, useState } from "react";
import type { ICity } from "../lib/types";
export default function useLocalStorage(
  key: string,
  data: ICity
): [ICity, (data: ICity) => void] {
  const [state, setState] = useState<ICity>(() =>
    data ? JSON.parse(localStorage.getItem(key)!) : {}
  );

  function setStateFunc(data: ICity) {
    setState(data);
  }

  useEffect(() => {
    if (!state) return;
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setStateFunc];
}
