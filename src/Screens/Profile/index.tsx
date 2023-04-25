import React, { useState } from "react";
import {
  Container,
  Content,
  Header,
  HeaderTitle,
  HeaderTop,
  LogoutButton,
  Option,
  OptionTitle,
  Options,
  Photo,
  PhotoButton,
  PhotoContainer,
  Section,
} from "./styles";
import { BackButton } from "../../components/BackButton/BackButton";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Input } from "../../components/Input";

export function Profile() {
  const theme = useTheme();
  const [option, setOption] = useState<"dataEdit" | "passwordEdit">("dataEdit");
  const { goBack } = useNavigation();

  function handleBack() {
    goBack();
  }
  function handleSignUp() {
    // goBack();
  }
  return (
    <Container>
      <Header>
        <HeaderTop>
          <BackButton color={theme.colors.shape} onPress={handleBack} />
          <HeaderTitle>Editar Perfil</HeaderTitle>
          <LogoutButton onPress={handleSignUp}>
            <Feather name="power" size={24} color={theme.colors.shape} />
          </LogoutButton>
        </HeaderTop>
        <PhotoContainer>
          <Photo source={{ uri: "https://github.com/antonio-sitoe.png" }} />
          <PhotoButton onPress={() => {}}>
            <Feather name="camera" size={24} color={theme.colors.shape} />
          </PhotoButton>
        </PhotoContainer>
      </Header>
      <Content>
        <Options>
          <Option
            active={option === "dataEdit"}
            onPress={() => setOption("dataEdit")}
          >
            <OptionTitle active={option === "dataEdit"}>Dados</OptionTitle>
          </Option>
          <Option
            active={option === "passwordEdit"}
            onPress={() => setOption("passwordEdit")}
          >
            <OptionTitle active={option === "passwordEdit"}>Senha</OptionTitle>
          </Option>
        </Options>
        <Section>
          <Input
            iconName="user"
            placeholder="Nome"
            autoCapitalize="sentences"
            autoCorrect={false}
          />
          <Input iconName="mail" editable={false} autoCorrect={false} />
          <Input
            iconName="credit-card"
            placeholder="CNH"
            autoCorrect={false}
            keyboardType="numeric"
          />
        </Section>
      </Content>
    </Container>
  );
}
