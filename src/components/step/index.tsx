import { View, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "@/styles/theme";
import { style } from "./styles";

type Props = {
  title: string;
  description: string;
  iconName: any;
};

export function Step({ title, description, iconName }: Props) {
  return (
    <View style={style.container}>
      <MaterialIcons name={iconName} size={32} color={colors.green.base} />
      <View style={style.details}>
        <Text style={style.title}>{title}</Text>
        <Text style={style.description}>{description}</Text>
      </View>
    </View>
  );
}
