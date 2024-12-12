import { colors } from "@/styles/colors"

import { s } from "./styles"

import { View, Text } from "react-native"
import { IconTicket } from "@tabler/icons-react-native"

type CouponProps = {
  code: string,
}

export function Coupon(props: CouponProps) {
  return (
    <View style={s.container}>
      <Text style={s.title}>Utilize esse cupom</Text>

      <View style={s.content}>
        <IconTicket size={24} color={colors.green.light} />
        <Text style={s.code}>{props.code}</Text>
      </View>
    </View>
  )
}