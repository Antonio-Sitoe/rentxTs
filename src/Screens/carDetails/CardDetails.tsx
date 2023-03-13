import React from "react";
import { Acessory } from "../../components/Acessory";
import { BackButton } from "../../components/BackButton/BackButton";
import { ImageSlider } from "../../components/ImageSlider/ImageSlider";

import SpeedSvg from "../../assets/speed.svg";
import AccSvg from "../../assets/acceleration.svg";
import ForceSvg from "../../assets/force.svg";
import GasolineSvg from "../../assets/gasoline.svg";
import ExchangeSvg from "../../assets/exchange.svg";
import PeopleSvg from "../../assets/people.svg";

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

export function CarDetails() {
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

        <About>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae veniam
          sit ex neque. Dolore ipsam quisquam corporis maxime debitis asperiores
          ex voluptate pariatur eveniet architecto cumque, nostrum consequatur?
          Odio, obcaecati.
        </About>
      </ScrollView>
      <Footer>
        <Button title="Confirmar" />
      </Footer>
    </Container>
  );
}
