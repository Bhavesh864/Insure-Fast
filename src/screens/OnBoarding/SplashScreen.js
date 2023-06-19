import React, { useEffect } from 'react'
import { Image, StyleSheet, StatusBar, View, SafeAreaView } from 'react-native'
import { useDispatch } from 'react-redux'
import { AppIconLogoSvg, PolygonLeftSvg, PolygonRightSvg } from '../../assets/svg/basicSvgs'
import { AsyncLogin } from '../../store/actions/AppAction'
import { colors } from '../../styles/colors'
import { Center, screenStyle } from '../../styles/CommonStyling'
import { CustomSafeAreaView } from '../../styles/SafeAreaCustomView'
import { AppText } from '../../Utility/TextUtility'


const SplashScreen = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // StatusBar.setBackgroundColor('#fff');
        // StatusBar.setTranslucent(true)
        // StatusBar.setBarStyle('dark-content')

        setTimeout(() => {
            dispatch(AsyncLogin());
        }, 2000);
    }, [])

    return (
        <CustomSafeAreaView>
            <View style={styles.cont}>
                <View>
                    {/* <AppIconLogoSvg /> */}
                    <Image source={require("../../assets/images/insureFastLogo.png")} style={{ height: 150, width: 250, resizeMode: "contain" }} />
                </View>
            </View>
            <AppText text='Version: 1.1.1' style={{ margin: 20, alignSelf: 'center' }} size={20} />
        </CustomSafeAreaView>
    )
}


const styles = StyleSheet.create({
    cont: {
        ...screenStyle,
        ...Center,
    },
    logoImg: {
        height: 200,
        width: 250,
        resizeMode: "contain",
    }
})

export default SplashScreen