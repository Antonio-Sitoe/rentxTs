import { ReactNode } from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { MyCars } from "../Screens/MyCars";

import { AppStackRoutes } from "./app.stack.routes";
import PeopleSvg from "../assets/people.svg";
import { Profile } from "../Screens/Profile";
// import { Profile } from "../Screens/Profile/helper";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes() {
  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.main,
        tabBarInactiveTintColor: theme.colors.text_detail,
        tabBarStyle: {
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
          height: 70,
          backgroundColor: theme.colors.background_primary,
        },
      }}
    >
      <Screen
        name="Initial"
        component={AppStackRoutes}
        options={{
          tabBarIcon: ({ color }) =>
            (<Feather name="home" size={24} color={color} />) as ReactNode,
        }}
      />

      <Screen
        name="MyCars"
        component={MyCars}
        options={{
          tabBarIcon: ({ color }) =>
            (<Feather name="aperture" size={24} color={color} />) as ReactNode,
        }}
      />

      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) =>
            (<PeopleSvg width={24} height={24} color={color} />) as ReactNode,
        }}
      />
    </Navigator>
  );
}
