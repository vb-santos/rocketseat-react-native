import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { UsersThree } from "phosphor-react-native"

import { theme } from "@theme/index";

export const Container = styled(TouchableOpacity)`
  width: 100%;
  height: 90px;

  background-color: ${theme.COLORS.GRAY_500};
  border-radius: 6px;
  
  flex-direction: row;
  align-items: center;

  padding: 24px;
  margin-bottom: 12px;
`

export const Title = styled.Text`
  font-size: ${theme.FONT_SIZE.MD}px;
  font-family: ${theme.FONTS.REGULAR};
  color: ${theme.COLORS.GRAY_200};
`

export const Icon = styled(UsersThree).attrs({
  size: 32,
  color: theme.COLORS.GREEN_700,
  weight: 'fill',
})`
  margin-right: 20px;
`