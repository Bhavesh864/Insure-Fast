import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Center, flexRow, width } from '../../styles/CommonStyling'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Foundation from 'react-native-vector-icons/Foundation'
import { colors } from '../../styles/colors'
import { AppText, HeadingText } from '../../Utility/TextUtility'
import { navigate } from '../../routes/RootNavigation'
import { useEffect } from 'react'

const RecentInsuranceList = ({ data }) => {
    return (
        <View>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={data}
                keyExtractor={(item, i) => i}
                pagingEnabled
                snapToAlignment={"center"}
                decelerationRate={0}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            style={{ ...flexRow, backgroundColor: colors.lightBlue, width: 300, marginLeft: 15, borderRadius: 18, marginTop: 15, paddingVertical: 15 }}
                            // activeOpacity={0.8}
                            onPress={() => item?.Motorcustomer ? navigate('quotationSummary', { recentQuote: item?.Motorcustomer?.motorInsurance }) : navigate('healthQuotations')}
                        >
                            <View style={{ width: 50, ...Center }}>
                                {item?.Motorcustomer ? <Ionicons name='car-sport-outline' size={30} color={colors.black} /> : <Foundation name='first-aid' size={30} color={colors.black} />}
                            </View>

                            <View style={{ width: 225 }}>
                                {item?.Motorcustomer ? <HeadingText
                                    text={`${item?.Motorcustomer?.motorInsurance.vehicle_make} ${item?.Motorcustomer?.motorInsurance?.vehicle_model} ${item?.Motorcustomer?.motorInsurance?.vehicle_variant}  (${item?.Motorcustomer?.motorInsurance?.vehicle_mfg_yr}) `}
                                    size={16}
                                    numberOfLines={1}
                                /> : <HeadingText
                                    text={`${item?.HealthCustomer?.first_name} ${item?.HealthCustomer?.last_name} (${item?.HealthCustomer.healthInsurance.policy_type})`}
                                    size={16}
                                    numberOfLines={1}
                                />}

                                {item?.Motorcustomer ? <AppText
                                    text={`3 quotes |  ₹13,836 onwards`}
                                    size={12}
                                    style={{ marginTop: 3 }}
                                /> :
                                    <View style={{ ...flexRow, overflow: 'hidden' }}>
                                        {item?.HealthCustomer?.insured_member_details.map((item, i) => {
                                            return <View key={i} style={{ flexWrap: 'wrap' }} >
                                                {i != 3 && <AppText
                                                    text={` ${item?.insurer_relation ?? 'son'} (${item?.insured_age}yr)  | `}
                                                    size={12}
                                                    style={{ marginTop: 3 }}
                                                    numberOfLines={1}
                                                />}
                                            </View>
                                        })}
                                    </View>
                                }

                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

export default RecentInsuranceList

const styles = StyleSheet.create({})