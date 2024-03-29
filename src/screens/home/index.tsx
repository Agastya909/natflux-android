import { FlatList, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useUserStore } from "../../zustand";
import { TextBox } from "../../components";
import { Api } from "../../utils";
import { VideoDetails } from "../../types";
import VideoCard from "./VideoCard";

const Index: React.FC = () => {
  const { details } = useUserStore();
  const [video, setVideoData] = useState<VideoDetails[]>([]);
  useEffect(() => {
    resp();
  }, []);
  const resp = async () => {
    try {
      console.log("resp called");
      const response = await Api.Video.getHomeFeed();
      setVideoData(response.data.data);
      console.log();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
      <TextBox body={`Welcome, ${details.name}`} fontSize="xl" />
      <FlatList
        data={video}
        renderItem={({ index, item }) => {
          return <VideoCard props={item} key={index} />;
        }}
      />
    </View>
  );
};

export default Index;
