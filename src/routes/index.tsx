import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../hooks/Auth";
import { AppTabRoutes } from "./app.tab.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes({ handleReady }: { handleReady: any }) {
  const { user } = useAuth();

  return (
    <NavigationContainer onReady={handleReady}>
      {user.id ? <AppTabRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
