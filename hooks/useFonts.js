import * as Font from "expo-font";

export default useFonts = async () =>
  await Font.loadAsync({
    openSansBold: require("../assets/fonts/Open_Sans/static/OpenSans/OpenSans-Bold.ttf"),
    openSansBoldItalic: require("../assets/fonts/Open_Sans/static/OpenSans/OpenSans-BoldItalic.ttf"),
    openSansExtraBold: require("../assets/fonts/Open_Sans/static/OpenSans/OpenSans-ExtraBold.ttf"),
    openSansExtraBoldItalic: require("../assets/fonts/Open_Sans/static/OpenSans/OpenSans-ExtraBoldItalic.ttf"),
    openSansItalic: require("../assets/fonts/Open_Sans/static/OpenSans/OpenSans-Italic.ttf"),
    openSansLight: require("../assets/fonts/Open_Sans/static/OpenSans/OpenSans-Light.ttf"),
    openSansLightItalic: require("../assets/fonts/Open_Sans/static/OpenSans/OpenSans-LightItalic.ttf"),
    openSansMedium: require("../assets/fonts/Open_Sans/static/OpenSans/OpenSans-Medium.ttf"),
    openSansMediumItalic: require("../assets/fonts/Open_Sans/static/OpenSans/OpenSans-MediumItalic.ttf"),
    openSansRegular: require("../assets/fonts/Open_Sans/static/OpenSans/OpenSans-Regular.ttf"),
    openSansSemiBold: require("../assets/fonts/Open_Sans/static/OpenSans/OpenSans-SemiBold.ttf"),
    openSansSemiBoldItalic: require("../assets/fonts/Open_Sans/static/OpenSans/OpenSans-SemiBoldItalic.ttf"),
  });
