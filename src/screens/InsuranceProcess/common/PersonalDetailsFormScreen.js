import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import { screenStyle } from '../../../styles/CommonStyling'
import { HeadingText } from '../../../Utility/TextUtility'
import { Button, InputField } from '../../../components/CustomFields'
import { createCustomerAction, dispatchQuickQuote } from '../../../store/actions/PolicyAction'
import { useDispatch, useSelector } from 'react-redux'
import { AppConst } from '../../../constants/AppConst'
import { navigate } from '../../../routes/RootNavigation'
import { SetUserData } from '../../../store/actions/UserAction'
import { AppToastMessage } from '../../../components/custom/SnackBar'


const PersonalDetailsFormScreen = ({ route }) => {
    const insuranceType = route?.params?.insuranceType;
    const data = useSelector(state => state.motor?.apiRequestQQ);
    const userProfile = useSelector(state => state.user?.user);
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");



    useEffect(() => {
        console.log('phone', userProfile?.phone);
        if (userProfile) {
            if (userProfile?.name) {
                let splitName = firstName?.split(" ");
                // let name=splitName[0] + splitName[1]
                setFirstName(splitName[0]);
                setLastName(splitName[1]);
            }
            if (userProfile?.email) {
                console.log('EMail------', userProfile?.email);
                setEmail(userProfile?.email);
            }
            if (userProfile?.phone) {
                var phoneWithoutCC = '';
                if (userProfile?.phone.charAt(0) == '+' || userProfile?.phone.charAt(0) == '0') {
                    phoneWithoutCC = userProfile?.phone.replace(/[^a-zA-Z0-9+]/g, "").substr(3);
                }
                else {
                    phoneWithoutCC = userProfile?.phone.replace(/[^a-zA-Z0-9]/g, "");
                }
                console.log('Phone------', phoneWithoutCC);
                setMobile(phoneWithoutCC);
            }
        }
    }, [])

    const onContinuePress = () => {
        // if (data?.IsVehicleNew) {
        //     navigate("vehiclePolicyForm");
        //     return;
        // }
        // navigate("previousPolicy");
        // return;
        if (!firstName) {
            AppToastMessage("Enter first name");
            return
        }
        if (!lastName) {
            AppToastMessage("Enter last name");
            return
        }
        if (!email || !email.includes('@') || !email.includes('.com')) {
            AppToastMessage("Enter Valid Email address");
            return
        }
        if (!mobile) {
            AppToastMessage("Enter Mobile number");
            return
        }
        let body = {
            name: firstName + " " + lastName,
            email,
            mobile: mobile, //userProfile?.phone_number,
            // customerId: userProfile?.id
        }
        AppConst.showConsoleLog("body: ", body);

        // creatCustomers(firstName + ' ' + lastName, email, mobile).then(res => {
        //     console.log('result', res);
        //     if (res?.status) {
        //         dispatchQuickQuote("FirstName", firstName);
        //         dispatchQuickQuote("LastName", lastName);
        //         dispatchQuickQuote("Email", email);
        //         dispatchQuickQuote("MobileNumber", mobile);
        //         dispatchQuickQuote("customerId", res?.data?.id);
        //         dispatch(SetUserData(res?.data));
        //         navigate("vehiclePolicyForm", { insuranceType });
        //     }
        // })

        console.log(AppConst.customerId);

        const formData = new FormData();
        formData.append("name", firstName + " " + lastName);
        formData.append("email", email);
        formData.append("phone", mobile);
        formData.append("customerId", AppConst.customerId);

        createCustomerAction(formData).then(res => {
            AppConst.showConsoleLog("create customer res: ", res);
            if (res && res?.status) {
                dispatchQuickQuote("FirstName", firstName);
                dispatchQuickQuote("LastName", lastName);
                dispatchQuickQuote("Email", email);
                dispatchQuickQuote("MobileNumber", mobile);
                dispatchQuickQuote("customerId", res?.data?.id);
                dispatch(SetUserData(res?.data));
                navigate("vehiclePolicyForm", { insuranceType });
                // AppToastMessage(res?.message);
            } else
                res ? AppToastMessage(res?.message) : AppToastMessage('Something went wrong')

        })

    }

    return (
        <View style={screenStyle}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS == "ios" ? "padding" : null}>
                <View style={{ flex: 1 }}>
                    <ScrollView>
                        <HeadingText
                            text={"Fill your personal details"}
                            style={{ padding: 20 }}
                        />
                        <View>
                            <InputField
                                placeholder='Enter First Name'
                                label={"First Name"}
                                autoCapitalize='words'
                                autoCorrect={true}
                                value={firstName}
                                onTextChange={setFirstName}
                            />
                            <InputField
                                placeholder='Enter Last Name'
                                label={"Last Name"}
                                autoCapitalize='words'
                                value={lastName}
                                autoCorrect={true}
                                onTextChange={setLastName}
                            />
                            <InputField
                                placeholder='Enter Email Address'
                                label={"Email Address"}
                                keyboardType='email-address'
                                value={email}
                                autoCorrect={true}
                                onTextChange={setEmail}
                            />
                            <InputField
                                placeholder='Enter Phone number'
                                label={"Phone Number"}
                                value={mobile}
                                onTextChange={setMobile}
                                keyboardType='phone-pad'
                                maxLength={10}
                            />
                        </View>
                    </ScrollView>
                </View>
                <View style={{ margin: 20 }}>
                    <Button
                        title='Continue'
                        onPress={() => onContinuePress()}
                    />
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}


const styles = StyleSheet.create({})

export default PersonalDetailsFormScreen