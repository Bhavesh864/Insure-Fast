import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { colors } from '../../styles/colors'
import { Center, fonts, smallTextSize, width } from '../../styles/CommonStyling'
import { AppText } from '../../Utility/TextUtility'
// import { colors } from '../../../styles/color'
// import { commonTextStyle, fonts, smallTextSize } from '../../../styles/CommonStyling'
// import { screenWidth } from '../../../styles/ResponsiveLayout'


const TimelineComponent = ({ doneIndex = 1 }) => {

    const nullValue = "1970-01-01"

    const linewidth = width / 6;

    const status = [
        {
            status: "Placed",
            done: doneIndex >= 1, //detail.payment_status == "pending" || detail.status == "confirmed" || detail.payment_status == "completed" ? true : false,

        },
        {
            status: "Payment",
            done: doneIndex >= 2,
        },
        {
            status: "Check in",
            done: doneIndex >= 3,
        },

    ]

    // console.log("status", screenWidth / 25)
    return (
        <View style={{ alignSelf: "center" }}>
            <View style={{ flexDirection: "row", justifyContent: "center", }}>
                {status.map((item, index) => {
                    return (
                        <View key={String(index)} style={{ marginVertical: 20, alignItems: "center", left: index == 0 ? 1 : 0, }}>
                            <View style={{ flexDirection: "row", alignItems: "center", right: index == 4 ? 10 : 0 }}>
                                {index !== 0 && <View
                                    style={{
                                        width: linewidth,
                                        height: 3,
                                        backgroundColor: item.done ? colors.primary : colors.grey,
                                    }}
                                />}
                                {/* <View style={{ padding: 0, borderWidth: 0.5, borderColor: colors.grey, borderRadius: 30 }}> */}
                                <View style={{ padding: 5, backgroundColor: item.done ? colors.primary : colors.white, borderRadius: 20, height: 30, width: 30, ...Center, borderColor: colors.grey, borderWidth: 0.8 }}>
                                    {/* <AntDesign name='check' size={15} color={colors.white} /> */}
                                    <AppText
                                        text={index + 1}
                                        size={16}
                                        color={item.done ? colors.white : colors.darkGrey}
                                    />
                                </View>
                                {/* </View> */}
                                {index !== status.length - 1 && <View
                                    style={{
                                        width: linewidth,
                                        height: 3,
                                        backgroundColor: item.done ? colors.primary : colors.grey,
                                    }}
                                />}
                            </View>
                        </View>
                    )
                })}

            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    status: {
        ...smallTextSize,
        fontFamily: fonts.medium,
        color: colors.black,
        fontSize: 10,
        textAlign: "center"
    },
    dateTxt: {
        ...smallTextSize,
        color: colors.black,
        fontSize: 9,
        marginTop: 2
        // alignSelf: "flex-start",
        // left: -5
    }
});

export default TimelineComponent;