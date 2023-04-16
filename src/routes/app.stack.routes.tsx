import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { Home } from "../Screens/Home";
import { CarDetails } from "../Screens/carDetails/CardDetails";
import { Scheduling } from "../Screens/Scheduling";
import { SchedulingDetails } from "../Screens/SchedulingDetails";
import { Confirmation } from "../Screens/confirmation/Confirmation";

const { Navigator, Screen } = createStackNavigator();

export function AppStackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Screen name="Home" component={Home} />

      <Screen name="CarDetails" component={CarDetails} />

      <Screen name="Scheduling" component={Scheduling} />

      <Screen name="SchedulingDetails" component={SchedulingDetails} />

      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  );
}
