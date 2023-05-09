import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { pop, navigate } from '../../../routes/RootNavigation';
import { Center, flexRow, screenStyle } from '../../../styles/CommonStyling';
import { AppText, HeadingText } from '../../../Utility/TextUtility';
import { Button, InputField } from '../../../components/CustomFields';
import { hondaCarVariants, vehicleTypesObj } from '../../../constants/OtherConst';
import { colors } from '../../../styles/colors';
import AntDesign from "react-native-vector-icons/AntDesign";
import { dispatchQuickQuote, getMotorVariantAction } from '../../../store/actions/PolicyAction';
import { AppConst } from '../../../constants/AppConst';
import FuelTypeSelectModal from '../../../components/insurance/motor/FuelTypeSelectModal';
import { AppToastMessage } from '../../../components/custom/SnackBar';
import FlexWrapListComponent from '../../../components/insurance/FlexWrapListComponent';
import { useSelector } from 'react-redux';


const SelectVariantScreen = ({ route }) => {
    const { make, model, isEdit } = route.params;
    const insuranceType = route?.params?.insuranceType;
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [allVariants, setAllVariants] = useState([]);
    const [searchResult, setSearchResult] = useState(null);
    const [search, setSearch] = useState("");
    const [fuelTypes, setFuelTypes] = useState([]);
    const [fuelModal, setFuelModal] = useState(false);
    const [selectedFuelType, setSelectedFuelType] = useState(null);
    const vehicleData = useSelector(state => state.motor.apiRequestQQ);



    useEffect(() => {
        if (insuranceType?.vehicleType != vehicleTypesObj.bike) {
            setFuelModal(true)
        }


        const body = {
            "make": isEdit ? vehicleData?.MakeName : make,
            "model": isEdit ? vehicleData?.ModelName : model,
            "Vehicle_Type": isEdit ? vehicleData?.vehicleType : insuranceType?.vehicleType
        }

        // const body = {
        //     "make": vehicleData?.MakeName,
        //     "model": vehicleData?.ModelName,
        //     "Vehicle_Type": 'Pvt Car'
        // }


        getMotorVariantAction(body).then(res => {
            if (res?.status) {
                AppConst.showConsoleLog("variant res: ", res?.data?.length);
                setAllVariants(res?.data);
                getFuelTypes(res.data);
            }
        })
    }, []);

    const getFuelTypes = (data) => {
        let fuelTypeArr = data.filter((v, i, a) => a.findIndex((v2) => v2.Fuel_Type === v.Fuel_Type) === i);
        let j = 0;
        let fuelarr = [];
        while (j < fuelTypeArr.length) {
            fuelarr.push(fuelTypeArr[j].Fuel_Type);
            j++;
        }
        setFuelTypes(fuelarr)
    }

    const onNext = () => {
        if (!selectedVariant) {
            AppToastMessage("Please select your vehicle variant");
            return
        }
        dispatchQuickQuote("FuelType", selectedFuelType);
        dispatchQuickQuote("VariantName", selectedVariant.Variant);

        if (!isEdit) {
            dispatchQuickQuote("CarryingCapacity", selectedVariant.Seating_Capacity);
            dispatchQuickQuote("CubicCapacity", selectedVariant.Cubic_Capacity);
            navigate("registrationYear", { insuranceType });
        } else {
            pop();
            AppToastMessage('Variant Updated successfully');
        }
    }

    const variantPress = (variant) => {
        AppConst.showConsoleLog("variant: ", variant);
        // return;
        setSelectedVariant(variant);
        // dispatchQuickQuote("VariantCode.Digit", variant.value);
        // dispatchQuickQuote("VariantCode.HDFC", variant.HDFC);
        // dispatchQuickQuote("VariantCode.Shriram", variant.Shriram);
        // dispatchQuickQuote("VariantCode.Kotak", variant.Kotak);
        // dispatchQuickQuote("VariantCode.Reliance", variant.Reliance);
        // dispatchQuickQuote("VariantCode.Future", variant.Future);
        // dispatchQuickQuote("VariantCode.Royal", variant.Royal);
        dispatchQuickQuote("FuelType", selectedFuelType);
        dispatchQuickQuote("VariantName", variant.Variant);

        if (!isEdit) {
            dispatchQuickQuote("CarryingCapacity", variant.Seating_Capacity);
            dispatchQuickQuote("CubicCapacity", variant.Cubic_Capacity);
            // navigate("registrationYear", { insuranceType });
        } else {
            pop();
            AppToastMessage('Variant Updated successfully');
        }
    }

    const onSearch = (text) => {
        setSearch(text)
        if (text) {
            const body = {
                "make": make,
                "model": model,
                "Vehicle_Type": insuranceType?.vehicleType,
                "variant": text
            }
            getMotorVariantAction(body, true).then(res => {
                AppConst.showConsoleLog("search res: ", res)
                if (res?.status) {
                    setSearchResult(res?.data);
                }
            })
        }
    }

    const filterVariants = (fuel) => {
        const arr = allVariants?.filter((i) => i?.Fuel_Type == fuel);
        AppConst.showConsoleLog("filter length: ", arr?.length)
        setAllVariants(arr);
    }

    return (
        <View style={[screenStyle, { backgroundColor: colors.off_white }]}>
            <InputField
                placeholder='Search variant'
                isSearch={true}
                style={{ marginTop: 20 }}
                value={search}
                onTextChange={onSearch}
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
                    <View style={{ flex: 1, marginHorizontal: 0, alignItems: "center" }}>
                        {((search && searchResult) ? searchResult : allVariants).map((item, index) => {
                            return (
                                <FlexWrapListComponent
                                    key={String(index)}
                                    item={item}
                                    textKey={"Variant"}
                                    onPress={(item) => variantPress(item)}
                                    borderWidth={selectedVariant?.Variant == item.Variant ? 2 : 0}
                                    itemWidth={"90%"}
                                    style={{}}
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

            {fuelModal && fuelTypes?.length > 0 &&
                <FuelTypeSelectModal
                    fuelTypes={fuelTypes}
                    onFuelSelect={fuel => {
                        AppConst.showConsoleLog("selected fuel", fuel)
                        dispatchQuickQuote("FuelType", fuel);
                        setSelectedFuelType(fuel);
                        setFuelModal(false);
                        filterVariants(fuel)
                    }}
                />
            }
        </View>
    )
}

export default SelectVariantScreen

const styles = StyleSheet.create({})