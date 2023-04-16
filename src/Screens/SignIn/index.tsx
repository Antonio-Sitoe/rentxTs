import React from "react";
import { Container, Header, Title, SubTitle, Form, Footer } from "./styles";
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { PasswordInput } from "../../components/PasswordInput";
import * as Yup from "yup";
import { useAuth } from "../../hooks/Auth";
import { useNavigation } from "@react-navigation/native";

const schema = Yup.object().shape({
  email: Yup.string()
    .required("E-mail obrigatório")
    .email("Digite um e-mail válido"),
  password: Yup.string().required("A senha é obrigatória"),
});

export function SignIn() {
  const navigate = useNavigation();

  const [isLoading, setisLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { signIn } = useAuth();

  async function handleSignIn() {
    try {
      setisLoading(true);
      await schema.validate({ email, password });
      await signIn({ email, password });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Opa", error.message);
      } else {
        Alert.alert(
          "Erro na autenticação",
          "Ocorreu um erro ao fazer login, verifique as credenciais"
        );
      }
    } finally {
      setisLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <Header>
            <Title>Estamos {"\n"} quase la.</Title>
            <SubTitle>
              Faca seu login para comecar {"\n"}
              uma experiencia incrivel.
            </SubTitle>
          </Header>
          <Form>
            <Input
              iconName="mail"
              keyboardType="email-address"
              placeholder="E-mail"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
          </Form>
          <Footer>
            <Button
              title="Login"
              enabled
              loading={isLoading}
              onPress={handleSignIn}
            />
            <Button
              title="Criar conta gratuita"
              color={"#252525"}
              light={false}
              onPress={() => {
                navigate.navigate("SignUpFirstStep" as never);
              }}
              enabled={true}
              loading={false}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
