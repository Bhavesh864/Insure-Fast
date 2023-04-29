import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../../styles/colors';
import { Center, width } from '../../styles/CommonStyling';
import { AppText } from '../../Utility/TextUtility';

const cardWidth = ((width - 80) / 2);

const FlexWrapListComponent = ({ item, style = {}, itemWidth = cardWidth, textKey = "Model", onPress = () => { }, borderWidth = 0 }) => {

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.item, { width: itemWidth, borderWidth }, style]}
            onPress={() => onPress(item)}
        >
            <AppText
                text={textKey ? item[textKey] : item}
                style={{ textAlign: "center", paddingHorizontal: 2 }}
            />
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    item: {
        height: 50,
        backgroundColor: colors.white,
        margin: 10,
        ...Center,
        borderRadius: 15,
        borderColor: colors.primary,
        borderWidth: 0
    }
});

export default FlexWrapListComponent