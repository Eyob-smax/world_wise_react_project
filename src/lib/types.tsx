import type { MouseEventHandler, ReactNode } from "react";

export interface ICity {
  cityName: string;
  country: string;
  date: string;
  emoji: string;
  id?: string;
  notes: string;
  position?: {
    lat: number;
    lng: number;
  };
}

export interface IButton {
  children: ReactNode;
  onClick?: MouseEventHandler;
  type: string;
  buttonType?: "submit" | "reset" | "button" | undefined;
}

export interface CContext {
  cities: ICity[];
  loading: boolean;
  currentCity: ICity | null;
  getCity: (id: string) => void;
  createCity: (city: ICity) => void;
  deleteCity: (city: string) => void;
  error: string | null;
}

export type TMapPosition = [number, number];

export interface IChangeCenterProps {
  position: TMapPosition;
}

export interface IReducerInitialState {
  cities: ICity[];
  loading: boolean;
  currentCity: ICity | null;
  error: null | string;
}

export type Action =
  | { type: "cities/loaded"; payload: ICity[] }
  | { type: "city/delete"; payload: string }
  | { type: "city/loaded"; payload: ICity }
  | { type: "cities/created"; payload: ICity }
  | { type: "city/loaded"; payload: ICity }
  | { type: "city/getcity"; payload: ICity }
  | { type: "loading" }
  | { type: "rejected"; payload: string };
