import React from "react";
import { useTheme } from "styled-components/native";
import { BackButton } from "../../components/BackButton/BackButton";
import Arrow from "../../assets/arrow.svg";
import { StatusBar } from "react-native";

import {
  Container,
  Title,
  Header,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Footer,
  Content,
} from "./styles";
import { Button } from "../../components/Button";

export function Scheduling() {
  const theme = useTheme();
  return (
    <Container>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />
      <Header>
        <BackButton color={theme.colors.shape} onPress={() => {}} />
        <Title>
          Escolha uma {"\n"}
          data de inicio e{"\n"}
          fim do aluguer{"\n"}
        </Title>
        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={false}>18/04/2021</DateValue>
          </DateInfo>
          <Arrow />
          <DateInfo>
            <DateTitle>ATE</DateTitle>
            <DateValue selected={true}>18/04/2021</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>
      <Content></Content>
      <Footer>
        <Button title="Confirmar" onPress={() => {}} enabled={true} />
      </Footer>
    </Container>
  );
}
