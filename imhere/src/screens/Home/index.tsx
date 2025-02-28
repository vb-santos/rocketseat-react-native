import { Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native'
import { styles } from './styles'

import Participant from '../../components/Participant'

const Home = () => {
  const participants = ['Victor', 'Isabel', 'Pedro', 'Rodrigo', 'Leticia', 'Guilherme', 'João', 'Laércio', 'Francisco'];

  const handleParticipantAdd = () => {
    console.log('Você clicou no botão de adicionar!');
  }

  const handleParticipantRemove = (name: string) => {
    console.log(`Removendo o participante ${name}`);
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