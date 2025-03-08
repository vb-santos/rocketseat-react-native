import { View, Pressable, Image, Text } from 'react-native';

import { styles } from './styles';

type Props = {
  id: string;
  title: string;
  isChecked: boolean;
  isPressed: boolean;
  isRemovePressed: boolean;
  toggleTaskState: (id: string, key: "isChecked" | "isPressed" | "isRemovePressed") => void;
  toggleBothStates: (id: string) => void;
}

export const Task = ({ id, title, isChecked, isPressed, isRemovePressed, toggleTaskState, toggleBothStates }: Props) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPressIn={() => toggleBothStates(id)}
        onPressOut={() => toggleTaskState(id, "isPressed")}
      >
        <Image
          source={
            isPressed
            ? require("../../../assets/checkButton/check_checkedFalse_hoverTrue.png")
            : isChecked
            ? require("../../../assets/checkButton/check_checkedTrue_hoverFalse.png")
            : isChecked && isPressed
            ? require("../../../assets/checkButton/check_checkedTrue_hoverTrue.png")
            : require("../../../assets/checkButton/check_checkedFalse_hoverFalse.png")
          }
        />
      </Pressable>

      <Text style={styles.title}>
        {title}
      </Text>

      <Pressable
        onPressIn={() => toggleTaskState(id, "isRemovePressed")}
        onPressOut={() => toggleTaskState(id, "isRemovePressed")}
      >
        <Image
          source={
            isRemovePressed
            ? require("../../../assets/trashButton/trash_hoverTrue.png")
            : require("../../../assets/trashButton/trash_hoverFalse.png")
          }
        />
      </Pressable>
    </View>
  )
}