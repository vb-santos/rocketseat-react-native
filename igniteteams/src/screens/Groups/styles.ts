import styled from "styled-components/native";
import { theme } from "@theme/index";

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.COLORS.GREEN_700};
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 32px;
`