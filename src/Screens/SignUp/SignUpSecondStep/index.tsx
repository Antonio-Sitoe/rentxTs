import React, { useState } from "react";
import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle,
} from "./styles";
import { BackButton } from "../../../components/BackButton/BackButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { Alert, Keyboard, KeyboardAvoidingView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { PasswordInput } from "../../../components/PasswordInput";
import { useTheme } from "styled-components";
import { api } from "../../../services/api";

interface Params {
  user: { name: string; email: string; driverLicence: string };
}

export function SignUpSecondStep() {
  const route = useRoute();
  const theme = useTheme();
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const { goBack, navigate } = useNavigation();
  const { user } = route.params as Params;
  console.log(user);

  function handleNavigate() {
    goBack();
  }

  async function handleRegister() {
    try {
      if (!password || !confirmpassword)
        return Alert.alert("Informe a senha e confirmacao");
      if (password != confirmpassword)
        return Alert.alert("As senhas nao sao iguais");

      await api.post("/users", {
        name: user.name,
        email: user.email,
        password: password,
        driver_license: user.driverLicence,
        avatar:
          "https://avatars.githubusercontent.com/u/72309855?s=400&u=bd5741c5b0a65f383c40f517e2f3d44f15696fb7&v=4",
      });

      navigate(
        "Confirmation" as never,
        {
          data: {
            title: "Conta Criada",
            message: `Agora e so fazer login \n a aproveitar`,
            nextScreamRoute: "SignIn",
          },
        } as never
      );
    } catch (error) {
      console.log(error);
      Alert.alert("Opa", "Nao foi possivel cadastrar");
    }
  }
  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleNavigate} />
            <Steps>
              <Bullet />
              <Bullet active />
            </Steps>
          </Header>
          <Title>Crie a sua {"\n"}Conta</Title>
          <Subtitle>Faca o seu cadastro de {"\n"} forma facil!</Subtitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>
            <PasswordInput
              iconName="lock"
              value={password}
              onChangeText={setPassword}
              placeholder="Senha"
            />
            <PasswordInput
              value={confirmpassword}
              onChangeText={setconfirmpassword}
              iconName="lock"
              placeholder="Senha"
            />
          </Form>
          <Button
            title="Submeter"
            onPress={handleRegister}
            color={theme.colors.success}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
