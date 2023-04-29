import { Modal, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { InputField, ModalTitleHeader } from '../CustomFields';
import { AppText } from '../../Utility/TextUtility';
import { colors } from '../../styles/colors';
import { Center, height, width } from '../../styles/CommonStyling';
import { color } from 'react-native-reanimated';
import { sendQuotation } from '../../store/actions/PolicyAction';
import { AppToastMessage } from '../custom/SnackBar';

const ShareQuotationEmailModal = ({ onClose, title = "Select", list = [], onItemSelect, selectedItem, textKey = "title", isSearch = false, onSearch, contStyle = {}, selectedKey = "key" }) => {

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
                        justifyContent: 'flex-start',
                        // alignItems: 'center',
                        flex: 1
                    }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                padding: 20
                            }}>

                        </View>
                        <InputField placeholder='Enter Email' onTextChange={(text) => {
                            onItemSelect(text)
                        }}
                            value={selectedItem}
                            keyboardType='email-address'
                        />

                    </View>
                    <TouchableOpacity onPress={() => {
                        if (selectedItem && selectedItem.includes('.com') && selectedItem.includes('@')) {
                            sendQuotation(selectedItem);
                            onClose();
                            onItemSelect('');
                        } else {
                            onClose()
                            AppToastMessage('Please enter valid email')
                            return;
                        }
                    }}
                        style={{ backgroundColor: colors.primary, ...Center, width: '50%', alignSelf: 'center', borderRadius: 10, marginBottom: 10 }}>
                        <AppText text='Submit' color={colors.white} size={14} style={{ textAlign: 'right', padding: 15 }} />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default ShareQuotationEmailModal

const styles = StyleSheet.create({
    modalCont: {
        flex: 1,
        backgroundColor: colors.transparent_black,
        justifyContent: "flex-end"
    },
    cont: {
        // maxHeight: height,
        // alignItems: 'center',
        height: height * 0.3,
        margin: 20,
        borderRadius: 10,
        backgroundColor: colors.white
    },
    item: {
        width: (width - 80) / 2,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.grey,
        // ...Center,
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