import { SafeAreaView } from "react-native-safe-area-context"
import styled from "styled-components/native";
import { UsersThree } from "phosphor-react-native"

import { theme } from "@theme/index";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${theme.COLORS.GRAY_600};
  padding: 24px;
`

export const Content = styled.View`
  flex: 1;
  justify-content: center;
`

export const Icon = styled(UsersThree).attrs({
  size: 56,
  color: theme.COLORS.GREEN_700,
})`
  align-self: center;
`