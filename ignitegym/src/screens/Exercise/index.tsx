import { ScrollView, TouchableOpacity} from "react-native";
import { HStack, VStack, Icon, Heading, Text, Image, Box } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native";

import { Button } from "@components/Button";

import {AppNavigatorRoutesProps} from "@routes/app.routes";

import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepetitionSvg from "@assets/repetitions.svg";


export const Exercise = () => {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleGoBack = () => {
    navigation.goBack();
  }

  return (
    <VStack flex={1}>
      <VStack px="$8" bg="$gray600" pt="$12">
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={ArrowLeft} color="$green500" size="xl" />
        </TouchableOpacity>

        <HStack
          justifyContent="space-between"
          alignItems="center"
          mt="$4"
          mb="$8"
        >
          <Heading
            color="$gray100"
            fontFamily="$heading"
            fontSize="$lg"
            flexShrink={1}
          >
            Puxada frontal
          </Heading>
          <HStack alignItems="center">
            <BodySvg />

            <Text color="$gray200" ml="$1" textTransform="capitalize">
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <VStack p="$8">
          <Image
            source={{
              uri: "https://static.wixstatic.com/media/2edbed_76fbc91ccd0c44d88e3b1624debf9f09~mv2.gif/v1/fill/" +
                "w_980,h_980,al_c,usm_0.66_1.00_0.01,pstr/2edbed_76fbc91ccd0c44d88e3b1624debf9f09~mv2.gif"
            }}
            alt="Imagem do exercício"
            mb="$3"
            resizeMode="cover"
            rounded="$lg"
            w="$full"
            h="$80"
          />

          <Box
            bg="$gray600"
            rounded="$md"
            pb="$4"
            px="$4"
          >
            <HStack
              alignItems="center"
              justifyContent="space-around"
              mb="$6"
              mt="$5"
            >
              <HStack>
                <SeriesSvg />
                <Text color="$gray200" ml="$2">3 Séries</Text>
              </HStack>

              <HStack>
                <RepetitionSvg />
                <Text color="$gray200" ml="$2">12 Repetições</Text>
              </HStack>
            </HStack>

            <Button title="Marcar como realizado" />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  )
}