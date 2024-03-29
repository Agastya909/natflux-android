import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, ProfileScreen, SearchScreen, VideoScreen } from "../screens/index";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackNavigatorType } from "../types";
import * as OutlineIcon from "react-native-heroicons/outline";
import { useTheme } from "@react-navigation/native";

const Tabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator<StackNavigatorType>();

const TabsNavigator: React.FC = () => {
  const { colors } = useTheme();
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { borderColor: colors.text },
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => {
          const routeName = route.name;
          if (routeName === "Home") {
            return (
              <OutlineIcon.HomeIcon
                color={focused ? colors.primary : colors.text}
                strokeWidth={focused ? 2 : 1}
                size={28}
              />
            );
          }
          if (routeName === "Search") {
            return (
              <OutlineIcon.MagnifyingGlassIcon
                color={focused ? colors.primary : colors.text}
                strokeWidth={focused ? 2 : 1}
                size={28}
              />
            );
          }
          if (routeName === "Profile") {
            return (
              <OutlineIcon.UserCircleIcon
                color={focused ? colors.primary : colors.text}
                strokeWidth={focused ? 2 : 1}
                size={28}
              />
            );
          }
        }
      })}>
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
      <Stack.Screen name="Player" component={VideoScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
