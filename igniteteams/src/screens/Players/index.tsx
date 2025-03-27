import { Container } from "./styles";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";

const Players = () => {
  return (
    <Container>
      <Header showBackButton />
    
      <Highlight 
        title="Nome da turma"
        subtitle="Adicione a galera e separe os times"
      />

    </Container>
  )
}

export default Players;