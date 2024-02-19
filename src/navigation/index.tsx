import { NavigationContainer } from "@react-navigation/native";
import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import AuthStack from "./AuthStack";
import MainStack from "./BottomTabStack";

const RootNavigator: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(true);

  return isLoading ? (
    <View>
      <Text>index</Text>
    </View>
  ) : (
    <NavigationContainer>{isLoggedIn === false ? <AuthStack /> : <MainStack />}</NavigationContainer>
  );
};

export default RootNavigator;
