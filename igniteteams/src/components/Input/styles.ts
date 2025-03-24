import { TextInput } from "react-native";
import styled from "styled-components/native";

import { theme } from "@theme/index";

export const Container = styled(TextInput)`
  flex: 1;

  min-height: 56px;
  max-height: 56px;

  background-color: ${theme.COLORS.GRAY_700};

  color: ${theme.COLORS.WHITE};
  font-family: ${theme.FONTS.REGULAR};
  font-size: ${theme.FONT_SIZE.MD}px;

  border-radius: 6px;
  padding: 16px;
`;