import React, { useState } from 'react'
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../../styles/colors'
import { Center, height, width } from '../../styles/CommonStyling'
import { InputField, ModalTitleHeader } from '../CustomFields'
import { AppText } from '../../Utility/TextUtility'
import { AppConst } from '../../constants/AppConst'
import Octicons from 'react-native-vector-icons/Octicons'
import { submitAppRating } from '../../store/actions/PolicyAction'
import { AppToastMessage } from '../custom/SnackBar'


const RateUsModal = ({ onClose, title = "Select", list = [], onItemSelect, selectedItem, textKey = "title", isSearch = false, onSearch, contStyle = {}, selectedKey = "key" }) => {
    const [defaultRating, setDefaultRating] = useState(3);
    const rating = [1, 2, 3, 4, 5];

    const submitRating = (ratingCount) => {
        submitAppRating(ratingCount).then(res => {
            if (res?.status) {
                AppToastMessage(res?.message);
            }
        })
    }

    return (
        <Modal
            visible
            transparent
            onRequestClose={onClose}
            animationType='slide'
        >
            <View style={styles.modalCont}>
                <View style={[styles.cont]}>
                    <ModalTitleHeader
                        title={title}
                        onPress={onClose}
                    />
                    <View style={{
                        flexGrow: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                    }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                padding: 20
                            }}>
                            {rating.map((item, key) => {
                                return (
                                    <TouchableOpacity
                                        key={item}
                                        activeOpacity={0.8}
                                        onPress={() => setDefaultRating(item)}>
                                        <Octicons
                                            name={item <= defaultRating ? 'star-fill' : 'star'}
                                            size={32}
                                            color={item <= defaultRating ? colors.yellow : colors.grey}
                                            style={{
                                                marginRight: 5
                                            }}
                                        />
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                        <AppText text='Enjoying the InsureFast?' />

                    </View>
                    <TouchableOpacity onPress={() => {
                        submitRating(defaultRating);
                        onClose()
                    }}>
                        <AppText text='Rate Now' color={colors.primary} size={14} style={{ textAlign: 'right', padding: 15 }} />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    modalCont: {
        flex: 1,
        backgroundColor: colors.transparent_black,
        justifyContent: "center"
    },
    cont: {
        // maxHeight: height,
        // alignItems: 'center',
        height: '30%',
        margin: 20,
        borderRadius: 10,
        backgroundColor: colors.white
    },
    item: {
        height: 45,
        width: (width - 80) / 2,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.grey,
        ...Center,
        margin: 10,
        borderRadius: 10
    },
    itemCont: {
        flexDirection: "row",
        flexWrap: "wrap",
        // padding: 10,
        paddingVertical: 20
    }
})

export default RateUsModal