import { Pressable, Image, View } from 'react-native';

import { styles } from './styles'

type Props = {
  isPressed: boolean;
  handlePressIn: () => void;
  handlePressOut: () => void;
}

export const Input = ({ isPressed, handlePressIn, handlePressOut }: Props) => {
  return (
    <View style={styles.container}>
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