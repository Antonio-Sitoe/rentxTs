import React from "react";
import styled from "styled-components/native";
import LottieView from "lottie-react-native";
import loadCar from "../../assets/loadingCar.json";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

function LoadAnimation() {
  return (
    <Container>
      <LottieView
        style={{
          width: 200,
          height: 200,
        }}
        resizeMode="contain"
        source={loadCar}
        autoPlay
        loop
      />
    </Container>
  );
}

export default LoadAnimation;
