import { Pressable, Image, View, TextInput } from 'react-native';
import { useState } from 'react';

import { styles } from './styles'
import { theme } from '../../styles/theme'

type Props = {
  addTask: (title: string) => void
}

export const Input = ({ addTask }: Props) => {
  const [title, setTitle] = useState<string>('');
  const [isAddPressed, setIsAddPressed] = useState<boolean>(false);

  const handlePressIn = () => setIsAddPressed(true);

  const handlePressAdd = (title: string) => {
    addTask(title);
    setIsAddPressed(false);

    setTitle('');
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Adicione uma nova tarefa'
        placeholderTextColor={theme.colors.gray_300}
        onChangeText={setTitle}
        value={title}
        style={styles.input}
      />

      <Pressable
        onPressIn={handlePressIn}
        onPressOut={() => handlePressAdd(title)}
      >
        <Image
          source={
            isAddPressed
              ? require("../../../assets/addButton/add_hoverTrue.png")
              : require("../../../assets/addButton/add_hoverFalse.png")
          }
        />
      </Pressable>
    </View>
  )
}