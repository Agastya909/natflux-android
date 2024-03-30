import { useWindowDimensions, View, StatusBar } from "react-native";
import React, { useEffect, useRef } from "react";
import Video, { OnLoadData, OnProgressData } from "react-native-video";
import Orientation from "react-native-orientation-locker";

const VideoPlayer: React.FC<{ videoId: string; size: number }> = ({ videoId, size }) => {
  const { height, width } = useWindowDimensions();
  // const rangeRef = useRef<string | null>(null);
  // const videoRef = useRef(null);
  useEffect(() => {
    Orientation.lockToLandscape();
    return () => {
      Orientation.lockToPortrait();
    };
  }, []);
  /**
    TODO : FIX RANGE ISSUE FOR REQUEST HEADER (preferred way)
    OR
    TODO : FIX CONTROLS
 */

  // const handlePlayback = (e: OnProgressData) => {
  //   const { currentTime, playableDuration } = e;
  //   const percentagePlayed = (currentTime / playableDuration) * 100;
  //   const newSize = Math.round((size * percentagePlayed) / 100);
  //   if (!isNaN(newSize)) rangeRef.current = `${newSize}-`;
  //   console.log("on playback ", rangeRef.current);
  // };

  // const onLoad = (e: OnLoadData) => {
  //   const { currentTime, duration } = e;
  //   const percentPlayed = (currentTime / duration) * 100;
  //   const newSize = Math.round((size * percentPlayed) / 100);
  //   if (!isNaN(newSize)) rangeRef.current = `${newSize}-`;
  //   console.log("on load ", rangeRef.current);
  // };

  return (
    <View>
      <Video
        source={{
          uri: `http://10.0.2.2:4000/video/${videoId}/play`,
        }}
        style={{
         
          height: height,
          width: width
        }}
        controls={true}
        resizeMode="cover"

        fullscreen={true}
        fullscreenAutorotate={true}
        bufferConfig={{
          maxBufferMs: 50000,
          minBufferMs: 15000,
          bufferForPlaybackMs: 20000,
          bufferForPlaybackAfterRebufferMs: 10000
        }}
      />
    </View>
  );
};

export default VideoPlayer;
