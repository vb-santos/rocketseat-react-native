import { VStack, Image } from "@gluestack-ui/themed";

import BackgroundImg from "@assets/background.png";

export const SignIn = () => {
  return (
    <VStack flex={1} bg="$gray700">
      <Image
        w="$full"
        h={624}
        position="absolute"
        source={BackgroundImg}
        defaultSource={BackgroundImg}
        alt="Pessoas treinando na academia no fundo da página"
      />
    </VStack>
  )
}