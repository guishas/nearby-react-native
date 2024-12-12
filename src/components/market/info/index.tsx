import { colors } from "@/styles/colors";

import { s } from "./styles"

import { View, Text } from "react-native";
import { IconProps } from "@tabler/icons-react-native";

type InfoProps = {
  description: string,
  icon: React.ComponentType<IconProps>,
}

export function Info({ icon: Icon, description }: InfoProps) {
  return (
    <View style={s.container}>
      <Icon size={16} color={colors.gray[400]} />
      <Text style={s.text}>{description}</Text>
    </View>
  )
}