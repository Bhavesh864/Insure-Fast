import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { insuranceTypesArr } from '../../constants/OtherConst'
import { navigate } from '../../routes/RootNavigation'
import { Border, flexRow, screenStyle } from '../../styles/CommonStyling'
import { AppText, HeadingText } from '../../Utility/TextUtility'


const InsuranceListScreen = () => {


    const onOptionPress = (key) => {
        if (!key) {
            return
        }
        navigate(key);
    }

    return (
        <View style={screenStyle}>
            <HeadingText
                text={"Let's select your insurance"}
                style={{ padding: 20 }}
            />
            <FlatList
                data={insuranceTypesArr.filter(i => i.name)}
                keyExtractor={(a, b) => String(b)}
                contentContainerStyle={{ padding: 20, paddingTop: 0 }}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity activeOpacity={0.8} onPress={() => onOptionPress(item.key)} style={styles.item}>
                            <View style={{ width: 50 }}>
                                {item.icon}
                            </View>
                            <AppText
                                text={item.name}
                                style={{ flex: 1, paddingHorizontal: 15 }}
                            />
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    item: {
        height: 80,
        marginVertical: 10,
        ...Border,
        ...flexRow,
        borderRadius: 10,
        paddingHorizontal: 20
    }
})

export default InsuranceListScreen