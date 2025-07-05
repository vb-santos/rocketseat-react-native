import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { HStack, Image, Heading, VStack, Text, Icon } from "@gluestack-ui/themed";
import { ChevronRight } from "lucide-react-native"

type Props = TouchableOpacityProps

export const ExerciseCard = ({ ...rest }: Props) => {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg="$gray500"
        alignItems="center"
        p="$2"
        pr="$4"
        rounded="$md"
        mb="$3"
      >
        <Image
          source={{
            uri: "https://static.wixstatic.com/media/2edbed_76fbc91ccd0c44d88e3b1624debf9f09~mv2.gif/v1/fill/" +
              "w_980,h_980,al_c,usm_0.66_1.00_0.01,pstr/2edbed_76fbc91ccd0c44d88e3b1624debf9f09~mv2.gif"
          }}
          alt="Imagem do exercício"
          w="$16"
          h="$16"
          rounded="$md"
          mr="$4"
          resizeMode="cover"
        />

        <VStack flex={1}>
          <Heading fontSize="$lg" color="$white" fontFamily="$heading">Cadeira Flexora</Heading>
          <Text fontSize="$sm" color="$gray200" mt="$1" numberOfLines={2}>3 Séries x 12 Repetições</Text>
        </VStack>

        <Icon as={ChevronRight} color="$gray300" />
      </HStack>
    </TouchableOpacity>
  )
}