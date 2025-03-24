import { useState } from "react";
import { FlatList } from "react-native";

import { Container, Title } from "./styles";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";

const Groups = () => {
  const [groups, setGroups] = useState<string[]>(["Galera da Rocket", "AmigoTech"])

  

  return (
    <Container>
      <Header />

      <Highlight
        title="Turmas"
        subtitle="jogue com a sua turma"
      />
      
      <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard
            title={item}
          />
        )}
      />
    </Container>
  )
}

export default Groups