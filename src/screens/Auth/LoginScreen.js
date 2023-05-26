import React, { useEffect, useState } from 'react'
import { NativeModules, PermissionsAndroid, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import AntDesign from "react-native-vector-icons/AntDesign";
import { Button, InputField } from '../../components/CustomFields'
import { navigate } from '../../routes/RootNavigation'
import { ChangeAppStatus } from '../../store/actions/AppAction'
import { colors } from '../../styles/colors'
import { flexRow, screenStyle } from '../../styles/CommonStyling'
import { AppText, HeadingText } from '../../Utility/TextUtility'
import { WhatsAppSvgIcon } from '../../assets/svg/basicSvgs';
import { customerLoginAction } from '../../store/actions/UserAction';
import { AppConst } from '../../constants/AppConst';
import { AppToastMessage } from '../../components/custom/SnackBar';

const LoginScreen = ({ route, navigation }) => {
    // const loginType = route.params?.type ? route.params?.type : "user";
    const [mobile, setMobile] = useState("");
    const [selectedCode, setSelectedCode] = useState("+91");
    const dispatch = useDispatch();

    useEffect(() => {
        // navigation.addListener('focus', async () => {
        //     if (Platform.OS == 'android') {

        //     }
        // });
    }, []);

    const onAction = (body) => {
        if (mobile.length < 10) {
            AppToastMessage('Please enter a valid number!');
            return;
        }
        customerLoginAction(body).then(res => {
            console.log(JSON.stringify(res));
            if (res?.data?.ErrorMessage == 'Done') {
                navigate("otpScreen", { mobile, response: res?.customer });
            } else {
                AppToastMessage(res?.data?.ErrorMessage);
            }
        });

        // try {
        //     let phone = mobile
        //     if (!phone) {
        //         AppToastMessage("Please enter valid mobile number");
        //         return;
        //     }
        //     // if (mobile.trim() && mobile?.length > 9) {
        //     let body = {
        //         "phone_number": phone,
        //         "country_code": "91"
        //     }
        //     userLoginAction(body).then(res => {
        //         AppConst.showConsoleLog("login res: ", res);
        //         if (res?.status) {
        //             navigate("otpScreen", { mobile, response: res?.data });
        //         } else {
        //             AppToastMessage(res?.message);
        //         }
        //     })
        // } catch (error) {

        // }
        // }
    }

    const employeeLogin = () => {
        dispatch(ChangeAppStatus(3))
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
                <View style={{ padding: 20 }}>
                    <Text style={{ textAlign: "center", maxWidth: "80%", alignSelf: "center" }}>
                        <AppText
                            text={"By continuing you confirm that you agree with our"}
                            color={colors.darkGrey}
                        />
                        <AppText
                            text={"Term and Conditions"}
                            color={colors.primary}
                        />
                    </Text>
                </View>
            </SafeAreaView>
        </View>
    )
}


const styles = StyleSheet.create({})

export default LoginScreen