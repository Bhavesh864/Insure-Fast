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
import { useSelector } from 'react-redux'
import { dispatchHealthQuickQuote } from '../../../store/actions/HealthPolicyAction'


const LocationFormScreen = () => {
    const [searchedCities, setSearchedCities] = useState(staticCitiesArr);
    const [pinCode, setpinCode] = useState(null);
    const [selectedCity, setselectedCity] = useState(null);
    const user = useSelector(state => state.user?.user);


    const onPressContinue = () => {
        console.log(selectedCity);
        if (selectedCity) {
            dispatchHealthQuickQuote('Pincode', pinCode ? pinCode : selectedCity.pinCode);
            if (user?.name || user?.first_name) {
                navigate("medicalHistory");
            } else {
                navigate("personalDetailForm", { isHealthInsurance: true });
            }
        } else {
            AppToastMessage('Please select city!')
        }
    }


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
                        placeholder='Enter pincode'
                        onTextChange={(text) => {
                            setpinCode(text);
                            setselectedCity(null);
                            if (text == '') {
                                setSearchedCities(staticCitiesArr);
                            } else {
                                getCountryWithCountryCode(text).then(res => {
                                    if (res?.status) {
                                        setSearchedCities(res?.data)
                                        console.log('res', res);
                                    }
                                })
                            }
                        }}
                        keyboardType='numeric'
                        maxLength={10}
                    />
                </View>
                <View style={{ marginVertical: 0, paddingHorizontal: 10, flexDirection: "row", flexWrap: "wrap" }}>
                    {searchedCities.length != 0 ? searchedCities.map((item, index) => {
                        return (
                            <TouchableOpacity
                                style={{ height: 50, width: (width - 60) / 2, backgroundColor: colors.white, margin: 10, borderRadius: 10, borderWidth: 1, borderColor: selectedCity?.District == item.District ? colors.primary : colors.lightGrey, ...shadows[0], ...Center }}
                                key={index}
                                onPress={() => {
                                    // navigate("medicalHistory");
                                    setselectedCity(item);
                                }}
                            >
                                <AppText
                                    text={item?.District}
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
                        onPressContinue();
                    }}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({})

export default LocationFormScreen