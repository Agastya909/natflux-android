import { View, Text, Image, useWindowDimensions, TouchableOpacity } from "react-native";
import React from "react";
import { TextBox } from "../../components";
import { StackNavigatorType, VideoDetails } from "../../types";
import { useNavigation, useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const VideoCard: React.FC<{ props: VideoDetails }> = ({ props }) => {
  const navigation = useNavigation<NativeStackNavigationProp<StackNavigatorType>>();
  const { id, title, length, path, genre, release_date, summary, thumbnail_path } = props;
  const { colors } = useTheme();
  const { height } = useWindowDimensions();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Player", props)}
      style={{
        backgroundColor: colors.card,
        marginVertical: 5,
        paddingTop: 10,
        paddingHorizontal: 10,
        borderRadius: 10
      }}>
      <View style={{ borderRadius: 5, overflow: "hidden" }}>
        <Image source={{ uri: thumbnail_path, height: height * 0.16 }} />
      </View>
      <View style={{ marginVertical: 5 }}>
        <TextBox body={title} fontSize="l" fontWeight="medium" />
      </View>
    </TouchableOpacity>
  );
};

export default VideoCard;
