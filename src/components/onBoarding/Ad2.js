import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { height, screenStyle, width } from '../../styles/CommonStyling'

const Ad2 = () => {

    return (
        <View style={[styles.cont]}>
            <Text>Ad2</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    cont: {
        // ...screenStyle,
        height: height,
        width: width,
        backgroundColor: "blue"
    }
})

export default Ad2