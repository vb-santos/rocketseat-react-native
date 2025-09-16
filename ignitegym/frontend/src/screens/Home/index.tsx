import {useCallback, useEffect, useState} from "react";
import { FlatList } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Heading, HStack, Text, VStack, useToast } from "@gluestack-ui/themed";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { api } from "@services/api";

import { ExerciseDTO } from "@dtos/ExerciseDTO";

import { AppError } from "@utils/AppError";

import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { ExerciseCard } from "@components/ExerciseCard";
import {ToastMessage} from "@components/ToastMessage";
import {Loading} from "@components/Loading";



export const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>();
  const [groupSelected, setGroupSelected] = useState("antebraço");
  const [exercices, setExercices] = useState<ExerciseDTO[]>([]);

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const toast = useToast();

  const handleOpenExerciseDetails = (exerciseId: string) => {
    navigation.navigate("exercise", { exerciseId });
  }

  const fetchGroups = async () => {
    try {
      const response = await api.get("/groups");
      setGroups(response.data);

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Não foi possível carregar os grupos musculares"

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="error"
            title={title}
            onClose={() => toast.close(id)}
          />
        )
      });
    }
  }

  const fetchExercisesByGroup = async () => {
    try{
      setIsLoading(true);

      const response = await api.get(`/exercises/bygroup/${groupSelected}`);
      setExercices(response.data);

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Não foi possível carregar os exercícios"

      toast.show({
        placement: "top",
        render: ({ id }) => (
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

  useEffect(() => {
    fetchGroups()
  }, []);

  useFocusEffect(useCallback(() => {
    fetchExercisesByGroup();
  }, [groupSelected]));

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected.toLowerCase() === item.toLowerCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 32,
        }}
        style={{ marginVertical: 40, maxHeight: 44, minHeight: 44 }}
      />
      {
        isLoading ? <Loading /> : (
          <VStack px="$8" flex={1}>
            <HStack justifyContent="space-between" alignItems="center" mb="$5">
              <Heading color="$gray200" fontSize="$md" fontFamily="heading">
                Exercícios
              </Heading>

              <Text color="$gray200" fontSize="$sm" fontFamily="$body">
                {exercices.length}
              </Text>
            </HStack>

            <FlatList
              data={exercices}
              keyExtractor={item => item.id}
              renderItem={(({ item }) => (
                <ExerciseCard
                  onPress={() => handleOpenExerciseDetails(item.id)}
                  data={item}
                />
                )
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          </VStack>
        )
      }
    </VStack>
  )
}
