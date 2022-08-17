import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BookListScreen } from "./BookList";
import { BookDetails } from "./BookDetailsScreen";
import { Routes } from "./Routes";
import { Strings } from "./Strings";
import { Colors, Fonts } from "./GraphicDesign";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import useFonts from "./hooks/useFonts";
import { Feather } from "@expo/vector-icons";
import { SearchScreen } from "./SearchScreen";
import { fetchBestSellers } from "./api.js";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BookListNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.BookListScreen}
      screenOptions={{
        headerStyle: { backgroundColor: Colors.bleuDeFrance },
        headerTintColor: Colors.white,
      }}
    >
      <Stack.Screen
        name={Routes.BookListScreen}
        component={BookListScreen}
        options={{
          title: Strings.homeScreenTitle,
        }}
      />
      <Stack.Screen
        name={Routes.BookDetailsScreen}
        component={BookDetails}
        options={({ route }) => ({
          title: route.params?.title || Strings.blankBookTitle,
        })}
      />
    </Stack.Navigator>
  );
};

const SearchScreenNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.SearchScreen}
      screenOptions={{
        headerStyle: { backgroundColor: Colors.bleuDeFrance },
        headerTintColor: Colors.white,
      }}
    >
      <Stack.Screen
        name={Routes.SearchScreen}
        component={SearchScreen}
        options={{
          title: Strings.searchScreenTitle,
        }}
      />
      <Stack.Screen
        name={Routes.BookDetailsScreen}
        component={BookDetails}
        options={({ route }) => ({
          title: route.params?.title || Strings.blankBookTitle,
        })}
      />
    </Stack.Navigator>
  );
};

export const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Booklist") {
          iconName = focused ? "book-open" : "book";
        } else if (route.name === "Search") {
          iconName = "search";
        }

        // You can return any component that you like here!
        return <Feather name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: Colors.bleuDeFrance,
      tabBarInactiveTintColor: Colors.grey,
    })}
  >
    <Tab.Screen name="Booklist" component={BookListNavigator} />
    <Tab.Screen name="Search" component={SearchScreenNavigator} />
  </Tab.Navigator>
);

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await useFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <AppNavigator />
    </NavigationContainer>
  );
}
