import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getDetailsOfRequestedClaim } from '../../store/actions/PolicyAction'
import { TouchableTextView } from '../../components/CustomFields'

const ClaimDetailsScreen = ({ route }) => {
    const list = route?.params?.item;
    const [claimDetailList, setclaimDetailList] = useState(list);

    return (
        <View style={{ marginTop: 20 }}>
            <TouchableTextView
                label={"Name"}
                placeholder={'vehicleData?.MakeName'}
                value={list?.customer_name}
                onPress={() => { }}
            />
            <TouchableTextView
                label={"Email"}
                placeholder={"Vehicle Model"}
                value={list?.customer_email}
                onPress={() => { }}
            />
            <TouchableTextView
                label={"Mobile Number"}
                placeholder={"Select Manufacturer date"}
                value={list?.mobile_number}
                onPress={() => { }}
            />
            {/* <TouchableTextView
                label={"Employee code"}
                placeholder={"Select Manufacturer date"}
                value={list?.employe_code}
                onPress={() => { }}
            /> */}
            <TouchableTextView
                label={"Product Type"}
                placeholder={"Select Manufacturer date"}
                value={list?.product_type}
                onPress={() => { }}
            />
            <TouchableTextView
                label={"Query Type"}
                placeholder={"Select Manufacturer date"}
                value={list?.query_type}
                onPress={() => { }}
            />
        </View>
    )
}

export default ClaimDetailsScreen

const styles = StyleSheet.create({})