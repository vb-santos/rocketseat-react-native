import { View, Text } from "react-native";
import { Container, Title } from "./styles";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";

const Groups = () => {
  return (
    <Container>
      <Header />

      <Highlight
        title="Turmas"
        subtitle="jogue com a sua turma"
      />

      <GroupCard title="Galera do ignite" />
    </Container>
  )
}

export default Groups