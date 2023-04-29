import { Text } from "react-native"
import React from "react"
import { colors } from "../styles/colors"
import { fontSize, largeMediumStyle, LargeTextStyle, normalTextStyle } from "../styles/CommonStyling"
// import { AppConst, arabicLanguageKey } from "../constants/AppConst"






export const HeadingText = ({ text = "", style = {}, color = colors.black, size = fontSize.medium, numberOfLines = null }) => {
    return <Text
        allowFontScaling={false}
        numberOfLines={numberOfLines}
        style={[largeMediumStyle, style, { color, fontSize: size }]}
    >{text}</Text>
}


export const AppText = ({ text = "", style = {}, color = colors.black, size = fontSize.normal, numberOfLines = null, onPress = () => { } }) => {
    return <Text
        numberOfLines={numberOfLines}
        allowFontScaling={false}
        style={[normalTextStyle, style, { color, fontSize: size }]}
    // onPress={onPress}
    >{text ? text : ""}</Text>
}