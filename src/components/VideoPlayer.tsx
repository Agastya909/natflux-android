import { useWindowDimensions, View, StatusBar } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Video, { OnLoadData, OnProgressData } from "react-native-video";
import Orientation from "react-native-orientation-locker";
const VideoPlayer: React.FC<{ videoId: string; size: number }> = ({ videoId, size }) => {
  const { height, width } = useWindowDimensions();
  const [requestRange, setRequestRange] = useState("0-");
  const videoRef = useRef(null);
  useEffect(() => {
    console.log(size);
    Orientation.lockToLandscape();
    return () => {
      Orientation.lockToPortrait();
    };
  }, []);

  return (
    <View>
      <Video
        source={{
          uri: `http://10.0.2.2:4000/video/${videoId}/play`
        }}
        style={{
          width: width,
          height: height
        }}
        controls={true}
        resizeMode="cover"
        fullscreen={true}
        onLoad={() => {}}
        fullscreenAutorotate={true}
        ref={videoRef}
        bufferConfig={{
          maxBufferMs: 50000,
          minBufferMs: 15000,
          bufferForPlaybackMs: 20000,
          bufferForPlaybackAfterRebufferMs: 10000
        }}
        onProgress={() => {}}
      />
    </View>
  );
};

export default VideoPlayer;
