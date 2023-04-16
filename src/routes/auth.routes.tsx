import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { SignIn } from "../Screens/SignIn";
import { Splash } from "../Screens/Splash";
import { SignUpFirstStep } from "../Screens/SignUp/SignUpFirstStep";
import { SignUpSecondStep } from "../Screens/SignUp/SignUpSecondStep";
import { Confirmation } from "../Screens/confirmation/Confirmation";

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Screen name="Splash" component={Splash} />

      <Screen name="SignIn" component={SignIn} />

      <Screen name="SignUpFirstStep" component={SignUpFirstStep} />

      <Screen name="SignUpSecondStep" component={SignUpSecondStep} />

      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  );
}
