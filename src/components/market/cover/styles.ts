import { StyleSheet } from "react-native";
import { colors } from "@/styles/theme";

export const style = StyleSheet.create({
  container: {
    width: "100%",
    height: 232,
    marginBottom: -32,
    backgroundColor: colors.gray[200],
  },
  header: {
    padding: 24,
    paddingTop: 56,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.green.dark,
    borderRadius: 10,
    padding: 5,
  },
});
