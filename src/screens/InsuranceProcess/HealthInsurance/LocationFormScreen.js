import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Center, screenStyle, width } from '../../../styles/CommonStyling'
import TimelineComponent from '../../../components/custom/TimelineComponent'
import { AppText, HeadingText } from '../../../Utility/TextUtility'
import { Button, InputField } from '../../../components/CustomFields'
import { staticCitiesArr } from '../../../constants/OtherConst'
import { colors } from '../../../styles/colors'
import { shadows } from '../../../styles/shadow'
import { navigate } from '../../../routes/RootNavigation'
import { getCountryWithCountryCode } from '../../../store/actions/PolicyAction'
import { AppToastMessage } from '../../../components/custom/SnackBar'


const LocationFormScreen = () => {
    const [searchedCities, setSearchedCities] = useState(staticCitiesArr);
    const [pinCode, setpinCode] = useState('');
    const [selectedCity, setselectedCity] = useState(null);

    useEffect(() => {

    }, [])


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
                        onTextChange={(text) => {
                            getCountryWithCountryCode(text).then(res => {
                                setSearchedCities(res?.data)
                                console.log('res', res);
                            })
                        }}
                        keyboardType='numeric'
                        maxLength={10}
                    />
                </View>
                <View style={{ marginVertical: 0, paddingHorizontal: 10, flexDirection: "row", flexWrap: "wrap" }}>
                    {searchedCities.length != 0 ? searchedCities.map((item, index) => {
                        return (
                            <TouchableOpacity
                                style={{ height: 50, width: (width - 60) / 2, backgroundColor: colors.white, margin: 10, borderRadius: 10, borderWidth: 1, borderColor: selectedCity == item.City ? colors.primary : colors.lightGrey, ...shadows[0], ...Center }}
                                key={index}
                                onPress={() => {
                                    // navigate("medicalHistory");
                                    setselectedCity(item.City);
                                }}
                            >
                                <AppText
                                    text={item?.City}
                                />
                            </TouchableOpacity>
                        )
                    }) :
                        <View style={{ ...Center, flex: 1, alignSelf: 'center', marginTop: 50 }}>
                            <AppText
                                text='No data found!'
                            />
                        </View>
                    }
                </View>
            </View>
            <View style={{ margin: 20 }}>
                <Button
                    title='Continue'
                    onPress={() => {
                        if (selectedCity) {
                            navigate("medicalHistory")
                        } else {
                            AppToastMessage('Please select city!')
                        }

                    }}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({})

export default LocationFormScreen