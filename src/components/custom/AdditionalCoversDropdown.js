import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { flexBackground } from '../../../styles/CommonStyling'
import { TouchableTextView } from '../../Custom/CustomFields'
import { colors } from '../../styles/colors'
import { AppText } from '../../Utility/TextUtility'
import { Center, flexRow, flexSpaceAround, flexSpaceBetween } from '../../styles/CommonStyling'

const AdditionalCoversDropdown = ({ data, onPress, selectedItem }) => {

    return (
        <View style={[{ backgroundColor: colors.white, marginBottom: 20, ...flexRow, flexWrap: 'wrap', justifyContent: 'flex-start', marginHorizontal: 10, }]}>
            {data.map((item, i) => {
                return (
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {
                            // console.log('eh');
                            onPress(item.key)
                        }}
                        key={String(i)} style={[{ paddingHorizontal: 10, borderWidth: 1, marginLeft: 20, borderRadius: 5, marginVertical: 5, padding: 5, backgroundColor: selectedItem == item.key ? colors.primary : colors.white }]}>
                        <AppText text={`${item.amount}`} size={15} style={{ lineHeight: 20 }} color={selectedItem == item.key ? colors.white : colors.black} />
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default AdditionalCoversDropdown

const styles = StyleSheet.create({})