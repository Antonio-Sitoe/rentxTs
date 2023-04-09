import { createStackNavigator } from "@react-navigation/stack";

const { Navigator, Screen } = createStackNavigator();

import { Home } from "../Screens/Home";
import { Scheduling } from "../Screens/Scheduling";
import { CarDetails } from "../Screens/carDetails/CardDetails";
import { SchedulingDetails } from "../Screens/SchedulingDetails";
import { Confirmation } from "../Screens/confirmation/Confirmation";
import { MyCars } from "../Screens/MyCars";
import { Splash } from "../Screens/Splash";
import { SignIn } from "../Screens/SignIn";
import { SignUpFirstStep } from "../Screens/SignUp/SignUpFirstStep";
import { SignUpSecondStep } from "../Screens/SignUp/SignUpSecondStep";

export function StackRoutes() {
  return (
    <Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUpFirstStep" component={SignUpFirstStep} />
      <Screen name="SignUpSecondStep" component={SignUpSecondStep} />
      <Screen name="Home" component={Home} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="Confirmation" component={Confirmation} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
}
