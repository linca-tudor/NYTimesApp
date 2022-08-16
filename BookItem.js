import {
  StyleSheet,
  FlatList,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Colors, Fonts } from "./GraphicDesign";

export const BookItem = ({ title, author, image, onPress }) => (
  <TouchableOpacity onPress={() => onPress(title)}>
    <View style={styles.container}>
      <View style={styles.bookListItem}>
        <View style={styles.bookListTitleText}>
          <Text>{title}</Text>
          <Text style={{ fontFamily: Fonts.openSansLightItalic }}>
            {author}
          </Text>
        </View>
        <Image
          source={{ uri: image }}
          style={styles.coverImage}
          resizeMode="contain"
        />
      </View>
    </View>
  </TouchableOpacity>
);

export const styles = StyleSheet.create({
  bookListItem: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.white,
    marginVertical: 10,
    justifyContent: "flex-end",
    paddingVertical: 10,
    paddingRight: 15,
    borderLeftWidth: 5,
    borderLeftColor: Colors.bleuDeFrance,
    borderRadius: 5,
  },
  bookListTitleText: {
    fontSize: 18,
    flex: 2,
    marginTop: 15,
    marginLeft: 15,
    fontFamily: Fonts.openSansExtraBold,
    color: Colors.vampireGrey,
  },
  coverImage: {
    width: 70,
    height: 105,
    shadowColor: Colors.accentBlue,
    shadowOffset: { height: 5, width: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.5,
    overflow: "visible",
    borderRadius: 4,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: 20,
    shadowColor: Colors.ceruleanBlue,
    shadowOffset: { height: 5, width: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.4,
  },
  accentLine: {
    marginVertical: 10,
    width: 5,
    height: 125,
    backgroundColor: Colors.bleuDeFrance,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
});
