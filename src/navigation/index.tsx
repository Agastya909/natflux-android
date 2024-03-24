import { NavigationContainer } from "@react-navigation/native";
import { View, Text, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import AuthStack from "./AuthStack";
import MainStack from "./BottomTabStack";
import { Api, COLORS } from "../utils";
import { useIsLoggedIn, useUserStore } from "../zustand";

const RootNavigator: React.FC = () => {
  const [isLoading, setLoading] = useState(true);
  const { isLoggedIn, setLogin } = useIsLoggedIn();
  const { setDetails } = useUserStore();
  useEffect(() => {
    verifyJWT();
  }, []);
  const verifyJWT = async () => {
    try {
      const response = await Api.Auth.verifyJWT();
      const name = response.data.data.name;
      const email = response.data.data.email;
      setDetails(name, email);
      setLogin();
    } catch (error: any) {
      console.log("error auth index");
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
      <NavigationContainer theme={COLORS.darkTheme}>
        {isLoggedIn === false ? <AuthStack /> : <MainStack />}
      </NavigationContainer>
    </>
  );
};

export default RootNavigator;
