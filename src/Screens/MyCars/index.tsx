import React, { useEffect, useState } from "react";
import { CarDTO } from "../../dtos/CarDTO";
import { api } from "../../services/api";
import {
  Appointments,
  AppointmentsQuantity,
  AppointmentsTitle,
  Container,
  Content,
  Header,
  SubTitle,
  Title,
} from "./styles";
import { FlatList, StatusBar } from "react-native";
import { BackButton } from "../../components/BackButton/BackButton";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { Car } from "../../components/car/Car";

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
}

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const navigate = useNavigation();

  function handleBack() {
    navigate.goBack();
  }

  useEffect(() => {
    async function getCars() {
      try {
        setLoading(true);
        const { data } = await api.get(`/schedules_byuser?user_id=1`);
        setCars(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getCars();
  }, []);

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton onPress={handleBack} color={theme.colors.shape} />

        <Title>
          Escolha uma {"\n"}
          data de início e {"\n"}
          fim do aluguel
        </Title>
        <SubTitle>Conforto, seguranca e praticidade</SubTitle>
      </Header>

      <Content>
        <Appointments>
          <AppointmentsTitle>Agendamentos Feitos</AppointmentsTitle>
          <AppointmentsQuantity>4</AppointmentsQuantity>
        </Appointments>
      </Content>

      <FlatList
        style={{
          padding: 25,
        }}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return <Car data={item.car} />;
        }}
        data={cars}
      />
    </Container>
  );
}
