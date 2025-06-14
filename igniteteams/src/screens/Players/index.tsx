import { useState } from "react";
import { Alert, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";

import { AppError } from "@utils/AppError";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playersGetByGroupAndTeam";
import {PlayerStorageDTO} from "@storage/player/PlayerStorageDTO";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";


type RouteParams = {
  group: string;
}


const Players = () => {
  const [newPlayerName, setNewPlayerName] = useState("");
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const route = useRoute()
  const { group } = route.params as RouteParams;

  const handleAddPlayer = async () => {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert("Nova Pessoa", "Informe o nome da pessoa para adicionar");
    }

    const newPlayer = {
      name: newPlayerName,
      team: team,
    }

    try {
      await playerAddByGroup(newPlayer, group)

    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Nova Pessoa", AppError.message);
      } else {
        console.log(error);
        Alert.alert("Nova Pessoa", "Não foi possível adicionar");
      }
    }
  }

  const fetchPlayersByTeam = async () => {
    try {
      const playersByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert("Nova Pessoa", "Não foi possível carregar as pessoas do time selecionado, tente novamente.");
    }
  }



  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title={group}
        subtitle="Adicione a galera e separe os times"
      />

      <Form>
        <Input
          onChangeText={setNewPlayerName}
          placeholder="Nome da pessoa"
          autoCorrect={false}
        />

        <ButtonIcon
          icon="add"
          onPress={handleAddPlayer}
        />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />

        <NumberOfPlayers>
          {players.length}
        </NumberOfPlayers>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <PlayerCard
            name={item}
            onRemove={() => { }}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty
            message="Não há pessoas nesse time."
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 }
        ]}
      />

      <Button
        title="Remover Turma"
        type="SECONDARY"
      />
    </Container>
  )
}

export default Players;