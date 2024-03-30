import { View, FlatList, ActivityIndicator, StyleSheet, ToastAndroid } from "react-native";
import React, { useState } from "react";
import { TextInput } from "../../components";
import VideoCard from "../home/VideoCard";
import { Api } from "../../utils";
import { VideoDetails } from "../../types";
import { useTheme } from "@react-navigation/native";

const Index: React.FC = () => {
  const { colors } = useTheme();
  const [searchTerm, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<VideoDetails[]>([]);
  const [limitOffset, setLimitOffset] = useState<{ limit: number; offset: number }>({
    limit: 10,
    offset: 0
  });
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (searchTerm.length === 0) return ToastAndroid.show("Cannot search empty term", ToastAndroid.SHORT);
      const response = await Api.Video.searchVideo({
        searchTerm: searchTerm,
        limit: limitOffset.limit,
        offset: limitOffset.offset
      });
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
      <TextInput
        handleChange={e => setSearch(e)}
        iconClick={handleSubmit}
        searchIcon={true}
        placeholder="Search"
        value={searchTerm}
        handleSubmit={handleSubmit}
      />
      {data.length > 0 ? (
        <View
          style={{ borderBottomColor: colors.text, borderBottomWidth: StyleSheet.hairlineWidth, marginVertical: 10 }}
        />
      ) : null}
      {loading ?? <ActivityIndicator size={"large"} color={colors.primary} style={{ marginVertical: 10 }} />}
      <FlatList
        data={data}
        numColumns={2}
        renderItem={({ index, item }) => {
          return <VideoCard props={item} key={index} />;
        }}
      />
    </View>
  );
};

export default Index;
