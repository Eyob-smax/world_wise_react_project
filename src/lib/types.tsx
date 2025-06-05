import type { MouseEventHandler, ReactNode } from "react";

export interface ICity {
  cityName: string;
  country: string;
  date: string;
  emoji: string;
  id: string;
  notes: string;
  position?: {
    lat: number;
    lng: number;
  };
}

export interface IButton {
  children: ReactNode;
  onClick: MouseEventHandler;
  type: string;
}

export interface CContext {
  cities: ICity[];
  loading: boolean;
  currentCity: ICity | null;
  getCity: (id: string) => void;
}
