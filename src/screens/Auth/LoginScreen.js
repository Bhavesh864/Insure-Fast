import React, { useEffect, useState } from 'react'
import { Linking, PermissionsAndroid, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import AntDesign from "react-native-vector-icons/AntDesign";
import { Button, InputField } from '../../components/CustomFields'
import { navigate } from '../../routes/RootNavigation'
import { ChangeAppStatus } from '../../store/actions/AppAction'
import { colors } from '../../styles/colors'
import { flexRow, normalTextStyle, screenStyle } from '../../styles/CommonStyling'
import { AppText, HeadingText } from '../../Utility/TextUtility'
import { WhatsAppSvgIcon } from '../../assets/svg/basicSvgs';
import { customerLoginAction } from '../../store/actions/UserAction';
import { AppToastMessage } from '../../components/custom/SnackBar';
import { AppConst } from '../../constants/AppConst';
import PrivacyPoliciesModal from '../../components/modals/PrivacyPoliciesModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ route, navigation }) => {
    const [showModal, setShowModal] = useState(false);
    const [mobile, setMobile] = useState("");
    const [selectedCode, setSelectedCode] = useState("+91");
    const dispatch = useDispatch();


    const checkPermission = async () => {
        const data = await AsyncStorage.getItem("smsPermission");
        const smsPermission = JSON.stringify(data)

        // if (Platform.OS == 'ios') {
        //     onVerified()
        //     return
        // }

        if (smsPermission == null || smsPermission == 'null') {
            setShowModal(true);
        }
    }




    useEffect(() => {
        checkPermission()
    }, []);


    const onAction = async (body) => {
        if (mobile.length < 10) {
            AppToastMessage('Please enter a valid number!');
            return;
        }
        if (Platform.OS == 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.RECEIVE_SMS
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    await AsyncStorage.setItem('smsPermission', JSON.stringify('true'))
                    AppConst.showConsoleLog('Permission Approved!');
                    customerLoginAction(body).then(res => {
                        console.log(JSON.stringify(res));
                        if (res?.data?.ErrorMessage == 'Done') {
                            navigate("otpScreen", { mobile, response: res?.customer });
                        } else {
                            AppToastMessage(res?.data?.ErrorMessage);
                        }
                    });
                } else {
                    AppToastMessage('Permission Denied!');
                }
            } catch (error) {
                AppConst.showConsoleLog('Permission err', error)
            }
        }
    }


    return (
        <View style={screenStyle}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ padding: 20, marginTop: 20 }}>
                        <HeadingText
                            text={"Welcome to Insurefast"}
                            size={20}
                            color={colors.primary}
                        />
                        <AppText
                            text={"Login for a financially stress - free life"}
                            color={colors.darkGrey}
                            style={{ marginTop: 15 }}
                        />
                    </View>
                    <View>
                        <InputField
                            placeholder='Enter mobile number'
                            value={mobile}
                            keyboardType='phone-pad'
                            maxLength={10}
                            onTextChange={setMobile}
                            showIcon={
                                <View style={{ width: 45, borderRightWidth: 1, borderColor: colors.grey, ...flexRow }}>
                                    <AppText text={selectedCode} />
                                    <AntDesign name={"down"} size={15} color={colors.grey} style={{ left: 4 }} />
                                </View>
                            }
                        />
                    </View>
                    <View style={{ margin: 20, flex: 1, }}>
                        <Button
                            title={"Continue"}
                            onPress={() => {
                                try {
                                    let phone = mobile
                                    if (!phone) {
                                        AppToastMessage("Please enter valid mobile number");
                                        return;
                                    }
                                    if (phone?.length < 9) {
                                        AppToastMessage("Please enter valid mobile number");
                                        return;
                                    }
                                    // if (mobile.trim() && mobile?.length > 9) {
                                    let body = {
                                        "phone": phone,
                                        // "country_code": "91"
                                    }
                                    onAction(body);
                                } catch (error) {

                                }
                            }}
                        />
                        <View>
                            <AppText
                                text='---------------------------- OR ----------------------------'
                                color={colors.darkGrey}
                                style={{ textAlign: "center", marginVertical: 10 }}
                            />
                        </View>
                        <Button
                            title={"Login via WhatsApp"}
                            icon={<WhatsAppSvgIcon style={{ marginRight: 10 }} />}
                            onPress={() => navigate("login")}
                            backgroundColor={colors.darkGreen}
                        />
                    </View>
                </View>
                <View style={{ padding: 20, paddingHorizontal: 30 }}>
                    <Text style={{ ...normalTextStyle, color: colors.darkGrey, alignSelf: 'center', textAlign: 'center' }}>
                        {`By continuing you confirm that you agree with our `}
                        <Text onPress={() => {
                            navigate('termsConditions');
                            // Linking.openURL('https://insurefast.in/tnc')
                        }}
                            style={{ ...normalTextStyle, color: colors.primary, }}
                        >Terms and Conditions</Text>
                    </Text>
                </View>
            </SafeAreaView>
            {showModal &&
                <PrivacyPoliciesModal onClose={() => {
                    setShowModal(false)
                    // onVerified()
                }}
                    onVerify={() => {
                        setShowModal(false)
                        // onVerified()
                    }}
                />}
        </View>
    )
}


const styles = StyleSheet.create({})

export default LoginScreen