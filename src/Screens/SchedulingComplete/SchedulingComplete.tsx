import { useWindowDimensions } from "react-native";
import { Container, Content, Title, Message, Footer } from "./styles";
import { ConfirmButton } from "../../components/ConfirmButton";
import { useTheme } from "styled-components";
import BrandLOgo from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";
import { useNavigation } from "@react-navigation/native";

export function SchedulingComplete() {
  const { width } = useWindowDimensions();
  const { navigate } = useNavigation();
  function handleBackToHome() {
    navigate("Home");
  }
  const theme = useTheme();
  return (
    <Container>
      <BrandLOgo width={width} height={234} />
      <Content>
        <DoneSvg width={80} height={80} />
        <Title>Carro alugado!</Title>
        <Message>
          Agora você só precisa ir{"\n"}
          até a concessionária da RENTX{"\n"}
          Pegar o seu automovel
        </Message>
      </Content>
      <Footer>
        <ConfirmButton title="OK" onPress={handleBackToHome} />
      </Footer>
    </Container>
  );
}
