import React from "react";
import { StatusBar } from "react-native";
import { Container, Header, Title } from "./styles";
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
        <Logo />
      </Header>
    </Container>
  );
}
