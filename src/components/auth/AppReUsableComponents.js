import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AppText, HeadingText } from '../../Utility/TextUtility'
import { FamilyIconSvg } from '../../assets/svg/other/FamilyIconSvg'
import { Button } from '../CustomFields'
import { colors } from '../../styles/colors'
import { PhoneSvgIcon, WhatsAppSvgIcon } from '../../assets/svg/basicSvgs'
import { navigate } from '../../routes/RootNavigation'





export const WelcomeInsureComponent = ({ subText = "Please enter the details to begin" }) => {

    return (
        <View>
            <View style={{ alignSelf: "center" }}>
                <FamilyIconSvg />
                <Text style={{ maxWidth: "70%", marginTop: 20, textAlign: "center", alignSelf: "center" }}>
                    <HeadingText
                        text='Start managing all your Finances '
                        style={{}}
                        size={18}
                    />
                    <HeadingText
                        text='with ease'
                        style={{}}
                        size={18}
                    />
                </Text>
            </View>
        </View>
    )
}



export const LoginOptionsComponent = () => {
    return (
        <View style={{ margin: 20 }}>
            <Button
                title={"Login via WhatsApp"}
                icon={<WhatsAppSvgIcon style={{ marginRight: 10 }} />}
            />
            <View>
                <AppText
                    text='---------------------------- OR ----------------------------'
                    color={colors.darkGrey}
                    style={{ textAlign: "center", marginVertical: 10 }}
                />
            </View>
            <Button
                title={"Login via Mobile Number"}
                icon={<PhoneSvgIcon style={{ marginRight: 10 }} />}
                onPress={() => navigate("login")}
            />
        </View>
    )
}



const styles = StyleSheet.create({
    logoImg: {
        height: 70,
        width: 150,
        resizeMode: "contain"
    }
})