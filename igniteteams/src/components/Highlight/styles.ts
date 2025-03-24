import styled from "styled-components/native";
import { theme } from "@theme/index";

export const Container = styled.View`
  width: 100%;
  margin: 32px 0;
`

export const Title = styled.Text`
  text-align: center;

  font-size: ${theme.FONT_SIZE.XL}px;
  font-family: ${theme.FONTS.BOLD};
  color: ${theme.COLORS.WHITE};
`

export const Subtitle = styled.Text`
  text-align: center;

  font-size: ${theme.FONT_SIZE.MD}px;
  font-family: ${theme.FONTS.REGULAR};
  color: ${theme.COLORS.GRAY_300};
`