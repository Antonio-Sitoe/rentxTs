import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Car } from "../../components/car/Car";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { StatusBar, TouchableOpacity, Text } from "react-native";
import {
  CarList,
  Container,
  Header,
  HeaderContent,
  TotalCars,
  MyCars,
} from "./styles";
import Logo from "../../assets/logo.svg";
import { Load } from "../../components/Loading";
import { CarDTO } from "../../dtos/CarDTO";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components";

export function Home() {
  const theme = useTheme();
  const [cars, setCars] = useState<Array<CarDTO | []>>([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  function handleGotoCarDetail(car: CarDTO) {
    navigation.navigate("CarDetails" as never, { car } as never);
  }
  function handleGotoMyCars() {
    navigation.navigate("MyCars" as never);
  }

  async function fetchCars() {
    try {
      setLoading(true);
      const { data } = await api.get("/cars");
      setCars(data);
    } catch (error) {
      console.log(JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <TouchableOpacity onPress={() => fetchCars()}>
          <Text>Hello</Text>
        </TouchableOpacity>
        <HeaderContent>
          <Logo height={RFValue(12)} width={RFValue(108)} />
          <TotalCars>Total de 12 Carros</TotalCars>
        </HeaderContent>
      </Header>
      {loading ? (
        <Load />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item: CarDTO) => String(item.id)}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleGotoCarDetail(item)} />
          )}
        />
      )}
      <MyCars onPress={handleGotoMyCars}>
        <Ionicons color={theme.colors.shape} name="ios-car-sport" size={32} />
      </MyCars>
    </Container>
  );
}
