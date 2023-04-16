import React, { useEffect } from "react";
import { Container } from "./styles";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS,
} from "react-native-reanimated";

import BrandSvg from "../../assets/brand.svg";
import LogoSvg from "../../assets/logo.svg";
import { useNavigation } from "@react-navigation/native";

export function Splash() {
  const navigation = useNavigation();
  const splashAnitmation = useSharedValue(0);
  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnitmation.value, [0, 50], [1, 0]),
      transform: [
        {
          translateX: interpolate(
            splashAnitmation.value,
            [0, 50],
            [0, -50],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });
  const LogoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnitmation.value, [0, 25, 50], [0, 0.3, 1]),
      transform: [
        {
          translateX: interpolate(
            splashAnitmation.value,
            [0, 50],
            [-50, 0],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const startApp = () => {
    navigation.navigate("SignIn" as never);
  };

  useEffect(() => {
    splashAnitmation.value = withTiming(
      50,
      {
        duration: 1000,
      },
      () => {
        "worklet";
        runOnJS(startApp)();
      }
    );
  }, []);

  return (
    <Container>
      <Animated.View style={[brandStyle, { position: "absolute" }]}>
        <BrandSvg width={80} height={50} />
      </Animated.View>
      <Animated.View style={[LogoStyle, { position: "absolute" }]}>
        <LogoSvg width={180} height={20} />
      </Animated.View>
    </Container>
  );
}
