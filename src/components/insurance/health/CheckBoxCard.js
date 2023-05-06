
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { shadows } from '../../../styles/shadow'
import { flexRow } from '../../../styles/CommonStyling'
import { colors } from '../../../styles/colors'
import { navigate } from '../../../routes/RootNavigation'
import { Button, Checkbox } from '../../../components/CustomFields'
import { AppText, HeadingText } from '../../../Utility/TextUtility'
import { useState } from 'react'
import ListShowModal from '../../modals/ListShowModal'
import DataListSelectModal from '../../modals/DataListSelectModal'
import { diseasesArr } from '../../../constants/OtherConst'

const CheckBoxCard = ({ item, setshowModal, setselectedMedicalProcedure, selectedMedicalProcedure }) => {

    const addRemoveItemFromList = (item) => {
        console.log(selectedMedicalProcedure);
        if (!selectedMedicalProcedure.includes(item.key)) {
            if (item.key == 1) {
                setshowModal(true);
            }
            if (item.key == 3) {
                setselectedMedicalProcedure([3]);
                navigate('healthQuotations')
                return
            }
            setselectedMedicalProcedure([...selectedMedicalProcedure, item.key]);
        } else {
            setselectedMedicalProcedure(
                selectedMedicalProcedure.filter(i => item.key != i),
            );
        }
    }

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