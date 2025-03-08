import { StyleSheet } from "react-native";

import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,

    borderRadius: 8,
    backgroundColor: theme.colors.gray_500,

    borderWidth: 1,
    borderColor: theme.colors.gray_400,
  },

  title: {
    flex: 1,
    color: theme.colors.gray_100,
    fontSize: 14,
    fontFamily: theme.fonts.text,
  },

  pressableIcon: {
    padding: 16,
  }
})