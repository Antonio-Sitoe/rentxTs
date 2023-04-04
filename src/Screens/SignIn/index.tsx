import { Container, Header, Title, SubTitle, Form, Footer } from "./styles";
import { StatusBar } from "react-native";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import theme from "../../styles/theme";
import { PasswordInput } from "../../components/PasswordInput";
export function SignIn() {
  return (
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
        />
        <PasswordInput
          iconName="lock"
          placeholder="Senha"
          // onChangeText={setPassword}
          // value={password}
        />
      </Form>
      <Footer>
        <Button title="Login" enabled loading={false} onPress={() => {}} />
        <Button
          title="Criar conta gratuita"
          color={theme.colors.background_secondary}
          light={true}
          onPress={() => {}}
          enabled={true}
          loading={false}
        />
      </Footer>
    </Container>
  );
}
