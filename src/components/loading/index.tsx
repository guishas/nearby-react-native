import { s } from "./styles";
import { colors } from "@/styles/theme";

import { ActivityIndicator } from "react-native";

export function Loading() {
  return (
    <ActivityIndicator color={colors.green.base} style={s.container} />
  )
}