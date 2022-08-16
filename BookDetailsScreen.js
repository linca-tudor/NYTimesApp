import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { getBookByName } from "./api";
import { Colors, Fonts } from "./GraphicDesign";
import { Strings } from "./Strings";
import { BuyLinks } from "./BookBuyLinks";

export const BookDetails = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const route = useRoute();
  const { title: name } = route.params;
  const onURLPress = (url) => {
    Linking.openURL(url);
  };

  const onDismiss = () => {
    setModalVisible(false);
  };

  const {
    author,
    publisher,
    title,
    description,
    primary_isbn10,
    primary_isbn13,
    price,
    book_image,
    rank,
    buy_links,
  } = getBookByName(name);

  return (
    <View style={styles.container}>
      <View style={styles.detailsCard}>
        <View style={styles.bookInfo}>
          <View style={styles.coverImageView}>
            <Image
              source={{ uri: book_image }}
              style={styles.coverImage}
              resizeMode="contain"
            />
          </View>
          <ScrollView style={{ height: 250 }}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.author}>{author}</Text>
            {description ? (
              <Text style={styles.description}>{description}</Text>
            ) : (
              <Text style={styles.description}>
                {Strings.noBookDescriptionMessage}
              </Text>
            )}
          </ScrollView>
        </View>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.buyBookButton}
        >
          <Text style={styles.buyBookText}>Purchase Book</Text>
        </TouchableOpacity>
      </View>
      <BuyLinks
        title={title}
        buy_links={buy_links}
        isVisible={modalVisible}
        onDismiss={onDismiss}
        onURLPress={onURLPress}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  detailsCard: {
    backgroundColor: Colors.white,
    height: "80%",
    justifyContent: "space-between",
    marginTop: 100,
    marginHorizontal: 25,
    marginBottom: 35,
    borderRadius: 15,
    shadowColor: Colors.ceruleanBlue,
    shadowOffset: { height: 5, width: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.3,
    overflow: "visible",
    elevation: 5,
  },
  author: {
    marginBottom: 15,
    fontFamily: Fonts.hoeflerRegular,
    color: Colors.vampireGrey,
    fontSize: 19,
    textAlign: "center",
  },
  description: {
    fontSize: 17,
    marginVertical: 5,
    fontFamily: Fonts.avenirMediumOblique,
    color: Colors.vampireGrey,
    textAlign: "center",
    marginHorizontal: 10,
  },
  title: {
    marginVertical: 5,
    fontFamily: Fonts.hoeflerRegular,
    color: Colors.vampireGrey,
    fontSize: 27,
    textAlign: "center",
  },
  container: {
    backgroundColor: Colors.whiteSmoke,
  },

  bookInfo: {
    padding: 15,
  },
  coverImage: {
    width: 140,
    height: 210,
    borderRadius: 5,
  },
  coverImageView: {
    width: 140,
    height: 210,
    shadowColor: Colors.ceruleanBlue,
    shadowOffset: { height: 5, width: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.3,
    elevation: 5,
    overflow: "visible",
    alignSelf: "center",
    width: 140,
    height: 210,
    marginTop: -75,
    marginBottom: 35,
  },
  buyBookButton: {
    backgroundColor: Colors.bleuDeFrance,
    justifyContent: "center",
    height: 60,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  buyBookText: {
    textAlign: "center",
    fontFamily: Fonts.openSansMedium,
    color: Colors.white,
    fontSize: 16,
  },
});
