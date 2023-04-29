import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { screenStyle } from '../../../styles/CommonStyling'
import { AppText, HeadingText } from '../../../Utility/TextUtility'
import { Button, InputField } from '../../../components/CustomFields'
import { colors } from '../../../styles/colors'
import { AppConst, BaseValidation } from '../../../constants/AppConst'
import { AppToastMessage } from '../../../components/custom/SnackBar'
import { navigate } from '../../../routes/RootNavigation'


const TwoWheelerRegNumberScreen = () => {
    const [regNum, setRegNum] = useState("");

    const onContinue = () => {
        let num = regNum.trim().toUpperCase();
        let registrationNum = ""
        for (let i = 0; i < num.length; i++) {
            const st = num[i];
            registrationNum = registrationNum + st.trim()
        }
        const validation = BaseValidation.registrationNumber.test(registrationNum) || BaseValidation.BHRegistrationNumber.test(registrationNum)
        // const BA_Validation = BaseValidation.registrationNumber.test(num)
        AppConst.showConsoleLog(registrationNum, validation);
        if (!validation) {
            AppToastMessage("Please enter valid registration number");
            return;
        }
        // dispatchQuickQuote("IsVehicleNew", false);
        // dispatchQuickQuote("RegistrationNumber", regNum);
        navigate("twoWheelerPolicyForm", { isNew: false });
    }

    return (
        <View style={screenStyle}>
            <Text style={{ margin: 20, }}>
                <AppText
                    text={"Renew your two - wheeler \ninsurance in "}
                    size={18}
                    style={{ lineHeight: 22 }}
                />
                <HeadingText
                    text={"60 seconds!"}
                    size={18}
                />
            </Text>
            <View style={{ marginVertical: 20 }}>
                <InputField
                    placeholder='Enter bike Number (eg. DL-10-AB-1234)'
                    value={regNum}
                    maxLength={13}
                    autoCapitalize={"characters"}
                    onTextChange={setRegNum}
                />
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigate("twoWheelerPolicyForm", { isNew: true })} style={{ marginHorizontal: 20, padding: 2, top: -5 }}>
                    <AppText
                        text={"Don't have bike number?"}
                        color={colors.primary}
                    />
                </TouchableOpacity>
            </View>
            <View>
                <Button
                    title={"Continue"}
                    onPress={onContinue}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({});

export default TwoWheelerRegNumberScreen