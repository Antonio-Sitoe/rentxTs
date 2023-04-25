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
import * as ImagePicker from "expo-image-picker";
import { BackButton } from "../../components/BackButton/BackButton";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Input } from "../../components/Input";
import { Keyboard, KeyboardAvoidingView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { PasswordInput } from "../../components/PasswordInput";
import { useAuth } from "../../hooks/Auth";

export function Profile() {
  const theme = useTheme();
  const { user, signOut } = useAuth();
  const { goBack } = useNavigation();
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [drive_licence, setdrive_licence] = useState(user.driver_license);
  const [option, setOption] = useState<"dataEdit" | "passwordEdit">("dataEdit");

  async function handleSelectAvatar() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  }

  function handleBack() {
    goBack();
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton color={theme.colors.shape} onPress={handleBack} />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton onPress={signOut}>
                <Feather name="power" size={24} color={theme.colors.shape} />
              </LogoutButton>
            </HeaderTop>
            <PhotoContainer>
              <Photo
                source={{
                  uri: avatar ? avatar : "https://github.com/antonio-sitoe.png",
                }}
              />
              <PhotoButton onPress={handleSelectAvatar}>
                <Feather name="camera" size={24} color={theme.colors.shape} />
              </PhotoButton>
            </PhotoContainer>
          </Header>
          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
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
                <OptionTitle active={option === "passwordEdit"}>
                  Senha
                </OptionTitle>
              </Option>
            </Options>
            {option === "dataEdit" ? (
              <Section>
                <Input
                  iconName="user"
                  placeholder="Nome"
                  autoCapitalize="sentences"
                  autoCorrect={false}
                  value={name}
                  onChangeText={setName}
                  defaultValue={user.name}
                />
                <Input
                  iconName="mail"
                  defaultValue={user.email}
                  editable={false}
                  autoCorrect={false}
                />
                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  autoCorrect={false}
                  keyboardType="numeric"
                  value={drive_licence}
                  onChangeText={setdrive_licence}
                  defaultValue={user.driver_license}
                />
              </Section>
            ) : (
              <Section>
                <PasswordInput
                  iconName="lock"
                  placeholder="Senha Actual"
                  autoCorrect={false}
                />
                <PasswordInput
                  iconName="lock"
                  placeholder="Nova Senha"
                  autoCorrect={false}
                />
                <PasswordInput
                  iconName="lock"
                  placeholder="Repitir a Senha"
                  autoCorrect={false}
                />
              </Section>
            )}
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
