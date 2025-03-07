import { Pressable, Image, View, TextInput } from 'react-native';

import { styles } from './styles'
import { theme } from '../../styles/theme'

type Props = {
  isPressed: boolean;
  handlePressIn: () => void;
  handlePressOut: () => void;
}

export const Input = ({ isPressed, handlePressIn, handlePressOut }: Props) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Adicione uma nova tarefa'
        placeholderTextColor={theme.colors.gray_300}
        style={styles.input}
        
      />

      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Image
          source={
            isPressed
              ? require("../../../assets/addButton/add_hoverTrue.png")
              : require("../../../assets/addButton/add_hoverFalse.png")
          }
        />
      </Pressable>
    </View>
  )
}