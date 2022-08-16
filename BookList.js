import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  SectionList,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { getBestSellers } from "./api";
import { Routes } from "./Routes";
import { BookItem } from "./BookItem";
import { Colors } from "./GraphicDesign";

export const BookListScreen = () => {
  const bestSellers = getBestSellers();
  const nav = useNavigation();
  const onPress = (title) => {
    nav.navigate(Routes.BookDetailsScreen, {
      title,
    });
  };

  const renderItem = ({ item }) => {
    return (
      <BookItem
        onPress={onPress}
        title={item.title}
        author={item.author}
        image={item.book_image}
      />
    );
  };
  return (
    <SafeAreaView>
      <SectionList
        sections={bestSellers}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.listHeaderContainer}>
            <Text style={styles.listHeaderText}>{title}</Text>
          </View>
        )}
        stickySectionHeadersEnabled={false}
      />
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  listHeaderText: {
    fontSize: 18,
    color: Colors.white,
    fontWeight: "bold",
    textAlign: "justify",
  },
  listHeaderContainer: {
    backgroundColor: Colors.bleuDeFrance,
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
    shadowColor: Colors.ceruleanBlue,
    shadowOffset: { height: 5, width: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.4,
  },
});
