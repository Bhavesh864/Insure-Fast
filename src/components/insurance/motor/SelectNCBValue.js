import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Center, flexRow } from '../../../styles/CommonStyling'
import { colors } from '../../../styles/colors'
import { AppText } from '../../../Utility/TextUtility'

const SelectNCBValue = ({ value, onSubmit, onPress }) => {
    return (
        <><View style={[flexRow, { marginVertical: 10, marginBottom: 0, }]}>
            <TouchableOpacity
                onPress={() => onPress('0')}
                style={[styles.yesNoBtn, { backgroundColor: value == '0' ? colors.primary : colors.white }]}
            >
                {/* <Selectbox value={true} /> */}
                <AppText
                    text={"0%"}
                    color={value == '0' ? colors.white : colors.grey}
                    style={{ marginLeft: 0 }}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => onPress('20')}
                style={[styles.yesNoBtn, { marginLeft: 20, backgroundColor: value == '20' ? colors.primary : colors.white }]}
            >
                {/* <Selectbox value={false} /> */}
                <AppText
                    text={"20%"}
                    color={value == '20' ? colors.white : colors.grey}
                    style={{ marginLeft: 0 }}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => onPress('25')}
                style={[styles.yesNoBtn, { marginLeft: 20, backgroundColor: value == '25' ? colors.primary : colors.white }]}
            >
                {/* <Selectbox value={false} /> */}
                <AppText
                    text={"25%"}
                    color={value == '25' ? colors.white : colors.grey}
                    style={{ marginLeft: 0 }}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => onPress('35')}
                style={[styles.yesNoBtn, { marginLeft: 20, backgroundColor: value == '35' ? colors.primary : colors.white }]}
            >
                {/* <Selectbox value={false} /> */}
                <AppText
                    text={"35%"}
                    color={value == '35' ? colors.white : colors.grey}
                    style={{ marginLeft: 0 }}
                />
            </TouchableOpacity>
        </View>
            <TouchableOpacity style={styles.buyNowBtn} onPress={() => { onSubmit() }}>
                <AppText
                    text={"Submit"}
                    color={colors.white}
                    style={{ marginLeft: 0 }}
                />
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    yesNoBtn: {
        height: 30,
        width: 50,
        ...Center,
        backgroundColor: colors.white,
        borderRadius: 10,
        ...flexRow,
        borderWidth: 0.6,
        borderColor: colors.grey
    },
    buyNowBtn: {
        height: 40,
        width: 120,
        marginTop: 30,
        backgroundColor: colors.primary,
        borderRadius: 10,
        ...Center,
        ...flexRow,
        alignSelf: 'center'
    },
})

export default SelectNCBValue