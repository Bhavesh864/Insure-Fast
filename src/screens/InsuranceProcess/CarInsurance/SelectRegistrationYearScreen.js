import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Center, screenStyle, width } from '../../../styles/CommonStyling'
import { colors } from '../../../styles/colors'
import { Button, InputField } from '../../../components/CustomFields'
import { AppText } from '../../../Utility/TextUtility'
import { navigate } from '../../../routes/RootNavigation'
import { useSelector } from 'react-redux'
import { AppConst } from '../../../constants/AppConst'
import { dispatchQuickQuote } from '../../../store/actions/PolicyAction'
import { AppToastMessage } from '../../../components/custom/SnackBar'
const cardWidth = ((width - 80) / 2);



const SelectRegistrationYearScreen = ({ route }) => {
    const insuranceType = route?.params?.insuranceType;
    const [yearsArr, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState(null);
    const details = useSelector(state => state.motor?.apiRequestQQ);
    const user = useSelector(state => state.user?.user);

    useEffect(() => {
        const minYear = details?.IsVehicleNew ? Number(new Date().getFullYear()) : 2002;
        AppConst.showConsoleLog("min year: ", minYear);
        setYears(getYears(minYear));
    }, []);

    function getYears(startYear) {
        var currentYear = new Date().getFullYear(), years = [];
        startYear = startYear || 2002;
        while (startYear <= currentYear) {
            years.push(startYear++);
        }
        if (details?.IsVehicleNew) {
            return years.reverse();
        } else {
            return years.filter(y => y != currentYear).reverse();
        }
    }

    const onYearPress = (year) => {
        dispatchQuickQuote("RegistrationYear", year);
        setSelectedYear(year);
        navFunc();
    }

    const onNext = () => {
        if (!selectedYear) {
            AppToastMessage("Please select vehicle registration year");
            return;
        }
        dispatchQuickQuote("RegistrationYear", selectedYear);
        navFunc()
    }

    const navFunc = () => {
        if (user?.name || user?.first_name) {
            // if (details?.IsVehicleNew) {
            navigate("vehiclePolicyForm", { insuranceType });
            // } else {
            // navigate("previousPolicy", { insuranceType });
            // }
        } else {
            navigate("personalDetailForm", { insuranceType });
        }
    }
    return (
        <View style={[screenStyle, { backgroundColor: colors.off_white }]}>
            <InputField
                placeholder='Search year'
                isSearch={true}
                style={{ marginTop: 20 }}
                onTextChange={() => { }}
            />
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ marginHorizontal: 10, flexDirection: "row", flexWrap: "wrap", marginHorizontal: 10 }}>
                        {yearsArr.map((item, index) => {
                            return (
                                <TouchableOpacity onPress={() => onYearPress(item)} key={String(index)} style={[styles.item, { borderWidth: item == selectedYear ? 2 : 0 }]}>
                                    <AppText
                                        text={item}
                                    />
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </ScrollView>
            </View>

            <View style={{ margin: 20 }}>
                <Button
                    title='Next'
                    onPress={onNext}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    item: {
        height: 50,
        width: cardWidth,
        backgroundColor: colors.white,
        margin: 10,
        ...Center,
        borderRadius: 10,
        borderColor: colors.primary
    }
})

export default SelectRegistrationYearScreen;