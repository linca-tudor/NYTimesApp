import React, { useState } from "react";
import { View, StyleSheet, FlatList, Image } from "react-native";
import { getSearchedBooks } from "./api";
import { BookItem } from "./BookItem";
import { Colors } from "./GraphicDesign";
import { SearchBar } from "./SearchBar";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "./Routes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { debounce } from "lodash";

export const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [input, setInput] = useState("");

  const onTextChange = (input) => {
    setInput(input);

    if (!input) {
      setSearchedBooks([]);
      return;
    }
    getFetchedSearchedBooks(input);
  };

  const getFetchedSearchedBooks = async (input) => {
    const bookFetchResult = await getSearchedBooks(input);
    if (bookFetchResult != 429) setSearchedBooks(bookFetchResult);
    else {
      setSearchedBooks([]);
      console.log('The server request quota is exceeded. Please wait 6s before searching again')
    }
  };

  const onPress = (title) => {
    navigation.navigate(Routes.BookDetailsScreen, { title });
  };

  if (!searchedBooks) {
    return (
      <View style={styles.loadingPlaceholder}>
        <LottieView
          autoPlay
          loop
          style={styles.loadingAnimation}
          source={require("./assets/animations/loading-book.json")}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar
        style={styles.searchBar}
        onTextChange={debounce(onTextChange, 250)}
      />
      {!!input ? (
        <FlatList
          contentContainerStyle={{ flex: searchedBooks.length ? undefined : 1 }}
          data={searchedBooks}
          ListEmptyComponent={
            <View style={styles.searchPlaceholer}>
              <MaterialCommunityIcons
                name="file-question-outline"
                size={100}
                color={Colors.black}
              />
            </View>
          }
          renderItem={({ item }) => (
            <BookItem
              onPress={onPress}
              title={item.title}
              author={item.author}
              image={item.book_image}
            />
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      ) : (
        <View style={styles.searchPlaceholer}>
          <MaterialCommunityIcons
            name="book-search-outline"
            size={100}
            color={Colors.black}
          />
        </View>
      )}
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteSmoke,
  },
  searchBar: {
    margin: 15,
  },
  searchPlaceholer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.2,
  },
  loadingPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingAnimation: {
    width: 200,
    height: 200,
    color: Colors.bleuDeFrance,
  },
});
