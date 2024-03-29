import { View, Text, Image, useWindowDimensions, TouchableOpacity, ImageBackground } from "react-native";
import React from "react";
import { TextBox } from "../../components";
import { StackNavigatorType, VideoDetails } from "../../types";
import { useNavigation, useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const VideoCard: React.FC<{ props: VideoDetails }> = ({ props }) => {
  const navigation = useNavigation<NativeStackNavigationProp<StackNavigatorType>>();
  const { id, title, length, path, genre, release_date, summary, thumbnail_path } = props;
  const { colors } = useTheme();
  const { height, width } = useWindowDimensions();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Player", props)}
      style={{
        flex: 1 / 2,
        margin: 5,
        height: width / 3
      }}>
      <ImageBackground
        source={{ uri: thumbnail_path }}
        imageStyle={{
          borderRadius: 20
        }}
        style={{
          flex: 1,
          paddingHorizontal: 10,
          justifyContent: "flex-end"
        }}>
        <View style={{ marginVertical: 15 }}>
          <TextBox body={title} fontSize="reg" fontWeight="semibold" />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default VideoCard;
