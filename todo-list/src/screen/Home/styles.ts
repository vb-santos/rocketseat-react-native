import { StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  blackContainer: {
    backgroundColor: theme.colors.gray_700,
    height: '20%',

    justifyContent: 'center',
    alignItems: 'center',
  },

  greyContainer: {
    backgroundColor: theme.colors.gray_600,
    height: '100%',
  },
})