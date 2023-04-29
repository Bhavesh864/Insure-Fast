import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { AppIconLogoSvg } from '../../assets/svg/basicSvgs'
import { LoginOptionsComponent, WelcomeInsureComponent } from '../../components/auth/AppReUsableComponents'
import { screenStyle } from '../../styles/CommonStyling'


const LoginOptionsScreen = () => {

    return (
        <View style={screenStyle}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ padding: 20, marginTop: 20 }}>
                    <WelcomeInsureComponent />
                </View>
                <View style={{ flex: 1, justifyContent: "center", marginBottom: 30 }}>
                    <Image source={require("../../assets/images/insureFastLogo.png")} style={{ height: 100, width: 190, resizeMode: "contain", alignSelf: "center" }} />
                    {/* <View style={{ alignSelf: "center", marginBottom: 20 }}>
                        <AppIconLogoSvg scale={0.8} />
                    </View> */}
                    <View>
                        <LoginOptionsComponent />
                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}


const styles = StyleSheet.create({})

export default LoginOptionsScreen