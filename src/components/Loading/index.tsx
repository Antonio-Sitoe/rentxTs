import React from "react";
import { ActivityIndicator } from "react-native";
import theme from "../../styles/theme";

export const Load = () => {
  return (
    <ActivityIndicator
      size={"large"}
      style={{ flex: 1 }}
      color={theme.colors.main}
    />
  );
};
