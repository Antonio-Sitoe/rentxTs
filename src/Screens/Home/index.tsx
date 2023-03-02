import React from "react";
import { StatusBar } from "react-native";
import { Container, Header, Title } from "./styles";

export default function Home() {
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>Edjooo</Header>
    </Container>
  );
}
