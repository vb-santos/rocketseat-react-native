import { ComponentProps } from "react";
import { Input as GSInput, InputField } from "@gluestack-ui/themed";


type Props = ComponentProps<typeof InputField> & {
  isReadOnly?: boolean
}


export const Input = ({ isReadOnly=false, ...rest }: Props) => {
  return (
    <GSInput
      h="$14"
      borderWidth="$0"
      borderRadius="$md"
      $focus={{
        borderWidth: 1,
        borderColor: "$green500",
      }}
      isReadOnly={isReadOnly}
      opacity={isReadOnly ? 0.5 : 1}
    >
      <InputField
        px="$4"
        bg="$gray700"
        color="$white"
        fontFamily="$body"
        placeholderTextColor="$gray300"
        {...rest}
      />
    </GSInput>
  )
}