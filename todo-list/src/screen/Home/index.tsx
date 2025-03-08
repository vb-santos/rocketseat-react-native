import { View, Image, Text, FlatList } from 'react-native'
import { useState } from 'react'

import { Input } from '../../components/Input'

import { styles } from './styles'

const Home = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const [counterCreated, setCounterCreated] = useState<number>(0);
  const [counterDone, setCounterDone] = useState<number>(0);

  const toggleChecked = () => {
    setChecked(!checked);
  };

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (<>
    <View style={styles.blackContainer}>
      <Image source={require('../../../assets/logoApp.png')} />
    </View>

    <View style={styles.greyContainer}>
      <Input 
        isPressed={isPressed}
        handlePressIn={handlePressIn}
        handlePressOut={handlePressOut}
      />

      <View style={styles.amountContainer}>
        <View style={styles.amountRow}>
          <Text style={styles.created}>Criadas</Text>
          <Text style={styles.amount}>{counterCreated}</Text>
        </View>

        <View style={styles.amountRow}>
          <Text style={styles.done}>Concluídas</Text>
          <Text style={styles.amount}>{counterDone}</Text>
        </View>
      </View>
      <View style={styles.line}></View>

      <FlatList
        data={null}
        keyExtractor={item => item}
        renderItem={({ item }) => null}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.listEmptyContainer}>
            <Image source={require('../../../assets/Clipboard.png')}/>
            <Text style={styles.listEmptyTitle}>Você ainda não tem tarefas cadastradas</Text>
            <Text style={styles.listEmptyText}>Crie tarefas e organize seus itens a fazer</Text>
          </View>
        )}
      />
    </View>
  </>)
}

export default Home