import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native'
import { styles } from './styles'

import Participant from '../../components/Participant'

const Home = () => {
  const participants = ['Victor', 'Isabel', 'Pedro', 'Rodrigo', 'Leticia', 'Guilherme', 'João', 'Laércio', 'Francisco'];

  const handleParticipantAdd = () => {
    if(participants.includes("Rodrigo")) {
      return Alert.alert("Participante já Existe", "Já existe um participante na lista com esse nome.")
    }
    console.log('Você clicou no botão de adicionar!');
  }

  const handleParticipantRemove = (name: string) => {
    Alert.alert("Remover", `Remover o participante ${name}?`, [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Remover",
        onPress: () => console.log(`Removendo o participante ${name}`),
      }
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Nome do evento
      </Text>

      <Text style={styles.eventDate}>
        Terça, 25 de Fevereiro de 2025.
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleParticipantAdd}
        >
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      {/* FlatList é utilizada para listas que geram muitos dados, pois não renderiza elementos fora de tela, diferente da scrollview que renderiza todos elementos sempre */}
      <FlatList
        data={participants}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Participant
              key={item}
              name={item}
              onRemove={() => handleParticipantRemove(item)}
            />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style = {styles.listEmptyText}>
            Ningém chegou no evento ainda! Adicione participantes a sua lista de presença.
          </Text>
        )}
      />
    </View>
  )
}

export default Home