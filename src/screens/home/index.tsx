import { FlatList, RefreshControl, StatusBar, useWindowDimensions, View, ViewToken } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { TextBox } from "../../components";
import { Api } from "../../utils";
import { VideoDetails } from "../../types";
import Video from "react-native-video";

const Index: React.FC = () => {
  const { height } = useWindowDimensions();
  const [video, setVideoData] = useState<VideoDetails[]>([]);
  const [isRefresh, setRefreshing] = useState<boolean>(false);
  const [visibleVideoIndex, setVisibleVideoIndex] = useState<number | null>(null);
  const flatListRef = useRef(null);

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

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      setVisibleVideoIndex(viewableItems[0].index);
    } else {
      setVisibleVideoIndex(null);
    }
  }).current;

  const renderVideoItem = ({ item, index }: { item: VideoDetails; index: number }) => {
    return (
      <View>
        <Video
          playInBackground={false}
          repeat={true}
          source={{
            uri: `http://10.0.2.2:4000/video/${item.id}/play`
          }}
          style={{
            height: height - 70
          }}
          controls={false}
          resizeMode="cover"
          paused={index !== visibleVideoIndex}
        />
        <View style={{ position: "absolute", bottom: 30, marginLeft: 10 }}>
          <TextBox body={item.title} fontSize="xxl" fontWeight="bold" />
          <TextBox body={item.summary.length > 30 ? item.summary.slice(0, 30) : item.summary} fontSize="med" />
        </View>
      </View>
    );
  };

  return (
    <View style={{ marginTop: StatusBar.currentHeight, flex: 1 }}>
      {/* <View style={{ marginVertical: 10, flexDirection: "row", justifyContent: "space-between" }}>
        <TextBox
          body={`Welcome, ${details.name.length > 7 ? details.name.slice(0, 7) + "..." : details.name}`}
          fontSize="l"
        />
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          {details.pfpBase64.length > 0 ? (
            <Image source={{ uri: details.pfpBase64, height: 30, width: 30 }} style={{ borderRadius: 15 }} />
          ) : (
            <UserCircleIcon color={colors.notification} strokeWidth={2} size={30} />
          )}
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
      /> */}
      <FlatList
        ref={flatListRef}
        onViewableItemsChanged={onViewableItemsChanged}
        refreshing={isRefresh}
        refreshControl={<RefreshControl refreshing={isRefresh} onRefresh={resp} />}
        data={video}
        style={{ flex: 1 }}
        snapToAlignment="start"
        snapToInterval={height - 70}
        bounces={false}
        alwaysBounceVertical={false}
        bouncesZoom={false}
        renderItem={renderVideoItem}
        disableIntervalMomentum={true}
      />
    </View>
  );
};

export default Index;
