import React, { useState } from "react";
import { Text, View, StyleSheet, FlatList, Image } from "react-native";
import { getSearchedBooks } from "./api";
import { BookItem } from "./BookItem";
import { Colors } from "./GraphicDesign";
import { SearchBar } from "./SearchBar";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "./Routes";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const SearchScreen = () => {
  const navigation = useNavigation();
  const [input, setInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const onTextChange = (input) => {
    setInput(input);

    if (!input) {
      setFilteredData([]);
      return;
    }
    setFilteredData(getSearchedBooks(input));
  };
  const onPress = (title) => {
    navigation.navigate(Routes.BookDetailsScreen, { title });
  };

  return (
    <View style={styles.container}>
      <SearchBar style={styles.searchBar} onTextChange={onTextChange} />
      {!!input ? (
        <FlatList
          contentContainerStyle={{ flex: 1 }}
          data={filteredData}
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
});
