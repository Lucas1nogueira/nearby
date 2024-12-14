import {
  Image,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { style } from "./styles";
import Entypo from "@expo/vector-icons/Entypo";
import { colors } from "@/styles/theme";

export type PlaceProps = {
  id: string;
  name: string;
  description: string;
  coupons: number;
  cover: string;
  address: string;
};

type Props = TouchableOpacityProps & {
  data: PlaceProps;
};

export function Place({ data, ...rest }: Props) {
  return (
    <TouchableOpacity style={style.container} {...rest}>
      <Image style={style.image} source={{ uri: data.cover }} />
      <View style={style.content}>
        <Text style={style.name}>{data.name}</Text>
        <Text style={style.description} numberOfLines={2}>
          {data.description}
        </Text>
        <View style={style.footer}>
          <Entypo name={"ticket"} size={16} color={colors.red.base} />
          <Text style={style.tickets}>{data.coupons} cupons disponíveis</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
