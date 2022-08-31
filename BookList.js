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
import LottieView from "lottie-react-native";

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
    getFetchedBestSellers();
    wait(1000).then(() => setRefreshing(false));
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
    <SafeAreaView style={styles.container}>
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
        <LottieView
          autoPlay
          loop
          style={styles.loadingAnimation}
          source={require("./assets/animations/loading-book.json")}
        />
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingPlaceholder: {
    flex: 1,
    alignSelf: "center",
  },
  loadingAnimation: {
    width: 200,
    height: 200,
  },
});
