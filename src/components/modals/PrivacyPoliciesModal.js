import React from 'react'
import { Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { colors } from '../../styles/colors'
import { Center, width } from '../../styles/CommonStyling'
import { ModalTitleHeader } from '../CustomFields'
import { AppText } from '../../Utility/TextUtility'
import Octicons from 'react-native-vector-icons/Octicons'

const PrivacyPoliciesModal = ({ onClose, title = "Select", onVerify }) => {


    return (
        <Modal
            transparent
            animationType='slide'
        >
            <TouchableOpacity style={styles.modalCont} onPressOut={() => onClose()} activeOpacity={1}>
                <TouchableWithoutFeedback>
                    {/* <View style={styles.modalCont}> */}
                    <View style={[styles.cont]}>
                        <ModalTitleHeader
                            title='Grant Permission'
                            // onPress={onClose}
                            showCloseBtn={false}
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
                            </View>
                            <AppText text={`- To streamline your login process and ensure account security, we utilize SMS services for auto-verification of OTP. 
- Upon clicking the Verify button, we will request permission to access SMS on your device for a seamless authentication experience. 
- This permission allows us to read the OTP sent to your device via SMS and automatically fill it in the verification field. 
 - We assure you that your SMS messages will not be stored, shared, or used for any purpose other than OTP verification. 
- If you choose not to grant SMS permission, you can manually enter the OTP for verification instead. 
- You can manage or revoke this permission at any time in the app settings or your device settings. 
- For more information on how we handle user data and ensure privacy, please refer to our privacy policy.`}
                            />
                        </View>
                        <TouchableOpacity
                            style={{ width: 100, alignSelf: 'flex-end', margin: 10 }}
                            onPress={() => {
                                onClose();
                                onVerify();
                            }}>
                            <AppText text='Verify' color={colors.primary} size={16} style={{ textAlign: 'right', padding: 15 }} />
                        </TouchableOpacity>
                    </View>
                    {/* </View> */}
                </TouchableWithoutFeedback>

            </TouchableOpacity>

        </Modal>
    )
}


const styles = StyleSheet.create({
    modalCont: {
        flex: 1,
        backgroundColor: colors.transparent_black,
        justifyContent: "center",
    },
    cont: {
        // maxHeight: height,
        // alignItems: 'center',
        height: '70%',
        margin: 20,
        borderRadius: 10,
        paddingHorizontal: 30,
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

export default PrivacyPoliciesModal