import { View, Text } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { style } from "./styles";
import { colors } from "@/styles/theme";

type Props = {
  code: string;
};

export default function Coupon({ code }: Props) {
  return (
    <View style={style.container}>
      <Text style={style.title}>Utilize esse cupom</Text>
      <View style={style.content}>
        <Entypo name="ticket" size={24} color={colors.green.light} />
        <Text style={style.code}>{code}</Text>
      </View>
    </View>
  );
}
