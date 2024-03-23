import { View } from "react-native";
import React, { useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Button, TextBox } from "../../components";
import InputBox from "../../components/TextInput";
import { StackNavigatorType } from "../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Icon from "react-native-heroicons/outline";
import { Api, MMKV } from "../../utils";

const Index: React.FC = () => {
  const Navigation = useNavigation<NativeStackNavigationProp<StackNavigatorType>>();
  const { colors } = useTheme();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleEmail = (text: string) => setEmail(text);
  const handlePassword = (text: string) => setPassword(text);
  const handleName = (text: string) => setName(text);
  const handleLogin = async () => {
    try {
      const res = await Api.Auth.signup({ name, email, password });
      console.log(res);
      MMKV.storeKeyValue("jwt", res.data.token);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  return (
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
      <Icon.ArrowLeftIcon
        size={20}
        color={colors.text}
        style={{ marginTop: 10 }}
        strokeWidth={3}
        onPress={() => Navigation.goBack()}
      />
      <View style={{ flex: 1 }} />
      <View style={{ flex: 1 }}>
        <View style={{ marginVertical: 10 }}>
          <TextBox body={"Create your account now."} fontSize="xl" textAlign="left" fontWeight="bold" />
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ marginVertical: 5 }}>
            <InputBox handleChange={handleName} placeholder="Name" value={name} keyboardType="default" maxLength={64} />
          </View>
          <View style={{ marginVertical: 5 }}>
            <InputBox
              handleChange={handleEmail}
              placeholder="Email"
              value={email}
              keyboardType="email-address"
              maxLength={64}
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <InputBox handleChange={handlePassword} placeholder="Password" value={password} secureTextEntry={true} />
          </View>
          <Button
            buttonText="Sign up"
            onPress={handleLogin}
            fontWeight="semibold"
            paddingVertical={5}
            marginVertical={5}
          />
        </View>
      </View>
      <View style={{ flex: 1 }} />
    </View>
  );
};

export default Index;
