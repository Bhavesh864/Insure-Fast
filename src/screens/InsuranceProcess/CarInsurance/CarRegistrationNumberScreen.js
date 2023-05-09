import React, { useEffect, useState } from 'react'
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button, CustomBackButton, InputField, Selectbox } from '../../../components/CustomFields'
import { pop, navigate } from '../../../routes/RootNavigation'
import { colors } from '../../../styles/colors'
import { Center, flexRow, screenStyle, width } from '../../../styles/CommonStyling'
import { AppText, HeadingText } from '../../../Utility/TextUtility'
import { dispatchQuickQuote, getAllRtoCodesAction } from '../../../store/actions/PolicyAction'
import { AppConst, BaseValidation } from '../../../constants/AppConst'
import { AppToastMessage } from '../../../components/custom/SnackBar'
import { vehicleTypesObj } from '../../../constants/OtherConst'
import { useSelector } from 'react-redux'


const CarRegistrationNumberScreen = ({ route, navigation }) => {
    const isEdit = route?.params?.isEdit;
    const vehicleType = route?.params?.vehicleType ? route?.params?.vehicleType : "Pvt Car";
    const screenTitle = route?.params?.title ? route?.params?.title : "Vehicle Insurance";
    const isThirdParty = route.params?.isThirdParty;
    const [activeType, setActiveType] = useState("renew")
    const [allRtoCode, setAllRtoCode] = useState([]);
    const [limitRtoCodes, setLimitRtoCode] = useState([]);

    useEffect(() => {
        console.log('object', route?.params?.vehicleType)
        navigation?.setOptions({
            headerTitle: screenTitle
        });
    }, [navigation])

    useEffect(() => {
        getAllRtoCodesAction().then(res => {
            AppConst.showConsoleLog("res:", res);
            if (res?.status) {
                const filtered = res?.data?.filter(function (item) {
                    if (this.count < 10 && item) {
                        this.count++;
                        return true;
                    }
                    return false;
                }, { count: 0 });
                setLimitRtoCode(filtered);
                setAllRtoCode(res?.data);
            } else {

            }
        })
    }, []);




    return (
        <View style={screenStyle}>
            <SafeAreaView style={screenStyle}>
                <KeyboardAvoidingView style={screenStyle} behavior={Platform.OS == "ios" ? "padding" : null}>
                    {/* <CarInsuranceHeader /> */}
                    {isEdit ? <RenewComponent
                        insuranceType={{ vehicleType, screenTitle }}
                        isThirdParty={isThirdParty}
                        isEdit={isEdit}
                    /> : <View style={{ flex: 1 }}>
                        {(vehicleType == vehicleTypesObj.car && !isThirdParty) &&
                            <AppText
                                text={"Save upto 85% on Car Insurance"}
                                size={22}
                                style={{ paddingTop: 20, textAlign: "center" }}
                            />
                        }
                        {
                            !isThirdParty &&
                            <View style={{ paddingTop: 20 }}>
                                <InsuranceTypesView
                                    activeType={activeType}
                                    setActiveType={setActiveType}
                                />
                            </View>
                        }
                        <View style={{ flex: 1, paddingTop: isThirdParty ? 20 : 0 }}>
                            {activeType == "new" ?
                                <SelectRtoCodeComponent
                                    list={limitRtoCodes}
                                    allList={allRtoCode}
                                    setList={setLimitRtoCode}
                                    insuranceType={{ vehicleType, screenTitle }}
                                />
                                :
                                <RenewComponent
                                    insuranceType={{ vehicleType, screenTitle }}
                                    isThirdParty={isThirdParty}
                                />
                            }
                        </View>
                    </View>}
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    )
}

const SelectRtoCodeComponent = ({ list = [], allList = [], setList, insuranceType }) => {
    const [selectedCode, setSelectedCode] = useState(null);

    const searchRtoCodes = (text) => {
        let arr = allList?.filter(function (item) {
            if ((item.RTO_Code?.toLowerCase().includes(text.toLowerCase()) || item?.registered_city_name?.toLowerCase().includes(text.toLowerCase())) && this.count < 20) {
                this.count++;
                return true;
            }
            return false;
        }, { count: 0 });
        setList(arr)
    }

    const onCodePress = (item) => {
        setSelectedCode(item?.RTO_Code);
        dispatchQuickQuote("RtoCode", item.RTO_Code);
        dispatchQuickQuote("IsVehicleNew", true);
        // navigate("carBrandList", { insuranceType });
    }

    const onNextPress = () => {
        if (!selectedCode) {
            AppToastMessage("Please select your RTO code");
            return;
        }
        dispatchQuickQuote("RtoCode", selectedCode);
        dispatchQuickQuote("IsVehicleNew", true);
        // if(insuranceType)
        navigate("carBrandList", { insuranceType });
    }

    return (
        <View style={{ flex: 1 }}>
            <AppText
                text={"Select RTO Code"}
                size={16}
                style={{ padding: 20, paddingVertical: 10 }}
            />
            <InputField
                placeholder='Search RTO City/Code'
                style={{ marginBottom: 0 }}
                onTextChange={searchRtoCodes}
            />
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.codeCont}>
                        {list.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={item?.id ? String(item.id) : String(index)}
                                    style={[styles.codeItem, { backgroundColor: item.RTO_Code == selectedCode ? colors.primary : colors.white }]}
                                    onPress={() => onCodePress(item)}
                                >
                                    <AppText
                                        text={item.RTO_Code}
                                        color={item.RTO_Code == selectedCode ? colors.white : colors.black}
                                    />
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </ScrollView>
                <View style={{ paddingHorizontal: 20 }}>
                    <Button
                        title={"Next"}
                        style={{ marginBottom: 0 }}
                        onPress={() => onNextPress()}
                    />
                </View>
            </View>
        </View>
    )
}

const RenewComponent = ({ insuranceType, isThirdParty, isEdit }) => {
    const vehicleData = useSelector(state => state.motor.apiRequestQQ);
    const [regNumber, setRegNumber] = useState(isEdit ? vehicleData?.RegistrationNumber : '');
    const [quoatationNumber, setQuotationNumber] = useState("");

    const onDetailPress = () => {
        console.log(vehicleData?.vehicleType);
        let num = regNumber.trim().toUpperCase();
        let regNum = ""
        for (let i = 0; i < num.length; i++) {
            const st = num[i].replace("-", '');
            regNum = regNum + st.trim()
        }
        // rj07ks3176
        const validation = BaseValidation.registrationNumber.test(regNum) || BaseValidation.BHRegistrationNumber.test(regNum)
        // const BA_Validation = BaseValidation.registrationNumber.test(num)
        AppConst.showConsoleLog(regNum, validation);
        if (!validation) {
            AppToastMessage("Please enter valid registration number");
            return;
        }
        dispatchQuickQuote("RegistrationNumber", num);
        if (!isEdit) {
            dispatchQuickQuote("IsVehicleNew", false);
            navigate("carBrandList", { insuranceType });
        } else {
            pop();
            AppToastMessage('Registration Number Updated')
        }
    }

    const onRegTextChange = (value) => {
        if ([2, 5, 8].includes(value.length)) {
            setRegNumber((prev) => {
                // this is only the case when we try to delete empty space
                if (prev.endsWith("-")) {
                    return value.slice(0, -1);
                } else {
                    return value + "-";
                }
            });
        } else {
            setRegNumber(value);
        }
    }

    const getKeyBoardType = () => {
        const len = regNumber?.length
        if (len > 2 && len <= 5) {
            return "number-pad"
        }
        else if (len > 8) {
            return "number-pad"
        }
        return "default"
    }
    return (
        <View>
            <View style={{ marginVertical: 10 }}>
                {/* <AppText /> */}
                <InputField
                    value={regNumber}
                    label={isThirdParty ? "Vehicle Registration Number" : "Stay home & renew in 2 minutes"}
                    placeholder='Enter registration number'
                    maxLength={13}
                    keyboardType={getKeyBoardType()}
                    autoCapitalize={"characters"}
                    onTextChange={t => onRegTextChange(t)}
                />
                <Button
                    title={isEdit ? "Update" : "Get Details"}
                    style={{ marginTop: 0 }}
                    onPress={() => onDetailPress()}
                />
            </View>
            {!isThirdParty &&
                <View style={{ marginVertical: 10 }}>
                    {/* <AppText /> */}
                    <InputField
                        value={quoatationNumber}
                        label={"Already have quoatation number?"}
                        placeholder='Enter Quotation number'
                        onTextChange={setQuotationNumber}

                    />
                    <Button
                        title={"Load Quotation"}
                        style={{ marginTop: 0 }}
                    />
                </View>
            }
        </View>
    )
}

const InsuranceTypesView = ({ activeType = "renew", setActiveType }) => {
    const arr = [
        {
            title: "Renew",
            key: "renew"
        },
        {
            title: "New",
            key: "new"
        },
    ];

    return (
        <View style={[flexRow, { margin: 10, marginTop: 0 }]}>
            {arr.map((item, index) => {
                const activeColor = activeType == item.key ? colors.primary : colors.darkGrey
                return (
                    <TouchableOpacity
                        key={String(index)}
                        activeOpacity={0.8}
                        onPress={() => setActiveType(item.key)}
                        style={{ height: 40, width: 120, ...flexRow, borderWidth: 1, borderColor: activeColor, borderRadius: 5, marginHorizontal: 10 }}
                    >
                        <View style={{ marginHorizontal: 10 }}>
                            <Selectbox value={activeType == item.key} />
                        </View>
                        <AppText
                            text={item.title}
                            color={activeColor}

                        />
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export const CarInsuranceHeader = () => {
    return (
        <View style={styles.header}>
            <CustomBackButton
                // style={{position:"absolute",top:20,left:20}}
                style={{ margin: 20 }}
            />
            <HeadingText
                text={"Car Insurance"}
                style={{ padding: 20, paddingTop: 0 }}
            />
            <Image source={require("../../../assets/images/carIns.png")} style={styles.headerCarImg} />
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        height: 150,
        width: width,
        backgroundColor: colors.primaryLight
    },
    headerCarImg: {
        height: 100,
        width: 150,
        position: "absolute",
        right: 20,
        top: 25
    },
    boughtTxt: {
        alignSelf: "center",
        margin: 20,
        padding: 10
    },
    codeItem: {
        height: 50,
        width: (width - 80) / 3,
        backgroundColor: colors.white,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: colors.lightGrey,
        margin: 10,
        ...Center
    },
    codeCont: {
        padding: 10,
        flexDirection: "row",
        flexWrap: "wrap"
    }
})

export default CarRegistrationNumberScreen