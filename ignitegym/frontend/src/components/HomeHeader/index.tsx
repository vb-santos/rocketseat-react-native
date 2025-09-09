import { Heading, HStack, VStack, Text, Icon } from "@gluestack-ui/themed";
import { LogOut } from "lucide-react-native"

import { UserPhoto } from "@components/UserPhoto";

export const HomeHeader = () => {
  return (
    <HStack
      bg="$gray600"
      pt="$16"
      pb="$5"
      px="$8"
      alignItems="center"
      gap="$4"
    >
      <UserPhoto
        source={{ uri: "https://github.com/victorb-s.png" }}
        alt="Foto de perfil do usuário"
        w="$16"
        h="$16"
      />
      <VStack flex={1}>
        <Text color="$gray100" fontSize="$sm">Olá, </Text>
        <Heading color="$gray100" fontSize="$md">Victor Santos</Heading>
      </VStack>

      <Icon as={LogOut} color="$gray200" size="xl" />
    </HStack>
  )
}