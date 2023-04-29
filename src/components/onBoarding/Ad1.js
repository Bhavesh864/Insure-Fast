import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../../styles/colors'
import { height, screenStyle, width } from '../../styles/CommonStyling'
import { HeadingText } from '../../Utility/TextUtility'



const Ad1 = () => {

    return (
        <View style={[styles.cont]}>
            <View style={{ padding: 20, marginBottom: 20 }}>
                <HeadingText
                    text={"Your Insurance Simplified!"}
                    color={colors.primary}
                />
            </View>
            <View style={{ flex: 1 }}>

            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    cont: {
        // ...screenStyle,
        height: height,
        width: width,
        backgroundColor: "red"
    }
})

export default Ad1