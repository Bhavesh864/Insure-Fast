import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { screenStyle } from '../../styles/CommonStyling'
import { ScreenCenterText } from '../../components/CustomFields'


const TransactionsScreen = () => {

    return (
        <View style={screenStyle}>
            <ScreenCenterText
                text='No Transaction History'
            />
        </View>
    )
}


const styles = StyleSheet.create({})

export default TransactionsScreen;