import { Ionicons, Feather } from "@expo/vector-icons";
import { CardStyleInterpolators } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Colors } from "./GraphicDesign";

export const SearchBar = ({ style, onTextChange }) => {
  const [input, setInput] = React.useState("");


  useEffect(() => {
    onTextChange && onTextChange(input);
  }, [input]);

  return (
    <View style={[styles.searchBar, style]}>
      <Feather
        name="search"
        size={18}
        color={Colors.bleuDeFrance}
        style={styles.searchMagnifierIcon}
      />
      <TextInput
        style={styles.searchInput}
        onChangeText={setInput}
        value={input}
        placeholder="Search your favourite book..."
        selectionColor={Colors.bleuDeFrance}
      />
      {!!input && (
        <TouchableOpacity onPress={() => setInput("")}>
          <Feather name="x" size={18} color={Colors.bleuDeFrance} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    height: 60,
    borderRadius: 30,
    shadowColor: Colors.ceruleanBlue,
    shadowOffset: { height: 5, width: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.3,
    overflow: "visible",
    elevation: 5,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    marginHorizontal: 10,
  },
});
