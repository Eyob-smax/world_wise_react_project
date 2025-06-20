import { useReducer, type ReactNode } from "react";
import { AuthContext } from "../customhooks/useAuth";
import type { IInitialUser } from "../lib/types";
import { authReducer } from "../lib/utils";

const initialAuthState: IInitialUser = {
  user: null,
  isAuthenticated: false,
};

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }: { children: ReactNode }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    authReducer,
    initialAuthState
  );

  function login(email: string, password: string) {
    if (!email && !password) {
      throw new Error("email and Password required!");
    }
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "user/login", payload: FAKE_USER });
    } else {
      throw new Error("Invalid credentials");
    }
  }

  function logout() {
    dispatch({ type: "user/logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
