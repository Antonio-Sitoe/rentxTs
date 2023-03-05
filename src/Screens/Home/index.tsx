import React from "react";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Container, Header, HeaderContent, TotalCars } from "./styles";
import Logo from "../../assets/logo.svg";

export default function Home() {
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo height={RFValue(12)} width={RFValue(108)} />
          <TotalCars>Total de 12 Carros</TotalCars>
        </HeaderContent>
      </Header>
    </Container>
  );
}
