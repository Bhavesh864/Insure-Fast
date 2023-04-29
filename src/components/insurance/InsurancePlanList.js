import React from 'react'
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { returnPrice } from '../../constants/AppConst'
import { insurancePlans } from '../../constants/OtherConst'
import AntDesign from "react-native-vector-icons/AntDesign"
import { navigate } from '../../routes/RootNavigation'
import { colors } from '../../styles/colors'
import { Center, SemiMediumTextStyle, flexRow } from '../../styles/CommonStyling'
import { shadows } from '../../styles/shadow'
import { AppText, HeadingText } from '../../Utility/TextUtility'


const InsurancePlanList = () => {

    return (
        <View style={{ paddingBottom: 40 }}>
            {insurancePlans.map((item, index) => {
                return (
                    <View key={String(index)}>
                        <PlanCard
                            item={item}
                        />
                    </View>

                )
            })}
        </View>
    )
}

const PlanCard = ({ item }) => {
    return (
        <View style={[styles.cardStyle, shadows[1]]}>
            <View style={[flexRow]}>
                <Image source={item.image} style={styles.insImg} />
                <View>
                    <HeadingText
                        text={item.name}
                    />
                    <AppText
                        text={"IDV: " + returnPrice(item.coverValue)}
                    />
                </View>
            </View>

            <View style={{ ...flexRow, justifyContent: "space-between", marginTop: 10 }}>
                <View>
                    <HeadingText
                        text={"Basic Price: " + returnPrice(item.price)}
                        size={15}
                    />
                    <HeadingText
                        text={"Cover for 1 Year"}
                        size={15}
                        color={colors.darkGrey}
                        style={{ top: 4 }}
                    />
                </View>
                <View>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigate("premiumBreakup", { plan: item })} style={styles.buyNowBtn}>
                        <HeadingText
                            text={returnPrice(item.price)}
                            size={16}
                            color={colors.white}
                            style={{ flex: 1, textAlign: "center" }}
                        />
                        <AntDesign name="arrowright" size={20} color={colors.white} style={{ right: 7 }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignSelf: "center", padding: 5, flexDirection: 'row' }} onPress={() => navigate("premiumBreakup", { plan: item })}>
                        <AppText
                            text={"View Details"}
                        />
                        <AntDesign name="arrowright" size={20} color={colors.darkGrey} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    cardStyle: {
        padding: 10,
        backgroundColor: colors.white,
        borderRadius: 10,
        marginHorizontal: 20,
        marginVertical: 10
        // height: 260,
        // width: 210
    },
    insImg: {
        height: 50,
        width: 80,
        resizeMode: "contain",
        marginRight: 10
    },
    buyNowBtn: {
        height: 40,
        width: 120,
        backgroundColor: colors.primary,
        borderRadius: 10,
        ...Center,
        ...flexRow
    },
    coverView: {
        padding: 7,
        borderRadius: 5,
        backgroundColor: colors.lightYellow,
        margin: 5
    },
    cardSubBtn: {
        padding: 5,
        borderColor: colors.lightGrey
    }
});

export default InsurancePlanList