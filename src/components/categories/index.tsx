import { s } from "./styles";
import { colors } from "@/styles/theme";

import { FlatList } from "react-native";
import { Category } from "../category";

export type CategoryProps = {
  id: string,
  name: string,
}

type CategoriesProps = {
  data: CategoryProps[],
  selected: string,
  onSelect: (id: string) => void,
}

export function Categories({ data, selected, onSelect }: CategoriesProps) {
  return (
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={s.content}
      style={s.container}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Category
          onPress={() => onSelect(item.id)}
          isSelected={item.id === selected}
          iconId={item.id}
          name={item.name}
        />
      )}
    />
  )
}