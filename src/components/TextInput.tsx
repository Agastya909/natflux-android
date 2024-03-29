import { useTheme } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { Animated, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import TextBox from "./TextBox";
import {
  HeartIcon,
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
  MagnifyingGlassMinusIcon
} from "react-native-heroicons/outline";

type Props = {
  placeholder: string;
  value: string;
  handleChange: (text: string) => void;
  handleSubmit?: () => Promise<void>;
  textColor?: string;
  placeholderColor?: string;
  textSize?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  marginVertical?: number;
  marginHorizontal?: number;
  borderRadius?: number;
  backgroundColor?: string;
  letterSpacing?: number;
  maxLength?: number;
  textAlign?: "auto" | "left" | "right" | "center" | "justify";
  secureTextEntry?: boolean;
  searchIcon?: boolean;
  iconClick?: () => void;
  keyboardType?:
    | "default"
    | "numeric"
    | "email-address"
    | "ascii-capable"
    | "numbers-and-punctuation"
    | "url"
    | "number-pad"
    | "phone-pad"
    | "name-phone-pad"
    | "decimal-pad"
    | "twitter"
    | "web-search"
    | "visible-password";
};

const InputBox: React.FC<Props> = ({
  placeholder,
  placeholderColor,
  textSize,
  value,
  textColor,
  paddingVertical,
  paddingHorizontal,
  backgroundColor,
  borderRadius,
  marginHorizontal,
  marginVertical,
  letterSpacing,
  keyboardType,
  textAlign,
  maxLength,
  secureTextEntry,
  searchIcon,
  handleSubmit,
  handleChange,
  iconClick
}) => {
  const { colors } = useTheme();
  const [isSelected, setSelected] = useState(false);
  const animValue = useRef(new Animated.Value(0)).current;

  const makeVisible = () => {
    setTimeout(() => {
      setSelected(true);
    }, 50);
    Animated.timing(animValue, {
      toValue: 1,
      useNativeDriver: true,
      duration: 200
    }).start();
  };

  const makeInVisible = () => {
    Animated.timing(animValue, {
      toValue: 0,
      useNativeDriver: true,
      duration: 200
    }).start(() => setSelected(false));
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        switch (isSelected) {
          case true:
            makeInVisible();
            break;
          case false:
            makeVisible();
            break;
        }
      }}>
      <View
        style={{
          backgroundColor: colors.background,
          borderColor: colors.card,
          borderWidth: 2,
          paddingVertical: 8,
          paddingHorizontal: 10,
          borderRadius: 10
        }}>
        <TextBox
          body={placeholder}
          fontWeight={isSelected ? "regular" : "semibold"}
          fontSize={isSelected ? "reg" : "med"}
          color={value.length !== 0 ? `${colors.text}70` : colors.text}
        />
        {isSelected === true ? (
          <Animated.View style={{ opacity: animValue, flexDirection: "row", alignItems: "center" }}>
            <TextInput
              onFocus={() => setSelected(true)}
              onBlur={() => setSelected(false)}
              placeholder={placeholder}
              placeholderTextColor={placeholderColor || "#909090"}
              value={value}
              onChangeText={handleChange}
              onSubmitEditing={handleSubmit}
              maxLength={maxLength || 10}
              keyboardType={keyboardType || "default"}
              secureTextEntry={secureTextEntry || false}
              style={{
                flex: 1,
                color: textColor || colors.text,
                fontSize: textSize || 16,
                fontFamily: "Poppins-Medium",
                backgroundColor: backgroundColor || colors.card,
                paddingVertical: paddingVertical || 10,
                paddingHorizontal: paddingHorizontal || 10,
                marginVertical: marginVertical || 5,
                marginHorizontal: marginHorizontal || 0,
                borderRadius: borderRadius || 10,
                letterSpacing: letterSpacing || 0,
                textAlign: textAlign || "left"
              }}
            />
            {searchIcon && iconClick ? (
              <TouchableOpacity onPress={iconClick}>
                <MagnifyingGlassIcon color={colors.notification} size={26} strokeWidth={2} style={{ marginLeft: 10 }} />
              </TouchableOpacity>
            ) : null}
          </Animated.View>
        ) : value.length !== 0 ? (
          <TextBox body={!secureTextEntry ? value : "•".repeat(value.length)} />
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default InputBox;
