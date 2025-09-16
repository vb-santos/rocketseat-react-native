import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity} from "react-native";
import { HStack, VStack, Icon, Heading, Text, Image, Box, useToast } from "@gluestack-ui/themed";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native";

import { AppError } from "@utils/AppError";

import { ExerciseDTO } from "@dtos/ExerciseDTO";

import { api } from "@services/api";

import { Button } from "@components/Button";
import { ToastMessage } from "@components/ToastMessage";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepetitionSvg from "@assets/repetitions.svg";
import {Loading} from "@components/Loading";



type RouteParamsProps = {
  exerciseId: string;
}


export const Exercise = () => {
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [sendingRegister, setSendingRegister] = useState<boolean>(false)

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const route = useRoute();
  const toast = useToast();

  const { exerciseId } = route.params as RouteParamsProps;

  const handleGoBack = () => {
    navigation.goBack();
  }

  const fetchExerciseDetails = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/exercises/${exerciseId}`);
      setExercise(response.data);

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Não foi possível carregar os detalhes do exercício."

      toast.show({
        placement: "top",
        render: ({id}) => (
          <ToastMessage
            id={id}
            action="error"
            title={title}
            onClose={() => toast.close(id)}
          />
        )
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleExerciseHistoryRegister = async () => {
    try{
      setSendingRegister(true);

      await api.post("/history", { exercise_id: exerciseId })

      toast.show({
        placement: "top",
        render: ({id}) => (
          <ToastMessage
            id={id}
            action="success"
            title="Parabéns! Exercício registrado no seu histórico."
            onClose={() => toast.close(id)}
          />
        )
      });

      navigation.navigate("history");
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Não foi possível registrar o exercício."

      toast.show({
        placement: "top",
        render: ({id}) => (
          <ToastMessage
            id={id}
            action="error"
            title={title}
            onClose={() => toast.close(id)}
          />
        )
      });
    } finally {
      setSendingRegister(false);
    }
  }

  useEffect(() => {
    fetchExerciseDetails();
  }, [exerciseId]);

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
            {exercise.name}
          </Heading>
          <HStack alignItems="center">
            <BodySvg />

            <Text color="$gray200" ml="$1" textTransform="capitalize">
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      { isLoading ? <Loading /> : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          <VStack p="$8">
            <Image
              source={{ uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}` }}
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
                  <Text color="$gray200" ml="$2">{exercise.series} Séries</Text>
                </HStack>

                <HStack>
                  <RepetitionSvg />
                  <Text color="$gray200" ml="$2">{exercise.repetitions} Repetições</Text>
                </HStack>
              </HStack>

              <Button
                title="Marcar como realizado"
                isLoading={sendingRegister}
                onPress={handleExerciseHistoryRegister}
              />
            </Box>
          </VStack>
        </ScrollView>
      )}
    </VStack>
  )
}