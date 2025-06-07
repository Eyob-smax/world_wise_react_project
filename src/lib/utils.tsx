import type {
  Action,
  IInitialUser,
  IReducerInitialState,
  TUserReducerAction,
} from "./types";

export const formatDate = (date: Date | number | string, optional = false) => {
  if (!date) return "N/A";
  if (optional) {
    return new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  } else {
    return new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));
  }
};

export function convertToEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export const initialState: IReducerInitialState = {
  cities: [],
  loading: false,
  currentCity: null,
  error: null,
};

export function reducer(
  state: IReducerInitialState,
  action: Action
): IReducerInitialState {
  switch (action.type) {
    case "cities/loaded":
      return { ...state, loading: false, cities: action.payload };
    case "city/loaded":
      return { ...state, loading: false, currentCity: action.payload };
    case "cities/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        loading: false,
      };
    case "city/delete":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        loading: false,
      };
    case "loading":
      return { ...state, loading: true };
    case "rejected":
      return { ...state, error: action.payload, loading: false };
    default:
      throw new Error("Unknow action type");
  }
}

export function authReducer(
  state: IInitialUser,
  action: TUserReducerAction
): IInitialUser {
  switch (action.type) {
    case "user/login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "user/logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action types for auth reducer!");
  }
}
