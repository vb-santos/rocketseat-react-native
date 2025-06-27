import React from "react";
import { TextInput, TextInputProps} from "react-native";

import { Container } from "./styles";
import { theme } from "@theme/index";

type Props = TextInputProps & {
  inputRef?: React.RefObject<TextInput>;
}

export const Input = ({ inputRef, ...rest }: Props) => {
  return (
    <Container
      ref={inputRef}
      placeholderTextColor={theme.COLORS.GRAY_300}
      {...rest}
    /> 
  )
}