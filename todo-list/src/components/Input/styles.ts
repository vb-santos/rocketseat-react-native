import { StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 56,
    gap: 6,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginTop: '-8%',
  },

  input: {
    height: 56,
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.gray_500,

    borderWidth: 2,
    borderRadius: 8,
    borderStyle: 'solid',
    borderColor: theme.colors.gray_700,

    color: theme.colors.gray_100,
    fontSize: 16,
  }
})