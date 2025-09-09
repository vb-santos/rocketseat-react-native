import { ComponentProps } from "react";
import { Button as GSButton, ButtonSpinner, Text } from "@gluestack-ui/themed";

type Props = ComponentProps<typeof GSButton> & {
  title: string;
  variant?: "solid" | "outline";
  isLoading?: boolean;
}

export const Button = ({ title, variant="solid", isLoading=false, ...rest }: Props) => {
  return (
    <GSButton
      w="$full"
      h="$14"
      bg={variant === "outline" ? "transparent" : "$green700"}
      borderWidth={variant === "outline" ? "$1" : "$0"}
      borderColor="$green500"
      rounded="$sm"
      $active-bg={variant === "outline" ? "$gray500" : "$green500"}
      disabled={isLoading}
      {...rest}
    >
      {
        isLoading ? <ButtonSpinner color="$white" /> : (
          <Text
          color={variant === "outline" ? "$green500" : "white"}
          fontFamily="$heading"
          fontSize="$sm"
          >
            {title}
          </Text>
        )
      }
    </GSButton>
  )
}