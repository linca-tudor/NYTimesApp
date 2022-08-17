import React, { useEffect, useState, useCallback } from "react";
import {
  Text,
  View,
  SafeAreaView,
  SectionList,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getBestSellers } from "./api";
import { Routes } from "./Routes";
import { BookItem } from "./BookItem";
import { Colors } from "./GraphicDesign";

export const BookListScreen = () => {
  const [bestSellers, setBestSellers] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const nav = useNavigation();

  const getFetchedBestSellers = async () => {
    const bookFetchResult = await getBestSellers();
    setBestSellers(bookFetchResult);
  };

  useEffect(() => {
    getFetchedBestSellers();
  }, []);

  const onPress = (title) => {
    nav.navigate(Routes.BookDetailsScreen, {
      title,
    });
  };

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

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
      {bestSellers ? (
        <SectionList
          sections={bestSellers}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.listHeaderContainer}>
              <Text style={styles.listHeaderText}>{title}</Text>
            </View>
          )}
          stickySectionHeadersEnabled={false}
        />
      ) : (
        <Text>loader</Text>
      )}
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
