import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { AvailableInsuranceComponent, HomeHeader, HomeScreenBanner, HowInsuranceWorkComponent } from '../../components/home/HomeComponents'
// import HomeHeader from '../../components/home/HomeHeader'
import { colors } from '../../styles/colors'
import { Center, flexRow, screenStyle, width } from '../../styles/CommonStyling'
import { AppText, HeadingText } from '../../Utility/TextUtility'
import { useDispatch } from 'react-redux'
import { getUserProfileData } from '../../store/actions/UserAction'
import { CustomSafeAreaView } from '../../styles/SafeAreaCustomView'
import { createCustomerAction, getRecentSearchedQuote } from '../../store/actions/PolicyAction'
import { navigate } from '../../routes/RootNavigation'


const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [recentQuote, setrecentQuote] = useState(null);

    useEffect(() => {
        dispatch(getUserProfileData());
        navigation.addListener('focus', () => {
            getRecentSearchedQuote().then(res => {
                // console.log('hello', res?.data == []);
                if (res?.status && res?.data) {
                    setrecentQuote(res?.data[0]?.customer?.motorInsurance || false);
                }
            })
        });
    }, []);


    return (
        <View style={screenStyle}>
            <CustomSafeAreaView >
                <HomeHeader />
                <View style={{ flex: 1 }}>
                    <ScrollView style={{ flex: 1 }}>
                        <HomeScreenBanner />
                        <AvailableInsuranceComponent
                        />
                        {recentQuote &&
                            <View>
                                <HeadingText
                                    text="Continue with your last search"
                                    style={{ paddingHorizontal: 20, paddingTop: 20 }}
                                />
                                <TouchableOpacity activeOpacity={0.8} onPress={() => navigate("quotationSummary", { recentQuote })} style={styles.claimReqCont}>
                                    <View>
                                        <Image source={require("../../assets/images/other/flagFill.png")} style={styles.flagImg} />
                                    </View>
                                    <View>
                                        <HeadingText
                                            text={`${recentQuote?.vehicle_make} ${recentQuote?.vehicle_model} ${recentQuote?.vehicle_variant} (${recentQuote?.vehicle_mfg_yr})`}
                                            size={13}
                                        />
                                        <AppText
                                            text={`3 quotes |  ₹13,836 onwards`}
                                            style={{ top: -1 }}
                                            size={12}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>}
                        <HowInsuranceWorkComponent />
                    </ScrollView>
                </View>
            </CustomSafeAreaView>
        </View>
    )
}



const styles = StyleSheet.create({
    item: {
        padding: 20,
        borderColor: colors.grey,
        ...flexRow
    },
    tabCont: {
        flexDirection: "row",
        height: 45,
        margin: 20,
        // width: "90%",
        backgroundColor: colors.lightGrey,
        borderRadius: 5
    },
    tabOption: {
        flex: 1,
        ...Center,
        margin: 2,
        borderRadius: 5
    },
    claimReqCont: {
        height: 70,
        marginHorizontal: 20,
        backgroundColor: colors.lightBlue,
        ...flexRow,
        borderRadius: 15,
        paddingHorizontal: 20,
        marginVertical: 10
    },
    flagImg: {
        height: 22,
        width: 22,
        resizeMode: 'contain',
        transform: [{ rotate: "12deg" }],
        marginRight: 15
    },
    spacer: {
        height: 20,
        width: width,
        backgroundColor: colors.off_white,
        marginVertical: 20
    }
})

export default HomeScreen