import { Text, View, StyleSheet } from 'react-native'
import { styles } from './styles'

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Nome do evento
      </Text>

      <Text style={styles.eventDate}>
        Terça, 25 de Fevereiro de 2025.
      </Text>
    </View>
  )
}

export default Home