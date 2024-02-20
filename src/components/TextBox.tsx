import { View, Text, PixelRatio } from "react-native";
import React from "react";

type props = {
  body: string | number;
  fontFamily?: string;
  color?: string;
  fontSize?: "xxs" | "xs" | "s" | "reg" | "med" | "l" | "xl" | "xxl";
  textAlign?: "auto" | "left" | "right" | "center" | "justify";
  alignSelf?: "center" | "auto" | "baseline" | "flex-end" | "flex-start" | "stretch";
};

const normalizeFontSize = (size: number) => {
  const pxRatio = PixelRatio.get();
  if (pxRatio > 3) {
    return size;
  } else if (pxRatio <= 3 && pxRatio > 2.5) {
    return size - 2;
  } else if (pxRatio <= 2.5 && pxRatio > 2) {
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
    default:
      return normalizeFontSize(16);
  }
};

const TextBox: React.FC<props> = item => {
  return (
    <View>
      <Text
        style={{
          color: item.color,
          fontSize: fontSize(item.fontSize),
          fontFamily: item.fontFamily || "Poppins-Regular",
          textAlign: item.textAlign,
          alignSelf: item.alignSelf
        }}>
        {item.body}
      </Text>
    </View>
  );
};

export default TextBox;
