import React, { useState } from 'react'
import { Image, SafeAreaView, ScrollView, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button } from '../../../components/CustomFields'
import { AppConst, returnPrice } from '../../../constants/AppConst'
import { goBack, navigate, popToTop } from '../../../routes/RootNavigation'
import { colors } from '../../../styles/colors'
import { Center, flexRow, screenStyle, SemiMediumTextStyle } from '../../../styles/CommonStyling'
import { AppText, HeadingText } from '../../../Utility/TextUtility'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Octicons from 'react-native-vector-icons/Octicons'
import ShareQuotationEmailModal from '../../../components/modals/ShareQuotationEmailModal'


const PremiumBreakupScreen = ({ route }) => {
    const insurancePlan = route.params?.plan;
    const [showEmailModal, setshowEmailModal] = useState(null);
    const [email, setEmail] = useState(null);


    // AppConst.showConsoleLog("ins plan: ", insurancePlan);

    return (
        <View style={screenStyle}>
            <SafeAreaView style={{ flex: 1 }}>
                <PremiumBreakup
                    insurancePlan={insurancePlan}
                />
            </SafeAreaView>

            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={{ height: 55, width: '25%', backgroundColor: colors.white, alignItems: 'center', justifyContent: 'space-around', alignSelf: 'flex-start' }} onPress={() => {
                    setshowEmailModal(true);
                }}>
                    <Octicons
                        name={'share'}
                        size={25}
                        color={colors.darkGrey}
                        style={{
                            marginRight: 5
                        }}
                    />
                    <AppText text='Share' />
                </TouchableOpacity>

                <TouchableOpacity style={{ height: 55, width: '25%', backgroundColor: colors.white, alignItems: 'center', justifyContent: 'space-around', alignSelf: 'flex-start' }} onPress={() => {
                    navigate('webview');
                }}>
                    <AntDesign name="download" size={26} color={colors.darkGrey} />
                    <AppText text='Download' />
                </TouchableOpacity>

                <View style={{ borderRightWidth: 2, borderRightColor: colors.lightGrey }}></View>
                <TouchableOpacity
                    onPress={() => popToTop()}
                    style={{ height: 55, width: "50%", backgroundColor: colors.primary, ...Center, alignSelf: 'flex-end' }}>
                    <HeadingText
                        text={`Buy  ${returnPrice(insurancePlan.price)}`}
                        color={colors.white}
                    />
                </TouchableOpacity>
            </View>
            {showEmailModal &&
                <ShareQuotationEmailModal
                    title='Enter Your Email'
                    onClose={() => setshowEmailModal(false)}
                    selectedItem={email}
                    onItemSelect={(text) => {
                        setEmail(text);
                    }}
                />}

        </View >
    )
}


const PremiumBreakup = ({ insurancePlan }) => {
    const arr = [
        {
            title: "",
            data: [
                {
                    title: "EX Showroom",
                    price: returnPrice("28101.39")
                },
                {
                    title: "Min IDV",
                    price: returnPrice("45432.00")
                },
                {
                    title: "Max IDV",
                    price: returnPrice(678944),
                },
                {
                    title: "Vehicle Age",
                    price: "1"
                },
                {
                    title: "Fuel Type",
                    price: "Petrol"
                },
                {
                    title: "Cubic Capacity",
                    price: "245"
                },
                {
                    title: "Seating Capacity",
                    price: "2"
                },
            ]
        },
        {
            title: "Basic OD Premium",
            data: [
                {
                    title: "Basic OD Premium",
                    price: "284.00"
                },
                {
                    title: "(A) Total OD Premium",
                    price: "284.69"
                },

            ]
        },
        {
            title: "Discount",
            data: [
                {
                    title: "NCB (20%)",
                    price: "281.00"
                },
                {
                    title: "(B) Total Discount",
                    price: "242.00",
                }
            ]
        },
    ]
    return (
        <View style={[screenStyle, { backgroundColor: colors.off_white }]}>
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.listHeader}>
                        <Image source={insurancePlan.image} style={{ height: 80, width: 90, borderRadius: 10, marginRight: 10, resizeMode: "contain", backgroundColor: colors.white, }} />
                        <View style={{ flex: 1 }}>
                            <HeadingText
                                text={insurancePlan.name}
                                style={SemiMediumTextStyle}
                            />
                            <AppText
                                text={`Cover IDV: ${returnPrice(insurancePlan.coverValue)}`}
                                color={colors.darkGrey}
                                style={{ marginTop: 5 }}
                            />
                        </View>
                    </View>

                    <View style={{ marginTop: 10 }}>
                        {arr.map((it, ind) => {
                            return (
                                <View key={String(ind)} style={styles.section}>
                                    {it.title ?
                                        <HeadingText
                                            text={it.title}
                                            color={colors.primary}
                                            style={{ marginBottom: 10 }}
                                        />
                                        : null
                                    }
                                    {it.data.map((item, index) => {
                                        return (
                                            <View key={String(index)} style={[styles.item]}>
                                                <HeadingText
                                                    text={item.title}
                                                    size={15}
                                                    color={colors.darkGrey}
                                                    style={{ ...SemiMediumTextStyle, width: "72%" }}
                                                />
                                                <HeadingText
                                                    text={item.price}
                                                    style={SemiMediumTextStyle}
                                                    size={15}
                                                    color={colors.primary}
                                                />
                                            </View>
                                        )
                                    })}
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            </View>
            {/* <SectionList
                sections={arr}
                keyExtractor={(item, index) => String(index)}
                renderItem={({ item, index }) => {
                    return (
                        <View
                            style={[
                                styles.item,
                                // { backgroundColor: "red" },
                                index == 0 ?
                                    {
                                        paddingTop: 15,
                                        // backgroundColor: 'red',
                                        borderTopLeftRadius: 10,
                                        borderTopRightRadius: 10,
                                        // marginTop: 10
                                    } : null,
                                item.isLast ? {
                                    paddingBottom: 20,
                                    borderBottomLeftRadius: 10,
                                    borderBottomRightRadius: 10,
                                } : null
                            ]}
                        >
                            <HeadingText
                                text={item.title}
                                size={15}
                                style={{ ...SemiMediumTextStyle, width: "72%" }}
                            />
                            <HeadingText
                                text={item.type == "included" ? "INCLUDED" : returnPrice(item.price)}
                                style={SemiMediumTextStyle}
                                size={15}
                                color={item.type == "included" ? colors.primary : colors.darkGrey}
                            />
                        </View>
                    )
                }}
                renderSectionHeader={({ section: { title } }) => (
                    <HeadingText
                        text={title}
                        style={{ backgroundColor: colors.white, padding: 20 }}
                    />
                )}
                ListFooterComponent={() => {
                    return (
                        <View style={{ paddingVertical: 10 }}>
                            <View style={[styles.item, { backgroundColor: undefined }]}>
                                <HeadingText
                                    text={"Total payable amount:"}
                                    // size={15}
                                    style={{ ...SemiMediumTextStyle, width: "72%" }}
                                />
                                <HeadingText
                                    text={returnPrice(218121.09)}
                                    style={SemiMediumTextStyle}
                                    size={15}
                                // color={colors.darkGrey}
                                />
                            </View>
                            <View style={{ margin: 20 }}>
                                <Button
                                    title='Cancel'
                                    backgroundColor={colors.off_white}
                                    style={{ borderRadius: 30 }}
                                    textColor={colors.black}
                                    onPress={() => goBack()}
                                />
                            </View>
                        </View>
                    )
                }}
            /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        // margin: 20,
        marginVertical: 0,
        // padding: 20,
        // backgroundColor: colors.off_white,
        // borderRadius: 10,
        ...flexRow,
        paddingVertical: 10,
        // paddingBottom: 20
    },
    listHeader: {
        margin: 20,
        marginVertical: 10,
        padding: 20,
        backgroundColor: colors.white,
        borderRadius: 10,
        ...flexRow,
    },
    section: {
        margin: 10,
        backgroundColor: colors.white,
        padding: 20,
        borderRadius: 10,
        marginHorizontal: 20
    }
})

export default PremiumBreakupScreen