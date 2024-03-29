import { View, Text } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigatorType } from "../../types";
import { VideoPlayer } from "../../components";

type Prop = NativeStackScreenProps<StackNavigatorType, "Player">;

const Index: React.FC<Prop> = ({ navigation, route }) => {
  const { id, title, summary, thumbnail_path, length, genre, release_date, size } = route.params;
  return (
    <View style={{ flex: 1 }}>
      <VideoPlayer videoId={id} key={id} size={size} />
    </View>
  );
};

export default Index;
