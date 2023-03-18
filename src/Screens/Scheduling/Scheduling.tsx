import React from "react";
import { useTheme } from "styled-components/native";
import { BackButton } from "../../components/BackButton/BackButton";
import { StatusBar } from "react-native";
import { Button } from "../../components/Button";
import { Calendar } from "../../components/Calendar";
import Arrow from "../../assets/arrow.svg";

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
import { useNavigation } from "@react-navigation/native";

export function Scheduling() {
  const { navigate } = useNavigation();
  function handleConfirmRental() {
    navigate("SchedulingDetails");
  }
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
      <Content>
        <Calendar />
      </Content>
      <Footer>
        <Button
          title="Confirmar"
          onPress={handleConfirmRental}
          enabled={true}
        />
      </Footer>
    </Container>
  );
}
