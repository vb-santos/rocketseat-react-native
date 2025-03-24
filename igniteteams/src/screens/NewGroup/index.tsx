import { Container, Content, Icon } from "./styles";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";

const NewGroup = () => {
  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />

        <Highlight 
          title="Nova turma"
          subtitle="Crie a turma para adicionar as pessoas"
        />

        <Button 
          title="Criar"
        />
      </Content>
    </Container>
  )
}

export default NewGroup;