import { useCallback, useState } from "react";
import { SectionList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Heading, Text, VStack, useToast } from "@gluestack-ui/themed";

import { AppError } from "@utils/AppError";

import { api } from "@services/api";

import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO";

import { ScreenHeader } from "@components/ScreenHeader";
import { HistoryCard } from "@components/HistoryCard";
import { ToastMessage } from "@components/ToastMessage";
import { Loading } from "@components/Loading";


export const History = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);

  const toast = useToast();

  const fetchHistory = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/history");
        setExercises(response.data);

      } catch (error) {
          const isAppError = error instanceof AppError;
          const title = isAppError ? error.message : "Não foi possível carregar o histórico."

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

  useFocusEffect(useCallback(() => {
    fetchHistory();
  }, []));

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />
      {
        isLoading ? <Loading /> : (
          <SectionList
            sections={exercises}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <HistoryCard data={item}/>}
            renderSectionHeader={({section}) => (
              <Heading
                color="$gray200"
                fontSize="$md"
                fontFamily="$heading"
                mt="$10"
                mb="$3"
              >
                {section.title}
              </Heading>
            )}
            style={{paddingHorizontal: 32}}
            contentContainerStyle={
              exercises.length === 0 && {flex: 1, justifyContent: "center"}
            }
            ListEmptyComponent={() => (
              <Text color="$gray100" textAlign="center">
                Não há exercícios registrados ainda. {"\n"}
                Vamos fazer exercícios hoje?
              </Text>
            )}
            showsVerticalScrollIndicator={false}
          />
        )
      }
    </VStack>
  )
}