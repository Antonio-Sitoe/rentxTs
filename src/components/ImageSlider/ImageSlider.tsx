import React, { useRef, useState } from "react";
import { FlatList, ViewToken } from "react-native";
import {
  Container,
  ImageIndexes,
  ImageIndex,
  CarImageWrapper,
  CarImage,
} from "./style";

interface ImageSliderProps {
  imageUrl: string[];
}

interface ChangeSliderProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImageSlider({ imageUrl }: ImageSliderProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const indexChanged = useRef((info: ChangeSliderProps) => {
    const index = info.viewableItems[0].index!;
    setImageIndex(index);
  });
  return (
    <Container>
      <ImageIndexes>
        {imageUrl.map((_, index) => {
          return <ImageIndex key={index} active={index === imageIndex} />;
        })}
      </ImageIndexes>

      <FlatList
        data={imageUrl}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(key) => key}
        onViewableItemsChanged={indexChanged.current}
        renderItem={({ item }) => {
          return (
            <CarImageWrapper>
              <CarImage source={{ uri: item }} resizeMode="contain" />
            </CarImageWrapper>
          );
        }}
      />
    </Container>
  );
}
