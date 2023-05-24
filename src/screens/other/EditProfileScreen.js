import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button, InputField, TouchableTextView } from '../../components/CustomFields'
import { AppText } from '../../Utility/TextUtility'
import { useDispatch, useSelector } from 'react-redux'
import DatePicker from 'react-native-date-picker'
import moment from 'moment'
import { goBack } from '../../routes/RootNavigation'
import { AppToastMessage } from '../../components/custom/SnackBar'
import { createCustomerAction, dispatchQuickQuote } from '../../store/actions/PolicyAction'
import { SetUserData, getUserProfileData } from '../../store/actions/UserAction'
import { AppConst } from '../../constants/AppConst'
import { useEffect } from 'react'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { colors } from '../../styles/colors'

const EditProfileScreen = () => {
    const userData = useSelector(state => state.motor?.apiRequestQQ);
    const phone = useSelector(state => state.user?.user?.phone);
    const dispatch = useDispatch();


    useEffect(() => {
        getUserProfileData()
    }, [])


    const [firstName, setFirstName] = useState(userData?.FirstName || '');
    const [lastName, setLastName] = useState(userData?.LastName || '');
    const [dob, setdob] = useState(userData?.Dob || '')
    const [email, setemail] = useState(userData?.Email || '');
    const [showDateModal, setshowDateModal] = useState(null);

    // const saveDetails = () => {
    //     if (!name) {
    //         AppToastMessage('Please enter your name')
    //         return
    //     }
    //     if (!dob) {
    //         AppToastMessage('Please enter your date of birth')
    //         return
    //     }
    //     if (!email || !email.includes('@') || !email.includes('.com')) {
    //         AppToastMessage('Please enter valid email')
    //         return
    //     }
    //     dispatchQuickQuote("FirstName", name);
    //     dispatchQuickQuote("Dob", dob);
    //     dispatchQuickQuote("Email", email);

    // }


    const saveDetails = () => {
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
        let body = {
            name: firstName + " " + lastName,
            email,
            mobile: phone, //userProfile?.phone_number,
            // customerId: userProfile?.id
        }
        AppConst.showConsoleLog("body: ", body);

        console.log(AppConst.customerId);

        const formData = new FormData();
        formData.append("name", firstName + " " + lastName);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("dob", dob);
        formData.append("customerId", AppConst.customerId);

        createCustomerAction(formData).then(res => {
            AppConst.showConsoleLog("create customer res: ", res);
            if (res && res?.status) {
                dispatchQuickQuote("FirstName", firstName);
                dispatchQuickQuote("LastName", lastName);
                dispatchQuickQuote("Email", email);
                dispatchQuickQuote("Dob", dob);
                dispatchQuickQuote("MobileNumber", phone);
                dispatchQuickQuote("customerId", res?.data?.id);
                dispatch(SetUserData(res?.data));
                goBack();
                AppToastMessage('Profile Updated Successfully!')
            } else
                res ? AppToastMessage(res?.message) : AppToastMessage('Something went wrong')

        })

    }

    return (
        <View>
            <AppText
                text={"First Name"}
                size={16}
                style={{ paddingHorizontal: 20, paddingTop: 20 }}
            />
            <InputField
                placeholder='First Name'
                value={firstName}
                autoCapitalize={true}
                style={{ marginBottom: 0 }}
                onTextChange={(mobile) => {
                    setFirstName(mobile)
                }}
            />
            <AppText
                text={"Last Name"}
                size={16}
                style={{ paddingHorizontal: 20, paddingTop: 20 }}
            />
            <InputField
                placeholder='Last Name'
                value={lastName}
                autoCapitalize={true}

                style={{ marginBottom: 0 }}
                onTextChange={(mobile) => {
                    setLastName(mobile)
                }}
            />
            <AppText
                text={"Date of Birth (DD - MM - YYYY)"}
                size={16}
                style={{ paddingHorizontal: 20, paddingTop: 20 }}
            />
            <TouchableTextView
                placeholder='Date of Birth'
                value={dob}
                editable={false}
                style={{ marginBottom: 0 }}
                onPress={() => {
                    console.log(showDateModal);
                    setshowDateModal(true);
                }}
            />
            <AppText
                text={"Email"}
                size={16}
                style={{ paddingHorizontal: 20, paddingTop: 20 }}
            />
            <InputField
                placeholder='Email Address'
                value={email}
                keyboardType='email-address'
                style={{ marginBottom: 0 }}
                onTextChange={(mobile) => {
                    setemail(mobile)
                }}
            />
            <AppText
                text={"Mobile Number"}
                size={16}
                style={{ paddingHorizontal: 20, paddingTop: 20 }}
            />
            <InputField
                placeholder='Mobile Number'
                leftIcon={<EvilIcons name='lock' color={colors.grey} size={30} />}
                style={{ marginBottom: 0 }}
                value={phone}
                onTextChange={(mobile) => {
                    // setmobile(mobile)
                }}
                editable={false}
            />
            <Button
                title={"Save Details"}
                style={{ marginTop: 30 }}
                onPress={() => {
                    saveDetails();
                }}
            />
            {showDateModal && <DatePicker
                modal
                mode="date"
                open={true}
                date={new Date()}
                // androidVariant="iosClone"
                maximumDate={new Date()}
                theme='light'
                onConfirm={(date) => {
                    // setDate(date)
                    let d = moment(date).format("DD-MM-YYYY") //getAge(date);
                    // dispatchQuickQuote("ManufaturingDate", date.getFullYear());
                    // dispatchQuickQuote("RegistrationDate", rgDate);
                    setdob(d);
                    setshowDateModal(false);
                }}
                onCancel={() => {
                    setshowDateModal(false)
                }}
            />}
        </View>
    )
}

export default EditProfileScreen

const styles = StyleSheet.create({})