import styled from "styled-components/native";
import { theme } from "@theme/index";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Message = styled.Text`
  text-align: center;
  font-size: ${theme.FONT_SIZE.SM}px;
  font-family: ${theme.FONTS.REGULAR};
  color: ${theme.COLORS.GRAY_300}
`;

