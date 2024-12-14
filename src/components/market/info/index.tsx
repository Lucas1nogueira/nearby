import { View, Text } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { style } from "./styles";
import { colors } from "@/styles/theme";

type Props = {
  description: string;
  iconName: any;
};

export function Info({ iconName, description }: Props) {
  return (
    <View style={style.container}>
      <Entypo name={iconName} size={16} color={colors.gray[400]} />
      <Text style={style.text}>{description}</Text>
    </View>
  );
}
