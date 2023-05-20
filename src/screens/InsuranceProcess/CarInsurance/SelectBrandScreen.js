import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button, InputField } from '../../../components/CustomFields'
import AntDesign from "react-native-vector-icons/AntDesign";
import { carBrandsArr } from '../../../constants/OtherConst';
import { pop, navigate } from '../../../routes/RootNavigation';
import { colors } from '../../../styles/colors';
import { Center, screenStyle, width } from '../../../styles/CommonStyling';
import { AppText, HeadingText } from '../../../Utility/TextUtility'
import { dispatchQuickQuote, getMotorMakeAction, getMotorMakeSearchAction } from '../../../store/actions/PolicyAction'
import { AppConst } from '../../../constants/AppConst'
import FlexWrapListComponent from '../../../components/insurance/FlexWrapListComponent';
import { AppToastMessage } from '../../../components/custom/SnackBar';


const SelectBrandScreen = ({ route }) => {
    const isEdit = route?.params?.isEdit;
    const insuranceType = route?.params?.insuranceType;
    const cardWidth = ((width - 80) / 2);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [allBrands, setAllBrands] = useState([]);
    const [searchResult, setSearchResult] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        // AppConst.showConsoleLog("insr type: ", insuranceType);
        getMotorMakeAction(insuranceType?.vehicleType).then(res => {
            if (res?.status) {
                setAllBrands(res?.data);
            }
        })
    }, []);

    const onNext = () => {
        if (!selectedBrand) {
            AppToastMessage('Please select a brand name!')
            return;
        }
        dispatchQuickQuote("MakeName", selectedBrand);
        if (!isEdit) {
            dispatchQuickQuote("VehicleType", insuranceType.vehicleType);
            navigate("carModalScreen", { make: selectedBrand, insuranceType });
        } else {
            pop();
            AppToastMessage('Brand Name Updated')
        }
    }

    const onBrandPress = (key) => {
        if (!isEdit) {
            dispatchQuickQuote("VehicleType", insuranceType.vehicleType);
            navigate("carModalScreen", { make: key, insuranceType });
        } else {
            pop();
            AppToastMessage('Brand Name Updated')
        }
        dispatchQuickQuote("MakeName", key);
    }

    const onSearch = (text) => {
        console.log('object', text)
        setSearch(text)
        if (text?.length > 1) {
            getMotorMakeSearchAction(text, insuranceType?.vehicleType).then(res => {
                AppConst.showConsoleLog("search res: ", res)
                if (res?.status) {
                    setSearchResult(res?.data);
                }
            })
        }
    }

    return (
        <View style={[screenStyle, { backgroundColor: colors.off_white }]}>
            <InputField
                placeholder='Search Manufacturer'
                isSearch={true}
                value={search}
                onTextChange={onSearch}
                style={{ marginTop: 20 }}
                leftIcon={search ? <AntDesign
                    name="close"
                    size={22}
                    color={colors.black}
                    onPress={() => {
                        setSearch("")
                        setSearchResult(null);
                    }}
                /> : null}
            />
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", flexWrap: "wrap", marginHorizontal: 10 }}>
                        {((search && searchResult) ? searchResult : allBrands).map((item, index) => {
                            return (
                                <FlexWrapListComponent
                                    key={String(index)}
                                    item={item}
                                    textKey={"Make"}
                                    onPress={(item) => onBrandPress(item.Make)}
                                    borderWidth={item.Make == selectedBrand ? 2 : 0}
                                />
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


const styles = StyleSheet.create({})

export default SelectBrandScreen