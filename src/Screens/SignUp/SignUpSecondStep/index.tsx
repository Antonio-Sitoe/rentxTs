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
import { Confirmation } from "../../confirmation/Confirmation";

interface Params {
  user: { name: string; email: string; driverLicence: string };
}

export function SignUpSecondStep() {
  const route = useRoute();
  const theme = useTheme();
  const [passoword, setPassword] = useState("");
  const [confirmpassoword, setconfirmpassoword] = useState("");
  const { goBack, navigate } = useNavigation();
  const { user } = route.params as Params;
  console.log(user);

  function handleNavigate() {
    goBack();
  }

  async function handleRegister() {
    try {
      if (!passoword || !confirmpassoword)
        return Alert.alert("Informe a senha e confirmacao");
      if (passoword != confirmpassoword)
        return Alert.alert("As senhas nao sao iguais");
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
    } finally {
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
              value={passoword}
              onChangeText={setPassword}
              placeholder="Senha"
            />
            <PasswordInput
              value={confirmpassoword}
              onChangeText={setconfirmpassoword}
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
