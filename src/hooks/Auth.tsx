import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";
import { database } from "../database";
import { User as ModelUser } from "../database/model/User";

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

      const UserColletion = database.get<ModelUser>("users");
      await database.write(async () => {
        await UserColletion.create((newUser) => {
          newUser.user_id = user.id;
          newUser.name = user.name;
          newUser.email = user.email;
          newUser.driver_license = user.driver_license;
          newUser.token = token;
        });
      });
      console.log("Dados do user", data);
    } catch (error) {
      console.log(error);
    }
  }
  async function signOut() {
    try {
      const userCollection = database.get<ModelUser>("users");
      await database.write(async () => {
        const userSelected = await userCollection.find(data.id);
        await userSelected.destroyPermanently();
      });

      setData({} as User);
    } catch (error) {
      console.log(error);
    }
  }
  async function updatedUser(user: User) {
    try {
      const UserColletion = database.get<ModelUser>("users");
      database.write(async () => {
        const userSelected = await UserColletion.find(user.id);
        await userSelected.update((userData) => {
          userData.name = user.name;
          userData.driver_license = user.driver_license;
          userData.avatar = user.avatar;
        });
      });
      setData(user as User);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    (async () => {
      const UserColletion = database.get<ModelUser>("users");
      const user = await UserColletion.query().fetch();
      console.log("user loged");
      console.log(user);
      if (user.length > 0) {
        const userData = user[0]._raw as unknown as User;
        api.defaults.headers.authorization = "Bearer " + userData.token;
        setData(userData);
      }
    })();
  }, []);

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
