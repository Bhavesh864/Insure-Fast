import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../../styles/colors'
import { Center, flexRow, fonts, height, width } from '../../styles/CommonStyling'
import { shadows } from '../../styles/shadow'
import { AppText, HeadingText } from '../../Utility/TextUtility'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const AllocatedMentorComponent = ({ item }) => {
    return (
        <View style={styles.tabCont}>
            <View style={{ padding: 20, flexDirection: "row" }}>
                <TouchableOpacity activeOpacity={1}>
                    <Image source={require("../../assets/images/profile.png")} style={{ height: 55, width: 55, resizeMode: "contain" }} />
                </TouchableOpacity>

                <View style={{ flex: 1, paddingLeft: 15 }}>
                    <HeadingText
                        text={`${item?.item?.customer?.first_name} ${item?.item?.customer?.last_name}`}
                        size={16}
                        style={{}}
                    />

                    <View style={{ paddingTop: 6, marginLeft: 3 }}>
                        <View style={[flexRow]}>
                            <Ionicons name='call-outline' size={18} color={colors.darkGrey} />
                            <AppText
                                text={item?.item?.customer?.phone}
                                size={14}
                                color={colors.darkGrey}
                                style={{ paddingLeft: 10 }}
                            />
                        </View>
                        <View style={[flexRow]}>
                            <AntDesign name='mail' size={15} color={colors.darkGrey} />
                            <AppText
                                text={item?.item?.customer?.email}
                                size={14}
                                color={colors.darkGrey}
                                style={{ paddingLeft: 10, paddingTop: 3 }}
                            />
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 3 }}>
                            <Ionicons name='car-sport-outline' size={18} color={colors.darkGrey} />
                            <AppText text={`  ${item?.item?.customer?.motorInsurance?.vehicle_type}, ${item?.item?.customer?.motorInsurance?.vehicle_make},  ${item?.item?.customer?.motorInsurance?.vehicle_model} ${item?.item?.customer?.motorInsurance?.vehicle_variant}`} color={colors.darkGrey} />
                        </View>

                        {/* <View style={{ ...flexRow, marginTop: 3, marginLeft: 5 }}>
                            <AppText text={item?.item?.customer?.motorInsurance?.vehicle_variant} color={colors.darkGrey} />
                        </View> */}

                        <View style={{ flexDirection: 'row', marginTop: 3 }}>
                            <MaterialIcons name='event-note' size={18} color={colors.darkGrey} />
                            <AppText text={`  ${item?.item?.status}`} color={colors.primary} style={{ textTransform: 'capitalize' }} />
                        </View>

                    </View>

                    <View style={{ marginTop: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <AppText text={`Approved By: `} color={colors.darkGrey} style={{ textTransform: 'capitalize' }} />
                            <HeadingText
                                text={`${item?.item?.user?.name} `}
                                size={16}
                                style={{}}
                            />
                        </View>

                        <View style={[flexRow, { marginLeft: 5, marginVertical: 2 }]}>
                            <AntDesign name='mail' size={15} color={colors.darkGrey} />
                            <AppText
                                text={item?.item?.user?.email}
                                size={14}
                                color={colors.darkGrey}
                                style={{ paddingLeft: 10, paddingTop: 3 }}
                            />
                        </View>

                        <View style={[flexRow, { marginLeft: 5 }]}>
                            <Ionicons name='call-outline' size={18} color={colors.darkGrey} />
                            <AppText
                                text={item?.item?.user?.phone_number}
                                size={14}
                                color={colors.darkGrey}
                                style={{ paddingLeft: 10 }}
                            />
                        </View>
                    </View>
                </View>




            </View>
            <View style={{ borderBottomWidth: 0.6, marginHorizontal: 20 }}>

            </View>
        </View >
    )
}

export default AllocatedMentorComponent

const styles = StyleSheet.create({
    item: {
        padding: 20,
        borderColor: colors.grey,
        ...flexRow
    },
    iconView: {
        height: 30,
        width: 30,
        ...Center,
        borderRadius: 20,
        backgroundColor: colors.primaryLight,
        marginRight: 10
    },
    tabCont: {

    },
    tabOption: {
        justifyContent: 'center',
        flex: 1,
        margin: 2,
        borderRadius: 5,
        paddingHorizontal: 10
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