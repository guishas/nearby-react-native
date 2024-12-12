import { colors, fontFamily } from "@/styles/theme";

import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    backgroundColor: colors.gray[100],
  },
  content: {
    gap: 4,
    padding: 16,
    paddingBottom: 50,
  },
  indicator: {
    width: 80,
    height: 4,
    backgroundColor: colors.gray[300],
  },
  title: {
    color: colors.gray[600],
    fontSize: 20,
    fontFamily: fontFamily.bold,
    marginBottom: 8,
  }
})