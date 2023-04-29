import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { height, screenStyle, width } from '../../styles/CommonStyling'


const Ad3 = () => {

    return (
        <View style={[styles.cont]}>
            <Text>Ad3</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    cont: {
        height: height,
        width: width,
        backgroundColor: "pink"
    }
})

export default Ad3