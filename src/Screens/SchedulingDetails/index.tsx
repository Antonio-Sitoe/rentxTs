import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { Alert } from "react-native";

import { BackButton } from "../../components/BackButton/BackButton";
import { ImageSlider } from "../../components/ImageSlider/ImageSlider";
import { Acessory as Accessory } from "../../components/Acessory";
import { Button } from "../../components/Button";

import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { api } from "../../services/api";

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from "./styles";

interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod {
  start: string;
  end: string;
}

export function SchedulingDetails() {
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { car } = route.params as Params;
  const rentTotal = car?.price * Math.floor(Math.random() * 160);

  async function handleConfirmRental() {
    setLoading(true);

    await api.post(`/schedules_byuser`, {
      user_id: 1,
      car,
    });
    await api.put(`/schedules_bycars/${car.id}`, {
      id: car.id,
      unavailable_dates: ["2023-06-01", "2023-06-02", "2023-06-09"],
    });
    navigation.navigate(
      "Confirmation" as never,
      {
        data: {
          nextScreenRoute: "Home",
          title: "Carro alugado!",
          message: `Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.`,
        },
      } as never
    );

    setLoading(false);

    // await api
    //   .post("/rentals", {
    //     user_id: 1,
    //     car_id: car.id,
    //     start_date: new Date(),
    //     end_date: new Date(),
    //     total: rentTotal,
    //   })
    //   .then(() => {
    //     navigation.navigate(
    //       "Confirmation" as never,
    //       {
    //         nextScreenRoute: "Home",
    //         title: "Carro alugado!",
    //         message: `Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.`,
    //       } as never
    //     );
    //   })
    //   .catch((erro) => {
    //     setLoading(false);
    //     Alert.alert("Não foi possível confirmar o agendamento.");
    //   });
  }

  function handleBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <CarImages>
        <ImageSlider imageUrl={car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map((accessory) => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>18 de abril</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>4 de feverierio</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${
              car.price
            } x${6} diárias`}</RentalPriceQuota>
            <RentalPriceTotal>R$ {car.price + rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirmRental}
          enabled={!loading}
          loading={loading}
        />
      </Footer>
    </Container>
  );
}
