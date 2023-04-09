import { useWindowDimensions } from "react-native";
import { Container, Content, Title, Message, Footer } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ConfirmButton } from "../../components/ConfirmButton";

import BrandLOgo from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";

interface Props {
  data: {
    title: string;
    message: string;
    nextScreamRoute: string;
  };
}
// Carro alugado!
//  Agora você só precisa ir{"\n"}
//         até a concessionária da RENTX{"\n"}
//         Pegar o seu automovel

export function Confirmation() {
  const route = useRoute();
  const { data } = route.params as Props;
  const { width } = useWindowDimensions();
  const { navigate } = useNavigation();
  function handleBackToHome() {
    navigate(data?.nextScreamRoute as never);
  }
  return (
    <Container>
      <BrandLOgo width={width} height={234} />
      <Content>
        <DoneSvg width={80} height={80} />
        <Title>{data?.title}</Title>
        <Message>{data?.message}</Message>
      </Content>
      <Footer>
        <ConfirmButton title="OK" onPress={handleBackToHome} />
      </Footer>
    </Container>
  );
}
