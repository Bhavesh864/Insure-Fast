import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Center, screenStyle, width } from '../../../styles/CommonStyling'
import TimelineComponent from '../../../components/custom/TimelineComponent'
import { AppText, HeadingText } from '../../../Utility/TextUtility'
import { Button, InputField } from '../../../components/CustomFields'
import { staticCitiesArr } from '../../../constants/OtherConst'
import { colors } from '../../../styles/colors'
import { shadows } from '../../../styles/shadow'
import { navigate } from '../../../routes/RootNavigation'


const LocationFormScreen = () => {
    return (
        <View style={screenStyle}>
            <View style={{ flex: 1 }}>
                <View style={{ paddingVertical: 20, paddingBottom: 10 }}>
                    <TimelineComponent doneIndex={3} />
                </View>
                <View>
                    <HeadingText
                        text={"Where do you live?"}
                        style={{ marginHorizontal: 20, marginBottom: 10 }}
                    />
                    <InputField
                        placeholder='Enter city or pincode'
                        onTextChange={() => { }}
                        keyboardType='numeric'
                        maxLength={10}
                    />
                </View>
                <View style={{ marginVertical: 0, paddingHorizontal: 10, flexDirection: "row", flexWrap: "wrap" }}>
                    {staticCitiesArr.map((item, index) => {
                        return (
                            <TouchableOpacity
                                style={{ height: 50, width: (width - 60) / 2, backgroundColor: colors.white, margin: 10, borderRadius: 10, borderWidth: 1, borderColor: colors.lightGrey, ...shadows[0], ...Center }}
                                key={index}
                            >
                                <AppText
                                    text={item.name}
                                />
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
            <View style={{ margin: 20 }}>
                <Button
                    title='Continue'
                    onPress={() => {
                        navigate("healthQuotations")
                        return
                    }}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({})

export default LocationFormScreen