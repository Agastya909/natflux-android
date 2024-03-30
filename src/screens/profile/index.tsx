import { View, StatusBar, Image, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import DocumentPicker from "react-native-document-picker";
import { Button } from "../../components";
import { useUserStore } from "../../zustand";
import InputBox from "../../components/TextInput";
import { useNavigation, useTheme } from "@react-navigation/native";
import { ArrowLeftIcon, PencilSquareIcon, UserCircleIcon } from "react-native-heroicons/outline";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorType } from "../../types";
import { Api } from "../../utils";

type ProfileData = {
  id: string;
  name: string;
  email: string;
};

type ImageProp = {
  name: string | null;
  type: string | null;
  uri: string;
};

const Index: React.FC = () => {
  const { details, setDetails } = useUserStore();
  const { colors } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<StackNavigatorType>>();
  const [editName, setEditName] = useState<boolean>(false);
  const [imageData, setImageData] = useState<ImageProp>({
    name: "",
    type: "",
    uri: ""
  });
  const [imageBase64, setImgBase64] = useState<string>("");
  const [profileData, setProfileData] = useState<ProfileData>({
    id: details.id,
    name: details.name,
    email: details.email
  });

  useEffect(() => {
    if (details.pfpBase64.length > 0) setImgBase64(details.pfpBase64);
  }, []);

  const handleNameEdit = (name: string) => {
    setProfileData({ ...profileData, name });
  };

  const openImagePicker = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        allowMultiSelection: false,
        mode: "open",
        presentationStyle: "fullScreen",
        type: [DocumentPicker.types.images]
      });
      setImageData({
        name: profileData.id + res.name,
        type: res.type,
        uri: res.uri
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateName = async () => {
    try {
      if (details.name === profileData.name) {
        return ToastAndroid.show("New name cannot be same as old name", ToastAndroid.SHORT);
      }
      const resp = await Api.User.updateName({ name: profileData.name, id: profileData.id });
      setDetails(resp.data.data.name, profileData.email, profileData.id, details.pfpBase64);
      ToastAndroid.show("Name Updated", ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show("Could not update Name", ToastAndroid.SHORT);
    }
  };

  const uploadProfilePicture = async () => {
    try {
      const formData = new FormData();
      formData.append("pfp", imageData);
      formData.append("id", profileData.id);
      const res = await Api.User.uploadProfile(formData);
      setImgBase64(res.data.data.pfp_path);
      setDetails(details.name, details.email, details.id, res.data.data.pfp_path);
      ToastAndroid.show("Profile picture Uploaded successfully", ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show("Could not upload Profile Picture", ToastAndroid.SHORT);
      console.log(error);
    } finally {
      setImageData({ name: "", type: "", uri: "" });
    }
  };

  return (
    <View style={{ flex: 1, marginTop: StatusBar.currentHeight, paddingHorizontal: 10 }}>
      <ArrowLeftIcon
        color={colors.text}
        size={30}
        strokeWidth={2}
        style={{ position: "absolute", top: 0, left: 10 }}
        onPress={() => navigation.navigate("Tabs", { screen: "Home" })}
      />
      <View style={{ height: 100, width: 100, alignSelf: "center", marginVertical: 50 }}>
        {imageData.uri.length > 0 || imageBase64.length > 0 ? (
          <Image
            source={{
              uri: imageData.uri || imageBase64,
              height: 100,
              width: 100
            }}
            style={{ borderRadius: 50 }}
          />
        ) : (
          <UserCircleIcon color={colors.text} size={100} strokeWidth={0.5} />
        )}
        <PencilSquareIcon color={colors.text} onPress={openImagePicker} style={{ marginTop: 10 }} />
      </View>
      {imageData.uri.length > 0 ? (
        <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 20 }}>
          <Button
            buttonText={"Cancel"}
            paddingHorizontal={5}
            paddingVertical={5}
            marginHorizontal={5}
            fontWeight="semibold"
            textSize="reg"
            borderRadius={5}
            backgroundColor={colors.border}
            onPress={() => {
              setImageData({ name: "", type: "", uri: "" });
            }}
          />
          <Button
            buttonText={"Upload"}
            paddingHorizontal={5}
            paddingVertical={5}
            fontWeight="semibold"
            textSize="reg"
            borderRadius={5}
            backgroundColor={colors.notification}
            onPress={async () => await uploadProfilePicture()}
          />
        </View>
      ) : null}
      <View>
        <View style={{ marginVertical: 5, alignItems: "flex-end", justifyContent: "flex-end", flexDirection: "row" }}>
          {editName ? (
            <Button
              buttonText={"Cancel"}
              paddingHorizontal={5}
              paddingVertical={5}
              fontWeight="light"
              textSize="reg"
              borderRadius={5}
              backgroundColor={colors.border}
              onPress={() => {
                setEditName(false);
                setProfileData({ ...profileData, name: details.name });
              }}
            />
          ) : null}
          <Button
            buttonText={editName ? "Update Name" : "Edit name"}
            paddingHorizontal={5}
            marginHorizontal={5}
            paddingVertical={5}
            fontWeight="light"
            textSize="reg"
            borderRadius={5}
            backgroundColor={editName ? colors.notification : colors.card}
            onPress={async () => {
              switch (editName) {
                case true:
                  setEditName(false);
                  await updateName();
                  break;
                case false:
                  setEditName(true);
                  break;
              }
            }}
          />
        </View>
        <View style={{ marginVertical: 5 }}>
          <InputBox
            placeholder="Name"
            value={profileData.name}
            editable={editName}
            handleChange={handleNameEdit}
            maxLength={64}
          />
        </View>
        <View style={{ marginVertical: 5 }}>
          <InputBox placeholder="Email" value={profileData.email} editable={false} handleChange={() => {}} />
        </View>
      </View>
    </View>
  );
};

export default Index;
