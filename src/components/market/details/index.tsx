import { View, Text } from "react-native";
import { Info } from "../info";
import { style } from "./styles";

export type PropsDetails = {
  name: string;
  description: string;
  address: string;
  phone: string;
  coupons: number;
  rules: {
    id: string;
    description: string;
  }[];
};

type Props = {
  data: PropsDetails;
};

export function Details({ data }: Props) {
  return (
    <View style={style.container}>
      <Text style={style.name}>{data.name}</Text>
      <Text style={style.description}>{data.description}</Text>
      <View style={style.group}>
        <Text style={style.title}>Informações</Text>
        <Info
          iconName="ticket"
          description={`${data.coupons} cupons disponíveis`}
        />
        <Info iconName="location-pin" description={data.address} />
        <Info iconName="phone" description={data.phone} />
      </View>
      <View style={style.group}>
        <Text style={style.title}>Regulamento</Text>
        {data.rules.map((item) => (
          <Text key={item.id} style={style.rule}>
            {`\u2022 ${item.description}`}
          </Text>
        ))}
      </View>
    </View>
  );
}
