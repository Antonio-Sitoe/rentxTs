import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { StackRoutes } from "./Stack.routes";
export function Routes({ handleReady }) {
  return (
    <NavigationContainer onReady={handleReady}>
      <StackRoutes />
    </NavigationContainer>
  );
}
