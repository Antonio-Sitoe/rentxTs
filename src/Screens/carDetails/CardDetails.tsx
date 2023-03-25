import React from "react";
import { Acessory } from "../../components/Acessory";
import { BackButton } from "../../components/BackButton/BackButton";
import { ImageSlider } from "../../components/ImageSlider/ImageSlider";

import {
  Container,
  Header,
  CarImages,
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
import { ScrollView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CarDTO } from "../../dtos/CarDTO";
import { getAcessoryIcon } from "../../utils/getAcessoryIcon";

interface Params {
  car: CarDTO;
}

export function CarDetails() {
  const { navigate, goBack } = useNavigation();
  const { params } = useRoute();
  const { car } = params as Params;
  function handleConfirmRental() {
    navigate("Scheduling" as never, { car } as never);
  }

  function goback() {
    goBack();
  }
  function scrollHandler() {
    // goBack();
  }
  return (
    <Container>
      <StatusBar translucent backgroundColor="transparent" />
      <Header>
        <BackButton onPress={goback} />
      </Header>

      <CarImages>
        <ImageSlider imageUrl={[...car.photos]} />
      </CarImages>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          // paddingTop: getStatusBarHeight() + 160,
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

        <About>{car.about}</About>
      </ScrollView>
      <Footer>
        <Button
          title="Escolher periodo do aluguer"
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
}
