import { ActivityIndicator, ToastAndroid, View } from "react-native";
import React, { useState } from "react";
import { Button, TextBox, TextInput } from "../../components";
import { useUserStore } from "../../zustand";
import DocumentPicker from "react-native-document-picker";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Api } from "../../utils";
import axios from "axios";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorType } from "../../types";

type VideoProp = {
  title: string;
  summary: string;
  genre: string;
  release_date: string;
  uploader_id: string;
};

type UploadFileProp = {
  name: string;
  uri: string;
  type: string;
};

const Index: React.FC = () => {
  const { colors } = useTheme();
  const { details } = useUserStore();
  const [isUploading, setUploading] = useState<boolean>(false);
  const [videoData, setVideoData] = useState<VideoProp>({
    title: "",
    genre: "",
    release_date: "",
    summary: "",
    uploader_id: details.id
  });
  const [uploadFileData, setUploadFileData] = useState<UploadFileProp>({ name: "", uri: "", type: "" });
  const navigation = useNavigation<NativeStackNavigationProp<StackNavigatorType>>();

  const handleTitleChange = (text: string) => {
    setVideoData({ ...videoData, title: text });
  };

  const handleSummaryChange = (text: string) => {
    setVideoData({ ...videoData, summary: text });
  };

  const handleGenreChange = (text: string) => {
    setVideoData({ ...videoData, genre: text });
  };

  const handleReleaseDateChange = (text: string) => {
    setVideoData({ ...videoData, release_date: text });
  };

  const selectVideo = async () => {
    try {
      const res = await DocumentPicker.pick({
        allowMultiSelection: false,
        presentationStyle: "fullScreen",
        mode: "import",
        type: [DocumentPicker.types.video]
      });
      if (res[0].name && res[0].type) {
        setUploadFileData({
          name: res[0].name,
          type: res[0].type,
          uri: res[0].uri
        });
      }
    } catch (error) {
      console.log("select video error");
      console.log(error);
    }
  };

  const uploadVideo = async () => {
    if (
      videoData.genre.length === 0 ||
      videoData.title.length === 0 ||
      videoData.release_date.length === 0 ||
      videoData.summary.length === 0 ||
      uploadFileData.name.length === 0
    ) {
      return ToastAndroid.show("Fill all the fields", ToastAndroid.SHORT);
    }
    setUploading(true);
    const datas = new FormData();
    datas.append("file", uploadFileData);
    datas.append("type", "video/mp4");
    datas.append("title", videoData.title);
    datas.append("summary", videoData.summary);
    datas.append("genre", videoData.genre);
    datas.append("release_date", videoData.release_date);
    datas.append("uploader_id", videoData.uploader_id);
    try {
      // add progress indicator
      await Api.Video.uploadVideo(datas);
      ToastAndroid.show("Video Uploaded successfully", ToastAndroid.SHORT);
      navigation.navigate("Tabs", { screen: "Home" });
    } catch (error) {
      console.log("error in upload");
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={{ marginTop: 20, paddingHorizontal: 10, justifyContent: "space-between", flex: 1 }}>
      <View>
        <TextBox body={"Add a new Video"} fontSize="l" fontWeight="semibold" />
        <View style={{ marginVertical: 5 }}>
          <TextInput handleChange={handleTitleChange} placeholder="Title" value={videoData.title} maxLength={64} />
        </View>
        <View style={{ marginVertical: 5 }}>
          <TextInput
            handleChange={handleSummaryChange}
            placeholder="Summary"
            value={videoData.summary}
            maxLength={256}
          />
        </View>
        <View style={{ marginVertical: 5 }}>
          <TextInput handleChange={handleGenreChange} placeholder="Genre" value={videoData.genre} maxLength={128} />
        </View>
        <View style={{ marginVertical: 5 }}>
          <TextInput
            handleChange={handleReleaseDateChange}
            placeholder="Release Year"
            value={videoData.release_date}
            maxLength={4}
          />
        </View>
        <Button
          buttonText={uploadFileData.name.length === 0 ? "Select Video" : "Choose another"}
          backgroundColor={uploadFileData.name.length > 0 ? "#67ad45" : colors.card}
          onPress={selectVideo}
          marginVertical={5}
          paddingVertical={5}
          fontWeight="medium"
        />
        {uploadFileData.name.length > 0 && uploadFileData.uri.length > 0 ? (
          <View style={{ marginTop: 5 }}>
            <TextBox body={uploadFileData.name} />
          </View>
        ) : null}
      </View>
      <View>
        {isUploading ? <ActivityIndicator size={"large"} color={colors.notification} /> : null}
        <Button
          disabled={isUploading ? true : false}
          buttonText="Start Upload"
          onPress={uploadVideo}
          marginVertical={20}
          paddingVertical={5}
          fontWeight="semibold"
          backgroundColor={isUploading ? `${colors.primary}80` : colors.primary}
        />
      </View>
    </View>
  );
};

export default Index;
