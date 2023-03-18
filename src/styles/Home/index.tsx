import React from "react";
import { Car } from "../../components/car/Car";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { CarList, Container, Header, HeaderContent, TotalCars } from "./styles";
import Logo from "../../assets/logo.svg";

export default function Home() {
  const carData = {
    brand: "Audi",
    name: "A5",
    rent: {
      period: "Ao dia",
      price: "50000",
    },
    thumbnail: "https://freepngimg.com/thumb/car/3-2-car-free-download-png.png",
  };

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
      <CarList
        data={[1, 2, 3, 4, 5, 6, 8]}
        keyExtractor={(item) => String(item)}
        renderItem={({ item }) => <Car data={carData} />}
      />
    </Container>
  );
}
