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
  password_confirmation: string;
  addresses: {
    street: string;
    city: string;
    state: string;
    type: string;
    zip_code: string;
    neighborhood: string;
    number: string;
    complement: string;
  }[];
};
type updateCredentials = {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  addresses?: {
    street: string;
    city: string;
    state: string;
    type: string;
    zip_code: string;
    neighborhood: string;
    number: string;
    complement: string;
  }[];
};

interface AuthContext {
  user: User | undefined;
  isLogged: boolean;
  signIn: (signInCredentials: SignInCredentials) => Promise<User>;
  signUp: (credentials: SignUpCredentials) => Promise<User>;
  update: (user: updateCredentials) => Promise<User>;
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

  async function signIn(signInCredentials: SignInCredentials) {
    const response = await api.post<User>("/auth/login", {
      email: signInCredentials.email,
      password: signInCredentials.password,
    });

    if (response.status < 200 || response.status >= 300) {
      throw new Error("Invalid credentials");
    }
    const user = response.data;
    setUser(user);

    localStorage.setItem("@mgl", JSON.stringify(user));
    return response.data;
  }

  async function update(updateCredentials: updateCredentials) {
    const response = await api.put<User>(`/users/${user?.id}`, {
      name: updateCredentials?.name,
      email: updateCredentials?.email,
      password: updateCredentials?.password,
      addresses: updateCredentials?.addresses,
    });

    if (response.status < 200 || response.status >= 300) {
      throw new Error("Invalid credentials");
    }
    const userData = response.data;
    setUser(userData);

    localStorage.setItem("@mgl", JSON.stringify(user));
    return response.data;
  }

  async function signUp(signUpCredentials: SignUpCredentials) {
    const response = await api.post<User>("/users", {
      name: signUpCredentials.name,
      email: signUpCredentials.email,
      password: signUpCredentials.password,
      addresses: signUpCredentials.addresses,
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
    <AuthContext.Provider
      value={{ user, isLogged, signIn, signUp, signOut, update }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContext => useContext(AuthContext);
