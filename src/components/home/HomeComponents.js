import React from 'react'
import { FlatList, Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import { HamburgerSvgIcon } from '../../assets/svg/basicSvgs'
import Ionicons from "react-native-vector-icons/Ionicons";
import { insuranceTypesArr } from '../../constants/OtherConst'
import { navigate } from '../../routes/RootNavigation'
import { colors } from '../../styles/colors'
import { Center, flexRow, width } from '../../styles/CommonStyling'
import { AppText, HeadingText } from '../../Utility/TextUtility'
import { dispatchQuickQuote } from '../../store/actions/PolicyAction';
import { AppConst } from '../../constants/AppConst';
import { useSelector } from 'react-redux';



export const HomeHeader = ({ screen }) => {
    const userData = useSelector(state => state.motor?.apiRequestQQ);

    return (
        <View style={styles.header}>
            {/* <View style={styles.nameLetterView}>
                <View style={{ backgroundColor: colors.primary, borderRadius: 30, flex: 1, ...Center }}>
                    <HeadingText text={"F"} />
                </View>
            </View> */}
            <View style={{ flex: 1, paddingHorizontal: 10 }}>
                <HeadingText
                    text={screen == 'policy' ? 'Policies Details' : `Hi,  ${userData?.FirstName ? userData?.FirstName + ' ' + userData?.LastName : ''}`}
                    size={18}
                    color={colors.primary}
                />
                <AppText
                    text={screen == 'policy' ? 'Policies made by you' : "How have you been?"}
                    color={colors.darkGrey}
                />
            </View>
            {/* <HamburgerSvgIcon /> */}
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigate("notification")} style={styles.notificationIcon}>
                <Ionicons name="notifications-outline" size={24} color={colors.primary} />
            </TouchableOpacity>
        </View>
    )
}


export const YourPolicies = () => {
    return (
        <View style={styles.myPolicyView}>
            <HeadingText
                text="Your policies"
            />
            <AppText
                text="Manage your insurance policies & renewals"
                style={{ marginVertical: 10 }}
                color={colors.darkGrey}
            />
            <View style={styles.btnCont}>
                <TouchableOpacity activeOpacity={0.8} style={styles.btn}>
                    <AppText
                        text="Recent"
                        size={15}
                        color={colors.primary}
                    />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={styles.btn}>
                    <AppText
                        text="Inactive"
                        size={15}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}


export const HomeScreenBanner = ({ onOptionPress }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.4}
            onPress={() => {
                onOptionPress('healthInsuranceFor', {}, 'HEALTH')
            }} style={styles.bannerCont}>
            <View style={{ flex: 1, }}>
                <HeadingText
                    text="Family Life Insurance"
                    color={colors.darkGreen}
                />
                <AppText
                    text={"On Term Premium"}
                    style={{ paddingVertical: 5 }}
                    color={colors.darkGrey}
                />
                <TouchableOpacity
                    onPress={() => {
                        onOptionPress('healthInsuranceFor', {}, 'HEALTH')
                    }}
                    style={styles.smallBtn}>
                    <AppText
                        text='View Plans'
                        color={colors.white}
                    />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
                <Image source={require("../../assets/images/banners/banner1.png")} style={styles.bannerContImg} />
            </View>
        </TouchableOpacity>
    )
}


export const AvailableInsuranceComponent = ({ onOptionPress }) => {
    const cardWidth = ((width - 80) / 4);
    const cardImageViewHeight = 80

    return (
        <View>
            <HeadingText
                text="Let's get you & your family insured"
                style={{ padding: 20, paddingVertical: 10 }}
            />
            <View style={{ flexDirection: 'row', flexWrap: "wrap", marginHorizontal: 10, paddingBottom: 20 }}>
                {insuranceTypesArr.map((item, index) => {
                    return (
                        <TouchableOpacity key={String(index)} activeOpacity={0.8} onPress={() => onOptionPress(item.key, item.payloads, item.name)} style={[styles.cardView, { width: cardWidth }]}>
                            <View style={[styles.cardImageView, { height: cardImageViewHeight }]}>
                                {/* {item.icon} */}
                                {/* <HealthInsuranceSvgIcon/> */}
                                <Image source={item.image} style={{ height: 50, width: cardWidth - 20, resizeMode: "contain" }} />
                            </View>
                            {item.name ? <AppText
                                text={item.name}
                                style={{ textAlign: "center" }}
                                size={12}
                            /> : null}
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
    )
}


export const HowInsuranceWorkComponent = ({ onOptionPress }) => {
    let arr = [
        {
            title: "Are your parents nearing 60?",
            text: "Be ready with health insurance for your parents",
            image: require("../../assets/images/banners/workBanner1.png"),
            backgroundColor: "#ACFCE1",
            textColor: colors.primary
        },
        {
            title: "Be Smart Insurance",
            text: "Be ready with health insurance for your parents",
            image: require("../../assets/images/banners/workBanner1.png"),
            backgroundColor: "#D0C7FE",
            textColor: "#274BAE"
        }
    ]

    return (
        <View style={{ backgroundColor: colors.off_white, marginVertical: 20, paddingBottom: 20 }}>
            <HeadingText
                text={"How insurance works for you"}
                style={{ padding: 20 }}
            />
            <FlatList
                data={arr}
                keyExtractor={(a, b) => String(b)}
                contentContainerStyle={{ paddingHorizontal: 10 }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            activeOpacity={0.4}
                            onPress={() => { onOptionPress('healthInsuranceFor', item.payloads, 'HEALTH') }}
                            style={{ height: 170, width: 280, padding: 20, ...flexRow, marginHorizontal: 10, borderRadius: 10, backgroundColor: item.backgroundColor }}>
                            <View style={{ flex: 1 }}>
                                <HeadingText
                                    text={item.title}
                                    size={16}
                                    color={item.textColor}
                                />
                                <AppText
                                    text={item.text}
                                    style={{ marginVertical: 5 }}
                                />
                                <TouchableOpacity
                                    onPress={() => { onOptionPress('healthInsuranceFor', item.payloads, 'HEALTH') }}
                                    style={[styles.smallBtn, { backgroundColor: colors.white }]}>
                                    <AppText
                                        text='Explore Now'
                                        color={colors.primary}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Image source={item.image} style={{ height: 90, width: 100, resizeMode: "contain" }} />
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        padding: 20,
        backgroundColor: colors.white
    },
    nameLetterView: {
        height: 40,
        width: 40,
        borderRadius: 30,
        padding: 2,
        borderWidth: 1,
        borderColor: colors.darkGreen
    },
    myPolicyView: {
        padding: 20,
        margin: 20,
        backgroundColor: colors.primaryLight,
        borderRadius: 15
    },
    btnCont: {
        ...flexRow,
        justifyContent: "space-between",
        marginVertical: 10
    },
    btn: {
        width: "48%",
        height: 45,
        backgroundColor: colors.white,
        ...Center,
        borderRadius: 10
    },
    bannerContImg: {
        resizeMode: "contain",
        height: 120,
        width: 140
    },
    bannerCont: {
        padding: 20,
        margin: 20,
        borderRadius: 20,
        backgroundColor: colors.primaryLight,
        ...flexRow,
        paddingRight: 5,
        marginTop: 0
    },
    cardView: {
        // height: 130,
        margin: 8,
        marginHorizontal: 6
    },
    cardImageView: {
        height: 110,
        borderRadius: 10,
        ...Center,
        backgroundColor: colors.lightBlue
    },
    notificationIcon: {
        height: 35,
        width: 35,
        ...Center,
        borderWidth: 0.5,
        borderColor: colors.primary,
        borderRadius: 5
    },
    smallBtn: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: colors.primary,
        borderRadius: 10,
        alignSelf: "flex-start"
    }
})