import { Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
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

      <ScrollView showsVerticalScrollIndicator={false}>
        {
          participants.map(participant => (
            <Participant
              key={participant}
              name={participant}
              onRemove={() => handleParticipantRemove(participant)}
            />
          ))
        }
      </ScrollView>
    </View>
  )
}

export default Home