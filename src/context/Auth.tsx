import React, { useContext, useEffect, useState } from "react";
import { api } from "../components/service/api";

type SignInCredentials = {
  email: string;
  password: string;
};
type SignUpCredentials = {
  name: string;
  email: string;
  password: string;
};

interface AuthContext {
  user: User | undefined;
  isLogged: boolean;
  signIn: (credentials: SignInCredentials) => Promise<User>;
  signUp: (credentials: SignUpCredentials) => Promise<User>;
  signOut: () => void;
}

const AuthContext = React.createContext({} as AuthContext);
AuthContext.displayName = "AuthContext";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>();
  const isLogged = !!user;

  useEffect(() => {
    const storedUser = localStorage.getItem("@mgl");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  async function signIn(credentials: SignInCredentials) {
    const response = await api.post<User>("/auth/login", {
      email: credentials.email,
      password: credentials.password,
    });

    if (response.status < 200 || response.status >= 300) {
      throw new Error("Invalid credentials");
    }
    const user = response.data;
    setUser(user);

    localStorage.setItem("@mgl", JSON.stringify(user));
    return response.data;
  }
  async function signUp(credentials: SignUpCredentials) {
    const response = await api.post<User>("/users", {
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
    });

    if (response.status < 200 || response.status >= 300) {
      throw new Error("Não foi possível criar o usuário");
    }
    const user = response.data;
    setUser(user);

    localStorage.setItem("@mgl", JSON.stringify(user));
    return response.data;
  }

  async function signOut() {
    // Muito provavelmente o signOut não precisa ser async,
    // basta apagar o user que o app deve funcionar.
    localStorage.removeItem("@mgl");
    setUser(undefined);
  }

  return (
    <AuthContext.Provider value={{ user, isLogged, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContext => useContext(AuthContext);
