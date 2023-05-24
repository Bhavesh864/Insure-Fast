import { KeyboardAvoidingView, NativeEventEmitter, NativeModules, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { screenStyle } from '../../styles/CommonStyling'
import { Button, CustomBackButton } from '../../components/CustomFields'
import { navigate } from '../../routes/RootNavigation'
import { ChangeAppStatus } from '../../store/actions/AppAction'
import { AppText, HeadingText } from '../../Utility/TextUtility'
import { colors } from '../../styles/colors'
import OtpComponent from '../../components/custom/OtpComponent'
import { useDispatch } from 'react-redux'
import { verifyOtpAction } from '../../store/actions/UserAction'
import { AppConst } from '../../constants/AppConst'
import { AppToastMessage } from '../../components/custom/SnackBar'

const OtpScreen = ({ route }) => {
    const mobile = route.params?.mobile;
    const responseData = route.params?.response;
    const dispatch = useDispatch();
    const [otp, setotp] = useState({
        first: '',
        second: '',
        third: '',
        four: '',
        five: ''
    });

    useEffect(() => {
        let smslistenerSubs = null;
        if (Platform.OS == 'android') {
            const eventEmitter = new NativeEventEmitter();
            smslistenerSubs = eventEmitter.addListener('SMSEventListener', (events) => {
                AppConst.showConsoleLog('otp event:', events);
                if (events) {
                    let fetchedOtp = events.OTP;
                    setotp({
                        first: fetchedOtp?.charAt(0),
                        second: fetchedOtp?.charAt(1),
                        third: fetchedOtp?.charAt(2),
                        four: fetchedOtp?.charAt(3),
                        five: fetchedOtp?.charAt(4),
                    })
                }
            })
        }

        return () => {
            if (Platform.OS == 'android') {
                NativeModules.SMSListener.unregisterReceiver();
                if (smslistenerSubs) {
                    smslistenerSubs.remove();
                }
            }
        }

    }, []);




    const onVerify = () => {
        // navigate("login", { type: "employee" })

        if (otp?.first && otp?.second && otp?.third && otp?.four && otp?.five) {
            const body = {
                "otp": otp?.first + otp?.second + otp?.third + otp?.four + otp?.five,
                "fcm_token": "",
                "id": responseData?.id,
                "phone": mobile
            }
            verifyOtpAction(body).then(res => {
                AppConst.showConsoleLog("otp verify res: ", res);
                if (res?.status) {
                    dispatch(ChangeAppStatus(3));
                } else {
                    AppToastMessage(res?.message)
                }
            }).catch(err => {
                console.log(err);
            })
        } else {
            AppToastMessage('Please enter 5 digit otp!')
        }
    }

    return (
        <View style={screenStyle}>
            <SafeAreaView style={{ flex: 1 }}>
                <CustomBackButton
                    style={{ margin: 20 }}
                />
                <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS == "ios" ? "padding" : null}>
                    <View style={{ flex: 1 }}>
                        <ScrollView style={{ flex: 1 }} >
                            <View style={{ padding: 20, marginTop: 0 }}>
                                <HeadingText
                                    text={"Verification Code"}
                                    size={20}
                                />
                                <Text style={{ marginTop: 10 }}>
                                    <AppText
                                        text={`Please enter OTP sent to `}
                                        color={colors.darkGrey}
                                    />
                                    <AppText
                                        text={`+91 ${mobile} `}
                                        color={colors.primary}
                                    />
                                </Text>
                            </View>
                            <View>
                                <OtpComponent
                                    otp={otp}
                                    setotp={setotp}
                                />
                            </View>
                            <View style={{ margin: 20, paddingTop: 20 }}>
                                <Button
                                    title='Verify OTP'
                                    onPress={() => onVerify()}
                                />
                            </View>
                            <View style={{ alignSelf: "center", alignItems: "center" }}>
                                <AppText
                                    text={"I did not receive a code"}
                                    color={colors.darkGrey}
                                />
                                <TouchableOpacity style={{ padding: 5 }}>
                                    <HeadingText
                                        text={"Resend"}
                                        color={colors.primary}
                                    />
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    )
}


const styles = StyleSheet.create({})

export default OtpScreen