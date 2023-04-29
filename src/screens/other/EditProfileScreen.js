import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button, InputField, TouchableTextView } from '../../components/CustomFields'
import { AppText } from '../../Utility/TextUtility'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import DatePicker from 'react-native-date-picker'
import moment from 'moment'
import { goBack } from '../../routes/RootNavigation'
import { AppToastMessage } from '../../components/custom/SnackBar'

const EditProfileScreen = () => {
    const userProfile = useSelector(state => state.user?.user);
    const [name, setname] = useState('Florence Jast');
    const [dob, setdob] = useState('21-01-2001');
    const [email, setemail] = useState('florenceJase@gmail.com');
    const [mobile, setmobile] = useState(userProfile?.phone);
    const [showDateModal, setshowDateModal] = useState(null);

    return (
        <View>
            <AppText
                text={"Your Name"}
                size={16}
                style={{ paddingHorizontal: 20, paddingTop: 20 }}
            />
            <InputField
                placeholder='Name'
                value={name}
                style={{ marginBottom: 0 }}
                onTextChange={(mobile) => {
                    setname(mobile)
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
                onTextChange={(mobile) => {
                    setdob(mobile)
                }}
                onPress={() => {
                    setshowDateModal(true);
                }}
            />
            <AppText
                text={"Email"}
                size={16}
                style={{ paddingHorizontal: 20, paddingTop: 20 }}
            />
            <InputField
                placeholder='Email'
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
                style={{ marginBottom: 0 }}
                value={mobile}
                onTextChange={(mobile) => {
                    // setmobile(mobile)
                }}
                editable={false}
            />
            <Button
                title={"Save Details"}
                style={{ marginTop: 30 }}
                onPress={() => {
                    if (!name) {
                        AppToastMessage('Please enter your name')
                        return
                    }
                    if (!dob) {
                        AppToastMessage('Please enter your date of birth')
                        return
                    }
                    if (!email) {
                        AppToastMessage('Please enter your email')
                        return
                    }
                    goBack();
                    AppToastMessage('Profile Updated Successfully!')
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