import { View, Text, PixelRatio } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

type props = {
  body: string | number;
  color?: string;
  fontSize?: "xxs" | "xs" | "s" | "reg" | "med" | "l" | "xl" | "xxl" | "h1" | "h2" | "h3";
  textAlign?: "auto" | "left" | "right" | "center" | "justify";
  fontWeight?: "extra-light" | "light" | "regular" | "medium" | "semibold" | "bold";
};

const normalizeFontSize = (size: number) => {
  const pxRatio = PixelRatio.get();
  if (pxRatio >= 3) {
    return size;
  } else if (pxRatio >= 2) {
    return size - 2;
  } else {
    return size - 4;
  }
};

const fontSize = (size: props["fontSize"]) => {
  switch (size) {
    case "xxs":
      return normalizeFontSize(10);
    case "xs":
      return normalizeFontSize(12);
    case "s":
      return normalizeFontSize(14);
    case "reg":
      return normalizeFontSize(16);
    case "med":
      return normalizeFontSize(18);
    case "l":
      return normalizeFontSize(20);
    case "xl":
      return normalizeFontSize(22);
    case "xxl":
      return normalizeFontSize(24);
    case "h1":
      return normalizeFontSize(60);
    case "h2":
      return normalizeFontSize(56);
    case "h3":
      return normalizeFontSize(52);
    default:
      return normalizeFontSize(16);
  }
};

const fontFamily = (weight: props["fontWeight"]) => {
  switch (weight) {
    case "extra-light":
      return "Poppins-ExtraLight";
    case "light":
      return "Poppins-Light";
    case "regular":
      return "Poppins-Regular";
    case "medium":
      return "Poppins-Medium";
    case "semibold":
      return "Poppins-SemiBold";
    case "bold":
      return "Poppins-Bold";
  }
};

const TextBox: React.FC<props> = item => {
  const { colors } = useTheme();
  return (
    <View>
      <Text
        style={{
          color: item.color || colors.text,
          fontSize: fontSize(item.fontSize),
          fontFamily: fontFamily(item.fontWeight) || "Poppins-Regular",
          textAlign: item.textAlign || "left"
        }}>
        {item.body}
      </Text>
    </View>
  );
};

export default TextBox;
