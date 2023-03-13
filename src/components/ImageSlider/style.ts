import { Dimensions } from "react-native";
import styled from "styled-components/native";
import theme from "../../styles/theme";

export const Container = styled.View`
  width: 100%;
`;

export const ImageIndexes = styled.View`
  flex-direction: row;
  align-self: flex-end;
  padding: 24px;
`;

interface ImageIndexProps {
  active: boolean;
}

export const ImageIndex = styled.View<ImageIndexProps>`
  width: 6px;
  height: 6px;
  background-color: ${({ active, theme }) => {
    return active ? theme.colors.title : theme.colors.shape;
  }};
  border-radius: 3px;
  margin-left: 8px;
`;
export const CarImageWrapper = styled.View`
  width: ${Dimensions.get("window").width}px;
  justify-content: center;
  align-items: center;
  height: 132px;
`;

export const CarImage = styled.Image`
  max-width: 280px;
  width: 100%;
  height: 132px;
`;
