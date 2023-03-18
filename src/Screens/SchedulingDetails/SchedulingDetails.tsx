import React from "react";
import { Acessory } from "../../components/Acessory";
import { BackButton } from "../../components/BackButton/BackButton";
import { ImageSlider } from "../../components/ImageSlider/ImageSlider";
import { Feather } from "@expo/vector-icons";

import SpeedSvg from "../../assets/speed.svg";
import AccSvg from "../../assets/acceleration.svg";
import ForceSvg from "../../assets/force.svg";
import GasolineSvg from "../../assets/gasoline.svg";
import ExchangeSvg from "../../assets/exchange.svg";
import PeopleSvg from "../../assets/hybrid.svg";

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
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  Accessories,
  Footer,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceTotal,
  RentakPriceQuota,
} from "./styles";
import { Button } from "../../components/Button";
import { ScrollView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { RFValue } from "react-native-responsive-fontsize";
import theme from "../../styles/theme";

export function SchedulingDetails() {
  return (
    <Container>
      <StatusBar translucent backgroundColor="transparent" />
      <Header>
        <BackButton onPress={() => {}} />
      </Header>

      <CarImages>
        <ImageSlider
          imageUrl={[
            "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          ]}
        />
      </CarImages>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          // paddingTop: getStatusBarHeight() + 160,
        }}
        showsVerticalScrollIndicator={false}
        // onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>Lamborguine</Brand>
            <Name>HuranCam</Name>
          </Description>
          <Rent>
            <Period>Ao dia</Period>
            <Price>Ao dia</Price>
          </Rent>
        </Details>

        <Accessories>
          <Acessory icon={SpeedSvg} name="380km/h" />
          <Acessory icon={AccSvg} name="3.2s" />
          <Acessory icon={ForceSvg} name="Auto" />
          <Acessory icon={GasolineSvg} name="Hello" />
          <Acessory icon={ExchangeSvg} name="Aceleration" />
          <Acessory icon={PeopleSvg} name="Pessoas" />
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
            <DateValue>18/06/2021</DateValue>
          </DateInfo>
          <Feather
            name="arrow-right"
            size={RFValue(24)}
            color={theme.colors.shape}
          />
          <DateInfo>
            <DateTitle>ATE</DateTitle>
            <DateValue>18/06/2021</DateValue>
          </DateInfo>
        </RentalPeriod>
        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RentalPriceDetails>
            <RentakPriceQuota>Rs 500x3 diarias</RentakPriceQuota>
            <RentalPriceTotal>Rs 20222</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </ScrollView>
      <Footer>
        <Button title="Confirmar" />
      </Footer>
    </Container>
  );
}
