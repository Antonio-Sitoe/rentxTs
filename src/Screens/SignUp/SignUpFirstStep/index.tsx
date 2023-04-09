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
import { useNavigation } from "@react-navigation/native";
import { Bullet } from "../../../components/Bullet";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { Alert, Keyboard, KeyboardAvoidingView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as Yup from "yup";

export function SignUpFirstStep() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [driverLicence, setDriverLicence] = useState("");
  const { goBack, navigate } = useNavigation();

  function handleNavigate() {
    goBack();
  }

  async function handleGoToNextStep() {
    try {
      const shema = Yup.object().shape({
        email: Yup.string()
          .email("E-mail invalido")
          .required("E-mail e obrigatorio"),
        driverLicence: Yup.string().required("CNH e obrigatorio"),
        name: Yup.string().required("O nome e obrigatorio"),
      });

      const data = { name, email, driverLicence };
      await shema.validate(data);
      navigate("SignUpSecondStep" as never, { user: data } as never);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert(error.message);
      }
    }
  }
  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleNavigate} />
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>
          <Title>Crie a sua {"\n"}Conta</Title>
          <Subtitle>Faca o seu cadastro de {"\n"} forma facil!</Subtitle>

          <Form>
            <FormTitle>1. Dados</FormTitle>
            <Input
              iconName="user"
              value={name}
              onChangeText={setName}
              placeholder="Nome"
            />
            <Input
              iconName="mail"
              keyboardType="email-address"
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
            />
            <Input
              keyboardType="numeric"
              iconName="credit-card"
              placeholder="CNH"
              value={driverLicence}
              onChangeText={setDriverLicence}
            />
          </Form>
          <Button title="Proximo" onPress={handleGoToNextStep} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
