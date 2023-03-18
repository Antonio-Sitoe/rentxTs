import { useWindowDimensions } from "react-native";
import { Container, Content, Title, Message } from "./styles";

import BrandLOgo from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";

export function SchedulingComplete() {
  const { width } = useWindowDimensions();
  return (
    <Container>
      <BrandLOgo width={80} height={80} />
      <Content>
        <DoneSvg width={80} height={80} />
        <Title>Carro alugado!</Title>
        <Message>
          Agora voce precisa ir {"\n"}
          ate a concessionaria da Rentex{"\n"}
          Pegar o seu automovel
        </Message>
      </Content>
    </Container>
  );
}
