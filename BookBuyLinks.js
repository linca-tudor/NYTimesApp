import { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SectionList,
  StyleSheet,
  FlatList,
  Modal,
} from "react-native";
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Routes } from "./Routes";
import { Colors, Fonts } from "./GraphicDesign";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const Item = ({ title, url, onURLPress }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onURLPress(url);
      }}
    >
      <View style={styles.linkButton}>
        <Text
          style={{
            textAlign: "center",
            marginVertical: 3,
            color: Colors.white,
            fontFamily: Fonts.openSansMedium,
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const BuyLinks = ({
  title,
  buy_links,
  isVisible,
  onURLPress,
  onDismiss,
}) => {
  const renderItem = ({ item }) => (
    <Item title={item.name} url={item.url} onURLPress={onURLPress} />
  );

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onDismiss}
    >
      <TouchableWithoutFeedback onPress={onDismiss}>
        <View style={styles.modalBackdrop} />
      </TouchableWithoutFeedback>
      <View style={styles.modalCenteredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeModalButton} onPress={onDismiss}>
            <Ionicons
              name="close-circle"
              size={25}
              color={Colors.deepSaffron}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.buyLinksHeader}>
              You can purchase{" "}
              <Text fontFamily={Fonts.avenirMediumOblique}>{title}</Text> from
              the following links:
            </Text>
            <FlatList
              data={buy_links}
              renderItem={renderItem}
              keyExtractor={(_, index) => index.toString()}
              style={styles.buyLinks}
              contentContainerStyle={{ paddingBottom: 15 }}
            />
            <LinearGradient
              colors={[Colors.white, "transparent"]}
              style={{
                width: "100%",
                height: 20,
                position: "absolute",
                alignSelf: "center",
                bottom: 0,
              }}
              start={{ x: 0.5, y: 1 }}
              end={{ x: 0.5, y: 0 }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  buyLinks: {
    flex: 0.6,
    marginTop: 10,
  },
  buyLinksHeader: {
    flex: 0.4,
    fontFamily: Fonts.openSansMedium,
  },
  linkButton: {
    backgroundColor: Colors.bleuDeFrance,
    margin: 3,
    padding: 5,
    borderRadius: 15,
    shadowColor: Colors.ceruleanBlue,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 3,
  },
  modalBackdrop: {
    height: "100%",
    width: "100%",
    backgroundColor: Colors.black,
    position: "absolute",
    opacity: 0.2,
  },
  modalCenteredView: {
    alignSelf: "center",
    width: "70%",
    height: "35%",
    top: "25%",
  },
  modalView: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    shadowColor: Colors.ceruleanBlue,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeModalButton: {
    alignSelf: "flex-end",
    position: "absolute",
    top: -6,
    right: -6,
    borderRadius: 12.5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
