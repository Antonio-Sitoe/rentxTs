import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Car } from "../../components/car/Car";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { StatusBar, TouchableOpacity, Text } from "react-native";
import { CarList, Container, Header, HeaderContent, TotalCars } from "./styles";
import Logo from "../../assets/logo.svg";
import { Load } from "../../components/Loading";
import { CarDTO } from "../../dtos/CarDTO";

export function Home() {
  const [cars, setCars] = useState<Array<CarDTO | []>>([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  function handleGotoCarDetail(car: CarDTO) {
    navigation.navigate("CarDetails" as never, { car } as never);
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
    </Container>
  );
}
