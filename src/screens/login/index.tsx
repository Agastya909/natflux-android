import { TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Button, Divider, TextBox, TextInput } from "../../components";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Api, MMKV } from "../../utils/index";
import { StackNavigatorType } from "../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const Index: React.FC = () => {
  const Navigation = useNavigation<NativeStackNavigationProp<StackNavigatorType>>();
  const { colors } = useTheme();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleEmail = (text: string) => {
    setEmail(text);
  };
  const handlePassword = (text: string) => {
    setPassword(text);
  };
  const handleLogin = async () => {
    try {
      const res = await Api.Auth.login({ email, password });
      const response = res.data;
      console.log(response.data);
      console.log(response.token);
      MMKV.storeKeyValue("jwt", response.token);
    } catch (error) {
      console.log("login error", error);
    }
  };
  return (
    <View style={{ flex: 1, paddingHorizontal: 10, marginTop: 10, justifyContent: "center" }}>
      <View style={{ flex: 2, justifyContent: "center" }}>
        <TextBox body={"Natflux"} fontSize="h3" textAlign="center" fontWeight="semibold" />
      </View>
      <View style={{ marginVertical: 5 }}>
        <TextInput
          value={email}
          handleChange={handleEmail}
          placeholder="Email"
          maxLength={64}
          keyboardType="email-address"
        />
      </View>
      <View style={{ marginVertical: 5 }}>
        <TextInput
          value={password}
          handleChange={handlePassword}
          placeholder="Password"
          maxLength={64}
          secureTextEntry={true}
        />
      </View>
      <Button buttonText="Login" onPress={handleLogin} fontWeight="semibold" paddingVertical={5} marginVertical={5} />
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Divider text="OR" />
      </View>
      <View style={{ marginVertical: 20 }}>
        <TextBox body={"New to Natflux ?"} fontSize="reg" textAlign="center" />
        <TouchableOpacity onPress={() => Navigation.navigate("Signup")}>
          <TextBox body={"Sign up"} fontSize="reg" textAlign="center" color={colors.notification} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Index;
