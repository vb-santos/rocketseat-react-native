import { StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  
  blackContainer: {
    backgroundColor: theme.colors.gray_700,
    height: '25%',

    justifyContent: 'center',
    alignItems: 'center',
  },

  greyContainer: {
    backgroundColor: theme.colors.gray_600,
    height: '75%',

    alignItems: 'center',
  },

  amountContainer: {
    width: '90%',
    height: 48,

    marginTop: 32,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  amountRow: {
    flexDirection: 'row',
    gap: 8,
  },

  created: {
    color: theme.colors.blue,
    fontSize: 14,
    fontFamily: theme.fonts.title,
  },

  done: {
    color: theme.colors.purple,
    fontSize: 14,
    fontFamily: theme.fonts.title,
  },

  amount: {
    color: theme.colors.gray_200,
    fontSize: 14,
    fontFamily: theme.fonts.title,

    backgroundColor: theme.colors.gray_400,
    borderRadius: 12,

    width: 25,
    height: 19,

    textAlign: 'center',
  },

  line: {
    width: '90%',
    height: 1,
    backgroundColor: theme.colors.gray_400,
  },

  listEmptyContainer: {
    marginTop: 32,
    alignItems: 'center',
  },

  listEmptyTitle: {
    marginTop: 12,

    color: theme.colors.gray_300,
    fontSize: 14,
    fontFamily: theme.fonts.title,
  },

  listEmptyText: {
    color: theme.colors.gray_300,
    fontSize: 14,
    fontFamily: theme.fonts.text,
  },

  list: {
    width: '90%',
    marginBottom: 42,
  }
})