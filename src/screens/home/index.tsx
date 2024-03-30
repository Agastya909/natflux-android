import { ActivityIndicator, FlatList, RefreshControl, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useUserStore } from "../../zustand";
import { TextBox } from "../../components";
import { Api } from "../../utils";
import { StackNavigatorType, VideoDetails } from "../../types";
import VideoCard from "./VideoCard";
import { UserCircleIcon } from "react-native-heroicons/outline";
import { useNavigation, useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const Index: React.FC = () => {
  const { details } = useUserStore();
  const { colors } = useTheme();
  const [video, setVideoData] = useState<VideoDetails[]>([]);
  const [isRefresh, setRefreshing] = useState<boolean>(false);
  const navigation = useNavigation<NativeStackNavigationProp<StackNavigatorType>>();

  useEffect(() => {
    resp();
  }, []);
  const resp = async () => {
    try {
      const response = await Api.Video.getHomeFeed();
      setVideoData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{ paddingHorizontal: 10, marginTop: 10, flex: 1 }}>
      <View style={{ marginVertical: 10, flexDirection: "row", justifyContent: "space-between" }}>
        <TextBox
          body={`Welcome, ${details.name.length > 7 ? details.name.slice(0, 7) + "..." : details.name}`}
          fontSize="l"
        />
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <UserCircleIcon color={colors.notification} strokeWidth={2} size={30} />
        </TouchableOpacity>
      </View>
      <FlatList
        refreshing={isRefresh}
        refreshControl={<RefreshControl refreshing={isRefresh} onRefresh={resp} />}
        data={video}
        numColumns={2}
        renderItem={({ index, item }) => {
          return <VideoCard props={item} key={index} />;
        }}
        ListEmptyComponent={<ActivityIndicator size={"large"} />}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default Index;
