import React from "react";
import { Acessory } from "../../components/Acessory";
import { BackButton } from "../../components/BackButton/BackButton";
import { ImageSlider } from "../../components/ImageSlider/ImageSlider";

import {
  Container,
  Header,
  Details,
  Description,
  Brand,
  Name,
  Period,
  Price,
  Rent,
  About,
  Accessories,
  Footer,
} from "./styles";
import { Button } from "../../components/Button";
import { StatusBar } from "expo-status-bar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon as getAcessoryIcon } from "../../utils/getAccessoryIcon";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { StyleSheet } from "react-native";
import { useTheme } from "styled-components";
interface Params {
  car: CarDTO;
}

export function CarDetails() {
  const { navigate, goBack } = useNavigation();
  const { params } = useRoute();
  const { car } = params as Params;
  const theme = useTheme();
  const ScroolY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    ScroolY.value = event.contentOffset.y;
    console.log("Evento de scroll", event.contentOffset.y);
  });
  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        ScroolY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      ),
    };
  });
  const sliderCarsAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(ScroolY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
    };
  });
  function handleConfirmRental() {
    navigate("Scheduling" as never, { car } as never);
  }

  function goback() {
    goBack();
  }

  return (
    <Container>
      <StatusBar translucent backgroundColor="transparent" />
      <Animated.View
        style={[
          headerStyleAnimation,
          styles.header,
          {
            backgroundColor: theme.colors.background_secondary,
          },
        ]}
      >
        <Header>
          <BackButton onPress={goback} />
        </Header>

        <Animated.View style={[sliderCarsAnimation]}>
          <ImageSlider imageUrl={car.photos} />
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>{car.rent.price} MT</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map((accessory) => {
            return (
              <Acessory
                icon={getAcessoryIcon(accessory.type)}
                key={accessory.type}
                name={accessory.name}
              />
            );
          })}
        </Accessories>

        <About>
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
        </About>
      </Animated.ScrollView>
      <Footer>
        <Button
          title="Escolher periodo do aluguer"
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    overflow: "hidden",
    zIndex: 1,
  },
});
