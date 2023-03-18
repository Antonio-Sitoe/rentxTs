import { createStackNavigator } from "@react-navigation/stack";

const { Navigator, Screen } = createStackNavigator();

import { Home } from "../Screens/Home";
import { Scheduling } from "../Screens/Scheduling/Scheduling";
import { CarDetails } from "../Screens/carDetails/CardDetails";
import { SchedulingDetails } from "../Screens/SchedulingDetails/SchedulingDetails";
import { SchedulingComplete } from "../Screens/SchedulingComplete/SchedulingComplete";

export function StackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="SchedulingComplete" component={SchedulingComplete} />
    </Navigator>
  );
}
