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
import { Alert, Keyboard, KeyboardAvoidingView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { PasswordInput } from "../../components/PasswordInput";
import { useAuth } from "../../hooks/Auth";
import { Button } from "../../components/Button";

import * as Yup from "yup";

const Schema = Yup.object().shape({
  driver_license: Yup.number().required("CNH e obrigatorio"),
  name: Yup.string().required("Nome e obrigatorio"),
});

export function Profile() {
  const theme = useTheme();
  const { user, signOut, updatedUser } = useAuth();
  const { goBack } = useNavigation();
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driver_license, setdrive_licence] = useState(user.driver_license);
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
  async function handleUpdateUser() {
    try {
      const body = { name, driver_license };
      await Schema.validate(body);
      updatedUser({
        avatar: avatar,
        driver_license: driver_license,
        name: name,
        id: user.id,
        email: user.email,
        token: user.token,
        user_id: user.user_id,
      });
      Alert.alert("Perfil atualizado");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert(error.message);
      } else {
        Alert.alert("Erro ao atualizar o perfil");
      }
    }
  }

  function handleSignOut() {
    Alert.alert(
      "Tem Certeza ?",
      "Se voce sair ira precisar de internet para conectar novamente.",
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Sair",
          onPress: () => signOut(),
        },
      ]
    );
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton color={theme.colors.shape} onPress={handleBack} />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton onPress={handleSignOut}>
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
                  value={driver_license}
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
            <Button title="Salvar alteracoes" onPress={handleUpdateUser} />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
