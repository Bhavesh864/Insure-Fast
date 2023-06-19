
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { shadows } from '../../../styles/shadow'
import { flexRow } from '../../../styles/CommonStyling'
import { colors } from '../../../styles/colors'
import { Checkbox } from '../../../components/CustomFields'
import { AppText, HeadingText } from '../../../Utility/TextUtility'
import { AppToastMessage } from '../../custom/SnackBar'

const CheckBoxCard = ({ item, selectedMedicalProcedure, addRemoveItemFromList }) => {

    return (
        <View>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    addRemoveItemFromList(item)
                }}
                style={styles.claimReqCont}>
                <View>
                    <Checkbox
                        style={styles.checkBox}
                        value={selectedMedicalProcedure.includes(item.key)}
                        onPress={() => {
                            addRemoveItemFromList(item)
                        }}
                    />
                </View>
                <View style={{ marginHorizontal: 15 }}>
                    <HeadingText text={item?.title} size={16} />
                    <AppText
                        text={item?.subtitle}
                        style={{ top: -1 }}
                        size={12}
                    />
                </View>
            </TouchableOpacity>

        </View>

    )
}

export default CheckBoxCard

const styles = StyleSheet.create({
    claimReqCont: {
        height: 70,
        marginHorizontal: 20,
        backgroundColor: colors.white,
        ...shadows[2],
        ...flexRow,
        borderRadius: 15,
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    checkBox: {
        marginHorizontal: 40,
    },
})