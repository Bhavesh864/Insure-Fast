import { Dimensions } from "react-native";
import { useSelector } from "react-redux";
// import { AppConst, arabicLanguageKey } from "../constants/AppConst";
import { colors } from "./colors";


// const appLanguage = store.getState().app.appLanguage;

export const fonts = {
    thin: 'ProximaNova-Thin',
    light: 'ProximaNova-AltLight',
    regular: 'ProximaNova-Regular',
    // italic: 'ProximaNova-Italic',
    medium: 'ProximaNova-Bold',
    bold: 'ProximaNova-Extrabold',
    semiBold: "ProximaNova-Bold",
};


export const statusBar = {
    dark: 'dark-content',
    light: 'light-content',
    default: 'default'
};


export const flexCenter = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
}


export const Center = {
    justifyContent: 'center',
    alignItems: 'center'
}

export const flexRow = {
    flexDirection: 'row',
    alignItems: 'center',
}

export const flexDirectionRow = {
    flexDirection: 'row',
    alignItems: "center"
}

export const flexSpaceBetween = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
}

export const flexSpaceAround = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
}

export const screenStyle = {
    flex: 1,
    backgroundColor: colors.white,
}

export const fontSize = {
    verySmall: 10,
    small: 12,
    normal: 14,
    semi_medium: 16,
    medium: 18,
    largeMedium: 20,
    large: 22,
    veryLarge: 30
}

export const normalTextStyle = {
    fontSize: fontSize.normal,
    fontFamily: fonts.regular,
    color: colors.black,
    lineHeight: 18,
}

export const smallTextSize = {
    fontSize: fontSize.small,
    fontFamily: fonts.regular,
    color: colors.black
}



export const MediumTextStyle = {
    fontSize: fontSize.medium,
    fontFamily: fonts.medium,
    color: colors.black
}

export const SemiMediumTextStyle = {
    fontSize: fontSize.semi_medium,
    fontFamily: fonts.regular,
    color: colors.black,
    fontWeight: "500"
}

export const largeMediumStyle = {
    fontSize: fontSize.largeMedium,
    fontFamily: fonts.medium,
    color: colors.black
}

export const LargeTextStyle = {
    fontSize: fontSize.large,
    fontFamily: fonts.medium,
    color: colors.black,
    // fontWeight: "bold",
}


export const HeavyTextStyle = {
    fontSize: fontSize.veryLarge,
    fontFamily: fonts.bold,
    color: colors.black,
    // fontWeight: "600"
}

export const Border = {
    borderColor: colors.grey,
    borderWidth: 0.8,
}

export const { width, height } = Dimensions.get('screen');
