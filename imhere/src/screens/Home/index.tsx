import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import { styles } from './styles'

import Participant from '../../components/Participant'

const Home = () => {
  const handleParticipantAdd = () => {
    console.log('Você clicou no botão de adicionar!');
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

      <Participant />
      <Participant />
    </View>
  )
}

export default Home