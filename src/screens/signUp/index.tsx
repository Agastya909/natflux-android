import { View, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Button, TextBox, Toast } from "../../components";
import InputBox from "../../components/TextInput";
import { StackNavigatorType } from "../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Icon from "react-native-heroicons/outline";
import { Api, MMKV } from "../../utils";
import { useIsLoggedIn, useUserStore } from "../../zustand";

const Index: React.FC = () => {
  const Navigation = useNavigation<NativeStackNavigationProp<StackNavigatorType>>();
  const { colors } = useTheme();
  const { setLogin } = useIsLoggedIn();
  const { setDetails } = useUserStore();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signUpClicked, setSignUpClicked] = useState<boolean>(false);

  const handleEmail = (text: string) => setEmail(text);
  const handlePassword = (text: string) => setPassword(text);
  const handleName = (text: string) => setName(text);

  const handleLogin = async () => {
    try {
      setSignUpClicked(true);
      const res = await Api.Auth.signup({ name, email, password });
      MMKV.storeKeyValue("jwt", res.data.token);
      const userName = res.data.data.name;
      const userEmail = res.data.data.email;
      setDetails(userName, userEmail);
      setLogin();
    } catch (error) {
      console.log("sign up error", error);
      Toast("Could not create your account");
    } finally {
      setSignUpClicked(false);
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
      <View style={{ flex: 1 / 2 }} />
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
          <View style={{ marginVertical: 5 }}>
            <InputBox handleChange={handlePassword} placeholder="Password" value={password} secureTextEntry={true} />
          </View>
          <Button
            buttonText="Sign up"
            onPress={handleLogin}
            fontWeight="semibold"
            paddingVertical={5}
            marginVertical={20}
            disabled={name.length > 2 && email.length > 5 && password.length > 3 ? false : true}
            backgroundColor={
              name.length > 2 && email.length > 5 && password.length > 3 ? colors.primary : `${colors.primary}80`
            }
          />
          {signUpClicked ? <ActivityIndicator size={"large"} color={colors.notification} /> : null}
          {name.length < 3 && name.length !== 0 ? (
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Icon.ExclamationCircleIcon color={colors.border} style={{ marginRight: 10 }} />
              <TextBox body={"Name should be atleast 3 charaters long"} fontSize="s" />
            </View>
          ) : null}
          {email.length < 6 && email.length !== 0 ? (
            <View style={{ flexDirection: "row", marginVertical: 5 }}>
              <Icon.ExclamationCircleIcon color={colors.border} style={{ marginRight: 10 }} />
              <TextBox body={"Email should be atleast 6 charaters long"} fontSize="s" />
            </View>
          ) : null}
          {password.length < 4 && password.length !== 0 ? (
            <View style={{ flexDirection: "row" }}>
              <Icon.ExclamationCircleIcon color={colors.border} style={{ marginRight: 10 }} />
              <TextBox body={"password should be atleast 4 charaters long"} fontSize="s" />
            </View>
          ) : null}
        </View>
      </View>
      <View style={{ flex: 1 }} />
    </View>
  );
};

export default Index;
