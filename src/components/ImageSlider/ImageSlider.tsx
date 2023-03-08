import React from "react";
import {
  Container,
  ImageIndexes,
  ImageIndex,
  CarImageWrapper,
  CarImage,
} from "./style";

export function ImageSlider() {
  return (
    <Container>
      <ImageIndexes>
        <ImageIndex active={true} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
      </ImageIndexes>
      <CarImageWrapper>
        <CarImage source={{ uri: "" }} resi />
      </CarImageWrapper>
    </Container>
  );
}
