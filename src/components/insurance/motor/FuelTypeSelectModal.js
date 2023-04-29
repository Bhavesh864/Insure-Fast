import React from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ModalTitleHeader } from "../../CustomFields";
import { colors } from '../../../styles/colors';
import { AppText } from '../../../Utility/TextUtility';
import { Center, width } from '../../../styles/CommonStyling';


const FuelTypeSelectModal = ({ onClose = () => { }, fuelTypes = [], onFuelSelect }) => {

    return (
        <Modal
            visible
            transparent
            onRequestClose={onClose}
            animationType='slide'
        >
            <View style={styles.modalCont}>
                <View style={{ backgroundColor: colors.white, borderRadius: 20 }}>
                    <ModalTitleHeader
                        title={"Select Your Fuel Type"}
                        onPress={onClose}
                    />
                    <View style={styles.cont}>
                        <View style={styles.itemCont}>
                            {fuelTypes.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        key={String(index)}
                                        style={styles.item}
                                        onPress={() => onFuelSelect(item)}
                                    >
                                        <AppText
                                            text={item}
                                        />
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    modalCont: {
        flex: 1,
        backgroundColor: colors.transparent_black,
        justifyContent: "center",
        padding: 20
    },
    cont: {
        padding: 10,
        minHeight: 100,
    },
    item: {
        height: 45,
        width: (width - 100) / 3,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.grey,
        ...Center,
        margin: 10,
        borderRadius: 10
    },
    itemCont: {
        flexDirection: "row",
        flexWrap: "wrap"
    }
})

export default FuelTypeSelectModal