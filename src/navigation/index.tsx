import { NavigationContainer } from "@react-navigation/native";
import { View, Text, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import AuthStack from "./AuthStack";
import MainStack from "./BottomTabStack";
import { Api } from "../utils";

const RootNavigator: React.FC = () => {
  const [isLoading, setLoading] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    verifyJWT();
  }, []);
  const verifyJWT = async () => {
    try {
      const response = await Api.Auth.verifyJWT();
      console.log("response", response);
    } catch (error: any) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };
  return isLoading ? (
    <View>
      <Text>Loading data...</Text>
    </View>
  ) : (
    <>
      <StatusBar barStyle={"light-content"} backgroundColor={"#121212"} />
      <NavigationContainer>{isLoggedIn === false ? <AuthStack /> : <MainStack />}</NavigationContainer>
    </>
  );
};

export default RootNavigator;
