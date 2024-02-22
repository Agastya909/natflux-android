import React from "react";
import { Pressable } from "react-native";
import { TextBox } from "./index";
import { useTheme } from "@react-navigation/native";

type Prop = {
  buttonText: string;
  textSize?: "xxs" | "xs" | "s" | "reg" | "med" | "l" | "xl" | "xxl" | "h1" | "h2" | "h3";
  backgroundColor?: string;
  borderRadius?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  fontWeight?: "extra-light" | "light" | "regular" | "medium" | "semibold" | "bold";
  textColor?: string;
  disabled?: boolean;
  onPress: () => void;
};

const Button: React.FC<Prop> = props => {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={props.onPress}
      disabled={props.disabled || false}
      style={{
        backgroundColor: props.backgroundColor || colors.primary,
        borderRadius: props.borderRadius || 10,
        marginHorizontal: props.marginHorizontal || 0,
        marginVertical: props.marginVertical || 0,
        paddingHorizontal: props.paddingHorizontal || 0,
        paddingVertical: props.paddingVertical || 0
      }}>
      <TextBox
        body={props.buttonText}
        textAlign="center"
        fontWeight={props.fontWeight}
        fontSize={props.textSize || "l"}
        color={props.textColor || "#FFFFFF"}
      />
    </Pressable>
  );
};

export default Button;
