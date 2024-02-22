import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, ProfileScreen, SearchScreen } from "../screens/index";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackNavigatorType } from "../types";

const Tabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator<StackNavigatorType>();

const TabsNavigator: React.FC = () => {
  return (
    <Tabs.Navigator screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="Search" component={SearchScreen} />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
    </Tabs.Navigator>
  );
};

const MainStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabsNavigator} />
      {/* other screens will be added here */}
    </Stack.Navigator>
  );
};

export default MainStack;
