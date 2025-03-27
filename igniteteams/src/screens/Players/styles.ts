import styled from "styled-components/native";
import { theme } from "@theme/index";

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.COLORS.GRAY_600};

  padding: 24px;
`

export const Form = styled.View`
  width: 100%;
  background-color: ${theme.COLORS.GRAY_700};
  
  flex-direction: row;
  justify-content: center;

  border-radius: 6px;
`
