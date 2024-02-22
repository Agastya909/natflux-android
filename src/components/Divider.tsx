import React from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { useTheme } from "@react-navigation/native";
import { TextBox } from "./index";
const Divider: React.FC<{ text?: string }> = ({ text }) => {
  return (
    <View
      style={[
        {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          paddingVertical: 5
        }
      ]}>
      <View style={{ borderBottomWidth: 1, flex: 1, borderBottomColor: "#3D3D3D" }} />
      {text ? (
        <View style={{ marginHorizontal: 10 }}>
          <TextBox body={text} color={"#3D3D3D"} fontSize={"reg"} />
        </View>
      ) : null}
      <View style={{ borderBottomWidth: 1, flex: 1, borderBottomColor: "#3D3D3D" }} />
    </View>
  );
};

export default Divider;
