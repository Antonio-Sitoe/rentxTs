import React from "react";
import { Container } from "./styles";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Button, StyleSheet } from "react-native";

export function Splash() {
  const animation = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: animation.value,
        },
      ],
    };
  });

  const handleAnimationPosition = () => {
    animation.value += 100;
  };
  return (
    <Container>
      <Animated.View style={[styles.box, animatedStyle]} />
      <Button title="Mover" onPress={handleAnimationPosition} />
    </Container>
  );
}

const styles = StyleSheet.create({
  box: {
    marginBottom: 15,
    width: 100,
    height: 100,
    backgroundColor: "#fb5",
  },
});
