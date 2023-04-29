import React from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Center, flexRow, screenStyle } from '../../../styles/CommonStyling'
import { colors } from '../../../styles/colors'
import { AppText, HeadingText } from '../../../Utility/TextUtility'
import { healthInsurancePlansArr } from '../../../constants/OtherConst'
import { returnPrice } from '../../../constants/AppConst'
import { Button } from '../../../components/CustomFields'


const HealthQuotationsScreen = () => {

    return (
        <View style={screenStyle}>
            <View style={styles.header}>
                <View style={[flexRow, { padding: 10, backgroundColor: "#1AA978", borderRadius: 10 }]}>
                    <View style={{ height: 7, width: 7, borderRadius: 10, backgroundColor: colors.white, marginRight: 10 }} />
                    <AppText
                        text={"Quotation No: " + "GFDCVB098765JHM98"}
                        color={colors.white}
                    />
                </View>
            </View>

            <View style={[{ flex: 1, backgroundColor: colors.off_white }]}>
                <ScrollView style={{ flex: 1 }}>
                    <PlansList />
                </ScrollView>
            </View>
        </View>
    )
}

const PlansList = () => {
    return (
        <View>
            {healthInsurancePlansArr.map((item, index) => {
                return (
                    <View key={String(index)} style={styles.plan}>

                        <View style={[flexRow, { paddingHorizontal: 10 }]}>
                            <Image source={item.image} style={{ height: 80, width: 100, resizeMode: "contain" }} />
                            <View style={{ marginLeft: 20 }}>
                                <AppText
                                    text={item.name}
                                    size={18}
                                />
                                <AppText
                                    text={`Cover: ${returnPrice(item.price)}`}
                                    style={{ marginTop: 1 }}
                                    color={colors.darkGrey}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 0 }}>
                            {item.featuresArr.map((it, ind) => {
                                return (
                                    <View key={String(ind)} style={{ height: 35, paddingHorizontal: 10, borderRadius: 10, borderWidth: 1, borderColor: colors.lightGrey, ...Center, margin: 5 }}>
                                        <AppText
                                            text={it}
                                            color={colors.darkGrey}
                                        />
                                    </View>
                                )
                            })}
                        </View>
                        <View style={{ paddingHorizontal: 10 }}>
                            <HeadingText
                                text={"Individual Health Protector"}
                                size={16}
                                style={{ marginVertical: 5 }}
                            />
                            <AppText
                                text={"Tenure: " + "1 Year"}
                                color={colors.darkGrey}
                                style={{ marginBottom: 5 }}
                            />
                            <AppText
                                text={"Policy Wording"}
                                color={colors.darkGrey}
                            />
                        </View>
                        <View style={[flexRow, { justifyContent: "space-between", marginTop: 10 }]}>
                            <Button
                                title={"Add to compare"}
                                style={{ width: "47%", borderWidth: 1, borderColor: colors.primary }}
                                backgroundColor={colors.white}
                                textColor={colors.primary}
                            />
                            <Button
                                title={`${returnPrice(item.price)}/month`}
                                style={{ width: "47%" }}
                            />
                        </View>

                    </View>
                )
            })}
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        padding: 20,
        backgroundColor: colors.primary
    },
    plan: {
        marginVertical: 10,
        marginHorizontal: 20,
        padding: 20,
        backgroundColor: colors.white,
        borderRadius: 10,
        paddingHorizontal: 10
    }
})

export default HealthQuotationsScreen