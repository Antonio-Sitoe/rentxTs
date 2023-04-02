import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackRoutes } from "./Stack.routes";

interface IStackRoutes {
  handleReady: () => Promise<void>;
}
export function Routes({ handleReady }: IStackRoutes) {
  return (
    <NavigationContainer onReady={handleReady}>
      <StackRoutes />
    </NavigationContainer>
  );
}
