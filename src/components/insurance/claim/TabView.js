import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AppText } from '../../../Utility/TextUtility';
import { colors } from '../../../styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllClaimOfCustomer } from '../../../store/actions/PolicyAction';
import { shadows } from '../../../styles/shadow';
import { Center, fonts } from '../../../styles/CommonStyling';

const TabView = ({ activeTab, setActiveTab, setclaimData }) => {
    const options = [
        {
            title: 'Your Plans',
            key: 'plan',
        },
        {
            title: 'Track claims',
            key: 'claim',
        },
    ];
    return (
        <View style={styles.tabCont}>
            {options.map((item, index) => (
                <TouchableOpacity
                    key={String(index)}
                    activeOpacity={0.8}
                    onPress={async () => {
                        setActiveTab(item.key);
                        if (item.key == 'claim') {
                            const customerId = await AsyncStorage.getItem('customerid');
                            await getAllClaimOfCustomer(customerId).then(res => {
                                if (res?.status) {
                                    setclaimData(res?.data);
                                } else {
                                    setclaimData([]);
                                }
                            });
                        }
                    }}
                    style={[
                        styles.tabOption,
                        activeTab == item.key
                            ? {
                                backgroundColor: colors.white,
                                ...shadows[1],
                            }
                            : null,
                    ]}>
                    <AppText
                        text={item.title}
                        color={activeTab == item.key ? colors.primary : colors.black}
                        style={{ fontFamily: fonts.medium }}
                        size={15}
                    />
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default TabView

const styles = StyleSheet.create({
    tabOption: {
        flex: 1,
        ...Center,
        margin: 2,
        borderRadius: 5,
    },
    tabCont: {
        flexDirection: 'row',
        height: 45,
        margin: 20,
        // width: "90%",
        backgroundColor: colors.lightGrey,
        borderRadius: 5,
    },
})