import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import AllocatedMentorComponent from '../../components/insurance/AllocatedMentorComponent';
import { useState } from 'react';
import { getAllocatedMentor } from '../../store/actions/PolicyAction';

const AllocatedMentorScreen = () => {
    const [List, setList] = useState(null);

    useEffect(() => {
        getAllocatedMentor().then(res => {
            // console.log('item', res);
            if (res?.status) {
                setList(res?.data)
            } else {
                setList([])
            }
        })
    }, [])

    if (List && List.length == 0) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>No Previous Calls!</Text>
                <Text style={{ fontSize: 16, paddingHorizontal: 30, textAlign: 'center' }}>Details of you calls with our advisors will be shown here</Text>
            </View >
        )
    } else {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={List}
                    keyExtractor={(item, index) => index}
                    renderItem={(item, index) => {
                        return <AllocatedMentorComponent item={item} />
                    }}
                />
            </View>
        )
    }
}

export default AllocatedMentorScreen

const styles = StyleSheet.create({})