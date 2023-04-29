import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { height, width } from '../../styles/CommonStyling'


const AdComponent = ({ comp }) => {

    return (
        <View style={styles.cont}>
            {comp && comp}
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

export default AdComponent