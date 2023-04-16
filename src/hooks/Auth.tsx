import { ReactNode, createContext, useContext, useState } from "react";
import { api } from "../services/api";

interface User {
  id: string;
  user_id?: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
  token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface AuthContextData {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  updatedUser: (user: User) => Promise<void>;
}
interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<User>({} as User);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const { data } = await api.post("/sessions", { email, password });
      const { token, user } = data;
      setData({ ...user, token });

      api.defaults.headers.authorization = "Bearer " + token;
      console.log("Dados do user", data);
    } catch (error) {
      // throw new Error(error);
    }
  }
  async function signOut() {
    try {
      // setData({} as User);
    } catch (error) {
      // throw new Error(error);
    }
  }
  async function updatedUser() {
    try {
      // setData({} as User);
    } catch (error) {
      // throw new Error(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user: data,
        signIn,
        signOut,
        updatedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
