import { ImageBackground } from "react-native";

const colors = {
    white: "#ffffff",
    black: "#000000",
    grey_0: "#d5d5d5",
    grey_1: "#a6a6a6",
    red: "#e84118",
    blue: "#3679fe",
};

export const theme = {
    background: colors.white,
    text: colors.black,
    ImageBackground: colors.grey_0,
    label: colors.grey_1,
    inputPlaceholder: colors.grey_1,
    inputBorder: colors.grey_1,
    inputDisabledBackground: colors.grey_0,
    errorText: colors.red,
    buttonBackground: colors.blue,
    buttonTitle: colors.white,
    buttonUnfilledTitle: colors.blue,
    headerTintColor: colors.black,
    imageButtonBackground: colors.grey_1,
    imageButtonIcon: colors.white,
    spinnerBackground: colors.black,
    spinnerIndicator: colors.white,
    tabActiveColor: colors.blue,
    tabInactiveColor: colors.grey_1,
    buttonLogout: colors.red,
    listBorder: colors.grey_0,
    listTime: colors.grey_1,
    listDescription: colors.grey_1,
    listIcon: colors.black,
};

export default theme;
