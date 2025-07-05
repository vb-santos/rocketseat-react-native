import { useState } from "react";
import { FlatList } from "react-native";
import {Heading, HStack, Text, VStack} from "@gluestack-ui/themed";

import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { ExerciseCard } from "@components/ExerciseCard";

export const Home = () => {
  const [groups, setGroups] = useState(["Costas", "Bíceps", "Tríceps", "Ombro"]);
  const [groupSelected, setGroupSelected] = useState("Costas");

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected === item}
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

      <VStack px="$8">
        <HStack justifyContent="space-between" alignItems="center" mb="$5">
          <Heading color="$gray200" fontSize="$md" fontFamily="heading">Exercícios</Heading>

          <Text color="$gray200" fontSize="$sm" fontFamily="$body">4</Text>
        </HStack>

        <ExerciseCard />
      </VStack>
    </VStack>
  )
}
